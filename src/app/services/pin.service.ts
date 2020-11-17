import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GenService } from './gen.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pin } from '../models/modules.model';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  apiEndPoint = `${environment.apiUrl}/pins`

  constructor(private afdb: AngularFireDatabase,
    private http: HttpClient,
    private gen: GenService) { }

  savePinDefinitions(instanceId: string, pinDefinitions) {
    return this.http.post<any>(`${this.apiEndPoint}/definitions/${instanceId}`, pinDefinitions);
  }
  getPinDefinitionsByInstanceId(instanceId: string) {
    return this.http.get<Pin[]>(`${this.apiEndPoint}/definitions/${instanceId}`)
  }

  getPinDefinitionByInstanceIdAndPinNo(instanceId: string, pinNo: string) {
    return this.http.get(`${this.apiEndPoint}/definitions/${instanceId}/${pinNo}`);
  }

  getPinConfigurationsByModuleId(moduleId: string): Observable<Pin[]> {
    return this.http.get<Pin[]>(`${this.apiEndPoint}/configurations/${moduleId}`)
  }

  removePinDefinition(instanceId: string, pinNo: string) {
    return this.http.delete(`${this.apiEndPoint}/definitions/${instanceId}/${pinNo}`);
  }

  removeAllPinDefinitions(instanceId: string) {
    return this.http.delete(`${this.apiEndPoint}/definitions/${instanceId}`);
  }

  updatePinDefinition(instanceId: string, configs: Pin[]) {
    return this.http.patch(`${this.apiEndPoint}/definitions/${instanceId}`, configs)
  }
}
