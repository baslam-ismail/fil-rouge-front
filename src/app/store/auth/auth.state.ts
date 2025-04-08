import {AuthState} from "../../core/auth/models/auth.models";


function getLocalStorageItem(key: string): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem(key);
  }
  return null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: getLocalStorageItem('token'),
  isAuthenticated: !!getLocalStorageItem('token'),
  isLoading: false,
  error: null
};
