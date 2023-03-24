import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { FirebaseDbService } from 'src/db/firebase-db.service';
import { MissionTask } from 'src/shared/missionTask.model';
import { StateNotifierService } from '../state-notifier/state-notifier.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  tasks: MissionTask[] | undefined;
  changedTask: MissionTask | undefined;

  constructor(
    private router: Router,
    private notifier: StateNotifierService,
    private firebaseDbService: FirebaseDbService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.firebaseDbService.getAllHelper(),
      this.firebaseDbService.getAllTasks(),
      this.firebaseDbService.getAllStatus(),
    ]).subscribe(([helpers, tasks, states]) => {
      this.monitorTasksChanges(tasks);

      //Determine which helper is assigned to the changed task
      if (!this.changedTask) return;
      const helper = helpers.find(
        (helper) => helper.TaskId === this.changedTask?.TaskId
      );

      //Determine the state text
      const state = this.changedTask?.StatusId;
      const stateText = states.find((s) => s.StatusId === state)?.Name;

      //when the state of a task has changed notify the mission owner
      if (!helper || !stateText) return;
      this.notifier.notifyMissionOwner(
        helper?.Name,
        helper?.HelperId,
        stateText
      );
    });
  }

  public navigateToMissions(): void {
    this.router.navigate(['mission']);
  }

  private monitorTasksChanges(tasksUpdates: MissionTask[]): void {
    if (!this.tasks) {
      this.tasks = tasksUpdates;
      return;
    }
    if (JSON.stringify(tasksUpdates) === JSON.stringify(this.tasks)) return;

    //Determine which task has changed
    this.changedTask = tasksUpdates.find(
      (task) =>
        task.StatusId !==
        this.tasks?.find((t) => t.TaskId === task.TaskId)?.StatusId
    );

    // update the task in the end
    this.tasks = tasksUpdates;
  }
}
