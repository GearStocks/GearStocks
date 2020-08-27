/* Angular modules */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* RxJs */
import { Observable } from 'rxjs';

/* Models */
import { Items } from '../models/items.model';
import { Item } from '../components/item/models/item.model';

/* Environment */
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

  search(keyword: string): Observable<Items> {
    const body = {
      keyWord: keyword
    };
    return this.http.post<any>(this.searchUrl, body, httpOptions);
  }

  getItem(name: string): Observable<Item> {
    const body = {
      partName: name
    };
    return this.http.post<any>(this.getItemUrl, body, httpOptions);
  }

}
