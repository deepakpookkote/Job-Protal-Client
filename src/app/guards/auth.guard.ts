import { Injectable } from '@angular/core';
import { CanActivate,
        ActivatedRouteSnapshot,
        RouterStateSnapshot,
        Router,
        UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthenticationService } from '../components/login/authentication.service';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private storageService: StorageService,
        private router: Router
        ) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.storageService.get() && this.storageService.get().currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
