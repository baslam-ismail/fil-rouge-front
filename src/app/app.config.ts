import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authReducer } from "./store/auth/auth.reducer";
import { clientReducer } from "./store/client-creation/client.reducer";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { AuthEffects } from "./store/auth/auth.effects";
import { ClientEffects } from "./store/client-creation/client.effects";
import { provideHttpClient } from "@angular/common/http";
import { reducers } from './store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      auth: authReducer,
      client: clientReducer // Renommé de 'clientCreation' à 'client' pour correspondre au sélecteur
    }),
    provideEffects([AuthEffects, ClientEffects])
  ]
};
