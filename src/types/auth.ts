export interface User {
  id: string;
  username: string;
  role: 'admin' | 'cashier' | 'kitchen';
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}