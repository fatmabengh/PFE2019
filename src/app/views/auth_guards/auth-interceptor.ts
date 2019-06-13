import { HttpInterceptor, HttpRequest, HttpHandler,  HttpEvent, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): import("rxjs").Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('userToken');
        if (token) {
           request = request. clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request);

    }

    
}
