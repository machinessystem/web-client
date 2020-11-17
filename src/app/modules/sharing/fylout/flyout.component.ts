import { Component, Input, } from '@angular/core';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.scss']
})
export class FlyoutComponent {

  isProcessing: boolean = false;

  constructor(private progress: ProcessService) {
    this.progress.processing.subscribe(res => this.isProcessing = res);
  }


}


