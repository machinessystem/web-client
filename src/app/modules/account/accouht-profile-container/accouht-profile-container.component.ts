import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AppUser } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-accouht-profile-container',
  templateUrl: './accouht-profile-container.component.html',
  styleUrls: ['./accouht-profile-container.component.scss']
})
export class AccouhtProfileContainerComponent implements OnInit, OnDestroy {

  user$: Observable<AppUser>;
  links = [];

  footerText = 'Project LATA, an open platform';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  this.user$=this.auth.appUser$;

  }

  ngOnDestroy() {
  }
}
