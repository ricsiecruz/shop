import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  amount: number = 0;

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

}
