import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSettingsGeneralComponent } from './instance-settings-general.component';

describe('InstanceSettingsGeneralComponent', () => {
  let component: InstanceSettingsGeneralComponent;
  let fixture: ComponentFixture<InstanceSettingsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSettingsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSettingsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
