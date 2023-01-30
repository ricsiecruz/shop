import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Slick } from 'ngx-slickjs';
import { Product } from 'src/app/products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  dataList: any;
  items: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // https://fakestoreapi.com/products
    this.httpClient.get('https://dummyjson.com/products').subscribe((res: any) => {
      this.dataList = res.products;
      console.log("test", this.dataList);
    })
  }

  addToCart(product: Product) {
    this.cartService.add(product);
  }

  onAdd(item: any) {
    const itemData = {
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
  }
  
  products: Slick.Config = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: false,
    autoplay: false,
    autoplaySpeed: 2000 
  }

  services = [
    {
      "img" : "assets/1_1.png",
      "title" : "Free Shipping"
    },
    {
      "img" : "assets/2_1.png",
      "title" : "Payment Process"
    },
    {
      "img" : "assets/3_1.png",
      "title" : "Return Policy"
    }
  ]

  collections = [
    {
      "img" : "assets/top.avif",
      "title" : "Women Top Collection"
    },
    {
      "img" : "assets/jeans.webp",
      "title" : "Men & Women Jeans"
    },
    {
      "img" : "assets/shirt.webp",
      "title" : "Men's Shirt Collection"
    }
  ]

}
