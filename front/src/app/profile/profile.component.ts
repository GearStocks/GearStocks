/* Angular Modules */
import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

/* RxJs Dependencies */
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

/* Services */
import { ProfileFormService } from './services/profile-form.service';
import { UserService } from '../auth/services/user.service';
import { ProfileService } from './services/profile.service';

/* Models */
import { User } from '../auth/models/user.model';
import { ErrorMessages } from './profile-errors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileFormService, ProfileService]
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User;
  profileForm: FormGroup;
  profileFormSubscription: Subscription;
  emailFormSubscription: Subscription;
  passwordFormSubscription: Subscription;
  formCompare: any;
  errorMessages = ErrorMessages;
  dirty = false;
  editEmail = false;
  editPass = false;
  profileDatalist = [
    {
      name:  'Informations personnelles',
      target: '#general',
      active: true
    },
    {
      name:  'E-mail',
      target: '#email',
      active: false
    },
    {
      name: 'Mot de passe',
      target: '#password',
      active: false
    }
  ];

  constructor(
    private myElement: ElementRef,
    private userService: UserService,
    private profileService: ProfileService,
    private profileFormService: ProfileFormService) {
    this.currentUser = this.userService.currentUserValue;
    console.log(this.currentUser);
  }

  ngOnInit() {
    this.profileForm = this.profileFormService.buildForm(this.currentUser.data[0]);
    this.formCompare = this.profileDataGroup.getRawValue();
    this.profileFormSubscription = this.profileDataGroup.valueChanges.subscribe(val => {
      this.dirty = JSON.stringify(val) !== JSON.stringify(this.formCompare);
    });
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.profileFormSubscription)) {
      this.profileFormSubscription.unsubscribe();
    }
    if (!isNullOrUndefined(this.passwordFormSubscription)) {
      this.passwordFormSubscription.unsubscribe();
    }
    if (!isNullOrUndefined(this.emailFormSubscription)) {
      this.emailFormSubscription.unsubscribe();
    }
  }

  get profileDataGroup() {
    return this.profileForm.get('profileDataGroup') as FormGroup;
  }

  get profileEmailGroup() {
    return this.profileForm.get('profileEmailGroup') as FormGroup;
  }

  get profilePasswordGroup() {
    return this.profileForm.get('profilePasswordGroup') as FormGroup;
  }

  activeClass(element): void {
    this.profileDatalist.map((el) => {
      el.active = false;
      return el;
    });
    const target = this.myElement.nativeElement.querySelector(element.target);
    const y = target.getBoundingClientRect().top;
    document.querySelector('mat-sidenav-content').scrollTo({
      top: y,
      behavior: 'smooth',
    });
    element.active = !element.active;
  }

  editMail(): void {
    this.editEmail = true;
    this.profileEmailGroup.get('email').enable();
    this.emailFormSubscription = this.profileEmailGroup.get('emailConfirm').valueChanges.subscribe(val => {
      if (ProfileFormService.checkEmails(this.profileEmailGroup)) {
        this.profileEmailGroup.get('emailConfirm').setErrors([{'emailMismatch': true}]);
      }
    });
  }

  editPassword(): void {
    this.editPass = true;
    this.passwordFormSubscription = this.profilePasswordGroup.get('confirmPassword').valueChanges.subscribe(val => {
      if (ProfileFormService.checkPasswords(this.profilePasswordGroup)) {
        this.profilePasswordGroup.get('confirmPassword').setErrors([{'passwordMismatch': true}]);
      }
    });
  }

  cancelEditMail(): void {
    this.emailFormSubscription.unsubscribe();
    this.editEmail = false;
    this.profileEmailGroup.get('email').disable();
    this.profileEmailGroup.get('email').setValue(this.formCompare.email);
    this.profileEmailGroup.get('emailConfirm').reset();
    this.profileEmailGroup.get('password').reset();
  }

  cancelEditPassword(): void {
    this.passwordFormSubscription.unsubscribe();
    this.editPass = false;
    this.profilePasswordGroup.get('confirmPassword').reset();
    this.profilePasswordGroup.get('password').reset();
    this.profilePasswordGroup.get('oldPassword').reset();
  }

  submitProfileData(): void {
    this.profileService.updateProfileData(this.profileDataGroup.getRawValue())
      .pipe(first())
      .subscribe(
        (user: User) => {},
        () => {
          // error
        });
  }

  submitProfileEmail(): void {
    if (this.profileEmailGroup.invalid) {
      Object.keys(this.profileEmailGroup.controls).forEach((field => {
        const control = this.profileEmailGroup.get(field);
        control.markAsTouched({onlySelf: true});
      }));
      return;
    }

    this.profileService.updateEmail(this.profileEmailGroup.getRawValue())
      .pipe(first())
      .subscribe(
        () => {
          this.editEmail = false;
          this.profileEmailGroup.get('email').disable();
          this.profileEmailGroup.get('emailConfirm').reset();
          this.profileEmailGroup.get('password').reset();
        },
        () => {
          // error
        });
  }

  submitProfilePassword(): void {
    if (this.profilePasswordGroup.invalid) {
      Object.keys(this.profileEmailGroup.controls).forEach((field => {
        const control = this.profileEmailGroup.get(field);
        control.markAsTouched({onlySelf: true});
      }));
      return;
    }

    this.profileService.updatePassword(this.profilePasswordGroup.getRawValue())
      .pipe(first())
      .subscribe(
        () => {
          this.editPass = false;
          this.profilePasswordGroup.get('password').reset();
          this.profilePasswordGroup.get('confirmPassword').reset();
          this.profilePasswordGroup.get('oldPassword').reset();
        },
        () => {
          // error
        });
  }

}
