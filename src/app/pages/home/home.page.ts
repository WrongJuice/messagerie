import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private users = [];
  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {

    this.firebaseService.read_user().subscribe(data => {

      this.users = data.map(e => {
        return {
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          birthDate: e.payload.doc.data()['birthDate'],
          mail: e.payload.doc.data()['mail'],
          password: e.payload.doc.data()['password'],
          address: e.payload.doc.data()['address'],
        };
      });
      console.log(this.users);

    });
  }

}
