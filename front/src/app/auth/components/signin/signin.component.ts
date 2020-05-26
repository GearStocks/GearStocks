/* Angular Modules */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

/* RxJs Dependencies */
import { first } from 'rxjs/internal/operators/first';

/* Services */
import { UserService } from '../../services/user.service';
import { SigninFormService } from './services/signin-form.service';

/* Material Angular */
import { MatDialogRef } from '@angular/material/dialog';

/* Models */
import { ErrorMessages } from './signin-errors';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [SigninFormService],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
  signForm: FormGroup;
  returnUrl: string;
  loading = false;
  checkBox = false;
  errorMessages = ErrorMessages;

  constructor(
    private userService: UserService,
    private signinFormService: SigninFormService,
    public dialogRef: MatDialogRef<SigninComponent>,
    private router: Router,
    private route: ActivatedRoute) {
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.signForm = this.signinFormService.buildForm();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
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

    this.loading = true;
    const authData = {
      ...this.signForm.getRawValue(),
      rememberMe: this.checkBox
    };
    this.userService.login(authData)
      .pipe(first())
      .subscribe(
        () => {
          this.dialogRef.close();
          this.router.navigate(['/']);
        },
        () => {
          this.loading = false;
        });
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
