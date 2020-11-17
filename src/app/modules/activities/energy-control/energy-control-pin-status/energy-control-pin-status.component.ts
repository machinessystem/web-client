import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ReadingService } from 'src/app/services/reading.service';
import { catchError, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-energy-control-pin-status',
  templateUrl: './energy-control-pin-status.component.html',
  styleUrls: ['./energy-control-pin-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyControlPinStatusComponent implements OnInit, OnDestroy {

  @Input('instanceId') instanceId: string;
  @Input('pinNo') pinNo: string;

  isLoading: boolean = false;
  status: any;
  subscription: Subscription;
  constructor(private readingsService: ReadingService,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getlastReading();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getlastReading() {
    this.isLoading = true;
    this.subscription = this.readingsService.getPinReadings(this.instanceId, this.pinNo).pipe(map(res => {
      return res;
    }), catchError(err => {
      this.isLoading = false;
      this.ref.detectChanges();
      return of(null)
    })).subscribe(res => {
      this.status = res;
      this.isLoading = false;
      this.ref.detectChanges();
      console.log(res)
    })
  }
}
