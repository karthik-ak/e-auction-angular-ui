import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  RegisterUser(user: User) {
    return this.http.post(`${environment.apiUrl}Auth/createuser`, user);
  }
}
