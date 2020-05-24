/* Angular Modules */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable()
export class HomeService {
  public searchUrl = environment.searchUrl;

  constructor(private http: HttpClient) {}

  search(keyword: string) {
    const body = {
      keyWord: keyword
    };
    return this.http.post<any>(this.searchUrl, body, httpOptions);
  }
}
