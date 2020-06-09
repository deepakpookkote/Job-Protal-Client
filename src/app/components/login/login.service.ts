import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  register(user: User) {
    delete user.id;
    return this.http.post(`http://localhost:3030/api/signup`, user);
  }

}
