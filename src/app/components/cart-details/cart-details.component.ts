import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { User, UserInfo } from 'src/app/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: any;
  details: any;
  isCheckOut: Boolean = false;
  totalAmount:number = 0;
  item: any;
  items: any[] = [];
  user: User;
  users: User[] = [];
  usersTyped: UserInfo[] = [];
  
  constructor(
    public cartService: CartService,
    public accountService: AccountService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public http: HttpClient,
    private cookieService: CookieService
  ) { 
    this.user = this.authenticationService.userValue;
        console.log("cart details", this.user)
    }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartItems = this.cartService.getItems();
    this.getAccountDetails();

    this.totalAmount = this.cartService.getTotalPrice();
      // console.log("total", this.totalAmount)
  }

  getAccountDetails(): void {
    console.log("aaa")
    this.accountService.getAccountDetails()
      .subscribe(
        res => {
          // if(res.errorCode === 0){
          //   this.details = res.carts;
          //   console.log(this.details,"here")
          //   this.isCheckOut = true;
          // }
          // else{
          //   this.isCheckOut = false;
          // }     
          this.details = res.users;
          console.log(this.details,"here")    
        },
        error => {
          Swal.fire({
            title: 'Cannot Get Account Details!',
            confirmButtonText: 'OK'              
        });
    });
  }

  test() {
    this.user = this.cartItems;
    this.cartService
      .saveUserTyped(this.user)
      .subscribe((response: UserInfo) => {
        console.log(response);

        this.users.push({ 
          id: response.id, 
          access_token: response.access_token,
          userId: response.userId,
        });
        this.usersTyped.push({
          userId: response.userId,
          access_token: response.access_token,
          id: response.id
        });
      });
  }
  
  buyNow(item:any){
    console.log('buy now')
    const itemData = {
      userId:item.userId,
      id:item.id,
      thumbnail:item.thumbnail,
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

  removeFromCart(item: any) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  checkout() {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You are about to proceed to checkoout',
    //   confirmButtonText: 'OK',
    //   showCancelButton: true 
    // }).then((willDelete) => {
    //   if(willDelete.value) {
    //     this.router.navigate(['/checkout'])
    //   } else {
    //     return;
    //   }
    // });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: this.cookieService.get('access_token')
      })
    };
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to place an order',
      confirmButtonText: 'OK',
      showCancelButton: true 
    }).then((willDelete) => {
      if(willDelete) {
        this.user = this.authenticationService.userValue;
            console.log("zzz", this.user)
        this.http.post<any>('https://dummyjson.com/carts/add', this.cartItems,httpOptions).subscribe(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log("x", err)    
          }
        );
        this.swal()
      } else {
        (window as Window).location = '/checkout'
      }
    });
  }

  swal() {
    Swal.fire({
      title: 'Success!',
      text: 'Order placed',
      confirmButtonText: 'OK'
    }).then(function() {
      (window as Window).location = '/cart'
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
