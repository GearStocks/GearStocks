/* Angular Modules */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

/* RxJs */
import { first } from 'rxjs/operators';

/* Services */
import { UserService } from '../../services/user.service';
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
  lostPasswordForm: FormGroup;
  loading = false;
  display = null;
  errorMessages = ErrorMessages;

  constructor(
    private userService: UserService,
    private lostPasswordFormService: LostPasswordFormService,
    private router: Router) {
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
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

    this.loading = true;
    const email = this.lostPasswordForm.get('email').value;
    this.userService.resetPassword(email)
      .pipe(first())
      .subscribe(
        () => {
          this.display = true;
        },
        () => {
          this.loading = false;
        });
  }
}
