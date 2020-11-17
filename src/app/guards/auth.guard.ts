import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(map(user => {
      if (user) return true;
      this.router.navigate(['/login'], { queryParams: { continue: state.url } })
      return false;
    }), catchError((err) => {
      this.router.navigate(['/login'], { queryParams: { continue: state.url } });
      return of(false);
    }))
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(map(user => {
      if (user) return true;
      return false;
    }), catchError((err) => {
      return of(false);
    }))
  }
}
