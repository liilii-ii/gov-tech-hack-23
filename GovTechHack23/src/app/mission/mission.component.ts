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
import { map, Observable, of, combineLatest, EMPTY } from 'rxjs';
import { MissionTask } from 'src/shared/missionTask.model';

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

  state: StatesModel = { id: States.Started, text: 'Suche gestartet' };

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
   * Returns active tab index
   */
  public get getIndexOfActiveTab$(): Observable<number> {
    if (!this.activeTaskId$) return of(0);
    return this.activeTaskId$.pipe(
      map((id) => {
        const tab = this.subMissions.find((t) => t.id === id);
        return tab ? this.subMissions.indexOf(tab) : 0;
      })
    );
  }

  constructor(
    private firebaseDbService: FirebaseDbService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firebaseDbService.getAllMissionManager().subscribe(l => console.log(l))

       this.activeTaskId$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id')))
    );

    combineLatest([
      this.firebaseDbService.getAllMissions(), 
      this.firebaseDbService.getAllMissionManager(), 
      this.firebaseDbService.getAllHelper(), 
      this.firebaseDbService.getAllTasks(),
      this.activeTaskId$,
    ]
      ).subscribe(([missions, managers, helpers, tasks, activeId]) => {
        console.log(activeId)
        this.missionTasks = tasks.map(t => ({...t, Helper: helpers.find(i => i.TaskId === t.TaskId)}));
        this.activeTask = this.missionTasks.find(t => t.TaskId === activeId);
        this.activeMission = {...missions[0], MissionManager: managers.find(m => m.MissionId === missions[0].MissionId)};
      })

 
  }

  /**
   * Öffnet den Status Dialog und gibt die Datenänderung über afterClosed() zurück
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(StateDialogComponent, {
      data: { state: this.state },
    });

    dialogRef.afterClosed().subscribe((result: StatesModel) => {
      console.log('The dialog was closed');
      this.state = result;
    });
  }

  changeParam(taskId: any): void {
    this.router.navigate(['mission',  {id: taskId.index+1}])
  }
}
