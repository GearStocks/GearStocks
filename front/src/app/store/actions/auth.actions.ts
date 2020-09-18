/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Models */
import { User } from '../../auth/models/user.model';
import { AuthData } from '../../auth/models/auth-data.model';

export const login = createAction(
  '[Auth] Login',
  props<{ authData: AuthData }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const logout = createAction(
  '[Auth] Logout',
  props<{ email: string }>()
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success'
);

export const register = createAction(
  '[Auth] Register',
  props<{ authData: User }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success'
);

export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ email: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success'
);

export const updateUserData = createAction(
  '[App] Update user data',
  props<{ updateData: User }>()
);

export const updateUserDataSuccess = createAction(
  '[App] Update user data Success',
  props<{ user: User }>()
);
