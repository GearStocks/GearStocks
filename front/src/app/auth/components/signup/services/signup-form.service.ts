/* Angular Modules */
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class SignupFormService {

  constructor(private formBuilder: FormBuilder) { }

  static checkPasswords(group: FormGroup): any {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
        firstName: (['', [Validators.required]]),
        lastName: (['', [Validators.required]]),
        birthDay: (['', [Validators.required]]),
        username: (['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]),
        email: (['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]),
        password: (['', [Validators.required, Validators.minLength(8)]]),
        confirmPassword: (['', Validators.required]),
        recaptcha: ([''])
      }, { validator: SignupFormService.checkPasswords }
    );
  }

}
