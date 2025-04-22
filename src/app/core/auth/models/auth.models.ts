export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;  // Ajout du numéro de téléphone comme champ obligatoire
  address?: string;
  role?: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  address?: string;
  phone: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
