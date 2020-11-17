import { Component, OnInit, OnDestroy, Input, Inject, AfterViewInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PinService } from 'src/app/services/pin.service';
import { Subscription, of } from 'rxjs';
import { Instance } from 'src/app/models/instance.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, catchError } from 'rxjs/operators';
import { Pin } from 'src/app/models/modules.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProcessService } from 'src/app/services/process.service';
import { Router } from '@angular/router';

const STATUS_TEXTS = {
  NO_CONFIG: 'No Pin Configuration found for the CPU your selected',
  INVALID_PIN_CONF: 'Invalid Pin Configurations',
  NEW_CONFIG: 'New Pin Configuration found from server. Please refresh the page',
  NAME_NOT_SET: 'Some pin\'s name(s) aren\'t set',
  UNKNOWN_ERROR: 'Something went wrong',
  MIN_OUTPUT_PIN: 'Output should have atleast one pin'
}

interface AddPinNameDialogData {
  mode: string,
  pinNo: string,
  pinName: string
}

@Component({
  selector: 'instance-settings-add-pin-definition',
  templateUrl: './instance-settings-add-pin-definition.component.html',
  styleUrls: ['./instance-settings-add-pin-definition.component.scss']
})
export class InstanceSettingsAddPinDefinitionComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('instance') instance: Instance;

  @Output('onPinDefined') onPinDefined = new EventEmitter();

  @ViewChild('defaultTemplate') defaultTemplate: TemplateRef<any>;
  @ViewChild('noPinConfigFoundTemplate') noPinConfigFoundTemplate: TemplateRef<any>;

  currentTemplate: TemplateRef<any>;

  inputPins: Pin[] = [];
  outputPins: Pin[] = [];

  availablePinConfigurations: Pin[] = [];
  nAllowedPin: number;
  pinConfigurationReceived: boolean = false;
  disabled: boolean = false;
  statusText: string = null;
  subscription: Subscription;
  newPinDefinitionSubscription: Subscription;

  constructor(
    private process: ProcessService,
    private router: Router,
    private pinService: PinService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentTemplate = this.noPinConfigFoundTemplate;
  }

  ngAfterViewInit() {
    this.currentTemplate = this.noPinConfigFoundTemplate;
    this.getAndSetPinConfigurations()
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.newPinDefinitionSubscription) this.newPinDefinitionSubscription.unsubscribe();
  }

  drop(event: CdkDragDrop<Pin[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getAndSetPinConfigurations() {
    this.process.startHeaderProgress();
    this.subscription = this.pinService.getPinConfigurationsByModuleId(this.instance?.cpuId)
      .pipe(map(res => { return res; }), catchError(err => {
        this.processError(err);
        this.process.stopHeaderProgress();
        return of(null);
      }))
      .subscribe((pinConfigurations: Pin[]) => this.onPinConfigurationsReceived(pinConfigurations))
  }

  onPinConfigurationsReceived(pinConfigurations: Pin[]) {
    if (!pinConfigurations || !(pinConfigurations.length > 0)) return this.disable(STATUS_TEXTS.NO_CONFIG)
    this.setPinConfiguration(pinConfigurations);
    this.setAllowedPins(pinConfigurations);
    this.setPinConfigurationsReceived();
    this.currentTemplate = this.defaultTemplate;
    this.process.stopHeaderProgress();
  }

  setAllowedPins(pinConfigurations) {
    this.nAllowedPin = pinConfigurations.filter(pin => !this.checkIfNotAllowed(pin.types)).length;
  }

  get allowedNoOfPins() {
    return this.nAllowedPin;
  }

  setPinConfigurationsReceived(received: boolean = true) {
    this.pinConfigurationReceived = received;
  }
  setPinConfiguration(pinConfigurations) {
    this.availablePinConfigurations = pinConfigurations;
  }

  checkIfNotAllowed(pinTypes: string[]) {
    return pinTypes.includes('power')
    // || types.includes('serial');
  }

  getNoOfPinsSelectedText(pins: Pin[]) {
    if (pins.length > 0) return `${pins.length} pins`
    return 'no pin selected'
  }

  get remainingPins() {
    return this.availablePinConfigurations.filter(pin => !this.checkIfNotAllowed(pin.types));
  }

  get remainingNoOfPinsText() {
    let remainingPins = this.remainingPins
    if (remainingPins.length > 0) return `${remainingPins.length} remaining`
    return 'no remaining pin';
  }

  get pinSelectionText() {
    let nRemainingPin = this.remainingPins.length;
    let nSelectedPin = this.inputPins.length + this.outputPins.length;
    if (this.allowedNoOfPins == nSelectedPin) return `All ${nSelectedPin} pins selected`;
    else if (nSelectedPin == 0) return `No pins selected, ${this.remainingPins.length} pins remaining`;
    else if (nSelectedPin == 1) return `Total ${nSelectedPin} pin selected, ${nRemainingPin} remaining`;
    else if (nSelectedPin > 0) return `Total ${nSelectedPin} pins selected, ${nRemainingPin} remaining`;

  }

  setStatusText(message) {
    this.statusText = message;
  }
  disable(message = STATUS_TEXTS.UNKNOWN_ERROR) {
    this.setStatusText(message);
    this.disabled = true;
  }

  setTemplate(templateRef) {
    this.currentTemplate = templateRef;
  }

  clearStatus() {
    this.statusText = '';
  }

  openDialogForPinName(pinNo: string, mode: string = 'output') {
    const dialogRef = this.dialog.open(InstanceSettingsAppPinNameComponent, {
      disableClose: true,
      data: { pinNo: pinNo, mode: mode, pinName: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.setPinName(result.pinName, result.pinNo, result.mode);
    });
  }

  setPinName(pinName: string, pinNo: string, mode = 'output') {
    if (mode === 'output') return this.outputPins.find(pin => pin.no == pinNo).name = pinName;
    this.inputPins.find(pin => pin.no == pinNo).name = pinName;
  }

  savePinDefinition() {
    //If is disabled, return
    if (this.disabled) return;
    //Clear status text first
    this.clearStatus();
    //Respond as alteast on of the output should exits
    if (!(this.outputPins.length > 0)) return this.setStatusText(STATUS_TEXTS.MIN_OUTPUT_PIN);

    //if pin name is not set, return pin Name is not set
    //For output
    let __outputPins = this.validateSelectedPins(this.outputPins);
    if (!__outputPins) return this.setStatusText(STATUS_TEXTS.NAME_NOT_SET);

    if (this.inputPins.length > 0) {
      //For input
      let __inputPins = this.validateSelectedPins(this.inputPins);
      if (!__inputPins) return this.setStatusText(STATUS_TEXTS.NAME_NOT_SET);
    }

    let newPinArray: Pin[] = [
      ...this.createNewPinDefinition(this.inputPins, 'input'),
      ...this.createNewPinDefinition(this.outputPins, 'output')
    ];
    this.savePinDefinitions(newPinArray);
  }

  savePinDefinitions(pinDefinitions) {
    this.process.startHeaderProgress();
    this.newPinDefinitionSubscription = this.pinService.savePinDefinitions(this.instance._id, pinDefinitions)
      .pipe(map(res => {
        return res;
      }), catchError(err => {
        this.processError(err);
        this.process.stopHeaderProgress();
        return of(null);
      })).subscribe(res => {
        this.process.stopHeaderProgress();
        this.onPinDefined.emit(true);
      })
  }

  processError(res: HttpErrorResponse) {
    if (res.error && res.error.code === 'no-pin-configuraitons-found') {
      this.setTemplate(this.noPinConfigFoundTemplate);
      this.disable(STATUS_TEXTS.NO_CONFIG);
    }
    else if (res.error && res.error.message) this.setStatusText(res.error.message);
  }


  createNewPinDefinition(pins: Pin[], mode = 'output') {
    return pins.map(pin => { return { name: pin.name, no: pin.no, mode } })
  }

  validateSelectedPins(pins: Pin[]) {
    return pins.some(pin => {
      let { name } = pin;
      if (!name) return false;
      if (name == '') return false;
      return true;
    })
  }
}

@Component({
  selector: 'instance-settings-add-pin-name',
  templateUrl: 'instance-settings-add-pin-name.component.html',
})
export class InstanceSettingsAppPinNameComponent implements OnInit {

  pinForm: FormGroup
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InstanceSettingsAppPinNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddPinNameDialogData) { }

  ngOnInit() {
    this.pinForm = this.fb.group({
      pinName: ['', [Validators.required, Validators.pattern(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g)]]
    })
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  setError(error: any, control = 'pinName') {
    this.pinForm.get(control).setErrors(error);
    this.pinForm.updateValueAndValidity();
  }
  savePin(form: any) {
    if (!this.pinForm.valid) return;
    this.dialogRef.close({ ...this.data, pinName: form.pinName })
  }
}