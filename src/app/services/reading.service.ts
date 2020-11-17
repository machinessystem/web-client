import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { GenService } from './gen.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {
  apiEndPoint = `${environment.apiUrl}/readings`


  constructor(
    private afdb: AngularFireDatabase,
    private http: HttpClient,
    private gen: GenService) { }


  getPinReadings(instanceId, pinNo, options = {}) {
    let qryStr = ''
    Object.keys(options).forEach(key => qryStr += `&${key}=${options[key]}`);
    return this.http.get<any>(`${this.apiEndPoint}/${instanceId}/${pinNo}?${qryStr}`)
  }


}
