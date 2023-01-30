import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isLoggedIn$: BehaviorSubject<boolean>;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn); 

    
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
      console.log("account", this.userSubject.value)
      return this.userSubject.value;
  }
  
  login2() {
    // logic
    localStorage.setItem('loggedIn', 'true');
    this.isLoggedIn$.next(true);
  }

//   login(username: string, password: string) {
//     return this.http.post<any>('https://dummyjson.com/auth/login', { username, password })
//          .pipe(map(rtn => {
//             //  if (rtn && rtn.access_token) {
//             if (rtn) {
//                  // store user details and jwt token in local storage to keep user logged in between page refreshes
//                  rtn.authdata = window.btoa(username + ":" + password);
//                  localStorage.setItem('loggedIn', JSON.stringify(rtn));
//                  localStorage.setItem('loggedIn', 'true');
//                  this.isLoggedIn$.next(true);
//                 //  this.setCookie(rtn.access_token);
//                 console.log("user", username, password)
//                 return rtn;
//              }
//              else {
//                 //  this.isLoginFailed = true;
//                  {window.location.reload();}
//              }
//              return rtn;
//          }));
//  }
login(username: any, password: any) {
  return this.http.post<User>('https://dummyjson.com/auth/login', { username, password })
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
      }));
}
//  logout() {
//    // logic
//    localStorage.setItem('loggedIn', 'false');
//    this.isLoggedIn$.next(false);
//    this.router.navigate(['/login']);
//  }
logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('user');
  this.userSubject.next(null!);
  this.router.navigate(['/login']);
}
}
