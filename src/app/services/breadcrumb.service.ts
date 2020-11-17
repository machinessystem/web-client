import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BreadCrumb } from '../models/breadcrumb.model';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class BreadcrumbService {
  breadcrumbs: BreadCrumb[];

  constructor(private router: Router, private location: Location) { }
  /**
    * Recursively build breadcrumb according to activated route.
    * @param route
    * @param url
    * @param breadcrumbs
    */
  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    //If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let isClickable = route.routeConfig && route.routeConfig.data && route.routeConfig.data.isClickable;
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
      label = label.charAt(0).toUpperCase() + label.slice(1);
      label = label.replace(/-/g, ' ')
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: BreadCrumb = {
      label: label,
      url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    this.breadcrumbs = newBreadcrumbs;
    return newBreadcrumbs;
  }
  setLabel(label: string, index = this.breadcrumbs.length - 1) {
    this.breadcrumbs[index].label = label;
  }
  navToBack() {
    const state: any = this.location.getState();
    if (state.navigationId == 1) return this.router.navigate(['/']) 
    return this.location.back()
  }
}