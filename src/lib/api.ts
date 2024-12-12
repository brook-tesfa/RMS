import axios from 'axios';
import { User } from '../types/auth';
import { Order } from '../types/order';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const auth = {
  login: async (username: string, password: string) => {
    const response = await api.post<{ token: string; user: User }>('/auth/login', {
      username,
      password,
    });
    return response.data;
  },
  logout: () => {
    setAuthToken(null);
  },
  getCurrentUser: async () => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};

export const orders = {
  create: async (order: Partial<Order>) => {
    const response = await api.post<Order>('/orders', order);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },
  updateStatus: async (orderId: string, status: string) => {
    const response = await api.patch<Order>(`/orders/${orderId}/status`, { status });
    return response.data;
  },
};