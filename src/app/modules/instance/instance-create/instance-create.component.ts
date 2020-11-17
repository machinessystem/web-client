import { OnInit, Component, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CPU } from 'src/app/models/modules.model';
import { Activity } from 'src/app/models/activity.model';
import { InstanceService } from 'src/app/services/instance.service';
import { ModuleService } from 'src/app/services/module.service';
import { ActivityService } from 'src/app/services/activity.service';
import { Subscription, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessService } from 'src/app/services/process.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: `app-instance-create`,
    templateUrl: 'instance-create.component.html',
    styleUrls: ['instance-create.component.scss'],
})
export class InstanceCreateComponent implements OnInit, OnDestroy {

    @ViewChild('instanceForm') instanceForm;
    @Output('onCreated') onCreated = new EventEmitter(true);

    isProcessing: boolean = false;
    disabled: boolean = true;

    valuesSubscription: Subscription;
    cpus: CPU[];
    comnDevices: CPU[];
    activities: Activity[];

    instance: FormGroup;

    constructor(private fb: FormBuilder,
        private moduleService: ModuleService,
        private activityService: ActivityService,
        private instanceService: InstanceService,
        private process: ProcessService) { }

    ngOnInit() {
        this.getValues()
        this.initForm();
    }

    ngOnDestroy() {
        if (this.valuesSubscription) this.valuesSubscription.unsubscribe();
    }

    getValues() {
        this.process.startProgress();
        this.valuesSubscription = forkJoin([this.activityService.getAll(),
        this.moduleService.getCPUs(),
        this.moduleService.getCommunicationDevices()]).pipe(map(res => res),
            catchError(err => {
                this.process.stopProgress();
                this.disable()
                return of([null, null, null]);
            })).subscribe(res => {
                if (!res) return this.disable();
                this.setActivity(res[0]);
                this.setCPUs(res[1]);
                this.setComnDevices(res[2]);
                this.process.stopProgress();
                if (this.activities && this.cpus && this.comnDevices) this.enable()
            });
    }

    initForm() {
        this.instance = this.fb.group({
            name: ['', [Validators.required, Validators.pattern(new RegExp("^[a-zA-Z]+(([a-zA-Z0-9 ])?[a-zA-Z]*)*$", "g"))]],
            activityId: ['', [Validators.required]],
            cpuId: ['', [Validators.required]],
            comnDeviceId: ['', [Validators.required]],
        })
    }

    disable() {
        this.isProcessing = false;
        this.disabled = true;
    }
    
    enable() {
        this.isProcessing = false;
        this.disabled = false;
    }

    setComnDevices(comnDevices: CPU[]) {
        this.comnDevices = comnDevices;
    }

    setCPUs(cpu: CPU[]) {
        this.cpus = cpu;
    }

    setActivity(activities: Activity[]) {
        this.activities = activities
    }

    getError(control = 'name') {
        const { message } = this.instance.get(control).errors;
        if (message) return message;
    }

    setError(error: any, control = 'name') {
        this.instance.get(control).setErrors(error);
        this.instance.updateValueAndValidity();
        this.isProcessing = false;
    }

    crateInstance(form: any) {
        this.process.startProgress();
        this.isProcessing = true;
        if (!this.instance.valid) return;
        this.instanceService.create(form)
            .pipe(map(res => {
                this.process.stopProgress();
                return res;
            }), catchError(err => {
                this.processError(err);
                this.process.stopProgress();
                return of(null);
            })).subscribe(res => {
                //Emit output
                this.onCreated.emit(res.body)
                this.isProcessing = false;
                this.process.stopProgress();
            })
    }

    processError(res: HttpErrorResponse) {
        this.setError(res.error?.error)
    }
}