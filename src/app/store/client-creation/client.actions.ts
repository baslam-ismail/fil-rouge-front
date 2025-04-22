import { createAction, props } from '@ngrx/store';
import { Client } from './client.state';

// Create Client
export const createClient = createAction(
  '[Client] Create Client',
  props<{ nom: string; prenom: string; email: string; phone: string; address?: string }>()
);

export const createClientSuccess = createAction(
  '[Client] Create Client Success',
  props<{ client: Client }>()
);

export const createClientFailure = createAction(
  '[Client] Create Client Failure',
  props<{ error: string }>()
);

// Reset state
export const resetClientState = createAction(
  '[Client] Reset Client State'
);
