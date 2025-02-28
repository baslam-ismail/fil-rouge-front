import {TemplateRef} from "@angular/core";

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  visible?: boolean;
  template?: TemplateRef<any>;
}

export interface TableOptions {
  showSearch: boolean;
  showColumnSelector: boolean;
  showExport: boolean;
  actionsColumn: boolean;
  pageSize: number;
}
