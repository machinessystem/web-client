import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyControlAddDefinitionComponent } from './energy-control-add-definition.component';

describe('EnergyControlAddDefinitionComponent', () => {
  let component: EnergyControlAddDefinitionComponent;
  let fixture: ComponentFixture<EnergyControlAddDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyControlAddDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyControlAddDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
