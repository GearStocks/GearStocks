/* Angular Modules */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

/* RxJs Dependencies */
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/* Models */
import { AuthData } from '../models/auth-data.model';
import { User } from '../models/user.model';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public loginUrl = environment.loginUrl;
  public registerUrl = environment.registerUrl;
  public resetPasswordUrl = environment.resetPasswordUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(authData: AuthData): Observable<User> {
    const body = {
      mail: authData.email,
      password: authData.password,
      rememberMe: authData.rememberMe
    };
    return this.http.post<User>(this.loginUrl, body, httpOptions)
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (authData.rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(this.handleError)
      );
  }

  register(authData: AuthData) {
    const body = {
      firstName: authData.firstName,
      lastName: authData.lastName,
      username: authData.userName,
      mail: authData.email,
      password: authData.password
    };
    return this.http.post<any>(this.registerUrl, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  resetPassword(email: string) {
    return this.http.post<any>(this.resetPasswordUrl, { email: email }, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.message);
  }}
