import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { States, StatesModel } from './state-dialog.models';

@Component({
  selector: 'app-state-dialog',
  templateUrl: './state-dialog.component.html',
  styleUrls: ['./state-dialog.component.scss'],
})
export class StateDialogComponent {
  states: StatesModel[] = [
    { id: States.Aborted, text: 'Suche abgebrochen' },
    { id: States.Finished, text: 'Suche erfolgreich beendet' },
  ];

  constructor(
    public dialogRef: MatDialogRef<StateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StatesModel[]
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
