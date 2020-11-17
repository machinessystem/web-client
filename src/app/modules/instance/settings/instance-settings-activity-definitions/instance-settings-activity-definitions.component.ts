import { Component, OnInit, OnDestroy } from '@angular/core';
import { Activity } from './../../../../models/activity.model';
import { forkJoin, of, Subscription } from 'rxjs';
import { ProcessService } from 'src/app/services/process.service';
import { InstanceService } from 'src/app/services/instance.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-instance-settings-activity-definitions',
  templateUrl: './instance-settings-activity-definitions.component.html',
  styleUrls: ['./instance-settings-activity-definitions.component.scss']
})
export class InstanceSettingsActivityDefinitionsComponent implements OnInit, OnDestroy {

  ACTIVITY_CLASSES: any
  activity: Activity

  activitySubscription: Subscription;

  constructor(private instanceService: InstanceService,
    private activityService: ActivityService,
    private process: ProcessService,) { }

  ngOnInit(): void {
    this.getActivityInformation()
  }

  ngOnDestroy() {
    if (this.activitySubscription) this.activitySubscription.unsubscribe()
  }

  getActivityInformation() {
    this.process.startHeaderProgress();
    this.activitySubscription = this.instanceService.currentInstance$
      .pipe(switchMap(res => this.getActivityInformationHelper(res)))
      .subscribe(res => {
        this.setActivity(res[0]);
        this.setActivityClasses(res[1]);
        this.process.stopHeaderProgress();
      })
  }

  getActivityInformationHelper(instance: any) {
    return forkJoin([this.activityService.get(instance?.activityId),
    this.activityService.getActivityClasses()
    ]).pipe(map(res => {
      return res;
    }), catchError(err => {
      this.process.stopHeaderProgress();
      return of([null, null])
    }))
  }

  setActivityClasses(classes: any) {
    this.ACTIVITY_CLASSES = classes;
  }

  setActivity(activity: Activity) {
    this.activity = activity;
  }
}
