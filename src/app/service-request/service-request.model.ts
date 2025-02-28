// Les interfaces du composant
import {TemplateRef} from "@angular/core";

export interface DateRange {
  start: string;
  end: string;
}

export interface ServiceRequest {
  id: number;
  title: string;
  clientName: string;
  clientNumber: string;
  email:string;
  priority: string;
  category: string;
  date: string;
  status: string;
  message?: string;
  comments?: string;
  description?: string;
  response?: string;
  lastUpdated?: string;
}

export interface ServiceRequestColumn {
  key: keyof ServiceRequest;
  label: string;
  sortable?: boolean;
  template?: TemplateRef<any>;
}

export interface RequestUpdateEvent {
  request: ServiceRequest;
  response: string;
}
