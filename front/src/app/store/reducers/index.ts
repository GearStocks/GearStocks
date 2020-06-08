/* Angular Modules */
import { InjectionToken } from '@angular/core';

/* NgRx */
import {
  Action,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { authReducer, AuthState } from './auth.reducer';
import { coreReducer, CoreState } from './core.reducer';

/* Environment */
import { environment } from '../../../environments/environment';

export interface AppState {
  auth: AuthState;
  core: CoreState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<AppState, Action>
  >('Root reducers token', {
  factory: () => ({
    auth: authReducer,
    core: coreReducer
  }),
});

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
