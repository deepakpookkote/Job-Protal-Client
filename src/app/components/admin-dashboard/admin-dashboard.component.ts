import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  adminInfo: any;
  profileData: any = [];
  filterQuery: any;
  constructor(
    private dashboardService: DashboardService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getAdminInfo();
  }

  getAdminInfo() {
    this.dashboardService.getUserInfo(this.storageService.get().currentUser.id).subscribe(adminInfo => {
      this.adminInfo = adminInfo;
      this.getJobProfiles();
    }, error => {
      console.log('basic info fetch failed', error);
    });
  }

  getJobProfiles() {
    this.dashboardService.getUserProfiles(this.adminInfo['_id'], this.filterQuery).pipe().subscribe(profileData => {
      console.log(profileData);
      this.profileData =  profileData['profile'];
    }, error => {
      console.log(error);
    });
  }

  // filterProfileInfo(){

  // }

}
