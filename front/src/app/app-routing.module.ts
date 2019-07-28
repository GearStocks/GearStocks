/* Angular modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { HomeComponent } from './core/components/home/home.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemComponent } from './item/item.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { Item2Component } from './item2/item2.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProfileComponent } from './profile/profile.component';

/* Services */
import { AuthGuardService } from './auth/services/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'register', component: SignupComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'search', component: SearchPageComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'item', component: ItemComponent },
    { path: 'item2', component: Item2Component },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        AuthGuardService
    ]
})

export class AppRoutingModule { }
