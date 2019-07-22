/* Angular Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Components */
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavListComponent } from './components/navbar/sidenav-list/sidenav-list.component';

/* App Modules */
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    SidenavListComponent
  ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        HomeComponent,
        SidenavListComponent
    ]
})
export class CoreModule { }
