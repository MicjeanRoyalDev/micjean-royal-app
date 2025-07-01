export type User = {
    id: string;
    email: string;
    name: string;
    photoUrl?: string;
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
}