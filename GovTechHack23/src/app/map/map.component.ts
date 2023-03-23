import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateNotifierService } from '../state-notifier/state-notifier.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(private router: Router, private notifier: StateNotifierService) {}

  ngOnInit(): void {
    //this.notifier.openSnackBar();
  }

  public navigateToMissions(): void {
    this.router.navigate(['mission']);
  }
}
