import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environements/environnement';
import { API_ENDPOINTS } from '../config/api-endpoints';

export interface ClientRequest {
  name: string;
  firstName: string;
  email: string;
  phone: string;
  address?: string;
}

export interface Client {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Creates a new client
   * @param clientData Client data to create
   * @returns Observable with created client
   */
  createClient(clientData: ClientRequest): Observable<Client> {
    // Format the name as expected by the backend (combining firstName and lastName)
    const formattedClient = {
      name: `${clientData.firstName} ${clientData.name}`,
      email: clientData.email,
      phone: clientData.phone,
      address: clientData.address || ''
    };

    return this.http.post<Client>(
      `${this.apiUrl}${API_ENDPOINTS.CLIENTS.CREATE}`,
      formattedClient
    );
  }

  /**
   * Gets all clients
   * @returns Observable with list of clients
   */
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(
      `${this.apiUrl}${API_ENDPOINTS.CLIENTS.GET_ALL}`
    );
  }

  /**
   * Gets client by ID
   * @param id Client ID
   * @returns Observable with client
   */
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(
      `${this.apiUrl}${API_ENDPOINTS.CLIENTS.GET_BY_ID(id)}`
    );
  }

  /**
   * Gets client by email
   * @param email Client email
   * @returns Observable with client
   */
  getClientByEmail(email: string): Observable<Client> {
    return this.http.get<Client>(
      `${this.apiUrl}${API_ENDPOINTS.CLIENTS.GET_BY_EMAIL(email)}`
    );
  }

  /**
   * Gets client by phone
   * @param phone Client phone
   * @returns Observable with client
   */
  getClientByPhone(phone: string): Observable<Client> {
    return this.http.get<Client>(
      `${this.apiUrl}${API_ENDPOINTS.CLIENTS.GET_BY_PHONE(phone)}`
    );
  }
}
