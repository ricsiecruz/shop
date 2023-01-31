import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  time = new Date();
  dateObj: Date = new Date()

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
