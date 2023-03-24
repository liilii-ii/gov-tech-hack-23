import { Helper } from 'src/shared/helper.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FirebaseDbService } from 'src/db/firebase-db.service';

@Component({
  selector: 'app-add-helper-dialog',
  templateUrl: './add-helper-dialog.component.html',
  styleUrls: ['./add-helper-dialog.component.scss']
})
export class AddHelperDialogComponent implements OnInit {

  /**
   * Helfers
   */
  public helpers$: Observable<Helper[]> | undefined;

  /**
   * Selektierter Helfer
   */
  public selectedHelperId: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddHelperDialogComponent>,
    public firebaseDbService: FirebaseDbService,
  ) { }

  ngOnInit(): void {
    this.helpers$ = this.firebaseDbService.getAllHelper();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
