import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // Vérifie que c'est bien un composant standalone
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // ✅ Ajout des modules nécessaires
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Connexion réussie !', this.loginForm.value);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Veuillez remplir correctement les champs.');
    }
  }
}
