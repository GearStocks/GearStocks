/* Angular Modules */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

/* RxJs Dependencies */
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/* Services */
import { UserService } from './user.service';
import { AlertService } from '../../shared/components/gearstocks-alert/services/alert.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router, private alertService: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Erreur: Veuillez réessayer plus tard';
          if (error.error.error) {
            errorMessage = `Erreur: ${error.error.error}`;
          }
          this.alertService.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
}
