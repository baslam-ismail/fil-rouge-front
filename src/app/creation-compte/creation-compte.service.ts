import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/config/api-endpoints';
import { Client } from '../store/client-creation/client.state';
import { environment } from "../environements/environnement";

@Injectable({
  providedIn: 'root'
})
export class CreationCompteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createClient(data: { nom: string; prenom: string; email: string; phone: string; address?: string }): Observable<Client> {
    const formattedClient = {
      name: `${data.prenom} ${data.nom}`,
      email: data.email,
      phone: data.phone,
      address: data.address || ''
    };

    return this.http.post<Client>(
      `${this.apiUrl}${API_ENDPOINTS.CLIENTS.CREATE}`,
      formattedClient
    );
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(
      `${this.apiUrl}${API_ENDPOINTS.CLIENTS.GET_ALL}`
    );
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(
      `${this.apiUrl}${API_ENDPOINTS.CLIENTS.GET_BY_ID(id)}`
    );
  }

  getClientByEmail(email: string): Observable<Client> {
    return this.http.get<Client>(
      `${this.apiUrl}${API_ENDPOINTS.CLIENTS.GET_BY_EMAIL(email)}`
    );
  }

  getClientByPhone(phone: string): Observable<Client> {
    return this.http.get<Client>(
      `${this.apiUrl}${API_ENDPOINTS.CLIENTS.GET_BY_PHONE(phone)}`
    );
  }
}