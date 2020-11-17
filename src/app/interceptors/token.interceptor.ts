import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(req, next));
    }

    async handle(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${await this.auth.getToken()}`
            }
        })
        // Important: Note the .toPromise()
        return next.handle(authReq).toPromise()
    }

    getAuthToken() {
        return this.auth.getToken();
    }
}