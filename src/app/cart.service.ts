import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { LocalService } from './localStorage';
import { CartProduct, Product } from './products';


@Injectable()
export class CartService {
  
  items: any[] = [];
  newTotal = new Subject();
  cartItems:CartProduct[] =[];

  // public cartData: any  = []; 
  public allItems: any  = {};   
  public cartItemsList: any  = {};  
  public cartTotal: any  = 0;  

  constructor(private localStore: LocalService) { 

    // this.loadCart();
  }
  get amount():number{
    return this.cartItems.reduce((c,t1) => t1.qty+c,0);
    
  };

  add(addedItem:any) {
    this.items.push(addedItem);
    // console.log(addedItem);

    //-----check if there are items already added in cart
    /* let existingItems = [];
    if ( localStorage.getItem('cart_items')){//----- update by adding new items
      existingItems = JSON.parse(localStorage.getItem('cart_items'));
      existingItems = [addedItem, ...existingItems];
      console.log( 'Items exists');
    } */
    //-----if no items, add new items
    /* else{ 
      console.log( 'NO items exists');
      existingItems = [addedItem]
    } */

    this.saveCart();
    console.log("Added item", addedItem)
  }

  saveCart(): void {
    // console.log(this.items,this.items.length)
    this.newTotal.next({total: this.items.length});
    localStorage.setItem('cart_items', JSON.stringify(this.items)); 
  }
  
  itemInCart(item:any): boolean {
    return this.items.findIndex(o => o.productName === item.productName) > -1;
  }

  getItems() {
    return this.items;
  } 

  itemInCartSize(item:any): boolean {
    return this.items.findIndex(o => o.size === item.size) > -1;
  }

  loadCart(): void {
    const myCart = this.localStore.getData("cart_items");
    if(myCart != null || myCart != undefined){
      this.items = JSON.parse(myCart)  ?? [];
    }
  }

  clearCart(items:any) {
    this.items = [];
    localStorage.removeItem("cart_items")
  }

  removeItem(item:any) {
    const index = this.items.findIndex(o => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }
  
  emptyCart(){   
   this.items = [];  
   this.listCartItems(); 
 }

 listCartItems(){
   let tempCart: { pid: any; name: any; qty: any; price: number; }[] = [];
   let getActualItems = Object.keys(this.items);
   let cartDataItems = this.items;
   let tempTotal = 0;

   var onlyChoosenItems = (this.allItems).filter(function(item: any) {
     if(getActualItems.indexOf(item.p_id) !== -1 ){
       tempCart.push({
         pid:  item.p_id,
         name:  item.product_name,
         qty:  cartDataItems[item.p_id],
         price:  item.product_price*cartDataItems[item.p_id],
       });  
       tempTotal += item.product_price*cartDataItems[item.p_id];
     }
   });

   
   this.cartItemsList = tempCart;
   this.cartTotal = tempTotal;
   
 }

}