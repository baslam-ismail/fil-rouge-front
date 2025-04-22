import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ClientData {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedClientService {
  // Données initiales des clients
  private initialClients: ClientData[] = [
    { id: 12678, lastName: 'FRENAULT', firstName: 'Alain', email: 'alain@microsoft.com', phone: '06 09 49 66 43', address: '10 rue Albert Cachin, 75006, Paris' },
    { id: 12678, lastName: 'ARLOUCHE', firstName: 'Sofia', email: 'sofia@microsoft.com', phone: '06 49 49 69 43', address: '12 rue de Kabylie, 75020, Paris' },
    { id: 12678, lastName: 'TOURE', firstName: 'Mamadou', email: 'mamado@gmail.com', phone: '06 29 19 66 43', address: '45 rue des Pépinières, 75015, Paris' },
    { id: 12678, lastName: 'LUBERT', firstName: 'Francois', email: 'franc@microsoft.com', phone: '07 09 49 66 43', address: '15 rue de Rivoli, 75001, Paris' },
    { id: 12678, lastName: 'PAIRE', firstName: 'Benoit', email: 'benoit@microsoft.com', phone: '07 29 49 66 43', address: '27 rue Alfonse Daudet, 75006, Paris' },
    { id: 12678, lastName: 'SWIATEK', firstName: 'Iga', email: 'iga@microsoft.com', phone: '06 49 42 64 73', address: '65 rue Saint Germain, 75006, Paris' },
    { id: 12678, lastName: 'SHARAPOVA', firstName: 'Maria', email: 'maria@microsoft.com', phone: '07 09 49 67 43', address: '10 rue Saint Antoine, 75006, Paris' },
    { id: 12678, lastName: 'ALI', firstName: 'Mohammed', email: 'moha@microsoft.com', phone: '06 23 66 66 43', address: "23 rue d'Algérie, 75018, Paris" }
  ];

  // BehaviorSubject pour stocker et diffuser la liste des clients
  private clientsSubject = new BehaviorSubject<ClientData[]>(this.initialClients);
  
  // Observable public pour permettre aux composants de s'abonner aux changements
  public clients$: Observable<ClientData[]> = this.clientsSubject.asObservable();

  constructor() { }

  // Récupérer tous les clients
  getClients(): ClientData[] {
    return this.clientsSubject.value;
  }

  // Ajouter un nouveau client
  addClient(client: { nom: string; prenom: string; email: string; phone: string; address?: string }): void {
    // Créer un nouvel objet client
    const newClient: ClientData = {
      id: Math.floor(Math.random() * 100000), // ID aléatoire pour simuler un ID de base de données
      lastName: client.nom,
      firstName: client.prenom,
      email: client.email,
      phone: client.phone,
      address: client.address || ''
    };
    
    // Ajouter le client à la liste existante
    const currentClients = this.clientsSubject.value;
    this.clientsSubject.next([newClient, ...currentClients]);
  }

  // Méthode pour mettre à jour un client
  updateClient(updatedClient: ClientData): void {
    const currentClients = this.clientsSubject.value;
    const index = currentClients.findIndex(c => c.id === updatedClient.id);
    
    if (index !== -1) {
      const updatedClients = [...currentClients];
      updatedClients[index] = updatedClient;
      this.clientsSubject.next(updatedClients);
    }
  }

  // Méthode pour supprimer un client
  deleteClient(id: number): void {
    const currentClients = this.clientsSubject.value;
    const updatedClients = currentClients.filter(c => c.id !== id);
    this.clientsSubject.next(updatedClients);
  }
}
