/* Angular modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

/* Components */
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { Item2Component } from './item2/item2.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/* App Modules */
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    Item2Component,
    ProfileComponent,
    SearchPageComponent,
    GalleryComponent,
    PageNotFoundComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AuthModule,
        CoreModule,
        SharedModule,
        MatTableModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
