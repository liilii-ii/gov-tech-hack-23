import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
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

  
  
  /**
   * Der aktive Helfer wrid von der URl genommen
   */
   public activeHelperId$: Observable<number> | undefined;

  constructor(
    private router: Router,
    private notifier: StateNotifierService,
    private firebaseDbService: FirebaseDbService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeHelperId$ = this.route.queryParams.pipe(
      map((params) => Number(params.helper)),
    );
     
    combineLatest([
      this.firebaseDbService.getAllHelper(),
      this.firebaseDbService.getAllTasks(),
      this.firebaseDbService.getAllStatus(),
      this.activeHelperId$,
    ]).subscribe(([helpers, tasks, states, activeHelperId]) => {
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
      if (!helper || !stateText || activeHelperId) return;
      this.notifier.notifyMissionOwner(
        helper?.Name,
        helper?.HelperId,
        stateText
      );
    });
  }

  public navigateToMissions(): void {
    this.router.navigate(['mission'], {queryParams: {taskId: undefined}, queryParamsHandling: 'merge'});
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
