import { createFeatureSelector, createSelector } from '@ngrx/store';
import {AuthState} from "../../core/auth/models/auth.models";



export const selectAuthState = createFeatureSelector<AuthState>('auth');


export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);


export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);


export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);


export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);


export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);


export const selectUserRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.role
);
