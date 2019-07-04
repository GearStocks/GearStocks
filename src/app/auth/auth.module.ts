/* Angular Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Components */
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

/* App Modules */
import { SharedModule } from '../shared/shared.module';

/* Angular Material */
import { MatCheckboxModule, MatInputModule } from '@angular/material';

/* Services */
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  entryComponents: [
    SigninComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MatInputModule,
        MatCheckboxModule
    ],
    exports: [
        SignupComponent
    ],
    providers: [UserService]
})
export class AuthModule { }
