import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';

import { MissionTask } from 'src/shared/missionTask.model';
import { Helper } from 'src/shared/helper.model';
import { Mission } from 'src/shared/mission.model';
import { MissionManager } from 'src/shared/missionManager.model';
import { Status } from 'src/shared/status.model';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {

  private tasks: AngularFirestoreCollection<MissionTask>;
  private helper: AngularFirestoreCollection<Helper>;
  private missions: AngularFirestoreCollection<Mission>;
  private missionManager: AngularFirestoreCollection<MissionManager>;
  private status: AngularFirestoreCollection<Status>;

  constructor(private afs: AngularFirestore) {
    this.tasks = afs.collection('Tasks');
    this.helper = afs.collection('Helper');
    this.missions = afs.collection('Missions');
    this.missionManager = afs.collection('MissionManager');
    this.status = afs.collection('Status');
   }

   getAllStatus(): Observable<Status[]> {

    return this.status.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({
          ...change.payload.doc.data(),
          id: change.payload.doc.id,
        }))
      )
    );
  }


  getAllTasks(): Observable<MissionTask[]> {

    return this.tasks.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({
          ...change.payload.doc.data(),
          id: change.payload.doc.id,
        }))
      )
    );
  }

  getAllHelper(): Observable<Helper[]> {

    return this.helper.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({
          ...change.payload.doc.data(),
          id: change.payload.doc.id,
        }))
      )
    );
  }

  getAllMissions(): Observable<Mission[]> {

    return this.missions.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({
          ...change.payload.doc.data(),
          id: change.payload.doc.id,
        }))
      )
    );
  }

  getAllMissionManager(): Observable<MissionManager[]> {

    return this.missionManager.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({
          ...change.payload.doc.data(),
          id: change.payload.doc.id,
        }))
      )
    );
  }

  updateMission(
    id: string,
    payload: Mission
  ) {
    return this.missions.doc(id).update(payload);
  }

  updateTask(
    id: string,
    payload: Task
  ) {
    return this.tasks.doc(id).update(payload);
  }
}
