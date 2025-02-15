// shared/table/components/table.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TableColumn, TableOptions } from './table.model';
// import { TableService } from './table.service';
import {FormsModule} from "@angular/forms";
import {NgTemplateOutlet} from "@angular/common";
import {start} from "node:repl";
import {ExportService} from "../../services/export.service";

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [
    FormsModule,
    //NgTemplateOutlet
  ],
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(private exportService: ExportService) {}
  ngOnInit(): void {
  }
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() options: TableOptions = {
    showSearch: true,
    showColumnSelector: true,
    showExport: true,
    actionsColumn: true,
    pageSize: 10
  };

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  searchTerm = '';
  selectedRows = new Set<number>();
  showColumnSelector = false;
  showExportMenu = false;
  currentPage = 1;
  currentSort?: { key: string; direction: 'asc' | 'desc' };

  get visibleColumns() {
    return this.columns.filter(col => col.visible !== false);
  }

  get areAllSelected() {
    return this.paginatedData.length > 0 &&
      this.paginatedData.every(row => this.selectedRows.has(row.id));
  }

  get filteredData() {
    let filtered = [...this.data];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(term)
        )
      );
    }

    if (this.currentSort) {
      filtered.sort((a, b) => {
        const direction = this.currentSort!.direction === 'asc' ? 1 : -1;
        return a[this.currentSort!.key] > b[this.currentSort!.key] ? direction : -direction;
      });
    }

    return filtered;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.options.pageSize;
    return this.filteredData.slice(start, start + this.options.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.options.pageSize);
  }

  onSearch() {
    this.currentPage = 1;
  }

  toggleColumnSelector() {
    this.showColumnSelector = !this.showColumnSelector;
  }

  toggleColumn(column: TableColumn) {
    column.visible = !column.visible;
  }

  toggleAllRows() {
    if (this.areAllSelected) {
      this.paginatedData.forEach(row => this.selectedRows.delete(row.id));
    } else {
      this.paginatedData.forEach(row => this.selectedRows.add(row.id));
    }
  }

  toggleRow(row: any) {
    if (this.selectedRows.has(row.id)) {
      this.selectedRows.delete(row.id);
    } else {
      this.selectedRows.add(row.id);
    }
  }

  sortBy(key: string) {
    if (this.currentSort?.key === key) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = { key, direction: 'asc' };
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  exportData(format: string) {
    console.log(`Exporting data as ${format}...`);
    this.showExportMenu = false;
    // Implémentez ici la logique d'export
  }



  // Fonction d'édition
  // onEdit(row: any) {
  //   const modalRef = document.createElement('app-edit-modal');
  //   document.body.appendChild(modalRef);
  //
  //   const modalComponent = modalRef as unknown as EditModalComponent;
  //   modalComponent.setData(row);
  //
  //   // Écouter la sauvegarde
  //   modalComponent.addEventListener('save', (event: any) => {
  //     const updatedData = event.detail;
  //     this.updateRow(updatedData);
  //     document.body.removeChild(modalRef);
  //   });
  //
  //   // Écouter la fermeture
  //   modalComponent.addEventListener('close', () => {
  //     document.body.removeChild(modalRef);
  //   });
  // }

  // Fonction de suppression
  onDelete(row: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
      this.data = this.data.filter(item => item.id !== row.id);
      // Mettre à jour les données filtrées
      this.applyFilters();
    }
  }

  // Fonction d'export
  onExport(format: 'excel' | 'csv') {
    // Préparer les données pour l'export
    const exportData = this.data.map(item => ({
      ID: item.id,
      Nom: item.name,
      Email: item.email,
      'Date de création': item.dateCreated
    }));

    this.exportService.exportToExcel(exportData, `export-${new Date().toISOString()}`);
  }

  private updateRow(updatedData: any) {
    const index = this.data.findIndex(item => item.id === updatedData.id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedData };
      this.applyFilters();
    }
  }

  private applyFilters() {
    // Réappliquer les filtres et la pagination
    // ... votre logique de filtrage existante
  }


}
