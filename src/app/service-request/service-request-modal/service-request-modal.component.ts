import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServiceRequest } from '../service-request.model';
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {NotificationService} from "../../shared/services/notification.service";
// import {NotificationService} from "../../shared/services/notification.service";
// import {NotificationService} from "../notification-toast/notification.service";

@Component({
  selector: 'app-service-request-modal',
  templateUrl: './service-request-modal.component.html',
  styleUrls: ['./service-request-modal.component.css'],
  imports: [
    FormsModule,
    DatePipe
  ],
  standalone: true
})
export class ServiceRequestModalComponent {
  @Input() request!: ServiceRequest;
  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<ServiceRequest>();

  constructor(private notificationService: NotificationService) {}

  updateRequest() {
    this.update.emit(this.request);
    this.notificationService.success('La demande a été mise à jour avec succès');
    this.close.emit();
  }

  currentDate = new Date();

  // Stats (à connecter avec un service real)
  stats = {
    appointments: 6,
    serviceRequests: 15,
    operationRequests: 3
  };

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }


}

// Mettre à jour le modèle pour inclure tous les champs nécessaires
interface ServiceRequestDetailed extends ServiceRequest {
  phone: string;
  email: string;
  message: string;
  comments: string;
  lastModified?: string;
}
