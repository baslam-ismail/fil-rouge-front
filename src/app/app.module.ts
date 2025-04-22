import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';

import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { CreationCompteModule } from './creation-compte/creation-compte.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { ThemeToggleModule } from './theme-toggle/theme-toggle.module';

import { AuthService } from './services/auth.service';

// Fonction d'initialisation pour précharger le store
export function initializeAuthState(store: Store) {
  return () => {
    console.log('Initialisation du store auth...');
    return Promise.resolve();
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    AuthModule,
    LoginModule,
    CreationCompteModule,
    SidebarModule,
    ThemeToggleModule,

    StoreModule.forRoot({
      auth: authReducer,
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuthState,
      deps: [Store],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
