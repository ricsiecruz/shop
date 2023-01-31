import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAccountDetails(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: this.cookieService.get('access_token')
      })
    };
    return this.http.get('https://dummyjson.com/users',httpOptions)
  }

  updateUser(user:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: this.cookieService.get('access_token')
      })
    };

    return this.http.post('https://dummyjson.com/users',user,httpOptions)
  }
}
