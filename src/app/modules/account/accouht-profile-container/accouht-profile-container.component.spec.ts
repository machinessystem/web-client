import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccouhtProfileContainerComponent } from './accouht-profile-container.component';

describe('AccouhtProfileContainerComponent', () => {
  let component: AccouhtProfileContainerComponent;
  let fixture: ComponentFixture<AccouhtProfileContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccouhtProfileContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccouhtProfileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
