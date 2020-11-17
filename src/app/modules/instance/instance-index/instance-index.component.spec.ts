import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceIndexComponent } from './instance-index.component';

describe('InstanceIndexComponent', () => {
  let component: InstanceIndexComponent;
  let fixture: ComponentFixture<InstanceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
