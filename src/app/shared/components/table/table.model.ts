export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  visible?: boolean;
}

export interface TableOptions {
  showSearch: boolean;
  showColumnSelector: boolean;
  showExport: boolean;
  actionsColumn: boolean;
  pageSize: number;
}
