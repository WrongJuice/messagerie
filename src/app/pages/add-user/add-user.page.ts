import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../model/user';
import {ValidatePassword} from '../../customs/customValidators/validate-password';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  userForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private firebaseService: FirebaseService, public formBuilder: FormBuilder) {}

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
      address: this.userForm.value.address,
      password: this.userForm.value.password,
    };
    this.firebaseService.create_user(user).then(() => {
      this.userForm.reset();
    }).catch(error => {
      console.log(error);
    });
    console.log('user_created');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
