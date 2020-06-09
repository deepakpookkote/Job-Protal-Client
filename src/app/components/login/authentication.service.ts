import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { BehaviorSubject } from 'rxjs';


import { StorageService } from '../../services/storage.service';
import { UserAuth } from './userAuth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // user = new BehaviorSubject<UserAuth>(null);


  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {

  }

  login({ email, password }) {
    return this.http.post<any>(`http://localhost:3030/api/signin`, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          this.handleAuthentication(
            user.token,
            user.user._id,
            user.user.name,
            user.user.email
          );
        }
        return user;
      }));
  }


  private handleAuthentication(userToken, userId, name, email ) {
    const user = new UserAuth(userId, userToken, name, email);
    this.storageService.set({
      'currentUser': user
    });
  }


  logout() {
    this.storageService.removeAll();
  }
}
