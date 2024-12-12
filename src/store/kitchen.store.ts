import { create } from 'zustand';
import { KitchenState, OrderStatus } from '../types/kitchen';

export const useKitchenStore = create<KitchenState>((set) => ({
  orders: [],
  selectedOrder: null,
  filter: 'all',
  setFilter: (filter: OrderStatus | 'all') => set({ filter }),
  setSelectedOrder: (id: string | null) => set({ selectedOrder: id }),
}));