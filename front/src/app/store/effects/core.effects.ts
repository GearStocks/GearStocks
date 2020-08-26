/* Angular Modules */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getItem,
  getItemSuccess,
  search,
  searchSuccess
} from '../actions/core.actions';

/* RxJs */
import { map, switchMap, tap } from 'rxjs/operators';

/* Services */
import { SearchService } from '../../search-list/services/search.service';

@Injectable()
export class CoreEffects {

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      switchMap(action => this.searchService.search(action.keyword)),
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

  constructor(private actions$: Actions, private searchService: SearchService,
              private router: Router
  ) {}

}
