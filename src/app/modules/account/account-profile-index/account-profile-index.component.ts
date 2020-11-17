import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProcessService } from 'src/app/services/process.service';


@Component({
  selector: 'app-account-profile-index',
  templateUrl: './account-profile-index.component.html',
  styleUrls: ['./account-profile-index.component.scss']
})
export class AccountProfileIndexComponent implements OnInit, OnDestroy {

  badges = []
  userSubscription: Subscription;
  user: AppUser;

  footerText = 'Project LATA, an open platform';
  constructor(
    private auth: AuthService,
    private process: ProcessService,
    private router: Router) { }

  ngOnInit(): void {
    this.process.startProgress()
    this.userSubscription = this.auth.appUser$.subscribe(appUser => {
      if (!appUser) return;
      this.user = appUser;
      this.getBadges(appUser.roles)
      this.process.stopProgress();
    })

  }
  getBadges(roles) {
    for (let role in roles) {
      if (roles[role] === true)
        this.badges.push(role.toUpperCase())
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
