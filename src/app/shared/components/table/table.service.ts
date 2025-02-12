// // shared/table/services/table.service.ts
// import { Injectable } from '@angular/core';
// import { TableColumn } from './table.model';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class TableService {
//   // Fonction de recherche générique
//   filterData(data: any[], searchTerm: string, columns: TableColumn[]): any[] {
//     if (!searchTerm) return data;
//
//     const searchTermLower = searchTerm.toLowerCase();
//     return data.filter(item =>
//       columns.some(column => {
//         const value = item[column.key];
//         if (value == null) return false;
//         return value.toString().toLowerCase().includes(searchTermLower);
//       })
//     );
//   }
//
//   // Fonction de tri générique
//   sortData(data: any[], column: string, direction: 'asc' | 'desc'): any[] {
//     return [...data].sort((a, b) => {
//       const valueA = a[column];
//       const valueB = b[column];
//
//       if (valueA === valueB) return 0;
//       const comparison = valueA < valueB ? -1 : 1;
//       return direction === 'asc' ? comparison : -comparison;
//     });
//   }
//
//   // Fonction de formatage des valeurs
//   formatValue(value: any, column: TableColumn): string {
//     if (value == null) return '';
//
//     switch (column.type) {
//       case 'date':
//         const date = new Date(value);
//         // Utiliser un format personnalisé ou par défaut
//         return column.format
//           ? this.formatDate(date, column.format)
//           : date.toLocaleDateString();
//
//       case 'number':
//         return typeof value === 'number'
//           ? value.toLocaleString()
//           : value;
//
//       case 'boolean':
//         return value ? 'Oui' : 'Non';
//
//       default:
//         return value.toString();
//     }
//   }
//
//   private formatDate(date: Date, format: string): string {
//     // Implémenter le formatage de date personnalisé ici
//     return date.toLocaleDateString();
//   }
// }
