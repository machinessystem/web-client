import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { IamRole, IamManager } from 'src/app/models/iam.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { InstanceService } from 'src/app/services/instance.service';
import { IamService } from 'src/app/services/iam.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap, map } from 'rxjs/operators';
import { AppUser } from 'src/app/models/auth';

@Component({
  selector: 'instance-settings-add-iam',
  templateUrl: './instance-settings-add-iam.component.html',
  styleUrls: ['./instance-settings-add-iam.component.scss']
})
export class InstanceSettingsAddIamComponent implements OnInit {

  roles$: Observable<IamRole[]>;
  user: AppUser;
  iam: FormGroup;
  checkSubscription: Subscription;
  constructor(public dialogRef: MatDialogRef<InstanceSettingsAddIamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private instanceService: InstanceService,
    private accountService: AccountService,
    private auth: AuthService,
    private iamService: IamService) { }

  ngOnInit(): void {
    this.iam = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      roleId: [, [Validators.required]]
    })
    this.roles$ = this.iamService.getRoles();
    this.initExistingFields();
  }

  ngOnDestroy() {
    if (this.checkSubscription) this.checkSubscription.unsubscribe();
  }

  initExistingFields() {
    const { instanceId } = this.data;
    if (!instanceId) return this.setError({ noInstance: true, message: 'Undefined instance' });
  }
  getError(control = 'email') {
    const { message } = this.iam.get(control).errors;
    if (message) return message;
  }
  setError(error: any, control = 'email') {
    this.iam.get(control).setErrors(error);
    this.iam.updateValueAndValidity()
  }

  get instanceId() {
    return this.data['instanceId'];
  }

  // saveRole(form: any) {
  //   if (!this.iam.valid) return;
  //   const email = form.email;

  //   //Check instance
  //   this.checkSubscription = this.instanceService.get(this.instanceId).pipe(switchMap(instance => {
  //     console.log('INSTANCE', instance);
  //     if (!instance) {
  //       this.setError({ invalidInstance: true, message: 'Invalid instance' });
  //       return of(null);
  //     }
  //     //Find user by email
  //     return this.accountService.findByEmail(email).pipe(switchMap(user => {
  //       console.log('USER', user);
  //       if (!user) {
  //         this.setError({ invalidUser: true, message: 'Invalid user' });
  //         return of(null);
  //       }
  //       //Check whether role of Current user is owner
  //       this.user = user;
  //       return this.checkCurrentUserOwnerShip(this.instanceId).pipe(switchMap(ownerInstance => {
  //         console.log('OWNER INSTANCE', ownerInstance);
  //         if (!ownerInstance) {
  //           this.setError({ noPriviledge: true, message: 'No priviledge to add a manager' })
  //           return of(null);
  //         }
  //         //Check whether current app user is not adding him/her self
  //         return this.checkUserAppropriate(user.uid).pipe(switchMap(appropriateUser => {
  //           console.log('APPROPRIATE USER', appropriateUser);
  //           if (!appropriateUser) {
  //             this.setError({ invalidUser: true, message: 'You are trying to enforce add yourself' });
  //             return of(null);
  //           }
  //           //Check if user is already in the same instance iam.
  //           return this.iamService.checkIamExists(user.uid, this.instanceId).pipe(map(iam => {
  //             console.log('IAM', iam);
  //             if (iam) {
  //               this.setError({ iamExists: true, message: 'Manager is already added' });
  //               return false;
  //             }
  //             return true;
  //           }))
  //         }))
  //       }))
  //     }))
  //   })).subscribe(res => {
  //     if (res) console.log('done')
  //     this.iamService.addIam(this.instanceId, this.user.uid, form.roleId);
  //     this.dialogRef.close(true);
  //   });
  // }

  // checkCurrentUserOwnerShip(instanceId: string) {
  //   return this.auth.appUser$.pipe(switchMap(appUser => {
  //     if (!appUser) return of(null);
  //     return this.instanceService.getOwnership(instanceId, appUser.uid);
  //   }))
  // }

  saveRole(form:any){
    console.log(form);
  }

  checkUserAppropriate(uid: string) {
    return this.auth.appUser$.pipe(map(appUser => {
      if (!appUser) return null;
      if (appUser.uid == uid) return false;
      return true;
    }))
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
