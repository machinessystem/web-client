import { Observable } from 'rxjs';
import { AppUser } from './auth';


export interface IamRole {
    role: string;
    roleId: string;
    canWrite?: boolean;
    canUpdate?: boolean;
    canRemove?: boolean;
}
export interface IamManager {
    iamId?: string;
    uid: string;
    instanceId:string;
    roleId: string;
}
export interface IamManagerObservable {
    iamId: string;
    iamUser$: Observable<AppUser>;
    iamRole$: Observable<IamRole>;
}