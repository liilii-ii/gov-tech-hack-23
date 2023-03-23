import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Interface für
interface SnackBarMessage {
  text: string;
  userId: number;
}

@Component({
  selector: 'app-state-snack-bar',
  templateUrl: './state-snack-bar.component.html',
  styleUrls: ['./state-snack-bar.component.scss'],
})
export class StateSnackBarComponent implements OnInit {
  public message: SnackBarMessage | undefined = {
    text: 'Helfer Marielle hat die suche gestartet',
    userId: 2,
  };

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  openSnackBar(message: SnackBarMessage | undefined) {
    if (!message) return;

    let snackBarRef = this.snackBar.open(
      message.text,
      message.userId.toString()
    );
    snackBarRef
      .onAction()
      .subscribe(() =>
        this.router.navigate(['mission', { id: message.userId }])
      );
  }

  ngOnInit(): void {}
}
