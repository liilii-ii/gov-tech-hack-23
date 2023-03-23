import { FirebaseDbService } from 'src/db/firebase-db.service';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { StateDialogComponent } from '../state-dialog/state-dialog.component';
import { States, StatesModel } from '../state-dialog/state-dialog.models';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';

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
  public activeMissionId$: Observable<number> | undefined;

  /**
   * Returns active tab index
   */
  public get getIndexOfActiveTab$(): Observable<number> {
    if (!this.activeMissionId$) return of(0);
    return this.activeMissionId$.pipe(
      map((id) => {
        const tab = this.subMissions.find((t) => t.id === id);
        return tab ? this.subMissions.indexOf(tab) : 0;
      })
    );
  }

  constructor(
    private firebaseDbService: FirebaseDbService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.firebaseDbService.getAllMissionManager().subscribe(l => console.log(l))

    this.firebaseDbService.getAllMissions().subscribe(l => console.log(l))

    this.firebaseDbService.getAllHelper().subscribe(l => console.log(l))

    this.firebaseDbService.getAllTasks().subscribe((l) => console.log(l))

    this.activeMissionId$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id')))
    );
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
}
