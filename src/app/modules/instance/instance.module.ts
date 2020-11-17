import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstanceRoutingModule } from './instance-routing.module';

import { SharingModule } from '../sharing/sharing.module';
import { EnergyControlModule } from '../activities/energy-control/energy-control.module';

import { InstanceSelectComponent } from './instance-select/instance-select.component';
import { InstanceCreateComponent } from './instance-create/instance-create.component';
import { InstanceNavComponent } from './instance-nav/instance-nav.component';
import { InstanceIndexComponent } from './instance-index/instance-index.component';
import { InstancePinDefinitionsComponent } from './instance-pin-definitions/instance-pin-definitions.component';
import { InstancePinStatusComponent } from './instance-pin-status/instance-pin-status.component';
import { InstancePinCmdComponent } from './instance-pin-cmd/instance-pin-cmd.component';

import { InstanceSettingsNavComponent } from './settings/instance-settings-nav/instance-settings-nav.component';
import { InstanceSettingsGeneralComponent } from './settings/instance-settings-general/instance-settings-general.component';
import { InstanceSettingsPinDefinitionsComponent } from './settings/pin-definitions/instance-settings-pin-definitions/instance-settings-pin-definitions.component';
import { InstanceSettingsAddPinDefinitionComponent, InstanceSettingsAppPinNameComponent } from './settings/pin-definitions/instance-settings-add-pin-definition/instance-settings-add-pin-definition.component';
import { InstanceSettingsIamComponent } from './settings/instance-settings-iam/instance-settings-iam.component';
import { InstanceSettingsAddIamComponent } from './settings/instance-settings-add-iam/instance-settings-add-iam.component';
import { InstanceSettingsUpdateIamComponent } from './settings/instance-settings-update-iam/instance-settings-update-iam.component';
import { InstanceSettingsActivityDefinitionsComponent } from './settings/instance-settings-activity-definitions/instance-settings-activity-definitions.component';


@NgModule({
  declarations: [
    InstanceNavComponent,
    InstanceSelectComponent,
    InstanceCreateComponent,
    InstanceIndexComponent,
    InstancePinStatusComponent,
    InstancePinCmdComponent,
    InstancePinDefinitionsComponent,

    InstanceSettingsNavComponent,
    InstanceSettingsGeneralComponent,
    InstanceSettingsPinDefinitionsComponent,
    InstanceSettingsAddPinDefinitionComponent,
    InstanceSettingsAppPinNameComponent,
    InstanceSettingsIamComponent,
    InstanceSettingsAddIamComponent,
    InstanceSettingsUpdateIamComponent,
    InstanceSettingsActivityDefinitionsComponent,
  ],
  imports: [
    CommonModule,
    EnergyControlModule,
    SharingModule,
    InstanceRoutingModule,
  ],
  entryComponents: [
    InstanceSettingsAddIamComponent,
    InstanceSettingsUpdateIamComponent,
    InstanceSettingsAppPinNameComponent
  ]
})
export class InstanceModule { }
