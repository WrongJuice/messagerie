import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavController} from '@ionic/angular';
import {FirebaseService} from '../../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  dataUser = {
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    address: '',
    username: '',
    uid: ''
  };

  constructor(private router: Router, private firebaseService: FirebaseService, private route: ActivatedRoute,
              public afAuth: AngularFireAuth, public navCtrl: NavController) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dataUser.uid = this.router.getCurrentNavigation().extras.state.uid;
        this.setDatas(firebaseService);
        console.log('Hello ' + this.dataUser.uid);
      } else {
        this.afAuth.authState.subscribe(auth => {
          if (!auth) {
            console.log('not connected');
          } else {
            console.log('connected');
            this.dataUser.uid = auth.uid;
            this.setDatas(firebaseService);
            console.log('Hello ' + this.dataUser.uid);
          }
        });
      }
    });
  }

  ngOnInit() {
  }

  setDatas(firebaseService: FirebaseService){
    firebaseService.getUserById(this.dataUser.uid).subscribe(data => {
      this.dataUser = {
        firstName: data.payload.data()['firstName'],
        lastName: data.payload.data()['lastName'],
        birthdate: data.payload.data()['birthdate'],
        username: data.payload.data()['username'],
        email: data.payload.data()['email'],
        address: data.payload.data()['address'],
        uid: this.dataUser.uid
      };
    });
  }

  logout() {
    this.afAuth.signOut()
        .then(() => {
          console.log('logout');
          this.navCtrl.navigateForward(['sign-in']);
        });
  }

  gotToHome() {
    this.navCtrl.navigateForward(['home']);
  }
}
