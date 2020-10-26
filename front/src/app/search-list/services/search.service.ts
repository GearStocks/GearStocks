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
import {select, Store} from '@ngrx/store';
import {selectAuthToken} from '../../store/reducers/auth.reducer';
import {AppState} from '../../store/reducers';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({ providedIn: 'root' })
export class SearchService {
  public searchUrl = environment.searchUrl;
  public searchByCategoryUrl = environment.searchByCategoryUrl;
  public getItemUrl = environment.getItemUrl;

  token: string;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.pipe(select(selectAuthToken)).subscribe(x => this.token = x);
  }

  search(keyword: string): Observable<Items> {
    const body = {
      keyWord: keyword
    };
    return this.http.post<any>(this.searchUrl, body, httpOptions);
  }

  searchByCategory(category: string): Observable<Items> {
    const body = {
      category: category,
      pageNb: '1',
      userToken: this.token
    };
    return this.http.post<any>(this.searchByCategoryUrl, body, httpOptions);
  }

  getItem(name: string): Observable<Item> {
    const body = {
      partName: name
    };
    return this.http.post<any>(this.getItemUrl, body, httpOptions);
  }

}
