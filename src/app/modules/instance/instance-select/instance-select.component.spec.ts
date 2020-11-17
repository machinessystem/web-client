import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSelectComponent } from './instance-select.component';

describe('InstanceSelectComponent', () => {
  let component: InstanceSelectComponent;
  let fixture: ComponentFixture<InstanceSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
