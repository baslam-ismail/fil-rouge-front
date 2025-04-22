import { ActionReducerMap } from '@ngrx/store';
import { ClientState } from './client-creation/client.state';
import { clientReducer } from './client-creation/client.reducer';

export interface AppState {
  client: ClientState;
}

export const reducers: ActionReducerMap<AppState> = {
  client: clientReducer
};
