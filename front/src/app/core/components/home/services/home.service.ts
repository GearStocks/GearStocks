/* Angular Modules */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class HomeService {
  public searchUrl = environment.searchUrl;

  constructor(private http: HttpClient) {}

  search(keyword: string) {
    const params = new HttpParams().set('keyWord', keyword);
    const header = new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.get<any>(this.searchUrl, {headers: header, params: params});
  }
}
