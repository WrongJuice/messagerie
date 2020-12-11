import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseService} from '../../services/firebase.service';
import {Message} from '../../model/message';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  interlocutorUsername: '';

  message: Message = {
    senderId: '',
    receiverId: '',
    messageText: '',
    date: ''
  };

  constructor(private firebaseService: FirebaseService, public afAuth: AngularFireAuth, private route: ActivatedRoute,
              public navCtrl: NavController, private router: Router) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.message.receiverId = this.router.getCurrentNavigation().extras.state.interlocutorUid;
        this.interlocutorUsername = this.router.getCurrentNavigation().extras.state.interlocutorUsername;
        this.afAuth.authState.subscribe(auth => {
          if (!auth) {
            console.log('not connected');
          } else {
            console.log('connected');
            this.message.senderId = auth.uid;
            console.log('Hello ' + this.message.senderId + ' | You discuss with ' + this.message.receiverId);
          }
        });
      }
    });
  }

  ngOnInit() { }

  send() {
    console.log('send : ' + this.message);
    this.message.date = new Date().toISOString();
    this.afAuth.authState.subscribe(
        () => {
          this.firebaseService.send_message(this.message).then(() => {
            this.message.messageText = '';
          });
        }
    );
  }

}
