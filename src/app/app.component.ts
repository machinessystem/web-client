import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { BreadcrumbService } from './services/breadcrumb.service';
import { BreadCrumb } from './models/breadcrumb.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menuItems: BreadCrumb[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumb: BreadcrumbService) { }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd), distinctUntilChanged()).subscribe(() => {
      this.menuItems = this.breadcrumb.buildBreadCrumb(this.route.root);
    })
  }
}