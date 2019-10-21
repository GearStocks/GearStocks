/* Angular Modules */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

/* RxJs Dependencies */
import { first } from 'rxjs/internal/operators/first';

/* Services */
import { UserService } from '../../services/user.service';
import { SigninFormService } from './services/signin-form.service';

/* Material Angular */
import { MatDialogRef } from '@angular/material';

/* Models */
import { ErrorMessages } from './signin-errors';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
    signForm: FormGroup;
    errorMessages = ErrorMessages;
    checkBox = false;

    constructor(
        private userService: UserService,
        private signinFormService: SigninFormService,
        public dialogRef: MatDialogRef<SigninComponent>,
        private router: Router) {}

    ngOnInit() {
        this.signForm = this.signinFormService.buildForm();
    }

    getCheckBoxvalue(event): void {
        this.checkBox = event.checked;
    }

    login(): void {
        if (this.signForm.valid) {
            const authData = {
                ...this.signForm.getRawValue(),
                rememberMe: this.checkBox
            };
            this.userService.login(authData)
                .pipe(first())
                .subscribe(
                    () => {},
                    () => {},
                    () => {
                        this.dialogRef.close();
                        this.router.navigate(['/']);
                    });
        } else {
            Object.keys(this.signForm.controls).forEach((field => {
                const control = this.signForm.get(field);
                control.markAsTouched({onlySelf: true});
            }));
        }
    }

    register(): void {
        this.close();
        this.router.navigate(['/register']);
    }

    resetPassword(): void {
        const data = this.signForm.getRawValue();
        this.userService.resetPassword(data.email)
            .pipe(first())
            .subscribe(
                () => {},
                () => {},
                () => {});
    }

    close(): void {
        this.dialogRef.close();
    }
}
