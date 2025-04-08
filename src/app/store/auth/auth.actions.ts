import { createAction, props } from '@ngrx/store';
import {RegisterRequest, User} from "../../core/auth/models/auth.models";


export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);


export const loadUser = createAction(
  '[Auth] Load User',
  props<{ email: string }>()
);

export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[Auth] Load User Failure',
  props<{ error: string }>()
);


export const register = createAction(
  '[Auth] Register',
  props<{ user: RegisterRequest }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// Logout action
export const logout = createAction('[Auth] Logout');
