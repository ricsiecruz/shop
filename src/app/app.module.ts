import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSlickJsModule } from 'ngx-slickjs';
import { LoaderInterceptor } from './loader.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CartComponent } from './components/cart/cart.component';
import { BsOffcanvasModule } from './offcanvas/offcanvas.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { LoginComponent } from './components/login/login.component';
import { CartService } from './services/cart.service';
import { LoaderService } from './services/loader.service';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AccountService } from './services/account.service';
import { DisableControlDirective } from './disable.directive';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { SidenavComponent } from './components/admin/sidenav/sidenav.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoaderComponent,
    CartComponent,
    CartDetailsComponent,
    LoginComponent,
    MyProfileComponent,
    DisableControlDirective,
    AdminComponent,
    UsersComponent,
    ProductsComponent,
    DashboardComponent,
    SidenavComponent,
    AdminHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BsOffcanvasModule,
    OverlayModule,
    DemoNgZorroAntdModule,
    BrowserAnimationsModule,
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
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
