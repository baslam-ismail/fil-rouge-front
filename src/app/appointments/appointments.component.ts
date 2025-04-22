import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { StatsBannerComponent } from '../shared/stats-banner/stats-banner.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    SidebarComponent,
    BannerComponent,
    CommonModule,
    FormsModule,
    ThemeToggleComponent,
    StatsBannerComponent
  ],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  // Données pour la bannière de stats
  statsBanner = [
    {
      icon: 'calendar' as 'calendar',
      color: 'blue' as 'blue',
      label: 'Rendez-vous aujourd\'hui',
      value: 6
    },
    {
      icon: 'clock' as 'clock',
      color: 'purple' as 'purple',
      label: 'En attente de confirmation',
      value: 15
    },
    {
      icon: 'x-circle' as 'x-circle',
      color: 'red' as 'red',
      label: 'Rendez-vous annulés',
      value: 3
    }
  ];

  appointments = [
    { motif: 'Ouverture compte', clientName: 'Alain FRENAULT', clientNumber: '06 09 49 66 43', priority: 'Haute', date: new Date('2024-06-07'), status: 'En attente' },
    { motif: 'Assurance vie', clientName: 'Sofia ARLOUCHE', clientNumber: '06 49 49 69 43', priority: 'Haute', date: new Date('2024-06-04'), status: 'Confirmé' },
    { motif: 'Demande prêt', clientName: 'Mamadou TOURE', clientNumber: '06 29 19 66 43', priority: 'Moyenne', date: new Date('2024-06-03'), status: 'Annulé' },
    { motif: "Changement d'adresse", clientName: 'Iga SWIATEK', clientNumber: '06 49 42 64 73', priority: 'Basse', date: new Date('2024-05-28'), status: 'Confirmé' },
    { motif: 'Assurance habitation', clientName: 'Maria SHARAPOVA', clientNumber: '07 09 49 67 43', priority: 'Moyenne', date: new Date('2024-05-20'), status: 'En attente' }
  ];

  itemsPerPage = 5;
  currentPage = 1;
  totalPages = 0;

  ngOnInit(): void {
    this.calculatePages();
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

  get paginatedAppointments() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.appointments.slice(startIndex, endIndex);
  }

  get displayStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get displayEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.appointments.length);
  }

  calculatePages(): void {
    this.totalPages = Math.ceil(this.appointments.length / this.itemsPerPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
