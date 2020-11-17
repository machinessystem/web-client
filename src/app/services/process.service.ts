import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgProgressRef, NgProgress } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private isProcessingSubject = new BehaviorSubject<boolean>(false);
  progressRef: NgProgressRef;

  constructor(private progress: NgProgress) {
    this.progressRef = progress.ref('headerProgress');
  }

  startHeaderProgress() {
    this.progressRef.start();
  }
  stopHeaderProgress() {
    this.progressRef.complete();
  }

  startProgress() {
    this.isProcessingSubject.next(true);
  }

  get processing() {
    return this.isProcessingSubject;
  }


  stopProgress() {
    this.isProcessingSubject.next(false);
  }
}
