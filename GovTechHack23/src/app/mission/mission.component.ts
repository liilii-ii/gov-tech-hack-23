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
    this.firebaseDbService.getAll().subscribe(l => console.log(l))
  }

}
