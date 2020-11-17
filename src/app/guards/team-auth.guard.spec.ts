import { TestBed } from '@angular/core/testing';

import { TeamAuthGuard } from './team-auth.guard';

describe('AuthGuardGuard', () => {
  let guard: TeamAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TeamAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
