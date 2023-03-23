import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  public subMissions: { tab: string }[] = [{tab: "Zone A"}, {tab: "Zone B"}, {tab: "Zone C"}, {tab: "Zone D"}];

  constructor() { }

  ngOnInit(): void {
  }

}
