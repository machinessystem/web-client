import { Component, OnInit } from '@angular/core';
import { AppInfoService } from 'src/app/services/app-info.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  about$: any;
  constructor(private appInfoService: AppInfoService) { }

  ngOnInit(): void {
    this.about$ = this.appInfoService.getAbout();
    this.appInfoService.getAbout().subscribe(res => console.log(res))
  }

}
