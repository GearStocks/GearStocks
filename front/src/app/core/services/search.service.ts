/* Angular modules */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({ providedIn: 'root' })
export class SearchService {

  public searchUrl = environment.searchUrl;
  public getItemUrl = environment.getItemUrl;

  constructor(private http: HttpClient) {}

  search(keyword: string) {
    const body = {
      keyWord: keyword
    };
    return this.http.post<any>(this.searchUrl, body, httpOptions);
  }

  getItem(name: string) {
    const body = {
      partName: name
    };
    return this.http.post<any>(this.getItemUrl, body, httpOptions);
  }

}
