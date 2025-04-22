import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientState } from './client.state';

// Sélecteur pour l'état du client
export const selectClientState = createFeatureSelector<ClientState>('client');

// Sélecteurs dérivés
export const selectClient = createSelector(
  selectClientState,
  (state) => state?.client || null
);

export const selectClientIsLoading = createSelector(
  selectClientState,
  (state) => state?.isLoading || false
);

export const selectClientError = createSelector(
  selectClientState,
  (state) => state?.error || null
);

export const selectClientSuccess = createSelector(
  selectClientState,
  (state) => state?.success || false
);
