/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Models */
import { Items } from '../../search-list/models/items.model';
import { Item } from '../../search-list/components/item/models/item.model';

export const search = createAction(
  '[App] Search',
  props<{ filters: any }>()
);

export const searchByCategory = createAction(
  '[App] Search by category',
  props<{ category: string }>()
);

export const searchSuccess = createAction(
  '[App] Search Success',
  props<{ list: Items }>()
);

export const getItem = createAction(
  '[App] Get Item',
  props<{ name: string }>()
);

export const getItemSuccess = createAction(
  '[App] Get Item Success',
  props<{ item: Item }>()
);

export const contact = createAction(
  '[App] Contact',
  props<{ data: any }>()
);

export const addFavourite = createAction(
  '[App] Add favourite',
  props<{ name: string }>()
);

export const contactSuccess = createAction(
  '[App] Contact Success'
);
