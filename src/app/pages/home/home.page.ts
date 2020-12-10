import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private users = [];

  dataUser = {
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

    this.firebaseService.read_user().subscribe(data => {

      this.users = data.map(e => {
        return {
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          username: e.payload.doc.data()['username'],
          birthdate: e.payload.doc.data()['birthdate'],
          email: e.payload.doc.data()['email'],
          password: e.payload.doc.data()['password'],
          address: e.payload.doc.data()['address'],
        };
      });
      console.log(this.users);

    });
  }

  logout() {
    this.afAuth.signOut()
        .then(() => {
          console.log('logout');
          this.navCtrl.navigateForward(['sign-in']);
        });
  }

  goToUserProfil() {
    this.navCtrl.navigateForward(['user-profile']);
  }

  setDatas(firebaseService: FirebaseService){
    firebaseService.getUserById(this.dataUser.uid).subscribe(data => {
      this.dataUser = {
        username: data.payload.data()['username'],
        uid: this.dataUser.uid
      };
    });
  }
}
