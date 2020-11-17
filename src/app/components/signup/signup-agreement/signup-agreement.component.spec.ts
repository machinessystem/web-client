import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAgreementComponent } from './signup-agreement.component';

describe('SignupAgreementComponent', () => {
  let component: SignupAgreementComponent;
  let fixture: ComponentFixture<SignupAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
