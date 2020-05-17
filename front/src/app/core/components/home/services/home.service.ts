/* Angular Modules */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

/* RxJs */
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class HomeService {
  public searchUrl = environment.searchUrl;

  constructor(private http: HttpClient) {}

  search(keywords: string) {
    const params = new HttpParams().set('keywords', keywords);

    return this.http.get<any>(this.searchUrl, {params: params})
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
  }
}
