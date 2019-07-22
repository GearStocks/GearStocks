/* Angular Modules */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

/* RxJs Dependencies */
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/* Services */
import { UserService } from '../../../auth/services/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.userService.logout();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
