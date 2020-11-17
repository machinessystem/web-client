import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  apiEndPoint = `${environment.apiUrl}/activities`

  constructor(private http: HttpClient) { }


  getActivityDefinitions(instanceId: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/definitions/${instanceId}`);
  }

  get(activityId: string): Observable<Activity> {
    return this.http.get<any>(`${this.apiEndPoint}/${activityId}`);
  }

  getAll() {
    return this.http.get<any[]>(this.apiEndPoint);
  }

  getActivityClasses() {
    return this.http.get<any>(`${this.apiEndPoint}/classes`);
  }
}
