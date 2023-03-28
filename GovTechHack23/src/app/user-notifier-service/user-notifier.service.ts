import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Service um User per Snackbar zu benachrichtigen
 */
@Injectable({
  providedIn: 'root',
})
export class UserNotifierService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  /**
   * Methode um den Mission Manager zu benachrichtigen, dass ein Helfer den Status geändert hat.
   * Der Mission Manager wird durch eine Snackbar benachrichtigt und kann auf den Button klicken um zum Einsatz des Helfers zu gelangen.
   * @param helperName Name des Helfers
   * @param taskId Id des Einsatzes wo der Helfer zugewiesen ist
   * @param stateChangedText Text des neuen Status
   * @returns
   */
  public notifyMissionOwner(
    helperName: string,
    taskId: number,
    stateChangedText: string
  ): void {
    if (!taskId) return;
    const text = `Helfer:in ${helperName} hat den Status geändert auf "${stateChangedText}"`;

    let snackBarRef = this.snackBar.open(text, 'Zum Einsatz');

    snackBarRef.onAction().subscribe(() =>
      this.router.navigate(['mission'], {
        queryParams: { taskId: taskId },
        queryParamsHandling: 'merge',
      })
    );
  }

  /**
   * Methode um helfende Person zu benachrichtigen, dass sie einem Einsatz zugewiesen wurde.
   * Die helfende Person wird durch eine Snackbar benachrichtigt und kann auf den Button klicken um zum zugewiesenen Einsatz zu gelangen. (currently not in use)
   * @param helperId Id des Helfers
   * @param taskName Name des Einsatzes
   * @param taskId Id des Einsatzes
   */
  public notifyHelper(
    helperId: number,
    taskName: string,
    taskId: number
  ): void {
    if (!helperId) return;
    const text = `Du wurdet dem Gebiet "${taskName}" zugeteilt`;

    let snackBarRef = this.snackBar.open(text, 'Zu deinem Einsatz');

    snackBarRef
      .onAction()
      .subscribe(() =>
        this.router.navigate([
          'mission',
          { taskId: taskId, helperId: helperId },
        ])
      );

    snackBarRef.onAction().subscribe(() =>
      this.router.navigate(['mission'], {
        queryParams: { taskId: taskId, helperId: helperId },
        queryParamsHandling: 'merge',
      })
    );
  }
}
