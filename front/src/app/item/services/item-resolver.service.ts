/* Angular modules */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

/* RxJs Dependencies */
import { Observable } from 'rxjs';

/* Services */
import { ItemService } from './item.service';

/* Models */
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemResolverService implements Resolve<Item> {

  constructor(private itemService: ItemService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> {
    return this.itemService.getItem();
  }
}
