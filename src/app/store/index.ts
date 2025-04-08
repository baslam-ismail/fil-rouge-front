import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import {AuthState} from "../core/auth/models/auth.models";


export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};
