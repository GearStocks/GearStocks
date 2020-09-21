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
import { AlertService } from '../shared/components/gearstocks-alert/services/alert.service';

/* Models */
import { User } from '../auth/models/user.model';
import { ErrorMessages } from './profile-errors';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/reducers';
import {selectAuthState, selectAuthToken, selectAuthUser} from '../store/reducers/auth.reducer';
import {updateUserData, updateUserDataSuccess} from '../store/actions/auth.actions';
import {Actions, ofType} from '@ngrx/effects';
import {contactSuccess} from '../store/actions/core.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileFormService, ProfileService]
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User;
  userToken: string;
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
    private store: Store<AppState>,
    private myElement: ElementRef,
    private alertService: AlertService,
    private userService: UserService,
    private profileService: ProfileService,
    private profileFormService: ProfileFormService,
    private _actions$: Actions) {
    this.store.pipe(select(selectAuthUser)).subscribe(x => this.currentUser = x);
    this.store.pipe(select(selectAuthToken)).subscribe(x => this.userToken = x);
  }

  ngOnInit() {
    this.profileForm = this.profileFormService.buildForm(this.currentUser);
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
    target.scrollIntoView({ behavior: 'smooth' });
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
    const updateData = {
      username: this.profileDataGroup.get('username').value,
      firstName: this.profileDataGroup.get('firstName').value,
      lastName: this.profileDataGroup.get('lastName').value,
      token: this.userToken
    };

    this.store.dispatch(updateUserData({updateData: updateData}));
    this._actions$.pipe(ofType(updateUserDataSuccess)).subscribe(() => {
      this.dirty = false;
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

    const updateData = {
      mail: this.profileEmailGroup.get('email').value,
      token: this.userToken
    };

    this.store.dispatch(updateUserData({updateData: updateData}));
    this._actions$.pipe(ofType(updateUserDataSuccess)).subscribe(() => {
      this.editEmail = false;
      this.profileEmailGroup.get('email').disable();
      this.profileEmailGroup.get('emailConfirm').reset();
      this.profileEmailGroup.get('password').reset();
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

    const updateData = {
      token: this.currentUser.token,
      password: this.profilePasswordGroup.get('password').value,
    };

    this.store.dispatch(updateUserData({updateData: updateData}));
    this._actions$.pipe(ofType(updateUserDataSuccess)).subscribe(() => {
      this.editPass = false;
      this.profilePasswordGroup.get('password').reset();
      this.profilePasswordGroup.get('confirmPassword').reset();
      this.profilePasswordGroup.get('oldPassword').reset();
    });
  }

}
