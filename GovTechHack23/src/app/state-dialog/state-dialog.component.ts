import { Status } from './../../shared/status.model';
import { FirebaseDbService } from 'src/db/firebase-db.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { States, StatesModel } from './state-dialog.models';

@Component({
  selector: 'app-state-dialog',
  templateUrl: './state-dialog.component.html',
  styleUrls: ['./state-dialog.component.scss'],
})
export class StateDialogComponent implements OnInit {
  states: Status[] | undefined

  constructor(
    public dialogRef: MatDialogRef<StateDialogComponent>,
    public firebaseDbService: FirebaseDbService,
    @Inject(MAT_DIALOG_DATA) public data: StatesModel[]
  ) {}

  ngOnInit(): void {
    this.firebaseDbService.getAllStatus().subscribe(s => this.states = s);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
