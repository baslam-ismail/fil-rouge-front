import { createReducer, on } from '@ngrx/store';
import { initialClientState } from './client.state';
import * as ClientActions from './client.actions';

export const clientReducer = createReducer(
  initialClientState,
  
  // Create client
  on(ClientActions.createClient, state => ({
    ...state,
    isLoading: true,
    error: null,
    success: false
  })),
  
  on(ClientActions.createClientSuccess, (state, { client }) => ({
    ...state,
    isLoading: false,
    client,
    error: null,
    success: true
  })),
  
  on(ClientActions.createClientFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    success: false
  })),
  
  // Reset state
  on(ClientActions.resetClientState, () => initialClientState)
);
