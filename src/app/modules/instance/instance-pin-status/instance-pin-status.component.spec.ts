import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancePinStatusComponent } from './instance-pin-status.component';

describe('InstancePinStatusComponent', () => {
  let component: InstancePinStatusComponent;
  let fixture: ComponentFixture<InstancePinStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancePinStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancePinStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
