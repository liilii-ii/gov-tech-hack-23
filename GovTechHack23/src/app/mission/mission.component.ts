import { MissionManager } from 'src/shared/missionManager.model';
import { Mission } from 'src/shared/mission.model';
import { FirebaseDbService } from 'src/db/firebase-db.service';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { StateDialogComponent } from '../state-dialog/state-dialog.component';
import { States, StatesModel } from '../state-dialog/state-dialog.models';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, combineLatest, EMPTY, tap } from 'rxjs';
import { MissionTask } from 'src/shared/missionTask.model';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Status } from 'src/shared/status.model';
import { identifierName } from '@angular/compiler';

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
   * Status
   */
  public state: Status | undefined;

  /**
   * Aktives Missions Tab
   */
  public activeTaskId$: Observable<number> | undefined;

  /**
   * Missionen
   */
  public missionTasks: MissionTask[] | undefined;

  /**
   * Der aktive Helfer wrid von der URl genommen
   */
  public activeHelperId: number | undefined;


  /**
   * Aktive Mission
   */
  public activeTask: MissionTask | undefined;

  /**
   * Aktive Mission
   */
  public activeMission: Mission | undefined;

  /**
   * States
   */
  public states: Status[] | undefined;

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
        tap(params => this.activeHelperId === Number(params.helper)),
        map((params) => Number((params as any).taskId))
    );

    this.firebaseDbService.getAllStatus().subscribe((s) => (this.states = s));

    combineLatest([
      this.firebaseDbService.getAllMissions(),
      this.firebaseDbService.getAllMissionManager(),
      this.firebaseDbService.getAllHelper(),
      this.firebaseDbService.getAllTasks(),
      this.activeTaskId$,
    ]
      ).subscribe(([missions, managers, helpers, tasks,  activeId]) => {
        const activeHelper = helpers.find(h => h.HelperId === this.activeHelperId)
        this.missionTasks = tasks.map(t => ({...t, Helper: helpers.find(i => i.TaskId === t.TaskId)})).filter(t => activeHelper ? t.TaskId === activeHelper.TaskId : true);
         //missionTasks aufsteigend sortieren
        this.missionTasks.sort((a, b) => a.TaskId - b.TaskId);
        this.activeTask = this.missionTasks.find(t => t.TaskId === activeId);
        this.activeMission = {...missions[0], MissionManager: managers.find(m => m.MissionId === missions[0].MissionId)};
      })
 
  }

  /**
   * Öffnet den Status Dialog und gibt die Datenänderung über afterClosed() zurück
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(StateDialogComponent, {
      data: { state: this.activeTask?.StatusId },
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (this.activeTask?.id) {
        const task = this.activeTask;
        delete task.Helper;
        this.firebaseDbService.updateTask(this.activeTask?.id, {
          ...this.activeTask,
          StatusId: Number(result),
        });
      }
    });
  }

  changeParam(taskId: any): void {
    this.router.navigate(['/mission'], { queryParams: { taskId: taskId.index+1 }, queryParamsHandling: 'merge' });
  }
}
