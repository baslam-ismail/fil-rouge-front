import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from "../../core/auth/models/auth.models";

// Sélecteur sécurisé qui retourne une valeur par défaut si l'état auth n'existe pas
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Sélecteurs sécurisés avec vérification de null/undefined
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.user ?? null
);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.token ?? null
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.isAuthenticated ?? false
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.isLoading ?? false
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.error ?? null
);

export const selectUserRole = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.user?.role ?? null
);
