import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  details: any;

  constructor(public accountService: AccountService) { }

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
