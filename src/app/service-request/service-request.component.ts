
import {Component, OnInit, OnDestroy, TemplateRef, ViewChild, AfterViewInit} from '@angular/core';
import { TableComponent } from '../shared/components/table/table.component';
import { ServiceRequestModalComponent } from './service-request-modal/service-request-modal.component';
import { ServiceRequestService } from './service-request.service';
import { TableOptions } from '../shared/components/table/table.model';
import {ServiceRequest,ServiceRequestColumn, DateRange  } from './service-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {NotificationToastComponent} from "../shared/components/notification/notification-toast.component";
import {NotificationService} from "../shared/services/notification.service";
import { BannerComponent } from '../banner/banner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { StatsBannerComponent } from '../shared/stats-banner/stats-banner.component';

@Component({
  selector: 'app-service-requests',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    ServiceRequestModalComponent,
    NotificationToastComponent,
    SidebarComponent,
    BannerComponent,
    ThemeToggleComponent,
    StatsBannerComponent
  ]
})
export class ServiceRequestComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('priorityTemplate') priorityTemplate!: TemplateRef<any>;

  private originalData: ServiceRequest[] = [];
  filteredOperations: ServiceRequest[] = [];

  // Données pour la bannière de stats
  statsBanner = [
    {
      icon: 'calendar' as 'calendar',
      color: 'blue' as 'blue',
      label: 'Nouvelles demandes',
      value: 0 // Sera mis à jour lors du chargement des données
    },
    {
      icon: 'clock' as 'clock',
      color: 'green' as 'green',
      label: 'En cours de traitement',
      value: 0 // Sera mis à jour lors du chargement des données
    },
    {
      icon: 'info' as 'info',
      color: 'orange' as 'orange',
      label: 'Demandes complétées',
      value: 0 // Sera mis à jour lors du chargement des données
    }
  ];

  // Variables pour les filtres
  showFilters = true;
  statusFilter = '';
  priorityFilter = '';
  categoryFilter = '';
  searchTerm = '';
  dateRange: DateRange = {
    start: '',
    end: ''
  };

  // Options de filtres
  statusOptions = ['Nouveau', 'En cours', 'Traité', 'Annulé'];
  priorityOptions = ['Haute', 'Moyenne', 'Basse'];
  categoryOptions = ['Ouverture compte', 'Assurance', 'Prêt'];



  // Variables pour le tableau
  columns: ServiceRequestColumn[] = [
    { key: 'title', label: 'Motif', sortable: true },
    { key: 'clientName', label: 'Client', sortable: true },
    { key: 'clientNumber', label: 'Téléphone', sortable: true },
    { key: 'priority', label: 'Priorité', sortable: true },
    { key: 'category', label: 'Catégorie', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  filteredRequests: ServiceRequest[] = [];

  tableOptions: TableOptions = {
    showSearch: true,
    showColumnSelector: true,
    showExport: true,
    actionsColumn: true,
    pageSize: 10
  };

  selectedRequest: ServiceRequest | null = null;
  private subscription = new Subscription();

  constructor(
    private serviceRequestService: ServiceRequestService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
    this.applyTheme();
  }

  ngAfterViewInit(): void {
    this.initializeColumnTemplates();
  }

  private applyTheme(): void {
    // Vérifier le thème actuel et l'appliquer
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeColumnTemplates(): void {
    setTimeout(() => {
      this.columns = this.columns.map(column => {
        if (column.key === 'status') {
          return { ...column, template: this.statusTemplate };
        }
        if (column.key === 'priority') {
          return { ...column, template: this.priorityTemplate };
        }
        return column;
      });
    });
  }

  private loadRequests(): void {
    const requestsSub = this.serviceRequestService.getServiceRequests().subscribe({
      next: (requests) => {
        this.originalData = requests;
        this.filteredRequests = [...requests];
        this.updateStatsBanner();
        this.applyFilters();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des demandes:', error);
        this.notificationService.error('Erreur lors du chargement des demandes');
      }
    });

    this.subscription.add(requestsSub);
  }

  // Méthode pour mettre à jour les stats de la bannière
  private updateStatsBanner(): void {
    this.statsBanner[0].value = this.getStatCount('Nouveau');
    this.statsBanner[1].value = this.getStatCount('En cours');
    this.statsBanner[2].value = this.getStatCount('Terminé');
  }

  refreshData(): void {
    this.loadRequests();
    this.resetFilters();
  }

  applyFilters(): void {
    let filtered = [...this.originalData];

    // Filtre par texte de recherche
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(req =>
        req.title.toLowerCase().includes(searchLower) ||
        req.clientName.toLowerCase().includes(searchLower) ||
        req.clientNumber.toLowerCase().includes(searchLower) ||
        req.category.toLowerCase().includes(searchLower)
      );
    }

    if (this.statusFilter && this.statusFilter !== 'Tous') {
      filtered = filtered.filter(req => req.status === this.statusFilter);
    }

    if (this.priorityFilter && this.priorityFilter !== 'Toutes') {
      filtered = filtered.filter(req => req.priority === this.priorityFilter);
    }

    if (this.categoryFilter && this.categoryFilter !== 'Toutes') {
      filtered = filtered.filter(req => req.category === this.categoryFilter);
    }

    if (this.dateRange.start || this.dateRange.end) {
      filtered = filtered.filter(req => {
        const reqDate = new Date(req.date);
        const start = this.dateRange.start ? new Date(this.dateRange.start) : null;
        const end = this.dateRange.end ? new Date(this.dateRange.end) : null;

        if (start && reqDate < start) return false;
        if (end && reqDate > end) return false;
        return true;
      });
    }

    this.filteredRequests = filtered;
  }

  resetFilters(): void {
    this.statusFilter = '';
    this.priorityFilter = '';
    this.categoryFilter = '';
    this.searchTerm = '';
    this.dateRange = {
      start: '',
      end: ''
    };

    this.filteredRequests = [...this.originalData];
  }

  // Méthode onSearch pour réagir aux changements dans la barre de recherche
  onSearch(): void {
    this.applyFilters();
  }

  onEdit(request: ServiceRequest): void {
    this.selectedRequest = request;
  }

  onDelete(request: ServiceRequest): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      const deleteSub = this.serviceRequestService.deleteServiceRequest(request.id).subscribe({
        next: () => {
          this.loadRequests();
          this.notificationService.success('Demande supprimée avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.notificationService.error('Erreur lors de la suppression de la demande');
        }
      });

      this.subscription.add(deleteSub);
    }
  }

  onRowDoubleClick(request: ServiceRequest): void {
    console.log('Double-click reçu dans le parent:', request);
    this.selectedRequest = request;
  }

  // Méthode pour compter les demandes par statut
  getStatCount(status: string): number {
    return this.originalData.filter(req => req.status === status).length;
  }

  // Dans la classe du composant
  onRequestUpdate(event: any): void {
    const updateSub = this.serviceRequestService.updateServiceRequest(
      event.request.id,
      event.response
    ).subscribe({
      next: () => {
        this.loadRequests();
        this.selectedRequest = null;
        this.notificationService.success('Demande mise à jour avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour:', error);
        this.notificationService.error('Erreur lors de la mise à jour de la demande');
      }
    });

    this.subscription.add(updateSub);
  }
}
