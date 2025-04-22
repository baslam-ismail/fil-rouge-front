import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DailyOperationsService } from './daily-operations.service';
import { TableComponent } from '../shared/components/table/table.component';
import { TableOptions } from '../shared/components/table/table.model';
import {DailyOperation, OperationColumn,} from './daily-operations.model';
import {OperationCategory, OperationPriority, OperationStatus} from "./daily-operations.enum";
import {NotificationService} from "../shared/services/notification.service";
import {DailyOperationModalComponent} from "./daily-operations-modal/daily-operations-modal.component";
import {NotificationToastComponent} from "../shared/components/notification/notification-toast.component";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BannerComponent } from '../banner/banner.component';
import { StatsBannerComponent } from '../shared/stats-banner/stats-banner.component';

interface DateRange {
  start: string;
  end: string;
}

@Component({
  selector: 'app-daily-operations',
  templateUrl: './daily-operations.component.html',
  styleUrls: ['./daily-operations.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    DailyOperationModalComponent,
    NotificationToastComponent,
    SidebarComponent,
    BannerComponent,
    StatsBannerComponent
  ]
})
export class DailyOperationsComponent implements OnInit, OnDestroy {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('priorityTemplate') priorityTemplate!: TemplateRef<any>;

  // Données pour la bannière de stats
  statsBanner = [
    {
      icon: 'activity' as 'activity',
      color: 'blue' as 'blue',
      label: 'Opérations en cours',
      value: 8
    },
    {
      icon: 'bar-chart' as 'bar-chart',
      color: 'green' as 'green',
      label: 'Traitées aujourd\'hui',
      value: 12
    },
    {
      icon: 'alert-triangle' as 'alert-triangle',
      color: 'orange' as 'orange',
      label: 'En attente',
      value: 5
    }
  ];

  // Filtres
  showFilters = true;
  statusFilter = '';
  priorityFilter = '';
  categoryFilter = '';
  dateRange: DateRange = {
    start: '',
    end: ''
  };

  // Options des filtres
  readonly statusOptions = Object.values(OperationStatus);
  readonly priorityOptions = Object.values(OperationPriority);
  readonly categoryOptions = Object.values(OperationCategory);

  originalData: DailyOperation[] = []; // Changed from private to public
  filteredOperations: DailyOperation[] = [];

  // Configuration du tableau
  columns: OperationColumn[] = [
    { key: 'type', label: 'Motif', sortable: true },
    { key: 'clientName', label: 'Client', sortable: true },
    { key: 'clientNumber', label: 'Téléphone', sortable: true },
    {
      key: 'priority',
      label: 'Priorité',
      sortable: true
    },
    { key: 'category', label: 'Catégorie', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true
    }
  ];

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


  tableOptions: TableOptions = {
    showSearch: true,
    showColumnSelector: true,
    showExport: true,
    actionsColumn: true,
    pageSize: 10
  };

  selectedOperation: DailyOperation | null = null;
  private subscription = new Subscription();

  constructor(
    private dailyOperationService: DailyOperationsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadOperations();
  }

  ngAfterViewInit(): void {
    this.initializeColumnTemplates();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  private loadOperations(): void {
    const operationsSub = this.dailyOperationService.getDailyOperations()
      .subscribe({
        next: (operations) => {
          this.originalData = operations; // Stockage des données originales
          this.filteredOperations = [...operations];
          this.updateStatsBanner(operations);
          this.applyFilters();
        },
        error: (error) => {
          console.error('Erreur lors du chargement des opérations:', error);
          this.notificationService.error('Erreur lors du chargement des opérations');
        }
      });

    this.subscription.add(operationsSub);
  }

  private updateStatsBanner(operations: DailyOperation[]): void {
    if (operations && operations.length > 0) {
      // Opérations en cours
      const inProgress = operations.filter(op => op.status === OperationStatus.EN_COURS).length;
      this.statsBanner[0].value = inProgress;

      // Opérations traitées aujourd'hui
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const completedToday = operations.filter(op => {
        const opDate = new Date(op.date);
        opDate.setHours(0, 0, 0, 0);
        return op.status === OperationStatus.TRAITE && opDate.getTime() === today.getTime();
      }).length;
      this.statsBanner[1].value = completedToday;

      // Opérations en attente
      const pending = operations.filter(op => op.status === OperationStatus.NOUVEAU).length;
      this.statsBanner[2].value = pending;
    }
  }

  refreshData(): void {
    this.loadOperations();
    this.resetFilters();
  }

  applyFilters(): void {
    // Toujours partir des données originales
    let filtered = [...this.originalData];

    if (this.statusFilter && this.statusFilter !== 'Tous') {
      filtered = filtered.filter(op => op.status === this.statusFilter);
    }

    if (this.priorityFilter && this.priorityFilter !== 'Toutes') {
      filtered = filtered.filter(op => op.priority === this.priorityFilter);
    }

    if (this.categoryFilter && this.categoryFilter !== 'Toutes') {
      filtered = filtered.filter(op => op.category === this.categoryFilter);
    }

    if (this.dateRange.start || this.dateRange.end) {
      filtered = filtered.filter(op => {
        const opDate = new Date(op.date);
        const start = this.dateRange.start ? new Date(this.dateRange.start) : null;
        const end = this.dateRange.end ? new Date(this.dateRange.end) : null;

        if (start && opDate < start) return false;
        if (end && opDate > end) return false;
        return true;
      });
    }

    this.filteredOperations = filtered;
  }

  resetFilters(): void {
    this.statusFilter = '';
    this.priorityFilter = '';
    this.categoryFilter = '';
    this.dateRange = {
      start: '',
      end: ''
    };

    this.filteredOperations = [...this.originalData];
  }

  onEdit(operation: DailyOperation): void {
    this.selectedOperation = operation;
  }

  onRowDoubleClick(operation: DailyOperation): void {
    this.selectedOperation = operation;
  }

  onDelete(operation: DailyOperation): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette opération ?')) {
      const deleteSub = this.dailyOperationService.deleteDailyOperation(operation.id)
        .subscribe({
          next: () => {
            this.loadOperations();
            this.notificationService.success('Opération supprimée avec succès');
          },
          error: (error) => {
            console.error('Erreur lors de la suppression:', error);
            this.notificationService.error('Erreur lors de la suppression de l\'opération');
          }
        });

      this.subscription.add(deleteSub);
    }
  }

  onOperationUpdate(event: { operation: DailyOperation; response: string }): void {
    const updateSub = this.dailyOperationService
      .updateDailyOperation(event.operation.id, event.response)
      .subscribe({
        next: () => {
          this.loadOperations();
          this.selectedOperation = null;
          this.notificationService.success('Opération mise à jour avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.notificationService.error('Erreur lors de la mise à jour de l\'opération');
        }
      });

    this.subscription.add(updateSub);
  }
}
