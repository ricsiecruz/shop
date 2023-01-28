import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { BsOffcanvasPosition } from 'src/app/offcanvas/types/offcanvas-position';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  position$ = new BehaviorSubject<BsOffcanvasPosition>('start');
  amount: number = 0;
  offcanvasState = false;

  constructor(private cartService:CartService) { }

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
