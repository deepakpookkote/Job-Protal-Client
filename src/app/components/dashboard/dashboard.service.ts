import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  show: boolean = false;
  public deploymentName: any;

  constructor(private http: HttpClient) {
  }

  addUserProfile(userData) {
    return this.http.post(`http://localhost:3030/api/profile/${userData.user}`, userData);
  }

  getUserInfo(userId) {
    return this.http.get(`http://localhost:3030/api/user/${userId}`);
  }

  getUserProfileInfo(userId, profileId) {
    return this.http.get(`http://localhost:3030/api/profile/${userId}/${profileId}`);
  }

  updateUserProfile(userData) {
    return this.http.put(`http://localhost:3030/api/profile/${userData.userId}/${userData.profileId}`, userData);
  }

  getUserProfiles(userId, searchQuery) {
    let paramObj = {};
    if (searchQuery) {
      let params = new HttpParams();
      paramObj = params = params.append('searchQuery', searchQuery);
    }else {
      paramObj = {};
    }


    return this.http.get(`http://localhost:3030/api/user/${userId}/fetchall`, { params: paramObj });
  }

}
