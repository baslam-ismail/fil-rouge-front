import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creation-compte-sidebar',
  templateUrl: './creation-compte-sidebar.component.html',
  styleUrls: ['./creation-compte-sidebar.component.css']
})
export class CreationCompteSidebarComponent implements OnInit {
  // Données pour les compteurs de la sidebar
  statsItems = [
    {
      icon: 'calendar',
      count: 6,
      bgColor: '#1a1c2d',
      iconColor: '#5b8def'
    },
    {
      icon: 'clock',
      count: 15,
      bgColor: '#12b48b',
      iconColor: '#ffffff'
    },
    {
      icon: 'info',
      count: 3,
      bgColor: '#f5a623',
      iconColor: '#ffffff'
    }
  ];

  // Étapes du processus de création de compte
  stepsItems = [
    {
      title: 'Informations personnelles',
      description: 'Coordonnées et identité du client',
      status: 'current',
      icon: 'user'
    },
    {
      title: 'Choix du compte',
      description: 'Type de compte et options',
      status: 'pending',
      icon: 'credit-card'
    },
    {
      title: 'Documents requis',
      description: 'Pièces justificatives à fournir',
      status: 'pending',
      icon: 'file-text'
    },
    {
      title: 'Confirmation',
      description: 'Validation des informations',
      status: 'pending',
      icon: 'check-circle'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Méthode pour obtenir l'icône correspondante (utilisant les icônes de Feather)
  getIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      'calendar': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
      'clock': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      'info': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
      'user': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
      'credit-card': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
      'file-text': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
      'check-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      'search': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
      'plus': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
    };
    
    return icons[iconName] || '';
  }
}
