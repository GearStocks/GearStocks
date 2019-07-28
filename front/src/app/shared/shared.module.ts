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
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule
} from '@angular/material';

/* LottieAnimation */
import { LottieAnimationViewModule } from 'ng-lottie';

/* captcha */
import { NgxCaptchaModule } from 'ngx-captcha';

/* Components */
import { GearstocksInputComponent } from './components/gearstocks-input/gearstocks-input.component';
import { GearstocksSelectComponent } from './components/gearstocks-select/gearstocks-select.component';

@NgModule({
    declarations: [GearstocksInputComponent, GearstocksSelectComponent],
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
        MatTableModule,
        MatSelectModule,
        MatFormFieldModule,
        LottieAnimationViewModule.forRoot(),
    ],
    exports: [
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
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        MatTableModule,
        MatSelectModule,
        MatFormFieldModule,
        GearstocksInputComponent,
        GearstocksSelectComponent
    ]
})
export class SharedModule { }
