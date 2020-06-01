/* Angular Modules */
import { InjectionToken } from '@angular/core';

/* NgRx */
import {
  Action,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { authReducer, AuthState } from './auth.reducer';

/* Environment */
import { environment } from '../../../environments/environment';

export const authFeatureKey = 'auth';

export interface AppState {
  auth: AuthState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<AppState, Action>
  >('Root reducers token', {
  factory: () => ({
    auth: authReducer
  }),
});

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
