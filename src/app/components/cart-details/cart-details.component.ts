import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: any;
  totalAmount:number = 0;
  items: any[] = [];
  
  constructor(
    public cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartItems = this.cartService.getItems();

    this.totalAmount = this.cartService.getTotalPrice();
      console.log("total", this.totalAmount)
  }

  removeFromCart(item: any) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  checkout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to proceed to checkoout',
      confirmButtonText: 'OK',
      showCancelButton: true 
    }).then((willDelete) => {
      if(willDelete.value) {
        this.router.navigate(['/checkout'])
      } else {
        return;
      }
    });
  }

  //----- clear cart item
  clearCart(items:any) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart(items);
    this.cartItems = [...this.cartService.getItems()];
    window.location.reload();
  }

}
