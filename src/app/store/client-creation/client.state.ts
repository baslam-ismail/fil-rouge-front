  export interface Client {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ClientState {
  client: Client | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const initialClientState: ClientState = {
  client: null,
  isLoading: false,
  error: null,
  success: false
};
