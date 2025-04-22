import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as AuthActions from '../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading$: Observable<boolean> = of(false);
  error$: Observable<string | null> = of(null);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.initStoreSelectors();
  }

  ngOnInit(): void {
  }

  private initStoreSelectors(): void {
    setTimeout(() => {
      try {
        this.isLoading$ = this.store.select((state: any) => {
          return state?.auth?.isLoading ?? false;
        }).pipe(
          catchError(error => {
            console.warn('Erreur d\'accès au store (isLoading):', error);
            return of(false);
          })
        );

        this.error$ = this.store.select((state: any) => {
          return state?.auth?.error ?? null;
        }).pipe(
          catchError(error => {
            console.warn('Erreur d\'accès au store (error):', error);
            return of(null);
          })
        );
      } catch (error) {
        console.warn('Erreur lors de l\'initialisation des sélecteurs:', error);
      }
    }, 100);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;

        this.store.dispatch(AuthActions.login({
          credentials: { email, password }
        }));
      } catch (error) {
        console.error('Erreur lors de la tentative de connexion:', error);
      }
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
