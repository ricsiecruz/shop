import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any;
  item: any;
  items: any[] = [];
  amount:number = 0;
  totalAmount:number = 0;

  constructor(
    public cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartItems = this.cartService.getItems();
    console.log("uuuu", this.cartService.loadCart())
    console.log("Sss", this.cartItems = this.cartService.getItems())

    // this.cartService.getProducts().subscribe(data => {
    //   this.cartItems = data;

    //   this.totalAmount = this.cartService.getTotalPrice();
    // });

    // this.cartItems.loadCart().subscribe((data: any) => {
    //   this.cartItems = data;
    //   this.totalAmount = this.cartService.getTotalPrice();
    //   console.log("total", this.totalAmount)
    // })

    // this.totalAmount += this.item.price;
    // console.log("total", this.totalAmount)

    this.totalAmount = this.cartService.getTotalPrice();
      console.log("total", this.totalAmount)
  }
  
  buyNow(item:any){
    console.log('buy now')
    // console.log(this.size)
    // if(this.size === undefined){
    //   alert("pick size")
    //   return;
    // }

    const itemData = {
      id:item.id,
      thumbnail:item.thumbnail,
      // size:this.size,
      title:item.title,
      price:item.price,
      brand:item.brand,
      qtyTotal:1
    }
    if (!this.cartService.itemInCart(itemData)) {
      this.cartService.add(itemData); //add items in cart
      this.items = [...this.cartService.getItems()];
    }
    else{
      if (!this.cartService.itemInCartSize(itemData)) {
        this.cartService.add(itemData); //add items in cart
        this.items = [...this.cartService.getItems()];
      }   
    }
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to proceed to checkout',
        confirmButtonText: 'OK',
        showCancelButton: true 
      }).then((willDelete) => {
        if(willDelete.value) {
          this.router.navigate(['/checkout/buy-now'])
        } else {
          return;
        }
    });
  }

  changeSubtotal(item:any, index:any) {
    this.cartService.saveCart();
  }

  get total() {
    return this.cartItems.reduce(
      (sum: { price: number; }, x: { price: number; }) => ({
        price: sum.price * x.price
      }),
      {  price: 0 }
    ).price;
  }

  //----- clear cart item
  clearCart(items:any) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart(items);
    this.cartItems = [...this.cartService.getItems()];
    window.location.reload();
  }

  removeProduct(items: any) :void{
    console.log(this.cartService)
    this.cartService.cartItems.splice(this.cartService.cartItems.findIndex(element=>items.id === element.id),1);
    this.amount= this.cartService.amount;
  }

  test() {
  // test(items: any) {
    // this.cartService.clearCart(items);
    // this.cartItems = [...this.cartService.getItems()];
    // this.amount= this.cartService.amount;
    this.cartService.emptyCart();
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
  removeItemFromCart(productId: any) {
    /* this.cartItems.map((item, index) => {
      if (item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    this.mySharedService.setProducts(this.cartItems); */

    this.cartService.removeProductFromCart(productId);

  }
  removeFromCart(item: any) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

}
