export type User = {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
};

export type Paginated<T> = {
    items: T[];
    total: number;
    page: number;
    limit: number;
};

export type OrderItem = {
    id: string;
    food: string;
    toppings: string[];
};

export type Order = {
    id: string;
    customerName: string;
    status: 'placed' | 'served' | 'delivered';
    items: OrderItem[];
    createdAt: string;
};


export type OrderItemGist = {
    food: string;
    toppings: string[];
};

export type OrderListItem = {
  id: string;
  customerName: string;
  status: 'placed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  items: OrderItemGist[]; // to be displayed like "Fried Rice with xxx"
  totalAmount: number;
  createdAt: string;
};