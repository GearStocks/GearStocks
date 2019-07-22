/* Angular Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

/* Material Angular */
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule,
  MatInputModule,
  MatCheckboxModule
} from '@angular/material';

/* LottieAnimation */
import { LottieAnimationViewModule } from 'ng-lottie';

/* captcha */
import { NgxCaptchaModule } from 'ngx-captcha';

/* Components */
import { ErrorsComponent } from './components/errors/errors.component';

@NgModule({
  declarations: [ErrorsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    LottieAnimationViewModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    FlexLayoutModule,
    ErrorsComponent,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule
  ]
})
export class SharedModule { }
