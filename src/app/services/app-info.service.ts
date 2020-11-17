import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  apiEndPoint = `${environment.apiUrl}/meta`

  constructor(private http: HttpClient, private afdb: AngularFireDatabase) { }

  getMeta() {
    return this.http.get<any>(this.apiEndPoint)
  }

  getAbout() {
    return this.afdb.list('/about').valueChanges();
  }



}
