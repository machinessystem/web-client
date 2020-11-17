import { Injectable } from '@angular/core';
import { GenService } from './gen.service';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { IamRole, IamManager } from '../models/iam.model';
import { AccountService } from './account.service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IamService {

  constructor(private afdb: AngularFireDatabase,
    private accountService: AccountService,
    private gen: GenService) {
  }

  getIAMs(queryfn?: QueryFn) {
    return this.afdb.list<IamManager>(`instanceIams`, queryfn).snapshotChanges().pipe(map(iams => this.gen.getValues(iams, 'iamId')))
  }

  getRoles(queryfn?: QueryFn) {
    return this.afdb.list<IamRole>('iamRoles', queryfn).snapshotChanges().pipe(map(roles => this.gen.getValues(roles, 'roleId')));
  }
  getRole(roleId: string) {
    return this.afdb.object<IamRole>(`iamRoles/${roleId}`).snapshotChanges().pipe(map(role => this.gen.getValue(role, 'roleId')));
  }

  addIam(instanceId: string, uid: string, roleId: string) {
    return this.afdb.list('instanceIams').push({ instanceId: instanceId, uid: uid, roleId: roleId });
  }

  updateIam(iamId: string, roleId: string) {
    return this.afdb.object(`instanceIams/${iamId}`).update({ roleId: roleId });
  }
  deleteIam(iamId: string) {
    return this.afdb.object(`instanceIams/${iamId}`).remove();
  }
  getIamByQueryFn(queryfn: QueryFn): Observable<IamManager> {
    return this.getIAMs(queryfn).pipe(switchMap(iams => {
      if (iams.length > 0) return of(iams[0]);
      return of(null);
    }))
  }

  getManagers(queryfn?: QueryFn) {
    return this.getIAMs(queryfn).pipe(map(iams => {
      return iams.map(iam => {
        let iamUser$ = this.accountService.get(iam.uid);
        let iamRole$ = this.getRole(iam.roleId);
        return { iamId: iam.iamId, iamUser$: iamUser$, iamRole$: iamRole$ };
      })
    }))
  }

  checkIamExists(uid: string, instanceId: string) {
    return this.getIAMs(ref => ref.orderByChild('uid').equalTo(uid)).pipe(map(iams => {
      if (!iams) return null;
      if (iams.length < 1) return null;
      let __iams = iams.filter(x => x.instanceId == instanceId);
      if (__iams !== undefined && __iams.length > 0) return __iams[0];
      return null;
    }))
  }
  
  getPriviledge(uid: string, instanceId: string): Observable<IamRole> {
    return this.checkIamExists(uid, instanceId).pipe(switchMap(iam => {
      if (!iam) return of(null);
      return this.getRole(iam.roleId);
    }))
  }

  canWrite(uid: string, instanceId: string) {
    return this.getPriviledge(uid, instanceId).pipe(map(role => role.canWrite))
  }
  canUpdate(uid: string, instanceId: string) {
    return this.getPriviledge(uid, instanceId).pipe(map(role => role.canWrite))
  }
  canRemove(uid: string, instanceId: string) {
    return this.getPriviledge(uid, instanceId).pipe(map(role => role.canRemove))
  }
}
