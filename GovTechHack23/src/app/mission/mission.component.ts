import { FirebaseDbService } from 'src/db/firebase-db.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  public subMissions: { tab: string }[] = [{tab: "Zone A"}, {tab: "Zone B"}, {tab: "Zone C"}, {tab: "Zone D"}];

  constructor(private firebaseDbService: FirebaseDbService) { }

  ngOnInit(): void {
    this.firebaseDbService.getAllMissionManager().subscribe(l => console.log(l))

    this.firebaseDbService.getAllMissions().subscribe(l => console.log(l))

    this.firebaseDbService.getAllHelper().subscribe(l => console.log(l))

    this.firebaseDbService.getAllTasks().subscribe(l => console.log(l))
  }

}
