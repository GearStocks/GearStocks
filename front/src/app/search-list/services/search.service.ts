/* Angular modules */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Environment */
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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

  search(keyword: string): Observable<any> {
    const body = {
      keyWord: keyword
    };
    return this.http.post<any>(this.searchUrl, body, httpOptions);
  }

  getItem(name: string): Observable<any> {
    const body = {
      partName: name
    };
    return this.http.post<any>(this.getItemUrl, body, httpOptions);
  }

}
