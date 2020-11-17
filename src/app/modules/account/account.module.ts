import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharingModule } from '../sharing/sharing.module';
import { AccountProfileIndexComponent } from './account-profile-index/account-profile-index.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccouhtProfileContainerComponent } from './accouht-profile-container/accouht-profile-container.component';


@NgModule({
  declarations: [AccountProfileIndexComponent, AccouhtProfileContainerComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharingModule
  ]
})
export class AccountModule { }
