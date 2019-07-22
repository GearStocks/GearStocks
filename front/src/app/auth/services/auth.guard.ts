/* Angular Modules */
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

/* Services */
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

    constructor(private userService: UserService, private router: Router) {}

    canLoad() {
        const currentUser = this.userService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }
        this.router.navigate(['']);
        return false;
    }

    canActivate() {
        const currentUser = this.userService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
