import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
<<<<<<< HEAD
export class CreateAccountComponent implements OnInit {
  users: any[] = []; // Liste des utilisateurs
  
  accountData = {
    lastname: '',
    firstname: '',
    phone: '',
    email: '',
    role: '' // Champ ajouté pour stocker le rôle choisi
  };

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
    if (this.accountData.lastname && this.accountData.firstname && this.accountData.phone && this.accountData.email && this.accountData.role) {
      const newAccount = { ...this.accountData };

      this.users.push(newAccount);
      localStorage.setItem('users', JSON.stringify(this.users));

      alert(`${this.accountData.role} ajouté avec succès !`);

      // Réinitialiser le formulaire
      this.accountData = {
        lastname: '',
        firstname: '',
        phone: '',
        email: '',
        role: ''
      };

      // Recharger la liste
      this.loadUsers();
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
=======

export class CreateAccountComponent {
  constructor(private router: Router) {}

  onSubmit(form: any) {
    // Logique de soumission du formulaire ici
    console.log('Form submitted', form);

    // Redirection vers la page "customer portfolio"
    this.router.navigate(['/customer-portfolio']);
>>>>>>> 2bd853dc080c33d40ab4b2ed35b93adcd1ac853e
  }
}
