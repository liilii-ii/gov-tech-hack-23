import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Interface für
interface SnackBarMessage {
  text: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class StateNotifierService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  openSnackBar(
    helperName: string,
    helperId: number,
    changedActionText: string
  ) {
    if (!helperId) return;
    const text = `Helfer ${helperName} hat seinen Status geändert auf "${changedActionText}"`;

    let snackBarRef = this.snackBar.open(text, 'Zum Einsatz');

    //TODO mit mirj routing fixen
    snackBarRef
      .onAction()
      .subscribe(() => this.router.navigate(['mission', { taskId: helperId }]));
  }
}
