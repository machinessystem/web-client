import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  apiEndPoint = `${environment.apiUrl}/modules`

  constructor(
    private http: HttpClient) { }

  getCPUs() {
    return this.getModulesByType('cpu')
  }

  getCommunicationDevices() {
    return this.getModulesByType('communication device')
  }
  
  getModule(moduleId) {
    return this.http.get<any>(`${this.apiEndPoint}/${moduleId}`);
  }

  getModules({ type = '' }) {
    return this.http.get<any>(this.apiEndPoint + (type ? `?type=${type}` : ''));
  }

  getModulesByType(type: string) {
    return this.getModules({ type })
  }
}
