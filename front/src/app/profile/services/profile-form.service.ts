/* Angular Modules */
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';

/* Models */
import { User } from '../../auth/models/user.model';

@Injectable()
export class ProfileFormService {

  constructor(private formBuilder: FormBuilder) { }

  static checkEmails(group: FormGroup) {
    const email = group.controls.email.value;
    const emailConfirm = group.controls.emailConfirm.value;
    return email === emailConfirm ? null : { notSame: true };
  }

  static checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  buildForm(user: User): FormGroup {
    return this.formBuilder.group({
      profileDataGroup: this.createProfileDataGroup(user),
      profileEmailGroup: this.createProfileEmailGroup(user),
      profilePasswordGroup: this.createProfilePasswordGroup(),
    });
  }

  createProfileDataGroup(user: User): FormGroup {
    return this.formBuilder.group({
      firstName: [
        !isNullOrUndefined(user.firstName) ? user.firstName : '',
        [Validators.required]
      ],
      lastName: [
        !isNullOrUndefined(user.lastName) ? user.lastName : '',
        [Validators.required]
      ],
      username: [
        !isNullOrUndefined(user.username) ? user.username : '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      ],
      /*
      address: [
        !isNullOrUndefined(user.address) ? user.address : '',
      ],
      city: [
        !isNullOrUndefined(user.city) ? user.city : '',
      ],
      phone: [
        !isNullOrUndefined(user.phone) ? user.phone : '',
        [Validators.maxLength(10)]
      ],
       */
    });
  }

  createProfileEmailGroup(user: User): FormGroup {
    return this.formBuilder.group({
      email: new FormControl({
        value: !isNullOrUndefined(user.email) ? user.email : '',
        disabled: true
      }, { validators: [Validators.required, Validators.email]}),
      emailConfirm: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [Validators.required]
      ]
    }, { validator: ProfileFormService.checkEmails });
  }

  createProfilePasswordGroup(): FormGroup {
    return this.formBuilder.group({
      showPassword: new FormControl({
        value: 'azerty',
        disabled: true
      }),
      password: [
        '',
        [Validators.required, Validators.minLength(8)]
      ],
      confirmPassword: [
        '',
        [Validators.required]
      ],
      oldPassword: [
        '',
        [Validators.required]
      ]
    }, { validator: ProfileFormService.checkPasswords });
  }

}
