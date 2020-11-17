import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { PinService } from 'src/app/services/pin.service';
import { of, Subscription } from 'rxjs';
import { InstanceService } from 'src/app/services/instance.service';
import { switchMap, catchError } from 'rxjs/operators';
import { Instance } from 'src/app/models/instance.model';
import { ProcessService } from 'src/app/services/process.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Pin } from 'src/app/models/modules.model';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-instance-settings-pin-definitions',
  templateUrl: './instance-settings-pin-definitions.component.html',
  styleUrls: ['./instance-settings-pin-definitions.component.scss']
})
export class InstanceSettingsPinDefinitionsComponent implements OnInit, OnDestroy {

  pinDefinitions: Pin[];
  instance: Instance;
  subscription: Subscription;
  navigationSubscription: Subscription;

  PIN_DEF_STATUS = {
    NO_DEF: 'no-pin-definitions-found',
    NO_CONF: 'no-pin-configuration-found',
    FOUND: 'ok',
    ADD_DEF: 'add-definition'
  }

  CURRENT_PIN_DEFS_STATUS: any = null;

  constructor(private pinService: PinService,
    private process: ProcessService,
    private router: Router,
    private instanceService: InstanceService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getDefinitions();
      }
    });
  }

  ngOnInit(): void {
    this.getDefinitions();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.navigationSubscription) this.navigationSubscription.unsubscribe()
  }

  getDefinitions() {
    this.process.startHeaderProgress()
    this.subscription = this.instanceService.currentInstance$.pipe(switchMap(instance => {
      this.instance = instance;
      return this.pinService.getPinDefinitionsByInstanceId(instance._id);
    }), catchError(err => {
      this.processError(err);
      this.process.stopHeaderProgress();
      return of(null);
    })).subscribe((definitions: Pin[]) => {
      if (!definitions || (definitions.length < 1)) return this.showNoPinDefinitionFound();
      this.setPinDefinitions(this.pinDefinitions);
      this.process.stopHeaderProgress();
    });
  }

  setPinDefinitions(definitions) {
    this.pinDefinitions = definitions;
    this.showPinDefinitionsFound();
  }
  processError(res: HttpErrorResponse) {
    if (res.status === 500) return alert('Something went wrong!');
    else if (res && res.error && res.error?.error?.code === 'no-pin-definitions-found') return this.showNoPinDefinitionFound()
    return this.showNoPinConfigurationFound();
  }

  setStatus(status) {
    this.CURRENT_PIN_DEFS_STATUS = status
  }

  showNoPinDefinitionFound() {
    this.setStatus(this.PIN_DEF_STATUS.NO_DEF)
  }
  showNoPinConfigurationFound() {
    this.setStatus(this.PIN_DEF_STATUS.NO_CONF)
  }

  showAddPinDefinitionFlow() {
    this.setStatus(this.PIN_DEF_STATUS.ADD_DEF)
  }

  showPinDefinitionsFound() {
    this.setStatus(this.PIN_DEF_STATUS.FOUND)
  }

  onNewPinDefinitionsFound(found: boolean) {
    if (found) this.getDefinitions()
  }
}
