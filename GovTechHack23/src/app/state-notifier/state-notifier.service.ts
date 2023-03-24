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

  notifyMissionOwner(
    helperName: string,
    taskId: number,
    changedActionText: string
  ) {
    if (!taskId) return;
    const text = `Helfer:in ${helperName} hat den Status geändert auf "${changedActionText}"`;

    let snackBarRef = this.snackBar.open(text, 'Zum Einsatz');

    snackBarRef.onAction().subscribe(() =>
      this.router.navigate(['mission'], {
        queryParams: { taskId: taskId },
        queryParamsHandling: 'merge',
      })
    );
  }

  notifyHelper(helperId: number, taskName: string, taskId: number) {
    if (!helperId) return;
    const text = `Du wurdet dem Gebiet "${taskName}" zugeteilt`;

    let snackBarRef = this.snackBar.open(text, 'Zu deinem Einsatz');

    snackBarRef
      .onAction()
      .subscribe(() => this.router.navigate(['mission', { taskId: helperId }]));

    snackBarRef.onAction().subscribe(() =>
      this.router.navigate(['mission'], {
        queryParams: { taskId: taskId },
        queryParamsHandling: 'merge',
      })
    );
  }
}
