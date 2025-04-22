import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as AuthActions from '../store/auth/auth.actions';
import * as AuthSelectors from '../store/auth/auth.selectors';
import { AuthState, RegisterRequest } from '../core/auth/models/auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, StoreModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword = false;
  isLoading$: Observable<boolean> = of(false);
  error$: Observable<string | null> = of(null);

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    setTimeout(() => {
      try {
        this.isLoading$ = this.store.select((state: any) => {
          return state?.auth?.isLoading ?? false;
        }).pipe(catchError(() => of(false)));

        this.error$ = this.store.select((state: any) => {
          return state?.auth?.error ?? null;
        }).pipe(catchError(() => of(null)));
      } catch (error) {
        console.warn('Erreur lors de l\'accès au store:', error);
      }
    }, 0);
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      try {
        const { name, email, phone, password } = this.registerForm.value;

        const user: RegisterRequest = {
          name,
          email,
          phone,
          password,
          role: 'ADVISOR'
        };

        this.store.dispatch(AuthActions.register({ user }));
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
      }
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Password strength checks
  get hasMinLength(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return password.length >= 8;
  }

  get hasUpperCase(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /[A-Z]/.test(password);
  }

  get hasLowerCase(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /[a-z]/.test(password);
  }

  get hasNumber(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /\d/.test(password);
  }

  get hasSpecialChar(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /[@$!%*?&]/.test(password);
  }

  getPasswordStrength(): string {
    const checks = [
      this.hasMinLength,
      this.hasUpperCase,
      this.hasLowerCase,
      this.hasNumber,
      this.hasSpecialChar
    ].filter(Boolean).length;

    if (checks <= 2) return 'weak';
    if (checks <= 4) return 'medium';
    return 'strong';
  }
}
