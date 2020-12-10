import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  dataUser = {
    email: '',
    password: ''
  };

  uid: string;
  method: string;
  loginForm: FormGroup;
  showPassword = false;
  connected: boolean;

  constructor(public afAuth: AngularFireAuth, public formBuilder: FormBuilder, public navCtrl: NavController) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecte');
        this.connected = false;
      } else {
        console.log('connecte');
        this.connected = true;
        this.uid = auth.uid;
        const navigationExtras: NavigationExtras = {
          state: {
            uid: this.uid
          }
        };
        this.navCtrl.navigateForward(['home'], navigationExtras);
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: ['', [Validators.required]]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    console.log('submit');
    this.dataUser.email = this.loginForm.value.email;
    this.dataUser.password = this.loginForm.value.password;
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
        .then(() => {
          this.connected = true;
          this.dataUser = {
            email: '',
            password: ''
          };
        }).catch((error) => {
      window.alert(error.message);
    });
  }

  createAccount() {
    this.navCtrl.navigateForward('/sign-up');
  }
}

