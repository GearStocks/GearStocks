/* Angular Modules */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* Material Modules */
import { MatDialog } from '@angular/material/dialog';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginSuccess,
  logout,
  logoutSuccess,
  register,
  registerSuccess,
  resetPassword,
  resetPasswordSuccess
} from '../actions/auth.actions';

/* RxJs */
import { map, switchMap, tap } from 'rxjs/operators';

/* Services */
import { UserService } from '../../auth/services/user.service';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(action => this.userService.login(action.authData)),
      map(user => loginSuccess({user: user}))
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user.user));
        localStorage.setItem('token', user.user.token);
        this.dialog.closeAll();
        this.router.navigate(['/']);
      }),
    ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(action => this.userService.register(action.authData)),
      map(() => registerSuccess())
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerSuccess),
      tap(() => {
        this.router.navigate(['/signup-confirmation']);
      }),
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(action => this.userService.logout(action.email)),
      map(user => logoutSuccess())
    )
  );

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutSuccess),
      tap(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }),
    ),
    { dispatch: false }
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPassword),
      switchMap(action => this.userService.resetPassword(action.email)),
      map(user => resetPasswordSuccess())
    )
  );

  resetPasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPasswordSuccess),
      tap(() => {
        this.router.navigate(['/lost-password-confirmation']);
      }),
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private userService: UserService,
              private router: Router,
              private dialog: MatDialog
  ) {}

}
