import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstanceService } from 'src/app/services/instance.service';
import { Observable, of, Subscription, forkJoin } from 'rxjs';
import { Instance } from 'src/app/models/instance.model';
import { Activity } from 'src/app/models/activity.model';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ActivityService } from 'src/app/services/activity.service';
import { CPU } from 'src/app/models/modules.model';
import { ModuleService } from 'src/app/services/module.service';

import { CommandService } from 'src/app/services/command.service';
import { MatDialog } from '@angular/material/dialog';
import { AppConfirmDialog } from 'src/app/modules/sharing/confirm-dialog';
import { ReadingService } from 'src/app/services/reading.service';
import { ProcessService } from 'src/app/services/process.service';
import { PinService } from 'src/app/services/pin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instance-settings-general',
  templateUrl: './instance-settings-general.component.html',
  styleUrls: ['./instance-settings-general.component.scss']
})
export class InstanceSettingsGeneralComponent implements OnInit, OnDestroy {

  instanceSubscription: Subscription;
  instance: Instance;
  instanceInfoSubscription: Subscription;
  instanceRemovalSubscription: Subscription;
  activity: Activity;
  cpu: CPU;
  comnDevice: any;
  constructor(
    private moduleService: ModuleService,
    private cmdService: CommandService,
    private readingService: ReadingService,
    private process: ProcessService,
    private router: Router,
    public dialog: MatDialog,
    private instanceService: InstanceService,
    private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getInstanceAndInfo();
  }

  ngOnDestroy() {
    if (this.instanceSubscription) this.instanceSubscription.unsubscribe();
    if (this.instanceInfoSubscription) this.instanceInfoSubscription.unsubscribe();
    if (this.instanceRemovalSubscription) this.instanceRemovalSubscription.unsubscribe();
  }

  getInstanceAndInfo() {
    this.instanceSubscription = this.instanceService.currentInstance$.subscribe(res => {
      this.instance = res
      this.getInstanceInformation(res)
    });
  }

  getInstanceInformation(instance: Instance) {
    this.process.startHeaderProgress();
    this.instanceInfoSubscription = forkJoin([this.activityService.get(instance?.activityId),
    this.moduleService.getModule(instance?.cpuId),
    this.moduleService.getModule(instance?.comnDeviceId),
    ]).pipe(map(res => {
      this.process.stopHeaderProgress();
      return res;
    }), catchError(err => {
      this.processError(err);
      this.process.stopHeaderProgress();
      return of([null, null, null])
    })).subscribe(res => {
      this.activity = res[0];
      this.cpu = res[1];
      this.comnDevice = res[2];
    })
  }

  deleteInstance(instanceId: string) {
    const dialogRef = this.dialog.open(AppConfirmDialog, {
      data: 'By deleting this, pin definitions, commands and responses related to this instance would also be deleted completely.'
    })
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (typeof result !== 'boolean') return;
      if (!result) return;
      this.instanceRemovalSubscription = this.instanceService.delete(instanceId)
        .pipe(map(res => res), catchError(err => {
          this.processError(err)
          return of(null)
        }))
        .subscribe(res => {
          this.router.navigate(['i']);
        });
    })
  }

  processError(res: HttpErrorResponse) {
    alert(res.error?.error?.message)
  }
}
