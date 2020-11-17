import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyControlDefinitionsComponent } from './energy-control-definitions.component';

describe('EnergyControlDefinitionsComponent', () => {
  let component: EnergyControlDefinitionsComponent;
  let fixture: ComponentFixture<EnergyControlDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyControlDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyControlDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
