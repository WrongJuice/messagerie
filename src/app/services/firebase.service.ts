import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  private collectionName = 'User';
  private user: User;

  constructor(private firestore: AngularFirestore) { }

  create_user(user: User) {
    // this.user = { id: this.lastId++, ...user };
    return this.firestore.collection(this.collectionName).add(user);
  }

  read_user() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_user(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_user(recordID) {
    this.firestore.doc(this.collectionName + '/' + recordID).delete();
  }
}
