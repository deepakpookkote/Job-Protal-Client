import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { DashboardService } from './dashboard.service';
import { ThemeService } from '../../helper-modules/themes/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  public isLoggedIn: any;
  userBasicInfo = {};
  profileData = {};
  addProfileInfoTemplate = false;
  editProfileInfoTemplate = false;
  activeThem = 'oceanBlueThemProps';
  forValueObj = {
    fullName: ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    location: ['', Validators.required],
    profileSummary: ['', Validators.required],
    keySkills: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    })
  };
  profileForm = this.fb.group(this.forValueObj);
  editProfileForm = this.fb.group(this.forValueObj);

  public tagList: any = [];
  public tag = '';


  constructor(
    private router: Router,
    private storageService: StorageService,
    private dashboardService: DashboardService,
    private themService: ThemeService,
    private fb: FormBuilder
  ) {
    this.isLoggedIn = (this.storageService.get().currentUser) ? true : '';
  }

  ngOnInit(): void {
    this.getUserBasicInfo();
  }

  getUserBasicInfo() {
    this.dashboardService.getUserInfo(this.storageService.get().currentUser.id).subscribe(userBasicInfo => {
      this.userBasicInfo = userBasicInfo;
      this.dashboardService.getUserProfileInfo(userBasicInfo['_id'], userBasicInfo['profile'][0]).pipe().subscribe(profileData => {
        console.log('profile Data', profileData);
        this.profileData = profileData;
      });
    }, error => {
      console.log('basic info fetch failed', error);
    });
  }

  enableAddProfile() {
    this.addProfileInfoTemplate = true;
  }

  saveProfile() {
    const userData = this.profileForm.value;
    const userInfo: any = {
      email: userData.email,
      aboutme: userData.profileSummary,
      location: userData.location,
      mobile: userData.mobile,
      name: userData.fullName,
      skills: this.tagList,
      user: this.storageService.get().currentUser.id
    };

    this.dashboardService.addUserProfile(userInfo).subscribe(result => {
      console.log('profile information\'s saved', result);
      this.profileForm.disable();
      this.addProfileInfoTemplate = false;
    }, error => {
      console.log('profile update error', error);
    });

  }

  store() {
    if (!this.editProfileInfoTemplate) {
      this.tagList.push(this.tag);
      this.tag = '';
    } else {
      this.profileData['skills'].push(this.tag);
      this.tag = '';
    }


  }

  removeTag(i: number) {
    if (!this.editProfileInfoTemplate) {
      this.tagList.splice(i, 1);
    } else {
      this.profileData['skills'].splice(i, 1);
    }
  }

  enableUpdateProfile() {
    this.editProfileInfoTemplate = true;
    this.profileForm.enable();
    console.log(this.profileData['name']);
    this.editProfileForm.patchValue({
      fullName: this.profileData['name'],
      email: this.profileData['email'],
      mobile: this.profileData['mobile'],
      location: this.profileData['location'],
      profileSummary: this.profileData['aboutme']
    });
  }


  updateProfile() {
    const userData = this.editProfileForm.value;
    console.log(userData);
    const userInfo: any = {
      email: userData.email,
      aboutme: userData.profileSummary,
      location: userData.location,
      mobile: userData.mobile,
      name: userData.fullName,
      skills: this.profileData['skills'],
      userId: this.storageService.get().currentUser.id,
      profileId: this.profileData['_id']
    };

    this.dashboardService.updateUserProfile(userInfo).subscribe(result => {
      console.log('profile updated', result);
      this.editProfileForm.disable();
      this.editProfileInfoTemplate = false;
    }, error => {
      console.log('profile update error', error);
    });
  }


  onSubmit() {
    console.warn(this.profileForm.value);
  }





  toggleThem() {
    if (this.activeThem !== 'deepPurpleThemProps') {
      this.themService.setActiveThem('deepPurpleThemProps');
      this.activeThem = 'deepPurpleThemProps';
    } else {
      this.themService.setActiveThem('oceanBlueThemProps');
      this.activeThem = 'oceanBlueThemProps';
    }
  }


  navigateToLoginPage() {
    this.router.navigate(['/auth/login']);
  }



}
