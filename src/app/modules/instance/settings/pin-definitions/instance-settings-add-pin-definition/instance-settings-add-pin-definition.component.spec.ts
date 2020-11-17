import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSettingsAddPinDefinitionComponent } from './instance-settings-add-pin-definition.component';

describe('InstanceSettingsAddPinDefinitionComponent', () => {
  let component: InstanceSettingsAddPinDefinitionComponent;
  let fixture: ComponentFixture<InstanceSettingsAddPinDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSettingsAddPinDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSettingsAddPinDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
