import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ActivityService } from 'src/app/services/activity.service';
import { InstanceService } from 'src/app/services/instance.service';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-energy-control-definitions',
  templateUrl: './energy-control-definitions.component.html',
  styleUrls: ['./energy-control-definitions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyControlDefinitionsComponent implements OnInit, AfterViewInit {


  @ViewChild('noActivityDefinitionTemplate') noActivityDefinitionTemplate: TemplateRef<any>;
  @ViewChild('addActivityDefinitionTemplate') addActivityDefinitionTemplate: TemplateRef<any>;
  @ViewChild('defaultTemplate') defaultTemplate: TemplateRef<any>;
  currentTemplate: TemplateRef<any>;

  activityDefinitions: any;

  activitySubscription: Subscription;

  constructor(private instanceService: InstanceService,
    private activityService: ActivityService,
    private ref: ChangeDetectorRef,
    private process: ProcessService,) { }

  ngOnInit(): void {
    this.setNoActivityDefinitionFound()
    this.getActivityInfo()
  }

  ngAfterViewInit() {
    this.setNoActivityDefinitionFound()
    this.getActivityInfo()
  }

  ngOnDestroy() {
    if (this.activitySubscription) this.activitySubscription.unsubscribe();
  }

  getActivityInfo() {
    this.process.startHeaderProgress();
    this.activitySubscription = this.instanceService.currentInstance$
      .pipe(switchMap(res => this.getActivityInformation(res)))
      .subscribe(res => {
        this.setActivityDefinitions(res);
        this.process.stopHeaderProgress();
      })
  }

  getActivityInformation(instance: any) {
    return this.activityService.getActivityDefinitions(instance?._id).pipe(map(res => {
      return res;
    }), catchError(err => {
      this.process.stopHeaderProgress();
      this.showTemplate(this.noActivityDefinitionTemplate)
      return of(null);
    }))
  }

  setActivityDefinitions(activityDefinitions: any) {
    if (!activityDefinitions) return this.setNoActivityDefinitionFound()
    this.activityDefinitions = activityDefinitions;
    this.setActivityDefinitionsFound()
  }

  setActivityDefinitionsFound() {
    this.showTemplate(this.defaultTemplate);
  }

  setNoActivityDefinitionFound() {
    this.showTemplate(this.noActivityDefinitionTemplate);
  }

  setAddActivityDefinitionFlow() {
    this.showTemplate(this.addActivityDefinitionTemplate);
  }

  showTemplate(template: any) {
    this.currentTemplate = template;
    this.ref.detectChanges()
  }
}
