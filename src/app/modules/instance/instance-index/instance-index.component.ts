import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommandService } from 'src/app/services/command.service';
import { InstanceService } from 'src/app/services/instance.service';
import { Instance } from 'src/app/models/instance.model';
import { Subscription, forkJoin, of } from 'rxjs';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/models/activity.model';
import { Router } from '@angular/router';
import { PinService } from 'src/app/services/pin.service';
import { Pin } from 'src/app/models/modules.model';
import { ProcessService } from 'src/app/services/process.service';
import { map, catchError } from 'rxjs/operators';

const STATUS_TEXTS = {
  NOT_LIVE: { text: 'The instance is not live', type: 'error' },
  AVAILABLE: { text: 'The instance is live', type: 'ok' }
}

@Component({
  selector: 'app-instance-index',
  templateUrl: './instance-index.component.html',
  styleUrls: ['./instance-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstanceIndexComponent implements OnInit, AfterViewInit, OnDestroy {

  ACTIVITY_CLASSES: any;

  status: any;

  @ViewChild('defaultTemplate') defaultTemplate: TemplateRef<any>;
  @ViewChild('noActivityDefinitionTemplate') noActivityDefinitionTemplate: TemplateRef<any>;
  @ViewChild('noPinDefinitionTemplate') noPinDefinitionTemplate: TemplateRef<any>;

  currentTemplate: TemplateRef<any>;

  instance: Instance;
  activity: Activity;
  activityDefinitions: any;
  pins: Pin[];
  filteredPinDefinitions: Pin[];
  isLive: boolean = false;

  instanceSubscription: Subscription;
  instanceInfoSubscription: Subscription;
  instancePresenceSubscription: Subscription;
  activityDefinitionsSubscripton: Subscription;

  constructor(
    private router: Router,
    private pinService: PinService,
    private process: ProcessService,
    private ref: ChangeDetectorRef,
    private activityService: ActivityService,

    private instanceService: InstanceService) { }

  ngOnInit() {
    this.currentTemplate = this.noPinDefinitionTemplate;
  }

  ngAfterViewInit(): void {
    this.currentTemplate = this.noPinDefinitionTemplate;
    this.getInstanceAndInfo();
  }

  ngOnDestroy() {
    if (this.instanceSubscription) this.instanceSubscription.unsubscribe();
    if (this.instanceInfoSubscription) this.instanceInfoSubscription.unsubscribe();
    if (this.activityDefinitionsSubscripton) this.activityDefinitionsSubscripton.unsubscribe();
    if (this.instancePresenceSubscription) this.instancePresenceSubscription.unsubscribe();
  }

  getInstanceAndInfo() {
    this.process.startHeaderProgress();
    this.instanceSubscription = this.instanceService.currentInstance$.subscribe(res => {
      this.instance = res
      this.getInstanceInformation(res)
      this.getActivityDefinitions(res)
    });
  }

  getInstanceInformation(instance: Instance) {
    this.getInstancePresense(instance?._id)
    this.instanceInfoSubscription = forkJoin([this.activityService.get(instance?.activityId),
    this.pinService.getPinDefinitionsByInstanceId(instance?._id),
    this.activityService.getActivityClasses()
    ]).pipe(map(res => {
      return res;
    }), catchError(err => {
      this.process.stopHeaderProgress();
      return of([null, null, null])
    })).subscribe(res => {
      this.setActivity(res[0]);
      this.setFielteredPins(res[1]);
      this.setActivityClasses(res[2]);
      this.process.stopHeaderProgress();
      this.ref.detectChanges();
    })
  }


  getActivityDefinitions(instance: any) {
    this.process.startHeaderProgress();
    this.activityDefinitionsSubscripton = this.activityService
      .getActivityDefinitions(instance?._id)
      .pipe(map(res => {
        return res;
      }), catchError(err => {
        this.process.stopHeaderProgress();
        return of(null)
      }))
      .subscribe(res => {
        this.setActivityDefinitions(res);
      })
  }
  getInstancePresense(instanceId) {
    this.instancePresenceSubscription = this.instanceService
      .getLivePresence(instanceId)
      .subscribe(res => this.setInstancePresence(res))
  }

  setInstancePresence(presense: boolean) {
    this.isLive = presense;
    if (presense) return this.setStatus(STATUS_TEXTS.AVAILABLE);
    this.setStatus(STATUS_TEXTS.NOT_LIVE);
  }

  setStatus(status: any) {
    this.status = status;
  }

  setActivityClasses(classes: any) {
    this.ACTIVITY_CLASSES = classes;
  }

  setActivity(activity: Activity) {
    this.activity = activity;
  }

  setActivityDefinitions(activityDefinitions: any) {
    if (!activityDefinitions) return;
    this.activityDefinitions = activityDefinitions;
  }

  setFielteredPins(pins: Pin[]) {
    if (pins && pins.length > 0) {
      this.filteredPinDefinitions = pins.filter(p => p.mode === 'output');
      this.currentTemplate = this.defaultTemplate;
    }
    else return this.setNoPinDefinitionFound();
  }

  setNoPinDefinitionFound() {
    this.currentTemplate = this.noPinDefinitionTemplate;
  }

  navToAddPinDefinition() {
    this.router.navigate(['i', this.instance._id, 'settings', 'pin-definitions']);
  }
  navToAddActivityDefinition() {
    this.router.navigate(['i', this.instance._id, 'settings', 'activity-definitions']);
  }
}
