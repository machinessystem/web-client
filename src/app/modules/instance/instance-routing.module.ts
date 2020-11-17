import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstanceIndexComponent } from './instance-index/instance-index.component';
import { InstanceSelectComponent } from './instance-select/instance-select.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { InstanceSettingsGeneralComponent } from './settings/instance-settings-general/instance-settings-general.component';
import { InstanceSettingsNavComponent } from './settings/instance-settings-nav/instance-settings-nav.component';
import { InstanceNavComponent } from './instance-nav/instance-nav.component';
import { InstancePinStatusComponent } from './instance-pin-status/instance-pin-status.component';
import { InstanceSettingsPinDefinitionsComponent } from './settings/pin-definitions/instance-settings-pin-definitions/instance-settings-pin-definitions.component';
import { InstanceSettingsActivityDefinitionsComponent } from './settings/instance-settings-activity-definitions/instance-settings-activity-definitions.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: InstanceSelectComponent },
      {
        path: ':instanceId', component: InstanceNavComponent,
        children: [
          { path: 'overview', component: InstanceIndexComponent },
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          {
            path: 'status', children: [
              { path: ':pinNo', component: InstancePinStatusComponent }
            ]
          },
          {
            path: 'settings', component: InstanceSettingsNavComponent, children: [
              { path: 'general', component: InstanceSettingsGeneralComponent },
              { path: '', redirectTo: 'general', pathMatch: 'full' },
              { path: 'activity-definitions', component: InstanceSettingsActivityDefinitionsComponent },
              // { path: 'iam', component: InstanceSettingsIamComponent },
              { path: 'pin-definitions', component: InstanceSettingsPinDefinitionsComponent }
            ]
          }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstanceRoutingModule { }
