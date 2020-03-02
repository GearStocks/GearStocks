import { TestBed } from '@angular/core/testing';

import { LostPasswordFormService } from './lost-password-form.service';

describe('LostPasswordFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LostPasswordFormService = TestBed.get(LostPasswordFormService);
    expect(service).toBeTruthy();
  });
});
