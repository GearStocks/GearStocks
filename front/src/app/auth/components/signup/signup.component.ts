/* Angular Modules */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

/* Material Angular */
import { MatDialog } from '@angular/material/dialog';

/* RxJs dependencies */
import { first } from 'rxjs/operators';

/* Lottie Animation */
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

/* Services */
import { UserService } from '../../services/user.service';
import { AlertService } from '../../../shared/components/gearstocks-alert/services/alert.service';

/* Components */
import { SigninComponent } from '../signin/signin.component';
import { SignupFormService } from './services/signup-form.service';

/* Models */
import { AuthData } from '../../models/auth-data.model';
import { ErrorMessages } from './signup-errors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupFormService]
})
export class SignupComponent implements OnInit {
  signForm: FormGroup;
  loading = false;
  submitted = false;
  captchaError: boolean;
  errorMessages = ErrorMessages;
  options: AnimationOptions = {
    path: '../../../../assets/lottie/15413-registro.json',
  };
  captchaSiteKey = '6LczU6MUAAAAAGaba5u9Qt_Peq3_mKk6bKnZ72Ju';

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private signupFormService: SignupFormService,
    public dialog: MatDialog,
    private router: Router) {
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.signForm = this.signupFormService.buildForm();
    this.signForm.get('confirmPassword').valueChanges.subscribe(val => {
      if (SignupFormService.checkPasswords(this.signForm)) {
        this.signForm.get('confirmPassword').setErrors([{'passwordMismatch': true}]);
      }
    });
  }

  get f() { return this.signForm.controls; }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signForm.invalid) {
      this.captchaError = true;
      Object.keys(this.signForm.controls).forEach((field => {
        const control = this.signForm.get(field);
        control.markAsTouched({onlySelf: true});
      }));
      return;
    }

    this.loading = true;
    const authData = <AuthData>this.signForm.getRawValue();
    this.userService.register(authData)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/confirmation']);
        },
        () => {
          this.loading = false;
        });
    this.captchaError = false;
  }

  login(): void {
    this.dialog.open(SigninComponent);
  }

}
