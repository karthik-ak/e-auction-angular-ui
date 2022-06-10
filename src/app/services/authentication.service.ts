import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:33226/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
      return this.http.post(AUTH_API + 'validateuser/'+ username + '/' + password, {
        username,
        password
      }, httpOptions);
    }
  
    register(username: string, email: string, password: string): Observable<any> {
      return this.http.post(AUTH_API + 'createuser', {
        username,
        email,
        password
      }, httpOptions);
    }
}
