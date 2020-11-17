import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSettingsAddIamComponent } from './instance-settings-add-iam.component';

describe('InstanceSettingsAddIamComponent', () => {
  let component: InstanceSettingsAddIamComponent;
  let fixture: ComponentFixture<InstanceSettingsAddIamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSettingsAddIamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSettingsAddIamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
