import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { MissionTask } from 'src/shared/missionTask.model';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {

  private ref: any

  constructor(private db: AngularFireDatabase) {
    this.ref = db.list('Tasks');
   }

  getAll(): Observable<any> {

    return this.ref.snapshotChanges().pipe(
      map((changes:any) => {
        console.log(changes)
        return changes.map((change:any) => ({
          ...change.payload.doc.data(),
          id: change.payload.doc.id,
        }))}
      )
    );
  }
}
