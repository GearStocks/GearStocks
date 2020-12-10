/* Angular Modules */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Environment */
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public filtersUrl = environment.filtersUrl;

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.post<any>(this.filtersUrl, httpOptions);
  }
}
