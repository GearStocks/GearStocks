/* Angular Modules */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

/* Material Angular */
import { MatDialog } from '@angular/material/dialog';

/* Services */
import { UserService } from './user.service';

/* Components */
import { SigninComponent } from '../components/signin/signin.component';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.userService.currentUserValue;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/']);
    this.dialog.open(SigninComponent);
    return false;
  }
}
