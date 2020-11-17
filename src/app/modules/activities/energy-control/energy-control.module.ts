import { NgModule } from '@angular/core';
import { EnergyControlStatusComponent } from './energy-control-status/energy-control-status.component';
import { SharingModule } from '../../sharing/sharing.module';
import { EnergyControlPinStatusComponent } from './energy-control-pin-status/energy-control-pin-status.component';
import { EnergyControlAddDefinitionComponent } from './energy-control-add-definition/energy-control-add-definition.component';
import { EnergyControlDefinitionsComponent } from './energy-control-definitions/energy-control-definitions.component';

@NgModule({
    declarations: [
        EnergyControlStatusComponent,
        EnergyControlPinStatusComponent,
        EnergyControlAddDefinitionComponent,
        EnergyControlDefinitionsComponent
    ],
    imports: [
        SharingModule,
    ],
    exports: [
        EnergyControlStatusComponent,
        EnergyControlPinStatusComponent,
        EnergyControlAddDefinitionComponent,
        EnergyControlDefinitionsComponent
    ],
})
export class EnergyControlModule {

}