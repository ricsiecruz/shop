import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  
  login(username: string, password: string) {
    return this.http.post<any>('https://dummyjson.com/auth/login', { username, password })
         .pipe(map(rtn => {
            //  if (rtn && rtn.access_token) {
            if (rtn) {
                 // store user details and jwt token in local storage to keep user logged in between page refreshes
                 rtn.authdata = window.btoa(username + ":" + password);
                 localStorage.setItem('user', JSON.stringify(rtn));
                 localStorage.setItem('user', 'true');
                //  this.isLoggedIn$.next(true);
                //  this.setCookie(rtn.access_token);
                console.log("user", username, password)
                return rtn;
             }
             else {
                //  this.isLoginFailed = true;
                 {window.location.reload();}
             }
             return rtn;
         }));
 }
}
