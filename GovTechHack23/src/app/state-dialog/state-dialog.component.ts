import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseDbService } from 'src/db/firebase-db.service';
import { MissionTask } from 'src/shared/missionTask.model';
import { Status } from './../../shared/status.model';

/**
 * Komponente mit dem Inhalt für den Dialog zum Ändern des Status einer Aufgabe
 */
@Component({
  selector: 'app-state-dialog',
  templateUrl: './state-dialog.component.html',
  styleUrls: ['./state-dialog.component.scss'],
})
export class StateDialogComponent implements OnInit {
  /** Alles verfügbaren Status der Suche */
  public states: Status[] | undefined;
  /** Task, dessen Status geändert werden soll */
  public activeTask: MissionTask | undefined;

  constructor(
    public dialogRef: MatDialogRef<StateDialogComponent>,
    public firebaseDbService: FirebaseDbService,
    @Inject(MAT_DIALOG_DATA)
    public data: { state: number; activeTask: MissionTask }
  ) {}

  /** Status und aktueller Task lesen, weil für den Taskupdate das ganzes Objekt benötigt wird */
  public ngOnInit(): void {
    this.activeTask = this.data.activeTask;
    this.firebaseDbService
      .getAllStatus()
      .subscribe((states) => (this.states = states));
  }

  /** Wenn der User den neuen Status speichert, beim Task den Status ändern und Dialog schliessen */
  public onYesClick(): void {
    if (!this.activeTask?.id) return;

    const task = this.activeTask;
    delete task.Helper;
    this.firebaseDbService.updateTask(this.activeTask?.id, {
      ...this.activeTask,
      StatusId: this.data.state,
    });

    this.dialogRef.close();
  }
}
