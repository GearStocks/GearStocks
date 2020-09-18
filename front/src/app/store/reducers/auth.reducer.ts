/* NgRx */
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  logout,
  logoutSuccess,
  register,
  registerSuccess,
  resetPassword,
  resetPasswordSuccess,
  updateUserData,
  updateUserDataSuccess
} from '../actions/auth.actions';

/* Models */
import { User } from '../../auth/models/user.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User;
  token: string;
}

export const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('token') !== null,
  user: JSON.parse(localStorage.getItem('currentUser')),
  token: localStorage.getItem('token')
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => ({
    ...state,
    user: action.user,
    token: action.user.token,
    isAuthenticated: true
  })),
  on(logoutSuccess, state => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false
  })),
  on(updateUserData, state => ({
    ...state
  })),
  on(updateUserDataSuccess, (state, action) => ({
    ...state,
    user: action.user,
  })),
);

export const selectAuthFeature = createFeatureSelector<AuthState>(
  authFeatureKey
);

export const selectAuthUser = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.user
);

export const selectAuthState = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthToken = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.token
);
