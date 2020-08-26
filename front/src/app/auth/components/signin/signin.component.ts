/* Angular Modules */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

/* NgRx */
import {select, Store} from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { login } from '../../../store/actions/auth.actions';
import {selectAuthState, selectAuthUser} from '../../../store/reducers/auth.reducer';

/* Material Angular */
import { MatDialogRef } from '@angular/material/dialog';

/* Services */
import { SigninFormService } from './services/signin-form.service';

/* Models */
import { ErrorMessages } from './signin-errors';
import { AuthData } from '../../models/auth-data.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [SigninFormService],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
  isAuthenticated: boolean;
  signForm: FormGroup;
  checkBox = false;
  errorMessages = ErrorMessages;

  constructor(private store: Store<AppState>, private signinFormService: SigninFormService,
    public dialogRef: MatDialogRef<SigninComponent>, private router: Router, private route: ActivatedRoute) {
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
    if (this.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.signForm = this.signinFormService.buildForm();
  }

  get f() { return this.signForm.controls; }

  getCheckBoxvalue(event): void {
    this.checkBox = event.checked;
  }

  onSubmit(): void {
    if (this.signForm.invalid) {
      Object.keys(this.signForm.controls).forEach((field => {
        const control = this.signForm.get(field);
        control.markAsTouched({onlySelf: true});
      }));
      return;
    }

    const authData = <AuthData>{
      ...this.signForm.getRawValue(),
      rememberMe: this.checkBox
    };
    this.store.dispatch(login({authData: authData}));
  }

  register(): void {
    this.close();
    this.router.navigate(['/register']);
  }

  resetPassword(): void {
    this.close();
    this.router.navigate(['/lost-password']);
  }

  close(): void {
    this.dialogRef.close();
  }
}
