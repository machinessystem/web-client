import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyControlPinStatusComponent } from './energy-control-pin-status.component';

describe('EnergyControlPinStatusComponent', () => {
  let component: EnergyControlPinStatusComponent;
  let fixture: ComponentFixture<EnergyControlPinStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyControlPinStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyControlPinStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
