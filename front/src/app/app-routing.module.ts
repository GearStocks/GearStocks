/* Angular modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { HomeComponent } from './core/components/home/home.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { ConfirmationComponent } from './auth/components/confirmation/confirmation.component';
import { LostPasswordComponent } from './auth/components/lost-password/lost-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemComponent } from './item/item.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { Item2Component } from './item2/item2.component';
import { GalleryComponent } from './gallery/gallery.component';

/* Services */
import { AuthGuardService } from './auth/services/auth.guard';
import { ItemResolverService } from './item/services/item-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', component: SignupComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'lost-password', component: LostPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },

  { path: 'item', component: ItemComponent, resolve: {item: ItemResolverService} },
  { path: 'search', component: SearchPageComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'item2', component: Item2Component },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    ItemResolverService
  ]
})

export class AppRoutingModule { }
