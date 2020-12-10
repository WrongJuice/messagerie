import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  private collectionName = 'User';

  constructor(private firestore: AngularFirestore) { }

  create_user(user: User, uid: string) {
    return this.firestore.collection(this.collectionName).doc(uid).set(user);
  }

  read_user() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  getUserById(id: string) {
    return this.firestore.collection(this.collectionName).doc(id).snapshotChanges();
  }

  update_user(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_user(recordID) {
    this.firestore.doc(this.collectionName + '/' + recordID).delete();
  }

}
