import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from 'src/app/services/activity.service';
import { InstanceService } from 'src/app/services/instance.service';
import { PinService } from 'src/app/services/pin.service';
import { ProcessService } from 'src/app/services/process.service';
import { of, Subscription } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Pin } from './../../../../models/modules.model';
import { Instance } from './../../../../models/instance.model';

@Component({
  selector: 'app-energy-control-add-definition',
  templateUrl: './energy-control-add-definition.component.html',
  styleUrls: ['./energy-control-add-definition.component.scss']
})
export class EnergyControlAddDefinitionComponent implements OnInit, OnDestroy {

  isProcessing: boolean = false;
  pinDefinitionsSubscription: Subscription;

  unchangedInputPins: Pin[];
  inputPins: Pin[];

  instance: Instance;
  definitions: FormGroup;

  constructor(
    private activitService: ActivityService,
    private instanceSevice: InstanceService,
    private pinService: PinService,
    private fb: FormBuilder,
    private process: ProcessService) { }

  ngOnInit(): void {
    this.initForm()
    this.getPinDefinitions();
  }

  ngOnDestroy() {
    if (this.pinDefinitionsSubscription) this.pinDefinitionsSubscription.unsubscribe()
  }

  initForm() {
    this.definitions = this.fb.group({
      activityId: ['', [Validators.required]],
      definitions: this.fb.array([])
    })
  }

  getPinDefinitions() {
    this.process.startHeaderProgress();
    this.isProcessing = true;
    this.pinDefinitionsSubscription = this.instanceSevice.currentInstance$
      .pipe(switchMap(res => {
        this.definitions.patchValue({
          activityId: res.activityId
        });
        return this.pinService.getPinDefinitionsByInstanceId(res?._id)
      }
      ))
      .pipe(map(res => {
        return res;
      }), catchError(err => {
        this.process.stopHeaderProgress()
        return of(null)
      })).subscribe(res => {
        this.setPinDefinitions(res)
        this.process.stopHeaderProgress()
      })
  }

  setPinDefinitions(pinDefinitions: Pin[]) {
    if (!pinDefinitions || (pinDefinitions.length < 1)) return;
    this.setOutPinFormFields(pinDefinitions.filter(p => p.mode === 'output'))
    this.setInputPins(pinDefinitions.filter(p => p.mode === 'input'))
    this.isProcessing = false;
  }
  get defs() {
    return this.definitions.get('definitions') as FormArray;
  }

  setOutPinFormFields(pins: Pin[]) {
    pins.forEach(p => {
      this.defs.push(this.fb.group({
        pinNo: [p.no, [Validators.required]],
        pinName: [p.name, [Validators.required]],
        minValue: ['', [Validators.required]],
        maxValue: ['', [Validators.required]],
        sensor: ['', [Validators.required]]
      }))
    })
  }

  setInputPins(pins: Pin[]) {
    this.inputPins = this.unchangedInputPins = pins;
  }

  addInputPinToArray(pin: Pin) {
    this.inputPins.push(pin)
  }

  removeInputPinFromArray(pinNo: string) {
    const index = this.inputPins.findIndex(p => p.no === pinNo)
    delete this.inputPins[index];
  }


  onSelect(pinNo) {
    this.removeInputPinFromArray(pinNo);
  }

  getError(control = 'activityId') {
    const { message } = this.definitions.get(control).errors;
    return message;
  }

  getFormArrayError(index, control = 'name') {
    const { message } = this.defs.controls[index].get(control).errors
    return message;
  }

  setError(error: any, control = 'activityId') {
    this.definitions.get(control).setErrors(error);
    this.definitions.updateValueAndValidity();
    this.process.stopProgress();
    this.isProcessing = false;
  }

  processError(res: HttpErrorResponse) {
    if (res.error?.error) this.setError(res.error?.error);
  }


  saveActivityDefinition(form: any) {

  }
}
