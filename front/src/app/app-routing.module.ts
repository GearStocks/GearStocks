/* Angular modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Services */
import { AuthGuardService } from './auth/services/auth.guard';
import { CategoriesResolver } from './resolvers/categories.resolver';

/* Components */
import { HomeComponent } from './core/components/home/home.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { SignupConfirmationComponent } from './auth/components/signup/signup-confirmation/signup-confirmation.component';
import { LostPasswordComponent } from './auth/components/lost-password/lost-password.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ContactComponent } from './core/components/contact/contact.component';
import { ItemComponent } from './search-list/components/item/item.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { DescriptionComponent } from './core/components/description/description.component';
// tslint:disable-next-line:max-line-length
import { LostPasswordConfirmationComponent } from './auth/components/lost-password/lost-password-confirmation/lost-password-confirmation.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', resolve: { filters: CategoriesResolver } },
  { path: 'register', component: SignupComponent },
  { path: 'signup-confirmation', component: SignupConfirmationComponent },
  { path: 'lost-password', component: LostPasswordComponent },
  { path: 'lost-password-confirmation', component: LostPasswordConfirmationComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'search-list', component: SearchListComponent, resolve: { filters: CategoriesResolver } },
  { path: 'contact', component: ContactComponent },
  { path: 'item', component: ItemComponent },
  { path: 'description', component: DescriptionComponent },

  { path: 'search', component: SearchPageComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    CategoriesResolver
  ]
})

export class AppRoutingModule { }
