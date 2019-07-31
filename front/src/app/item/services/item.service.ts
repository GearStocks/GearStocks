/* Angular modules */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* RxJs Dependencies */
import { Observable } from 'rxjs';

/* Models */
import { Item } from '../models/item.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  getItemUrl = environment.getItemUrl;

  constructor(private http: HttpClient) { }

  getItem(): Observable<Item> {
    return this.http.get<Item>(this.getItemUrl);
  }
}
