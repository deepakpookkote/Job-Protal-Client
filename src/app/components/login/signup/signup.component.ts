import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, pipe } from 'rxjs';

/**Importing custom componets */
import {LoginService} from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login.component.scss']
})
export class SignupComponent implements OnInit {

  public userRegisterForm: FormGroup;
  public isSubmitted = false;
  public forbiddenUsernames = ['test', 'demo'];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group({
      userData: this.formBuilder.group({
        userFullName: [null, [Validators.required, Validators.minLength(5), this.forbiddenNames.bind(this)]],
        userEmail: ['', [Validators.required, Validators.email], this.forbiddenEmails],
        userPassword: ['', [Validators.required, Validators.minLength(5)]],
        userPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
      })
    });
  }

  initiateUserRegistration() {
    const userData = this.userRegisterForm.value;
    const userInfo: any = {
      email: userData.userData.userEmail,
      password: userData.userData.userPassword,
      name: userData.userData.userFullName,
      mobile: userData.userData.userPhone
    };

    this.loginService.register(userInfo)
      .pipe()
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['auth/login']);
      },
      error => {
        console.log(error);
      });
  }


  // convenience getter for easy access to form fields
  get userRegistrationFromControl() { return this.userRegisterForm.controls; }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
