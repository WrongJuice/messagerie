import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateAccountPage} from '../create-account/create-account.page';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  dataUser = {
    email: '',
    password: ''
  };
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
        .then(r => this.connected = true);
    this.dataUser = {
      email: '',
      password: ''
    };
  }

  logout() {
    this.afAuth.signOut().then(r => console.log(this.connected = false));
  }

  createAccount() {
    this.navCtrl.navigateForward('/create-account');
  }
}
