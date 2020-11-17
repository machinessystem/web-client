import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSettingsActivityDefinitionsComponent } from './instance-settings-activity-definitions.component';

describe('InstanceSettingsActivityDefinitionsComponent', () => {
  let component: InstanceSettingsActivityDefinitionsComponent;
  let fixture: ComponentFixture<InstanceSettingsActivityDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSettingsActivityDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSettingsActivityDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
