/* Angular Modules */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* RxJs Dependencies */
import { first } from 'rxjs/internal/operators/first';

/* Services */
import { UserService } from '../../services/user.service';

/* Material Angular */
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
    signForm: FormGroup;
    error: boolean;
    loginError: string;
    checkBox = false;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<SigninComponent>,
        private router: Router) {}

    ngOnInit() {
        this.signForm = this.buildForm();
    }

    buildForm(): FormGroup {
        return this.formBuilder.group({
            email: (['', [Validators.required, Validators.email]]),
            password: (['', Validators.required]),
        });
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
                    data => {
                        this.dialogRef.close();
                        this.router.navigate(['/']);
                    },
                    error => {
                        // manage error
                        this.loginError = error;
                    });
            this.error = false;
        } else {
            this.error = true;
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
                data => {
                    // mot de passe modifie avec success
                },
                error => {
                    // manage error
                    this.loginError = error;
                });
    }

    close(): void {
        this.dialogRef.close();
    }
}
