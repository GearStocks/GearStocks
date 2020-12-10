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
  public addBookmarkUrl = environment.addBookmarkUrl;

  token: string;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.pipe(select(selectAuthToken)).subscribe(x => this.token = x);
  }

  search(filters: any): Observable<Items> {
    let category = '';
    let model = '';

    if (filters.category) {
      category = filters.category.name;
    }

    if (filters.category && filters.subCategory) {
      category = filters.subCategory.name;
    }

    if (filters.brand) {
      model = filters.brand.name;
    }
    if (filters.brand && filters.model) {
      model = filters.model.name;
    }
    const body = {
      keyWord: filters.keyWord,
      filters: {
        'maxPrice': filters.range[1].toString(),
        'minPrice': filters.range[0].toString(),
        'category': category,
        'model': model
    }
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

  addFavourite(name: string): Observable<any> {
    const body = {
      userToken: this.token,
      partName: name
    };
    return this.http.post<any>(this.addBookmarkUrl, body, httpOptions);
  }

}
