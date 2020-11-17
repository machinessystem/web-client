import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSettingsUpdateIamComponent } from './instance-settings-update-iam.component';

describe('InstanceSettingsUpdateIamComponent', () => {
  let component: InstanceSettingsUpdateIamComponent;
  let fixture: ComponentFixture<InstanceSettingsUpdateIamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSettingsUpdateIamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSettingsUpdateIamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
