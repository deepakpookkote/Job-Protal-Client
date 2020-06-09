import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';

import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../login.component.scss']
})
export class SigninComponent implements OnInit {

  @ViewChild('spanCurrentYear') viewDiv: ElementRef;

  public userLoginForm: FormGroup;
  returnUrl: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.activeRoute.snapshot.queryParams[''] || '/';
  }

  ngAfterViewInit(): void {
    this.viewDiv.nativeElement.innerHTML = `<span>&copy;2020</span>`;
  }

 // convenience getter for easy access to form fields
  get userLoginFromControl() { return this.userLoginForm.controls; }

  authenticateUser() {
    this.authenticationService.login(this.userLoginForm.value)
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
        if(data.user.role === 0) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      error => {
        console.log(error);
      });
  }



  navigateToDashboard() {
    this.router.navigate(['']);
  }

}
