import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  details: any;
  user: User;
  editMode=false

  constructor(public accountService: AccountService,
    public authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
        console.log(">>>", this.user)
   }

  ngOnInit(): void {
    this.accountService.getAccountDetails()
    .subscribe(
      data => {
        this.details = data.users;
        console.log("details", this.details)
      },
      error => {
        console.log(error);
      });
  }

  parentForm = new FormGroup({
    // id: new FormControl({value: 'id', disabled: true}),
    firstName: new FormControl({value: 'firstName', disabled: true}),
    lastName: new FormControl({value: 'lastName', disabled: true}),
    age: new FormControl({value: 'age', disabled: true}),
    email: new FormControl({value: 'email', disabled: true}),
    phone: new FormControl({value: 'phone', disabled: true}),
    username: new FormControl({value: 'username', disabled: true}),
    birthdate: new FormControl({value: 'birthdate', disabled: true})
  });

  onSave() {
    console.log(this.parentForm.value);
    this.editMode = false;
    this.accountService.updateUser(this.parentForm.value)
      .subscribe(
        data => {
          console.log(data)
        },
        error => {
          console.log(error);
       });

  }

}
