/* Angular Modules */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { selectAuthState } from '../../store/reducers/auth.reducer';

/* Material Angular */
import { MatDialog } from '@angular/material/dialog';

/* Components */
import { SigninComponent } from '../components/signin/signin.component';

@Injectable()
export class AuthGuardService implements CanActivate {
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>, private router: Router, public dialog: MatDialog) {
    this.store.pipe(select(selectAuthState)).subscribe(x => this.isAuthenticated = x);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/']);
    this.dialog.open(SigninComponent);
    return false;
  }
}
