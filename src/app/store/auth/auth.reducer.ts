import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from '../../core/auth/models/auth.models';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function getToken(): string | null {
  if (isBrowser()) {
    return localStorage.getItem('token');
  }
  return null;
}

export const initialState: AuthState = {
  user: null,
  token: getToken(),
  isAuthenticated: !!getToken(),
  isLoading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(AuthActions.register, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.registerSuccess, state => ({
    ...state,
    isLoading: false,
    error: null
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(AuthActions.logout, state => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
    error: null
  })),

  on(AuthActions.loadUserProfile, state => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.loadUserProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false
  })),

  on(AuthActions.loadUserProfileFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);
