import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountProfileIndexComponent } from './account-profile-index/account-profile-index.component';
import { AccouhtProfileContainerComponent } from './accouht-profile-container/accouht-profile-container.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], component: AccouhtProfileContainerComponent, data: { breadcrumb: 'Profile' }, children: [
      { path: '', component: AccountProfileIndexComponent },
      { path: ':uid', component: AccountProfileIndexComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
