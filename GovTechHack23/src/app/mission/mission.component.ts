import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { FirebaseDbService } from 'src/db/firebase-db.service';
import { Helper } from 'src/shared/helper.model';
import { Mission } from 'src/shared/mission.model';
import { MissionTask } from 'src/shared/missionTask.model';
import { Status } from 'src/shared/status.model';
import { StateDialogComponent } from '../state-dialog/state-dialog.component';
import { AddHelperDialogComponent } from './../add-helper-dialog/add-helper-dialog.component';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss'],
})
export class MissionComponent implements OnInit {
  public subMissions: { tab: string; id: number }[] = [
    { tab: 'Zone A', id: 1 },
    { tab: 'Zone B', id: 2 },
    { tab: 'Zone C', id: 3 },
    { tab: 'Zone D', id: 4 },
  ];

  /**
   * Aktives Missions Tab
   */
  public activeTaskId$: Observable<number> | undefined;

  /**
   * Missionen
   */
  public missionTasks: MissionTask[] | undefined;

  /**
   * Aktive Mission
   */
  public activeTask: MissionTask | undefined;

  /**
   * Aktive Mission
   */
  public activeMission: Mission | undefined;

  /**
   * Alle helfende Personen
   */
  public helpers: Helper[] | undefined;

  /**
   * Der aktive Helfer wrid von der URl genommen
   */
  public activeHelperId$: Observable<number> | undefined;

  /**
   * Aktiver Helfer
   */
  public activeHelper: Helper | undefined;

  /**
   * Alle Status
   */
  public states: Status[] | undefined;

  /**
   * Status
   */
  public state: Status | undefined;

  public getActiveState(id: number | undefined): string | undefined {
    return this.states?.find((s) => s.StatusId === id)?.Name;
  }

  constructor(
    private firebaseDbService: FirebaseDbService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeTaskId$ = this.route.queryParams.pipe(
      map((params) => Number((params as any).taskId))
    );

    this.activeHelperId$ = this.route.queryParams.pipe(
      map((params) => Number(params.helper))
    );

    this.firebaseDbService.getAllStatus().subscribe((s) => (this.states = s));

    combineLatest([
      this.firebaseDbService.getAllMissions(),
      this.firebaseDbService.getAllMissionManager(),
      this.firebaseDbService.getAllHelper(),
      this.firebaseDbService.getAllTasks(),
      this.activeTaskId$,
      this.activeHelperId$,
    ]).subscribe(
      ([missions, managers, helpers, tasks, activeId, activeHelperId]) => {
        this.activeHelper = helpers.find((h) => h.HelperId === activeHelperId);
        this.helpers = helpers;
        this.missionTasks = tasks
          .map((t) => ({
            ...t,
            Helper: helpers.find((i) => i.TaskId === t.TaskId),
          }))
          .filter((t) =>
            this.activeHelper ? t.TaskId === this.activeHelper.TaskId : true
          );
        //missionTasks aufsteigend sortieren
        this.missionTasks.sort((a, b) => a.TaskId - b.TaskId);
        this.activeTask = this.activeHelper
          ? this.missionTasks[0]
          : this.missionTasks.find((t) => t.TaskId === activeId);
        this.activeMission = {
          ...missions[0],
          MissionManager: managers.find(
            (m) => m.MissionId === missions[0].MissionId
          ),
        };
      }
    );
  }

  /**
   * Öffnet den Status Dialog. Aktueller Taskstatus und Task muss übergeben werden
   */
  public openStateDialog(): void {
    this.dialog.open(StateDialogComponent, {
      data: {
        state: this.activeTask?.StatusId,
        activeTask: this.activeTask,
      },
    });
  }

  /**
   * Öffnet den Helfer-Hinzufügen Dialog und gibt die Datenänderung über afterClosed() zurück
   */
  public openAddHelperDialog(): void {
    const dialogRef = this.dialog.open(AddHelperDialogComponent, {
      data: { state: this.activeTask },
    });

    dialogRef.afterClosed().subscribe((helperId: number) => {
      const newHelper = this.helpers?.find((h) => h.HelperId === helperId);
      if (newHelper && this.activeTask) {
        this.firebaseDbService.udpateHelper(newHelper.id, {
          ...newHelper,
          TaskId: this.activeTask?.TaskId,
        });
      }
    });
  }

  /** Wenn ein Task in der Tabgroup ausgewählt wird, Routing anpassen um zum Task zu navigieren */
  public changeMissionTask(event: MatTabChangeEvent): void {
    this.router.navigate(['/mission'], {
      queryParams: { taskId: event.index + 1 },
      queryParamsHandling: 'merge',
    });
  }

  /**  Routing anpassen um zur Kartenansicht zu navigieren */
  public navigateToMap(): void {
    this.router.navigate(['map'], { queryParamsHandling: 'merge' });
  }
}
