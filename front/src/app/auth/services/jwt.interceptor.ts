/* Angular modules */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

/* NgRx */
import { select, Store } from '@ngrx/store';
import { selectAuthToken } from '../../store/reducers/auth.reducer';
import { AppState } from '../../store/reducers';

/* RxJs Dependencies */
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  token: string;

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(selectAuthToken)).subscribe(x => this.token = x);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.token ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }
    return next.handle(request);
  }
}
