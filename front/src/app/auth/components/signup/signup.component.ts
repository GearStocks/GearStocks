/* Angular Modules */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { register } from '../../../store/actions/auth.actions';
import { selectAuthState } from '../../../store/reducers/auth.reducer';

/* Material Angular */
import { MatDialog } from '@angular/material/dialog';

/* Lottie Animation */
import { AnimationOptions } from 'ngx-lottie';

/* Services */
import { SignupFormService } from './services/signup-form.service';

/* Components */
import { SigninComponent } from '../signin/signin.component';

/* Models */
import { ErrorMessages } from './signup-errors';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupFormService]
})
export class SignupComponent implements OnInit {
  isAuthenticated: boolean;
  signForm: FormGroup;
  captchaError: boolean;
  errorMessages = ErrorMessages;
  options: AnimationOptions = {
    path: '../../../../assets/lottie/15413-registro.json',
  };
  captchaSiteKey = '6LczU6MUAAAAAGaba5u9Qt_Peq3_mKk6bKnZ72Ju';

  constructor(private store: Store<AppState>, private signupFormService: SignupFormService,
    public dialog: MatDialog, private router: Router) {
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
    if (this.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.signForm = this.signupFormService.buildForm();
    this.signForm.get('confirmPassword').valueChanges.subscribe(val => {
      if (SignupFormService.checkPasswords(this.signForm)) {
        this.signForm.get('confirmPassword').setErrors([{'passwordMismatch': true}]);
      }
    });
  }

  get f() { return this.signForm.controls; }

  onSubmit(): void {
    if (this.signForm.invalid) {
      this.captchaError = true;
      Object.keys(this.signForm.controls).forEach((field => {
        const control = this.signForm.get(field);
        control.markAsTouched({onlySelf: true});
      }));
      return;
    }

    const authData = <User>this.signForm.getRawValue();
    this.store.dispatch(register({authData: authData}));
  }

  login(): void {
    this.dialog.open(SigninComponent);
  }

}
