import { Component, OnInit, OnDestroy } from '@angular/core';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  constructor(private metaService: MetaService) { }

  ngOnInit(): void {
    this.metaService.setTitleOnly(`Welcome to Machines System portal`);
  }
  ngOnDestroy() {
  }

}
