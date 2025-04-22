import { createAction, props } from '@ngrx/store';

// Interface pour la demande de connexion
export interface LoginRequest {
  email: string;
  password: string;
}

// Actions de login
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Actions d'enregistrement
export const register = createAction(
  '[Auth] Register',
  props<{ user: any }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: any }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// Action de déconnexion
export const logout = createAction('[Auth] Logout');

// Actions pour charger le profil utilisateur
export const loadUserProfile = createAction('[Auth] Load User Profile');

export const loadUserProfileSuccess = createAction(
  '[Auth] Load User Profile Success',
  props<{ user: any }>()
);

export const loadUserProfileFailure = createAction(
  '[Auth] Load User Profile Failure',
  props<{ error: string }>()
);
