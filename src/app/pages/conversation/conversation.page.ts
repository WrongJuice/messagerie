import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseService} from '../../services/firebase.service';
import {Message} from '../../model/message';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatePassword} from '../../customs/customValidators/validate-password';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  messagesToDisplay = [];

  interlocutorUsername: '';

  messageToSend: Message = {
    senderId: '',
    receiverId: '',
    messageText: '',
    date: ''
  };

  messageForm: FormGroup;

  constructor(private firebaseService: FirebaseService, public afAuth: AngularFireAuth, private route: ActivatedRoute,
              public navCtrl: NavController, private router: Router, public formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.messageToSend.receiverId = this.router.getCurrentNavigation().extras.state.interlocutorUid;
        this.interlocutorUsername = this.router.getCurrentNavigation().extras.state.interlocutorUsername;
        this.afAuth.authState.subscribe(auth => {
          if (!auth) {
            console.log('not connected');
          } else {
            console.log('connected');
            this.messageToSend.senderId = auth.uid;
            console.log('Hello ' + this.messageToSend.senderId + ' | You discuss with ' + this.messageToSend.receiverId);
            this.getMessagesToDisplay();
          }
        });
      }
    });

  }

  ngOnInit() {
      this.messageForm = this.formBuilder.group({
          messageText: ['', [Validators.required]]
      });
  }

  send() {
    console.log('send : ' + this.messageToSend);
    this.messageToSend.date = new Date().toISOString();
    this.afAuth.authState.subscribe(
        () => {
          this.firebaseService.send_message(this.messageToSend).then(() => {
            console.log('message sent');
          });
          this.messageToSend.messageText = '';
        }
    );
  }

  getMessagesToDisplay(){
    this.firebaseService.get_messages(this.messageToSend.senderId, this.messageToSend.receiverId)
        .subscribe(data => {
          this.messagesToDisplay = data.map(e => {
            return {
              messageText: e.payload.doc.data()['messageText'],
              date: e.payload.doc.data()['date'],
              senderId: e.payload.doc.data()['senderId'],
              receiverId: e.payload.doc.data()['receiverId'],
              isSender: true
            };
          });
          this.firebaseService.get_messages(this.messageToSend.receiverId, this.messageToSend.senderId)
              .subscribe(dataSecond => {
                dataSecond.forEach(
                    value => {
                      this.messagesToDisplay.push({
                        messageText: value.payload.doc.data()['messageText'],
                        date: value.payload.doc.data()['date'],
                        senderId: value.payload.doc.data()['senderId'],
                        receiverId: value.payload.doc.data()['receiverId'],
                        isSender: false
                      });
                    }
                );
              });
        });
  }

}
