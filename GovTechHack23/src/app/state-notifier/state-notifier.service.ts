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
  private message: SnackBarMessage | undefined = {
    text: 'Helfer Marielle hat die suche gestartet',
    userId: 2,
  };

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  openSnackBar() {
    if (!this.message) return;

    let snackBarRef = this.snackBar.open(this.message.text, 'Zum Einsatz');

    snackBarRef
      .onAction()
      .subscribe(() =>
        this.router.navigate(['mission', { id: this.message?.userId }])
      );
  }
}
