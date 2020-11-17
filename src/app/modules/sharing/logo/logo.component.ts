import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  styleUrls:['logo.scss'],
  templateUrl: 'logo.component.html'
})

export class LogoComponent {
  @Input('width') width = 125;
  @Input('height') height = 40;
  @Input('washout') washout;
}