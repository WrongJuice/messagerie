import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../model/user';
import {Message} from '../model/message';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  private collectionUsers = 'Users';
  private collectionMessages = 'Messages';

  constructor(private firestore: AngularFirestore) { }

  create_user(user: User, uid: string) {
    this.firestore.collection(this.collectionUsers).doc(uid).set(user);
  }

  read_user() {
    return this.firestore.collection(this.collectionUsers).snapshotChanges();
  }

  getUserById(id: string) {
    return this.firestore.collection(this.collectionUsers).doc(id).snapshotChanges();
  }

  update_user(recordID, record) {
    this.firestore.doc(this.collectionUsers + '/' + recordID).update(record);
  }

  delete_user(recordID) {
    this.firestore.doc(this.collectionUsers + '/' + recordID).delete();
  }

  send_message(message: Message){
    this.firestore.collection(this.collectionMessages).add(message);
  }

}
