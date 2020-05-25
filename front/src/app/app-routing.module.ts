/* Angular modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { HomeComponent } from './core/components/home/home.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { ConfirmationComponent } from './auth/components/confirmation/confirmation.component';
import { LostPasswordComponent } from './auth/components/lost-password/lost-password.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchListComponent } from './core/components/search-list/search-list.component';
import { ContactComponent } from './core/components/contact/contact.component';
import { ItemComponent } from './item/item.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { Item2Component } from './item2/item2.component';

/* Services */
import { AuthGuardService } from './auth/services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', component: SignupComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'lost-password', component: LostPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'search-list', component: SearchListComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'item', component: ItemComponent },

  { path: 'search', component: SearchPageComponent },
  { path: 'item2', component: Item2Component },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})

export class AppRoutingModule { }
