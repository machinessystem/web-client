import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSettingsNavComponent } from './instance-settings-nav.component';

describe('InstanceSettingsNavComponent', () => {
  let component: InstanceSettingsNavComponent;
  let fixture: ComponentFixture<InstanceSettingsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSettingsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSettingsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
