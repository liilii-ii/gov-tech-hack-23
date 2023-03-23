import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { StateDialogComponent } from '../state-dialog/state-dialog.component';
import { States, StatesModel } from '../state-dialog/state-dialog.models';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss'],
})
export class MissionComponent implements OnInit {
  subMissions: { tab: string }[] = [
    { tab: 'Zone A' },
    { tab: 'Zone B' },
    { tab: 'Zone C' },
    { tab: 'Zone D' },
  ];

  state: StatesModel = { id: States.Started, text: 'Suche gestartet' };

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(StateDialogComponent, {
      data: { state: this.state },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.state = result;
    });
  }
}
