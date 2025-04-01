export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  image: string;
  prescription: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
