import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileIndexComponent } from './account-profile-index.component';

describe('AccountProfileIndexComponent', () => {
  let component: AccountProfileIndexComponent;
  let fixture: ComponentFixture<AccountProfileIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountProfileIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountProfileIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
