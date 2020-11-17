import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyMeasurementStatusComponent } from './energy-measurement-status.component';

describe('EnergyMeasurementStatusComponent', () => {
  let component: EnergyMeasurementStatusComponent;
  let fixture: ComponentFixture<EnergyMeasurementStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyMeasurementStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyMeasurementStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
