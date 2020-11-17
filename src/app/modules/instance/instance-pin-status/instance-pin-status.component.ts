import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReadingService } from 'src/app/services/reading.service';
import { InstanceService } from 'src/app/services/instance.service';
import { Subscription, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PinService } from 'src/app/services/pin.service';
import { Pin } from 'src/app/models/modules.model';

@Component({
  selector: 'app-instance-pin-status',
  templateUrl: './instance-pin-status.component.html',
  styleUrls: ['./instance-pin-status.component.scss']
})
export class InstancePinStatusComponent implements OnInit, OnDestroy {

  readings$: Observable<any[]>;
  pin: Pin;
  pinSubscription: Subscription;
  constructor(
    private instanceService: InstanceService,
    private route: ActivatedRoute,
    private pinService: PinService,
    private readingService: ReadingService) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy() {
    this.pinSubscription.unsubscribe();
  }

  init() {
    this.pinSubscription = this.instanceService.currentInstance$.pipe(switchMap(instance => {
      if (!instance) return of(null);
      this.readings$ = this.getReadings(instance._id);
      return this.getPinInfo(instance._id)
    })).subscribe(pinArray => {
      if (!pinArray || !(pinArray.length > 0)) return;
      this.pin = pinArray[0];
    })
  }

  populateReadings() {
    this.readings$ = this.instanceService.currentInstance$.pipe(switchMap(instance => {
      if (!instance) return of(null);
      return this.getReadings(instance._id);
    }))
  }

  getReadings(instanceId: string) {
    return this.getPinFromParams().pipe(switchMap(pinNo => {
      if (!pinNo) return of(null);
      return this.readingService.getPinReadings(instanceId, pinNo)
    }));
  }
  getPinInfo(instanceId: string) {
    return this.getPinFromParams().pipe(switchMap(pinNo => {
      // if (!pinNo)
       return of(null);
      // return this.pinService.get(instanceId, pinNo)
    }));
  }

  getPinFromParams(): Observable<string> {
    let pinNo = this.route.snapshot.params['pinNo'];
    if (pinNo) return of(pinNo);
    return this.route.paramMap.pipe(switchMap(params => {
      let pinNo = params.get('pinNo');
      if (!pinNo) return of(null);
      return pinNo;
    }))
  }

}
