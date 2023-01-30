import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop';
  
  // subscription!: Subscription;
  // constructor( private loaderService : LoaderService){

  // }
  // isLoading = true;
 
  // ngOnInit(){
   
  //  this.subscription = this.loaderService.getCounterValue().subscribe(value => { 
      
  //    console.log(value , 'subscrid')
  //    this.isLoading = value ? true : false;
  //    })
  // }
  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
}
