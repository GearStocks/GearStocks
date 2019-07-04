/* Angular Modules */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* Material Angular */
import { MatDialog } from '@angular/material';

/* RxJs dependencies */
import { first } from 'rxjs/operators';

/* Services */
import { UserService } from '../../services/user.service';

/* Components */
import { SigninComponent } from '../signin/signin.component';

/* Models */
import { AuthData } from '../../models/auth-data.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    signForm: FormGroup;
    error: boolean;
    registerError: string;
    public siteKey = '6LczU6MUAAAAAGaba5u9Qt_Peq3_mKk6bKnZ72Ju';

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private router: Router) {}

    static checkPasswords(group: FormGroup) {
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;
        return pass === confirmPass ? null : { notSame: true };
    }

    ngOnInit() {
        this.signForm = this.buildForm();
    }

    buildForm(): FormGroup {
        return this.formBuilder.group({
                firstName: (['', [Validators.required]]),
                lastName: (['', [Validators.required]]),
                username: (['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]),
                email: (['', [Validators.required, Validators.email]]),
                password: (['', [Validators.required, Validators.minLength(8)]]),
                confirmPassword: (['', Validators.required]),
                recaptcha: (['', Validators.required])
            }, { validator: SignupComponent.checkPasswords }
        );
    }

    register(): void {
        if (this.signForm.valid) {
            const authData = <AuthData>this.signForm.getRawValue();
            this.userService.register(authData)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate(['/']);
                        this.login();
                    },
                    error => {
                        this.registerError = error;
                    });
            this.error = false;
        } else {
            this.error = true;
        }
    }

    login(): void {
        this.dialog.open(SigninComponent);
    }

}
