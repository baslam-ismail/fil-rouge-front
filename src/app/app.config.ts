// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {authReducer} from "./store/auth/auth.reducer";
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {AuthEffects} from "./store/auth/auth.effects";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects])
  ]
};
