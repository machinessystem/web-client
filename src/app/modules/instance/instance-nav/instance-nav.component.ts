import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Instance } from 'src/app/models/instance.model';
import { AppUser } from 'src/app/models/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InstanceService } from 'src/app/services/instance.service';
import { ProcessService } from 'src/app/services/process.service';
import * as moment from 'moment';

@Component({
  selector: 'app-instance-nav',
  templateUrl: './instance-nav.component.html',
  styleUrls: ['./instance-nav.component.scss']
})
export class InstanceNavComponent implements OnInit, OnDestroy {

  now: any;
  userSubscription: Subscription;
  user: AppUser;

  isInstanceLive: boolean = false;
  currentInstance: Instance;
  instanceSubscription: Subscription;
  instancePresenceSubscription: Subscription;

  links = [
    { name: 'Overview', relativePath: '' },
    { name: 'Settings', relativePath: 'settings' },
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'News', path: '/news' },
  ]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private process: ProcessService,
    private instanceService: InstanceService) { }


  ngOnInit(): void {
    this.now = moment;
    this.populateInstances();
    this.getCurrentUser();
  }
  ngOnDestroy() {
    if (this.instanceSubscription) this.instanceSubscription.unsubscribe()
    if (this.userSubscription) this.userSubscription.unsubscribe()
    if (this.instancePresenceSubscription) this.instancePresenceSubscription.unsubscribe();

  }

  getCurrentUser() {
    this.userSubscription = this.auth.appUser$.subscribe(res => this.user = res)
  }

  populateInstances() {
    this.process.startHeaderProgress();
    this.instanceSubscription = this.getInstanceFromParams().pipe(map(res => {
      if (!res) return null;
      return res;
    }), catchError((err) => {
      this.process.stopHeaderProgress();
      return of(null);
    })).subscribe((i: Instance) => {
      if (!i) return this.router.navigate(['i']);
      this.setInstance(i)
      this.getInstancePresense(i?._id)
      this.process.stopHeaderProgress();
    })
  }

  getInstancePresense(instanceId) {
    this.instancePresenceSubscription = this.instanceService
      .getLivePresence(instanceId)
      .subscribe(res => {

        //Todo: As Presence Settings here
        console.log(res)

      });
  }
  getInstanceFromParams() {
    const instanceId = this.route.snapshot.params['instanceId'];
    if (instanceId) return this.instanceService.get(instanceId);
    return this.getInstanceIdFromParamsMap()
  }

  getInstanceIdFromParamsMap() {
    return this.route.params.pipe(switchMap(route => {
      if (!route['instanceId']) return null;
      return this.instanceService.get(route['instanceId'])
    }))
  }

  routeToSelectedInstance(instanceId: string) {
    this.router.navigate(['i', instanceId]);
  }

  setInstance(instance: Instance) {
    this.currentInstance = instance;
    this.instanceService.setCurrentInstance(instance);
  }
}
