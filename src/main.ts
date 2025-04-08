import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/store/auth/auth.effects';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./app/core/interceptors/jwt.interceptor";
import {reducers} from "./app/store";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideRouter(routes),
    provideStore(reducers),
    provideEffects([AuthEffects]),
  ],
}).catch(err => console.error(err));
