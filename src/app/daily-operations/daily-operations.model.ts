import {OperationCategory, OperationPriority, OperationStatus, OperationType} from "./daily-operations.enum";
import {TemplateRef} from "@angular/core";

export interface DailyOperation {
  id: number;
  type: OperationType;
  clientName: string;
  clientNumber: string;
  priority: OperationPriority;
  category: OperationCategory;
  date: string;
  status: OperationStatus;
  message?: string;
  comments?: string;
  lastUpdated?: string;
}


export interface OperationColumn {
  key: string;
  label: string;
  sortable?: boolean;
  template?: TemplateRef<any>;
}

export interface DailyOperationResponse {
  operationId: number;
  message: string;
  respondedBy: string;
  responseDate: string;
}

export const MOCK_DAILY_OPERATIONS: DailyOperation[] = [
  {
    id: 1,
    type: OperationType.REJETER_PRELEVEMENT,
    clientName: 'Alain FRENAULT',
    clientNumber: '06 09 49 66 43',
    priority: OperationPriority.HAUTE,
    category: OperationCategory.PRELEVEMENT,
    date: '07/06/2024',
    status: OperationStatus.NOUVEAU
  },
  {
    id: 2,
    type: OperationType.SUPPRIMER_BENEFICIAIRE,
    clientName: 'Sofia ARLOUCHE',
    clientNumber: '06 49 49 69 43',
    priority: OperationPriority.BASSE,
    category: OperationCategory.VIREMENT,
    date: '04/06/2024',
    status: OperationStatus.EN_COURS
  },
  {
    id: 3,
    type: OperationType.AJOUTER_BENEFICIAIRE,
    clientName: 'Mamadou TOURE',
    clientNumber: '06 29 19 66 43',
    priority: OperationPriority.MOYENNE,
    category: OperationCategory.VIREMENT,
    date: '03/06/2024',
    status: OperationStatus.EN_COURS
  }

];
