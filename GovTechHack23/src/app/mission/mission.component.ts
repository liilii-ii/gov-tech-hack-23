import { FirebaseDbService } from 'src/db/firebase-db.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  /**
   * Aktives Missions Tab
   */
  public activeMissionId$: Observable<number> | undefined;

   /**
   * Returns active tab index
   */
  public get getIndexOfActiveTab$(): Observable<number> {
      if(!this.activeMissionId$) return of(0)
      return this.activeMissionId$.pipe(map(id =>{
        const tab = this.subMissions.find(t => t.id === id);
        return tab ? this.subMissions.indexOf(tab) : 0
      }))
 }

  public subMissions: { tab: string, id: number }[] = [{tab: "Zone A", id: 1}, {tab: "Zone B", id: 2}, {tab: "Zone C", id: 3}, {tab: "Zone D", id: 4}];

  constructor(private firebaseDbService: FirebaseDbService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.firebaseDbService.getAll().subscribe(l => console.log(l));
    this.activeMissionId$ = this.route.paramMap.pipe(map(params => Number(params.get('id'))))
  }

 

}
