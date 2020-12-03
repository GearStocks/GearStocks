/* Angular Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

/* Material Angular */
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';

/* LottieAnimation */
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

/* captcha */
import { NgxCaptchaModule } from 'ngx-captcha';

/* Components */
import { GearstocksInputComponent } from './components/gearstocks-input/gearstocks-input.component';
import { GearstocksSelectComponent } from './components/gearstocks-select/gearstocks-select.component';
import { GearstocksAlertComponent } from './components/gearstocks-alert/gearstocks-alert.component';
import { GearstocksTextareaComponent } from './components/gearstocks-textarea/gearstocks-textarea.component';
import { GearstocksBackToTopComponent } from './components/gearstocks-back-to-top/gearstocks-back-to-top.component';
import { GearstocksFavouriteButtonComponent } from './components/gearstocks-favourite-button/gearstocks-favourite-button.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    GearstocksInputComponent,
    GearstocksSelectComponent,
    GearstocksAlertComponent,
    GearstocksTextareaComponent,
    GearstocksBackToTopComponent,
    GearstocksFavouriteButtonComponent
  ],
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
    MatProgressBarModule,
    MatGridListModule,
    LottieModule.forRoot({ player: playerFactory })
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
    MatProgressBarModule,
    MatGridListModule,
    LottieModule,
    GearstocksInputComponent,
    GearstocksSelectComponent,
    GearstocksAlertComponent,
    GearstocksTextareaComponent,
    GearstocksBackToTopComponent,
    GearstocksFavouriteButtonComponent
  ]
})
export class SharedModule { }
