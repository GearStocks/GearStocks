/* Angular Modules */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';

/* RxJs Dependencies */
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/* Services */
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.userService.logout();
        location.reload(true);
        err.message = 'Veuillez vous connecter à nouveau.';
      }
      if (err.status === 404 || err.status === 500 || err.status === 503 || err.status === 504) {
        err.message = 'Erreur, réessayer plus tard.';
      }

      return throwError(err);
    }));
  }
}
