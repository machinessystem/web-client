import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AppUser } from '../models/auth';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AccountService } from './account.service';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiEndPoint = `${environment.apiUrl}/auth`

    user$: Observable<firebase.User>;

    constructor(
        private auth: AngularFireAuth,
        private http: HttpClient,
        private db: AngularFirestore,
        private router: Router,
        private accountService: AccountService) {
        this.user$ = this.auth.authState;
    }

    async getToken() {
        return (await this.auth.currentUser)?.getIdToken();
    }
    
    signInWithCustomToken(token) {
        return this.auth.signInWithCustomToken(token)
    }

    login(form) {
        return this.http.post<any>(this.apiEndPoint, form, { observe: 'response' })
    }

    logout() {
        this.auth.signOut()
    }

    get appUser$(): Observable<AppUser> {
        return this.user$.pipe(switchMap(user => {
            if (!user) return of(null)
            return this.accountService.get(user.uid)
        }));
    }
    async signup(email: string, password: string) {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }
}