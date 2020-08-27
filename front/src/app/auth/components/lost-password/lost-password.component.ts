/* Angular Modules */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { selectAuthState } from '../../../store/reducers/auth.reducer';
import { AppState } from '../../../store/reducers';
import { resetPassword } from '../../../store/actions/auth.actions';

/* Services */
import { LostPasswordFormService } from './services/lost-password-form.service';

/* Models */
import { ErrorMessages } from '../signup/signup-errors';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss'],
  providers: [LostPasswordFormService]
})
export class LostPasswordComponent implements OnInit {
  isAuthenticated: boolean;
  lostPasswordForm: FormGroup;
  display = null;
  errorMessages = ErrorMessages;

  constructor(
    private store: Store<AppState>,
    private lostPasswordFormService: LostPasswordFormService,
    private router: Router) {
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
    if (this.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.lostPasswordForm = this.lostPasswordFormService.buildForm();
  }

  get f() { return this.lostPasswordForm.controls; }

  onSubmit(): void {
    if (this.lostPasswordForm.invalid) {
      Object.keys(this.lostPasswordForm.controls).forEach((field => {
        const control = this.lostPasswordForm.get(field);
        control.markAsTouched({onlySelf: true});
      }));
      return;
    }

    const email = this.lostPasswordForm.get('email').value;
    this.store.dispatch(resetPassword({email: email}));
  }
}
