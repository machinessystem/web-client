import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { InstanceService } from 'src/app/services/instance.service';
import { AppUser } from 'src/app/models/auth';
import { IamService } from 'src/app/services/iam.service';
import { AccountService } from 'src/app/services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { IamManagerObservable } from 'src/app/models/iam.model';
import { Instance } from 'src/app/models/instance.model';
import { InstanceSettingsAddIamComponent } from '../instance-settings-add-iam/instance-settings-add-iam.component';
import { InstanceSettingsUpdateIamComponent } from '../instance-settings-update-iam/instance-settings-update-iam.component';

@Component({
  selector: 'app-instance-settings-iam',
  templateUrl: './instance-settings-iam.component.html',
  styleUrls: ['./instance-settings-iam.component.scss']
})
export class InstanceSettingsIamComponent implements OnInit, OnDestroy {
  instance: Instance;
  owner$: Observable<AppUser>;
  iams: IamManagerObservable[];
  instanceSubscription: Subscription;
  iamsSubscription: Subscription;

  constructor(
    private instanceService: InstanceService,
    private accountService: AccountService,
    public dialog: MatDialog,
    private iamService: IamService) { }

  ngOnInit(): void {
    this.instanceSubscription = this.instanceService.currentInstance$.subscribe(instance => {
      if (!instance) return;
      this.instance = instance;
      this.owner$ = this.accountService.get(instance.ownerUid);
      this.iamsSubscription = this.iamService.getManagers(ref => ref.orderByChild('instanceId').equalTo(instance._id))
        .subscribe(iams => {
          if (!iams) return;
          this.iams = iams;
        });
    })
  }
  ngOnDestroy() {
    if (this.instanceSubscription) this.instanceSubscription.unsubscribe();
    if (this.iamsSubscription) this.iamsSubscription.unsubscribe();
  }

  deleteIam(iamId: string) {
    this.iamService.deleteIam(iamId);
  }

  addIam() {
    const dialogRef = this.dialog.open(InstanceSettingsAddIamComponent,
      { data: { instanceId: this.instance._id } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  editIam(iamId: string, email: string, roleId: string) {
    const dialogRef = this.dialog.open(InstanceSettingsUpdateIamComponent,
      {
        data: { instanceId: this.instance._id, iamId: iamId, email: email, roleId: roleId }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
