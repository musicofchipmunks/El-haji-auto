
export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  brand: string;
  imageUrl: string;
  price: number;
  stock: number;
  createdAt?: string;
  isActive?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  clientName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalPrice: number;
  status: 'new' | 'processing' | 'completed';
}

export interface Appointment {
  id: string;
  brand: string;
  model: string;
  registration?: string;
  service: string;
  date: string;
  time: string;
  clientName: string;
  phone: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type Page = 'home' | 'services' | 'products' | 'product-detail' | 'cart' | 'checkout' | 'about' | 'contact' | 'appointment' | 'admin-login' | 'admin-dashboard' | 'admin-products' | 'admin-orders' | 'admin-appointments';
