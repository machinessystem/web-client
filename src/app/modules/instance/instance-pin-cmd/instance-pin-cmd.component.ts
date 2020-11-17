import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommandService } from 'src/app/services/command.service';
import { of, Subscription } from 'rxjs';
import { Pin } from 'src/app/models/modules.model';
import { InstanceService } from 'src/app/services/instance.service';
import { catchError, map } from 'rxjs/operators';
import { ProcessService } from 'src/app/services/process.service';

const STATUS_TEXTS = {
  ON: 'Running',
  OFF: 'Unavailable',
}
@Component({
  selector: 'instance-pin-cmd',
  templateUrl: './instance-pin-cmd.component.html',
  styleUrls: ['./instance-pin-cmd.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstancePinCmdComponent implements OnInit, OnDestroy {

  PIN_STATUSES = {
    ON: 'ON',
    OFF: 'OFF'
  };

  STATUS: boolean;

  @Input('instanceId') instanceId: string;
  @Input('pin') pin: Pin;

  command: any;

  cmdSubscription: Subscription;

  constructor(
    private cmdService: CommandService,
    private instanceService: InstanceService,
    private process: ProcessService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.process.startHeaderProgress()
    this.cmdSubscription = this.cmdService.getLastCommandByPinNumber(this.instanceId, this.pin.no)
      .pipe(map(res => {
        return res;
      }))
      .subscribe(res => {
        this.process.stopHeaderProgress();
        if (!res.length || res.length < 1) {
          this.command = this.PIN_STATUSES.OFF;
          return this.ref.detectChanges()
        }
        // console.log("LAST CMD", res[0]);
        this.command = res[0];
        return this.ref.detectChanges();
      })
  }

  ngOnDestroy() {
    if (this.cmdSubscription) this.cmdSubscription.unsubscribe();
  }

  async toggleSwitch() {
    // console.log("LAST CMD" + this.pin.no, this.command)
    this.command = this.command === this.PIN_STATUSES.OFF ? this.PIN_STATUSES.ON : this.PIN_STATUSES.OFF;
    // console.log("NEW CMD" + this.pin.no, this.command)
    const result = await this.cmdService.send(this.instanceId, this.pin.no, this.command);
  }

  getSatusText(command: any) {
    return STATUS_TEXTS[command]
  }
  getLivePresense() {
    return this.instanceService
      .getLivePresence(this.instanceId)
      .pipe(map(res => res), catchError(err => {
        return of(null)
      }))
  }

  routeToPinStatus(pinNo: string) {
    console.log(pinNo)
  }
}
