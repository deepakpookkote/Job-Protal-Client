import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {StorageService} from '../services/storage.service'

@Injectable({
    providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor {
    constructor(
        private storageService: StorageService
    ) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const currentUser = this.storageService.get().currentUser;
        if ( currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }
}


