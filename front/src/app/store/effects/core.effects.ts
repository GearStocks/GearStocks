/* Angular Modules */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addFavourite,
  contact,
  contactSuccess,
  getItem,
  getItemSuccess,
  search, searchByCategory,
  searchSuccess
} from '../actions/core.actions';

/* RxJs */
import { map, switchMap, tap } from 'rxjs/operators';

/* Services */
import { SearchService } from '../../search-list/services/search.service';
import { ContactService } from '../../core/components/contact/services/contact.service';

@Injectable()
export class CoreEffects {

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      switchMap(action => this.searchService.search(action.keyword)),
      map(list => searchSuccess({list: list}))
    )
  );

  searchByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchByCategory),
      switchMap(action => this.searchService.searchByCategory(action.category)),
      map(list => searchSuccess({list: list}))
    )
  );

  searchSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(searchSuccess),
        tap(() => {
          this.router.navigateByUrl('/search-list');
        }),
      ),
    { dispatch: false }
  );

  getItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getItem),
      switchMap(action => this.searchService.getItem(action.name)),
      map(item => getItemSuccess({item: item}))
    )
  );

  getItemSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getItemSuccess),
        tap(() => {
          this.router.navigateByUrl('/item');
        }),
      ),
    { dispatch: false }
  );

  contact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contact),
      switchMap(action => this.contactService.contact(action.data)),
      map(data => contactSuccess())
    )
  );

  addFavourite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFavourite),
      switchMap(action => this.searchService.addFavourite(action.name)))
  );

  constructor(private actions$: Actions, private searchService: SearchService,
              private contactService: ContactService, private router: Router
  ) {}

}
