/* Angular modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCarouselModule } from '@ngmodule/material-carousel';

/* App Modules */
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { metaReducers, ROOT_REDUCERS } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';
import { AuthEffects } from './store/effects/auth.effects';
import { CoreEffects } from './store/effects/core.effects';

/* Services */
import { ErrorInterceptor } from './auth/services/error.interceptor';
import { JwtInterceptor } from './auth/services/jwt.interceptor';

/* Components */
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemComponent } from './search-list/components/item/item.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchListComponent } from './search-list/search-list.component';

/* Environment */
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SearchListComponent,
    ItemComponent,
    ProfileComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    SharedModule,
    MatCarouselModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects, AuthEffects, CoreEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
