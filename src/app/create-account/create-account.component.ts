import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

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
  }
}
