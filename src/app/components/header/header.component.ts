import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BsOffcanvasPosition } from 'src/app/offcanvas/types/offcanvas-position';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  position$ = new BehaviorSubject<BsOffcanvasPosition>('start');
  amount: number = 0;
  offcanvasState = false;
  user?: User;

  constructor(
    private cartService:CartService,
    public authenticationService: AuthenticationService
  ) { 
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {

    this.cartService.newTotal.subscribe(
      (data:any) => {
        this.amount = data.total;
      }
    );
    this.cartService.loadCart();
    this.amount = this.cartService.getItems().length;
  }

  showOffcanvas(position: BsOffcanvasPosition) {
    this.position$.next(position);
    setTimeout(() => (this.offcanvasState = true), 50);
  }

  logout() {
      this.authenticationService.logout();
  }

}
