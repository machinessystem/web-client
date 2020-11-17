import { Injectable } from "@angular/core";
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { GenService } from './gen.service';
import { Instance } from '../models/instance.model';
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import { IamService } from './iam.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InstanceService {

    apiEndPoint = `${environment.apiUrl}/instances`

    instanceSubject = new BehaviorSubject<Instance>(null);

    constructor(
        private http: HttpClient,
        private afdb: AngularFireDatabase,
        private iamService: IamService,
        private gen: GenService) {
    }

    getLivePresence(instanceId: string) {
        return this.afdb.object(`instancesPresense/${instanceId}`).valueChanges()
            .pipe(switchMap(res => this.getPresense(instanceId)))
    }

    getPresense(instanceId: string) {
        return this.http.get<any>(`${this.apiEndPoint}/presense/${instanceId}`)
    }

    create(instance: Instance) {
        return this.http.post(this.apiEndPoint, instance, { observe: 'response' })
    }

    getUserInstances() {
        return this.http.get<Instance[]>(`${this.apiEndPoint}/myInstances`);
    }

    get(instanceId: string): Observable<Instance> {
        return this.http.get<Instance>(`${this.apiEndPoint}/${instanceId}`)
    }

    delete(instanceId: string) {
        return this.http.delete(`${this.apiEndPoint}/${instanceId}`)
    }

    setCurrentInstance(instance: Instance) {
        this.instanceSubject.next(instance);
    }

    get currentInstance$() {
        return this.instanceSubject.asObservable();
    }


    getInstancesByIam(uid: string) {
        return this.iamService.getIAMs(ref => ref.orderByChild('uid').equalTo(uid)).pipe(map(iams => {
            if (iams.length > 0) return iams.map(iam => this.get(iam.instanceId));
            return of(null);
        })).pipe(switchMap(iams => combineLatest(iams)))
    }

}