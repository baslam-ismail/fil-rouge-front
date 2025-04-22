import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { StatsBannerComponent } from '../shared/stats-banner/stats-banner.component';

interface Client {
  name: string;
  email: string;
  phone: string;
  accountType: string;
  balance: number;
  status: string;
}

@Component({
  selector: 'app-customer-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    StatsBannerComponent
  ],
  templateUrl: './customer-portfolio.component.html',
  styleUrls: ['./customer-portfolio.component.css']
})
export class CustomerPortfolioComponent implements OnInit {
  // Données pour la bannière de stats
  statsBanner = [
    {
      icon: 'users' as 'users',
      color: 'blue' as 'blue',
      label: 'Clients actifs',
      value: 124
    },
    {
      icon: 'user-plus' as 'user-plus',
      color: 'green' as 'green',
      label: 'Nouveaux clients',
      value: 15
    },
    {
      icon: 'alert-triangle' as 'alert-triangle',
      color: 'orange' as 'orange',
      label: 'Comptes inactifs',
      value: 3
    }
  ];

  // Données des clients pour démonstration
  clients: Client[] = [
    {
      name: 'Alain FRENAULT',
      email: 'alain.frenault@email.com',
      phone: '06 09 49 66 43',
      accountType: 'Compte courant',
      balance: 2500.75,
      status: 'Actif'
    },
    {
      name: 'Sofia ARLOUCHE',
      email: 'sofia.arlouche@email.com',
      phone: '06 49 49 69 43',
      accountType: 'Compte épargne',
      balance: 12500.00,
      status: 'Actif'
    },
    {
      name: 'Mamadou TOURE',
      email: 'mamadou.toure@email.com',
      phone: '06 29 19 66 43',
      accountType: 'Compte joint',
      balance: 3450.25,
      status: 'Actif'
    },
    {
      name: 'Igor SWIATEK',
      email: 'igor.swiatek@email.com',
      phone: '06 49 42 64 73',
      accountType: 'Compte courant',
      balance: 950.50,
      status: 'Inactif'
    },
    {
      name: 'Maria SHARAPOVA',
      email: 'maria.sharapova@email.com',
      phone: '07 09 49 67 43',
      accountType: 'Compte professionnel',
      balance: 24680.15,
      status: 'Actif'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.applyTheme();
  }

  private applyTheme(): void {
    // Vérifier si window est disponible (pour le rendu côté serveur)
    if (typeof window !== 'undefined') {
      // Vérifier le thème actuel et l'appliquer
      const savedTheme = localStorage?.getItem('theme');
      if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  }
}
