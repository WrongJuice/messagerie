import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  userForm: FormGroup;

  constructor(private firebaseService: FirebaseService, public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      mail: ['', [Validators.required], Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    });
  }

  submit() {
    console.log(this.userForm.value);
    const user: User = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.userName,
      userName: this.userForm.value.firstName,
      birthDate: this.userForm.value.birthDate,
      mail: this.userForm.value.mail,
      address: this.userForm.value.address,
      password: this.userForm.value.password,
    };
    this.firebaseService.create_user(user).then(() => {
      this.userForm.reset();
    }).catch(error => {
      console.log(error);
    });
    console.log('done');
  }

}
