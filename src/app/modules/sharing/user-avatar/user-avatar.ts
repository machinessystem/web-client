import { Component, OnInit, Input } from '@angular/core';
import { AppUser } from 'src/app/models/auth';

@Component({
  selector: 'app-user-avatar',
  templateUrl: 'user-avatar.html',
  styleUrls: ['user-avatar.scss']
})
export class AppUserAvatar {
  @Input('user') user: AppUser;
}
