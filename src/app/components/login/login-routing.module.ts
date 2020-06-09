import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SignupComponent} from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', component: LoginComponent,
    children: [
      { path: 'register', component: SignupComponent },
      { path: 'login', component: SigninComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
