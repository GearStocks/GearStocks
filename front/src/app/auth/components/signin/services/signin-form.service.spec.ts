import { TestBed } from '@angular/core/testing';

import { SigninFormService } from './signin-form.service';

xdescribe('SignupFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SigninFormService = TestBed.get(SigninFormService);
    expect(service).toBeTruthy();
  });
});
