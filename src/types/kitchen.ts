export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed';

export interface KitchenOrder {
  id: string;
  items: {
    name: string;
    quantity: number;
    notes?: string;
  }[];
  status: OrderStatus;
  tableNumber?: number;
  priority: 'normal' | 'high';
  orderTime: Date;
  estimatedTime?: number; // in minutes
}

export interface KitchenState {
  orders: KitchenOrder[];
  selectedOrder: string | null;
  filter: OrderStatus | 'all';
}