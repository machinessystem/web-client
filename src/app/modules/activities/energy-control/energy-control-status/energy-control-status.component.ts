import { Component, OnInit, Input } from '@angular/core';
import { ReadingService } from 'src/app/services/reading.service';
import { PinService } from 'src/app/services/pin.service';

@Component({
  selector: 'app-energy-control-status',
  templateUrl: './energy-control-status.component.html',
  styleUrls: ['./energy-control-status.component.scss']
})
export class EnergyControlStatusComponent implements OnInit {

  @Input('instanceId') instanceId: string;

  constructor(
    private pinService: PinService,
    private readingService: ReadingService) { }

  ngOnInit(): void {
    // this.pinService.getAll(this.instanceId).subscribe(pinDefinitions => console.log('PINs', pinDefinitions))
    // this.readingService.getAll(this.instanceId).subscribe(allReadings => console.log('READINGS', allReadings))
  }

  // lineChartLegend = true;
  // lineChartType = 'line';

  // lineChartOptions: (ChartOptions) = {
  //   responsive: true,
  // }
  // lineChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Average Energy' },
  // ];

  // lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }
  // chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }






}
