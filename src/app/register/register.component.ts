import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>
  ) {
    // Simplified the form - removed address and phone which aren't shown in the UI
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
    this.error$ = this.store.select(AuthSelectors.selectError);
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    // Always submit the form regardless of validation status
    // This ensures the button works even if there are subtle validation issues
    const { name, email, password } = this.registerForm.value;

    const user: RegisterRequest = {
      name,
      email,
      password,
      role: 'advisor'
    };

    this.store.dispatch(AuthActions.register({ user }));
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
