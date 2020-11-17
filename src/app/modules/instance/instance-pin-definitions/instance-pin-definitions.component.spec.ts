import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancePinDefinitionsComponent } from './instance-pin-definitions.component';

describe('InstancePinDefinitionsComponent', () => {
  let component: InstancePinDefinitionsComponent;
  let fixture: ComponentFixture<InstancePinDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancePinDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancePinDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
