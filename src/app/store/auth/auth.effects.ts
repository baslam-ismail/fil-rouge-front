import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import {AuthService} from "../../core/auth/auth.service";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          tap(response => console.log('Réponse du backend :', response)), // afficher rsp
          map(response => {

            this.authService.storeToken(response.token);
            return AuthActions.loginSuccess({ token: response.token });
          }),
          catchError(error =>
            of(AuthActions.loginFailure({ error: error.error || 'Authentication failed' }))
          )
        )
      )
    )
  );


  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap(({ token }) => {

        const userEmail = this.getUserEmailFromToken(token);
        return of(AuthActions.loadUser({ email: userEmail }));
      })
    )
  );

  loadUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loadUserSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );


  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      switchMap(({ email }) =>
        this.authService.getUserByEmail(email).pipe(
          map(user => AuthActions.loadUserSuccess({ user })),
          catchError(error =>
            of(AuthActions.loadUserFailure({ error: error.error || 'Failed to load user profile' }))
          )
        )
      )
    )
  );


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ user }) =>
        this.authService.register(user).pipe(
          map(registeredUser => AuthActions.registerSuccess({ user: registeredUser })),
          catchError(error =>
            of(AuthActions.registerFailure({ error: error.error || 'Registration failed' }))
          )
        )
      )
    )
  );


  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );


  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );


  private getUserEmailFromToken(token: string): string {
    try {
      // Basic JWT parsing
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      return payload.sub; // 'sub' est généralement l'email dans une configuration Spring Security
    } catch (error) {
      console.error('Error decoding token', error);
      return '';
    }
  }
}
