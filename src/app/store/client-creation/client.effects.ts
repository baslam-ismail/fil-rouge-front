import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as ClientActions from './client.actions';
import { CreationCompteService } from '../../creation-compte/creation-compte.service';

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
    private creationCompteService: CreationCompteService,
    private router: Router
  ) {}

  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.createClient),
      switchMap(({ nom, prenom, email, phone, address }) =>
        this.creationCompteService.createClient({ nom, prenom, email, phone, address }).pipe(
          map(client => ClientActions.createClientSuccess({ client })),
          catchError(error => {
            console.error('Error creating client:', error);
            const errorMessage = error.status === 409
              ? 'Un client avec cet email ou ce numéro de téléphone existe déjà.'
              : error.error?.message || 'Une erreur s\'est produite lors de la création du client.';
            return of(ClientActions.createClientFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  createClientSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ClientActions.createClientSuccess),
        tap(() => {
          // Redirect to client management after successful creation
          setTimeout(() => {
            this.router.navigate(['/customer-portfolio']);
          }, 2000);
        })
      ),
    { dispatch: false }
  );
}
