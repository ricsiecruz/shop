import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Slick } from 'ngx-slickjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  dataList: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('https://fakestoreapi.com/products').subscribe((res: any) => {
      this.dataList = res;
      console.log("test", this.dataList);
    })
  }
  
  products: Slick.Config = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: false,
    autoplay: false,
    autoplaySpeed: 2000 
  }

}
