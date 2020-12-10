import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  message: '';

  constructor(private afDB: AngularFireDatabase) { }

  ngOnInit() { }

  send() {
    console.log('send : ' + this.message);
    this.afDB.list('Messages/').push({
      message: this.message,
      userId: 'testId',
      date: new Date().toISOString()
    });
    this.message = '';
  }
}
