/* Angular Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCarouselModule } from '@ngmodule/material-carousel';

/* App Modules */
import { SharedModule } from '../shared/shared.module';

/* Font Awesome Module */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/* Components */
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavListComponent } from './components/navbar/sidenav-list/sidenav-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { DescriptionComponent } from './components/description/description.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    SidenavListComponent,
    ContactComponent,
    DescriptionComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        FontAwesomeModule,
        MatCarouselModule
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        HomeComponent,
        SidenavListComponent
    ]
})
export class CoreModule { }
