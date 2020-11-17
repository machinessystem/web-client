import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from './../../../models/auth';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {
  user$: Observable<AppUser>;
  links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Docs', path: '/docs' },
    { name: 'News', path: '/news' },
  ]

  footerText = 'Project LATA, an open platform';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.auth.appUser$;
  }

}
