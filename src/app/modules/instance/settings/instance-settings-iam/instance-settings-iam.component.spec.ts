import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSettingsIamComponent } from './instance-settings-iam.component';

describe('InstanceSettingsIamComponent', () => {
  let component: InstanceSettingsIamComponent;
  let fixture: ComponentFixture<InstanceSettingsIamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSettingsIamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSettingsIamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
