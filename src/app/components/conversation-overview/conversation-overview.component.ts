import {Component, Input, OnInit} from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-conversation-overview',
  templateUrl: './conversation-overview.component.html',
  styleUrls: ['./conversation-overview.component.scss'],
})
export class ConversationOverviewComponent implements OnInit {

  @Input() username: '';
  @Input() uid: '';

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  goToUserProfile() {
    const navigationExtras: NavigationExtras = {
      state: {
        uid: this.uid
      }
    };
    this.navCtrl.navigateForward(['user-profile'], navigationExtras);
  }
}
