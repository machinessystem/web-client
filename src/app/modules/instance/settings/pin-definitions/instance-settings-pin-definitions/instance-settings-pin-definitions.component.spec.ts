import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSettingsPinDefinitionsComponent } from './instance-settings-pin-definitions.component';

describe('InstanceSettingsPinDefinitionsComponent', () => {
  let component: InstanceSettingsPinDefinitionsComponent;
  let fixture: ComponentFixture<InstanceSettingsPinDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSettingsPinDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSettingsPinDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
