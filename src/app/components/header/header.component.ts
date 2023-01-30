import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BsOffcanvasPosition } from 'src/app/offcanvas/types/offcanvas-position';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  position$ = new BehaviorSubject<BsOffcanvasPosition>('start');
  amount: number = 0;
  offcanvasState = false;

  constructor(
    private cartService:CartService,
    public authenticationService: AuthenticationService
  ) { }

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

}
