// Generic utility type for paginated API responses.
export type Paginated<T> = {
    items: T[];
    total: number;
    page: number;
    limit: number;
};

// Represents the user profile for the logged-in vendor.
export type User = {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
};

// A summary of an item within an order, used for list displays.
export type OrderItemGist = {
    food: string;      // From menu.name
    toppings: string[]; // From addon.name
};

// Represents all possible order statuses defined in the database ENUM.
export type OrderStatus = 'pending' | 'placed' | 'preparing' | 'ready' | 'delivered' | 'completed' | 'cancelled';

// Defines the shape of an order object for the vendor's order list.
export type OrderListItem = {
  id: string;             // The public-facing orders.order_number
  internalId: number;     // The internal database orders.id for making updates
  customerName: string;   // From the joined user's metadata
  status: OrderStatus;
  items: OrderItemGist[];
  totalAmount: number;    // From orders.total_amount
  createdAt: string;      // From orders.created_at
};

// Represents the possible states of a menu item, derived from the `is_available` boolean.
// As discussed, the schema doesn't support "Sold Out" distinctly from "Hidden".
export type MenuStatus = 'Available' | 'Unavailable';

// Represents a food category, aligned with the 'categories' table.
export type Category = {
  id: string; // The database 'id' (integer) converted to a string.
  name: string;
};

// Represents a menu item, aligned with the `vendorApi.getMenuItems` response.
export type Menu = {
  id: string;         // The database 'id' (integer) converted to a string.
  name: string;
  imageUrl: string;
  categoryId: string; // The database 'category_id' converted to a string.
  status: MenuStatus; // Derived from `is_available`.
  price: number;
  description: string; // Always an empty string, per your requirement.
};

// Represents the data needed to create a new menu item.
export type NewMenu = {
  name: string;
  imageUrl?: string;
  categoryId: string;
  status: MenuStatus;
  price?: number;
};