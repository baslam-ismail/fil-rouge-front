import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    SidebarComponent,
    BannerComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  users: any[] = []; // Liste des utilisateurs
  
  accountForm = this.fb.group({
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Charger les utilisateurs existants
    this.loadUsers();
  }

  // Charger les utilisateurs depuis localStorage
  loadUsers() {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.accountForm.valid) {
      const newAccount = { ...this.accountForm.value };

      this.users.push(newAccount);
      localStorage.setItem('users', JSON.stringify(this.users));

      alert(`Compte créé avec succès !`);

      // Réinitialiser le formulaire
      this.accountForm.reset();

      // Recharger la liste
      this.loadUsers();
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
