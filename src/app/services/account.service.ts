import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from '../models/auth';
import { map, switchMap } from 'rxjs/operators';
import { GenService } from './gen.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    apiEndPoint = `${environment.apiUrl}/users`

    userAgreementRef = this.db.collection('userAgreements');
    userRolesRef = this.db.collection('userRoles');
    userInfoRef = this.db.collection('userInfos');


    getMeta() {
        return this.http.get<any>(this.apiEndPoint)
    }

    constructor(
        private http: HttpClient,
        private db: AngularFirestore,
        private afdb: AngularFireDatabase,
        private gen: GenService) { }


    createUser(params) {
        return this.http.post(this.apiEndPoint, params, { observe: 'response' })
    }

    get(uid: string) {
        return this.http.get<AppUser>(`${this.apiEndPoint}/${uid}`)
    }

    findByEmail(email: string): Observable<AppUser> {
        return this.afdb.list<AppUser>('users', (ref) => ref.orderByChild('email').equalTo(email)).snapshotChanges()
            .pipe(map(appUsers => this.gen.getValues(appUsers, 'uid')))
            .pipe(switchMap(users => {
                if (users.length > 0) return this.get(users[0].uid);
                return of(null);
            }));
    }

}