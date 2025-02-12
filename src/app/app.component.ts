import { Component } from '@angular/core';
import {TableComponent} from "./shared/components/table/table.component";
import {TableColumn, TableOptions} from "./shared/components/table/table.model";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    TableComponent

  ]
})
export class AppComponent {
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'dateCreated', label: 'Date de création', sortable: true }
  ];

  data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', dateCreated: '01/02/2024' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', dateCreated: '02/02/2024' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', dateCreated: '03/02/2024' }
  ];

  tableOptions: TableOptions = {
    showSearch: true,
    showColumnSelector: true,
    showExport: true,
    actionsColumn: true,
    pageSize: 10
  };

  onEdit(row: any) {
    console.log('Édition:', row);
  }

  onDelete(row: any) {
    console.log('Suppression:', row);
  }
}


