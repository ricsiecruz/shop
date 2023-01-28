import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { NgxSlickJsModule } from 'ngx-slickjs';
import { LoaderService } from './loader.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './loader.interceptor';
import { CartService } from './cart.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSlickJsModule.forRoot({
      links: {
        jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
        slickJs: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickThemeCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
      }
    })
  ],
  providers: [
    LoaderService,
    CartService,  
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
