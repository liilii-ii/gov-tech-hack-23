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
  tasks: MissionTask[] | undefined;
  public selectedStateId: number | undefined;
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
      this.tasks = tasks;
      this.activeTask = tasks.find((t) => t.TaskId === this.data.activeTask);

      this.selectedStateId = this.activeTask?.StatusId;

      //compare t array and this.tasks array if they are the same
      console.log(JSON.stringify(tasks) === JSON.stringify(this.tasks));
      // if task has state changes, notify the mission owner
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
