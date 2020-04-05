/* Angular Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Components */
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { LostPasswordComponent } from './components/lost-password/lost-password.component';

/* App Modules */
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ConfirmationComponent,
    LostPasswordComponent
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
