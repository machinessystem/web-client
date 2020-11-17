import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { IamRole } from 'src/app/models/iam.model';
import { Observable, Subscription, of } from 'rxjs';
import { AppUser } from 'src/app/models/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstanceService } from 'src/app/services/instance.service';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { IamService } from 'src/app/services/iam.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-instance-settings-update-iam',
  templateUrl: './instance-settings-update-iam.component.html',
  styleUrls: ['./instance-settings-update-iam.component.scss']
})
export class InstanceSettingsUpdateIamComponent implements OnInit, OnDestroy {


  roles$: Observable<IamRole[]>;
  user: AppUser;
  iam: FormGroup;
  checkSubscription: Subscription;
  constructor(public dialogRef: MatDialogRef<InstanceSettingsUpdateIamComponent>,
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
    // this.roles$ = this.iamService.getRoles();
    this.initExistingFields();
  }

  ngOnDestroy() {
    if (this.checkSubscription) this.checkSubscription.unsubscribe();
  }

  initExistingFields() {
    const { instanceId } = this.data;
    if (!instanceId) return this.setError({ noInstance: true, message: 'Undefined instance' });
    const { email } = this.data;
    if (!email) return this.setError({ emptyEmail: true, message: 'Email not provided' });
    const { roleId } = this.data;
    if (!roleId) return this.setError({ emptyRoleId: true, message: 'Role not provided' });
    this.iam.patchValue({ email: email, roleId: roleId });
    this.iam.updateValueAndValidity();
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
  get iamId() {
    return this.data['iamId'];
  }

  // updateRole(form: any) {
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
  //       //Check whether role of Current is owner or canUpdate
  //       this.user = user;
  //       return this.checkCurrentUserPriviledge(this.instanceId).pipe(switchMap(priviledge => {
  //         console.log('PRIVIlEDGE', priviledge);
  //         if (!priviledge) {
  //           this.setError({ noPriviledge: true, message: 'No priviledge to update a manager' })
  //           return of(null);
  //         }
  //         //Check whether current app user is not updating him/her self
  //         return this.checkUserAppropriate(user.uid).pipe(switchMap(appropriateUser => {
  //           console.log('APPROPRIATE USER', appropriateUser);
  //           if (!appropriateUser) {
  //             this.setError({ invalidUser: true, message: 'You are trying to enforce update yourself' });
  //             return of(null);
  //           }
  //           return of(true);
  //         }))
  //       }))
  //     }))
  //   })).subscribe(res => {
  //     if (res) console.log('updated')
  //     this.iamService.updateIam(this.iamId, form.roleId);
  //     this.dialogRef.close(true);
  //   });
  // }

  // checkCurrentUserPriviledge(instanceId: string) {
  //   return this.auth.appUser$.pipe(switchMap(appUser => {
  //     if (!appUser) return this.iamService.canUpdate(appUser.uid, instanceId)
  //     return this.instanceService.getOwnership(instanceId, appUser.uid);
  //   }))
  // }

  updateRole(form: any) {
    console.log(form)
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
