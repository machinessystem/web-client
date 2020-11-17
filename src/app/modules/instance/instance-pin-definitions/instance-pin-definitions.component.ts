import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Instance } from 'src/app/models/instance.model';
import { MatDialog } from '@angular/material/dialog';
import { InstanceService } from './../../../services/instance.service';
import { PinService } from 'src/app/services/pin.service';
import { AppConfirmDialog } from '../../sharing/confirm-dialog';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';
import { ProcessService } from 'src/app/services/process.service';
import { Subscription, of } from 'rxjs';
import { Pin } from 'src/app/models/modules.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'instance-pin-definitions',
  templateUrl: './instance-pin-definitions.component.html',
  styleUrls: ['./instance-pin-definitions.component.scss']
})
export class InstancePinDefinitionsComponent implements OnInit, OnDestroy {

  @Input('instance') instance: Instance;
  @Input('pinDefinitions') pinDefinitions: Pin[];

  pinsDefinitionsSubscription: Subscription;
  pinRemovalSubcription: Subscription;
  pinRemovalAllSubcription: Subscription;

  constructor(private pinService: PinService,
    private instanceService: InstanceService,
    private process: ProcessService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCurrentInstanceAndPinDefinitions();
  }

  ngOnDestroy() {
    if (this.pinRemovalSubcription) this.pinRemovalSubcription.unsubscribe()
    if (this.pinRemovalAllSubcription) this.pinRemovalAllSubcription.unsubscribe()
    if (this.pinsDefinitionsSubscription) this.pinsDefinitionsSubscription.unsubscribe()
  }


  getCurrentInstanceAndPinDefinitions() {
    this.process.startHeaderProgress();
    this.instanceService.currentInstance$.pipe(switchMap(instance => {
      this.instance = instance
      return this.pinService.getPinDefinitionsByInstanceId(instance._id)
    })).pipe(map(res => {
      return res;
    }), catchError(err => {
      return of(null);
    })).subscribe(res => {
      this.pinDefinitions = res;
      this.process.stopHeaderProgress();
    })
  }


  removePin(pinNo: string) {
    const dialogRef = this.dialog.open(AppConfirmDialog, {
      data: 'Are your sure you want to delete this pin?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (typeof result !== 'boolean') return;
      if (!result) return;
      this.pinRemovalSubcription = this.pinService.
        removePinDefinition(this.instance._id, pinNo)
        .pipe(map(res => res), catchError(err => {
          this.processError(err)
          return of(null)
        }))
        .subscribe(res => {
          if (!res) return;
          this.getCurrentInstanceAndPinDefinitions()
        })
    });
  }

  removeAll() {
    const dialogRef = this.dialog.open(AppConfirmDialog, {
      data: 'This will delete all commands and readings too. Are your sure you want to delete all pin definitions?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (typeof result !== 'boolean') return;
      if (!result) return;
      this.pinRemovalAllSubcription = this.pinService.
        removeAllPinDefinitions(this.instance._id)
        .pipe(map(res => res), catchError(err => {
          this.processError(err)
          return of(null)
        }))
        .subscribe(res => {
          if (!res) return;
          this.getCurrentInstanceAndPinDefinitions()
        })
    });
  }

  processError(res: HttpErrorResponse) {
    if (res && res.error.error) {
      alert(res.error?.error?.message)
      // if (res.error.error.code === 'invalid-instance-or-pin-no') { 
      // }
      // else if (res.error.error.code === 'instance-not-found') {

      // }
      // else if (res.error.error.code === 'invalid-pin-no') {

      // }
    }
  }
}
