import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { ServiceRequest } from './service-request.model';
import { ServiceRequestStatus } from './service-request.enum';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  private serviceRequests = new BehaviorSubject<ServiceRequest[]>([]);
  serviceRequests$ = this.serviceRequests.asObservable();

  constructor() {
    // Charger les données initiales (simulation)
    this.loadInitialData();
  }

  getServiceRequests(): Observable<ServiceRequest[]> {
    return this.serviceRequests$;
  }

  getServiceRequestById(id: number): Observable<ServiceRequest | undefined> {
    return this.serviceRequests$.pipe(
      map(requests => requests.find(request => request.id === id))
    );
  }

  updateServiceRequest(
    requestId: number,
    response: string
  ): Observable<ServiceRequest> {
    const updatedRequests = this.serviceRequests.value.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: ServiceRequestStatus.IN_PROGRESS,
          response,
          lastUpdated: new Date().toISOString()
        };
      }
      return request;
    });

    // Simuler un délai réseau
    return of(updatedRequests.find(r => r.id === requestId)!).pipe(
      delay(500),
      tap(() => this.serviceRequests.next(updatedRequests))
    );
  }

  private loadInitialData(): void {
    const mockData: ServiceRequest[] = [
      {
        id: 1,
        title: 'Compte épargne',
        clientName: 'Alain FRENAULT',
        clientNumber: '06 09 49 66 43',
        priority: 'Haute',
        email: 'email1',
        category: 'Ouverture compte',
        date: '07/06/2024',
        status: 'Nouveau',
        description: 'Demande d\'ouverture d\'un compte épargne'
      },
      {
        id: 2,
        title: 'Assurance vie',
        clientName: 'Sofia ARLOUCHE',
        clientNumber: '06 49 49 69 43',
        priority: 'Haute',
        email: 'email2',
        category: 'Assurance',
        date: '04/06/2024',
        status: 'En cours',
        description: 'Souscription à une assurance vie'
      },
      {
        id: 3,
        title: 'Achat maison',
        clientName: 'Mamadou TOURE',
        clientNumber: '06 29 19 66 43',
        priority: 'Moyenne',
        email: 'email3',
        category: 'Prêt',
        date: '03/06/2024',
        status: 'En cours',
        description: 'Demande de prêt immobilier pour achat résidence principale'
      }
    ];

    this.serviceRequests.next(mockData);
  }

  deleteServiceRequest(id: number): Observable<void> {
    // Filtrer la demande à supprimer
    const updatedRequests = this.serviceRequests.value.filter(
      request => request.id !== id
    );

    // Simuler un délai réseau comme pour updateServiceRequest
    return of(void 0).pipe(
      delay(500),
      tap(() => {
        this.serviceRequests.next(updatedRequests);
      })
    );
  }
}
