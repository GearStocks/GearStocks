/* NgRx */
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import {
  addFavouriteSuccess,
  contact,
  contactSuccess,
  getItem,
  getItemSuccess,
  search,
  searchSuccess
} from '../actions/core.actions';

/* Models */
import { Items } from '../../search-list/models/items.model';
import { Item } from '../../search-list/components/item/models/item.model';

export const coreFeatureKey = 'core';

export interface CoreState {
  searchList: Items;
  item: Item;
}

export const initialState: CoreState = {
  searchList: null,
  item: null
};

export const coreReducer = createReducer(
  initialState,
  on(search, state => ({
    ...state
  })),
  on(searchSuccess, (state, action) => ({
    ...state,
    searchList: action.list
  })),
  on(getItem, state => ({
    ...state
  })),
  on(getItemSuccess, (state, action) => ({
    ...state,
    item: action.item
  }))
);

export const selectCoreFeature = createFeatureSelector<CoreState>(
  coreFeatureKey
);

export const selectSearchList = createSelector(
  selectCoreFeature,
  (state: CoreState) => state.searchList
);

export const selectItem = createSelector(
  selectCoreFeature,
  (state: CoreState) => state.item
);
