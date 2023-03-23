import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { MissionTask } from 'src/shared/missionTask.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {

  private ref: AngularFireList<MissionTask>

  constructor(private db: AngularFireDatabase) {
    this.ref = db.list('Tasks');
   }

  getAll(): Observable<MissionTask> {

    return this.ref.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({
          ...change.payload.doc.data(),
          id: change.payload.doc.id,
        }))
      )
    );
  }
}
