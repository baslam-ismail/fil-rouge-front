import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environements/environnement";
import { LoginRequest, LoginResponse, RegisterRequest, User } from "./models/auth.models";
import { API_ENDPOINTS } from "../config/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}${API_ENDPOINTS.AUTH.LOGIN}`,
      loginRequest
    );
  }

  register(user: RegisterRequest): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}${API_ENDPOINTS.AUTH.REGISTER}`,
      user
    );
  }

  storeToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
    }
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}${API_ENDPOINTS.USERS.GET_BY_EMAIL(email)}`
    );
  }
}
