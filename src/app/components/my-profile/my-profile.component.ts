import { Component, OnInit } from '@angular/core';
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

  constructor(public accountService: AccountService,
    public authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
        console.log(this.user)
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

}
