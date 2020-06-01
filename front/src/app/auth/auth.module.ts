/* Angular Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* App Modules */
import { SharedModule } from '../shared/shared.module';

/* Components */
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupConfirmationComponent } from './components/signup/signup-confirmation/signup-confirmation.component';
import { LostPasswordComponent } from './components/lost-password/lost-password.component';
// tslint:disable-next-line:max-line-length
import { LostPasswordConfirmationComponent } from './components/lost-password/lost-password-confirmation/lost-password-confirmation.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SignupConfirmationComponent,
    LostPasswordComponent,
    LostPasswordConfirmationComponent
  ],
  entryComponents: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class AuthModule { }
