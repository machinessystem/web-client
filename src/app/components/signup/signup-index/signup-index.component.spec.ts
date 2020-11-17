import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupIndexComponent } from './signup-index.component';

describe('SignupIndexComponent', () => {
  let component: SignupIndexComponent;
  let fixture: ComponentFixture<SignupIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
