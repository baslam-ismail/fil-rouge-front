import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-customer-portfolio',
  standalone: true,
  imports: [
    SidebarComponent,
    BannerComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './customer-portfolio.component.html',
  styleUrls: ['./customer-portfolio.component.css']
})
export class CustomerPortfolioComponent implements OnInit {
  clients = [
    { id: 12678, lastName: 'FRENAULT', firstName: 'Alain', email: 'alain@microsoft.com', phone: '06 09 49 66 43', address: '10 rue Albert Cachin, 75006, Paris' },
    { id: 12678, lastName: 'ARLOUCHE', firstName: 'Sofia', email: 'sofia@microsoft.com', phone: '06 49 49 69 43', address: '12 rue de Kabylie, 75020, Paris' },
    { id: 12678, lastName: 'TOURE', firstName: 'Mamadou', email: 'mamado@gmail.com', phone: '06 29 19 66 43', address: '45 rue des Pépinières, 75015, Paris' },
    { id: 12678, lastName: 'LUBERT', firstName: 'Francois', email: 'franc@microsoft.com', phone: '07 09 49 66 43', address: '15 rue de Rivoli, 75001, Paris' },
    { id: 12678, lastName: 'PAIRE', firstName: 'Benoit', email: 'benoit@microsoft.com', phone: '07 29 49 66 43', address: '27 rue Alfonse Daudet, 75006, Paris' },
    { id: 12678, lastName: 'SWIATEK', firstName: 'Iga', email: 'iga@microsoft.com', phone: '06 49 42 64 73', address: '65 rue Saint Germain, 75006, Paris' },
    { id: 12678, lastName: 'SHARAPOVA', firstName: 'Maria', email: 'maria@microsoft.com', phone: '07 09 49 67 43', address: '10 rue Saint Antoine, 75006, Paris' },
    { id: 12678, lastName: 'ALI', firstName: 'Mohammed', email: 'moha@microsoft.com', phone: '06 23 66 66 43', address: '23 rue d’Algérie, 75018, Paris' }
  ];

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  selectedClient: any | null = null;

  pagination = {
    start: 1,
    end: this.itemsPerPage,
    total: this.clients.length
  };

  pages: number[] = [];

  ngOnInit(): void {
    this.calculatePages();
  }

  calculatePages(): void {
    this.totalPages = Math.ceil(this.clients.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  paginatedClients() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagination.start = startIndex + 1;
    this.pagination.end = Math.min(startIndex + this.itemsPerPage, this.clients.length);
    return this.clients.slice(startIndex, startIndex + this.itemsPerPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedClients();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatedClients();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginatedClients();
  }

  openClientDetails(client: any): void {
    this.selectedClient = { ...client };
  }

  closeClientDetails(): void {
    this.selectedClient = null;
  }

  updateClient(): void {
    console.log('Mise à jour du client', this.selectedClient);
    this.closeClientDetails();
  }

  deleteClient(): void {
    console.log('Suppression du client', this.selectedClient);
    this.closeClientDetails();
  }
}
