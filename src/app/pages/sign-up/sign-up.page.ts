import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../model/user';
import {ValidatePassword} from '../../customs/customValidators/validate-password';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  userForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private firebaseService: FirebaseService, public formBuilder: FormBuilder, public afAuth: AngularFireAuth,
              public navCtrl: NavController) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(?=[a-zA-Z0-9._]{5,15}$)(?!.*[_.]{2})[^_.].*[^_.]$')])),
      address: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: ValidatePassword.MatchPassword // custom validation
    });
  }

  submit() {
    console.log(this.userForm.value);

    const user: User = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      username: this.userForm.value.username,
      birthdate: this.userForm.value.birthdate,
      email: this.userForm.value.email,
      address: this.userForm.value.address
    };

    this.afAuth.createUserWithEmailAndPassword(user.email, this.userForm.value.password)
        .then(() => {
          this.afAuth.authState.subscribe(
              auth => {
                this.firebaseService.create_user({ id: auth.uid, ...user }, auth.uid).then(() => {
                  this.userForm.reset();
                  window.alert('You have been successfully registered !');
                  const navigationExtras: NavigationExtras = {
                    state: {
                      uid: auth.uid
                    }
                  };
                  this.navCtrl.navigateForward(['home'], navigationExtras);
                }).catch(error => {
                  console.log(error);
                });
              }
          );
        }).catch((error) => {
      window.alert(error.message);
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToSignIn() {
    this.navCtrl.navigateForward(['sign-in']);
  }
}
