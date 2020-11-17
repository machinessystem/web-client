import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancePinCmdComponent } from './instance-pin-cmd.component';

describe('InstancePinCmdComponent', () => {
  let component: InstancePinCmdComponent;
  let fixture: ComponentFixture<InstancePinCmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancePinCmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancePinCmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
