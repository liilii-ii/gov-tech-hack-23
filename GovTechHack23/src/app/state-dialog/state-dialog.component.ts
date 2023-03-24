import { Status } from './../../shared/status.model';
import { FirebaseDbService } from 'src/db/firebase-db.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { States, StatesModel } from './state-dialog.models';
import { MissionTask } from 'src/shared/missionTask.model';
import { combineLatest, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-state-dialog',
  templateUrl: './state-dialog.component.html',
  styleUrls: ['./state-dialog.component.scss'],
})
export class StateDialogComponent implements OnInit {
  states: Status[] | undefined;
  public activeTask: MissionTask | undefined;

  constructor(
    public dialogRef: MatDialogRef<StateDialogComponent>,
    public firebaseDbService: FirebaseDbService,
    @Inject(MAT_DIALOG_DATA) public data: { state: number; activeTask: number }
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.firebaseDbService.getAllStatus(),
      this.firebaseDbService.getAllTasks(),
    ]).subscribe(([states, tasks]) => {
      this.states = states;
      this.activeTask = tasks.find((t) => t.TaskId === this.data.activeTask);
    });
  }

  onYesClick(): void {
    if (this.activeTask?.id) {
      const task = this.activeTask;
      delete task.Helper;
      this.firebaseDbService.updateTask(this.activeTask?.id, {
        ...this.activeTask,
        StatusId: Number(this.data.state),
      });
    }
    this.dialogRef.close();
  }
}
