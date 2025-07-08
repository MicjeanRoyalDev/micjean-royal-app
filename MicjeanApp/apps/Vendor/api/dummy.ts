import { OrderListItem, User, Paginated, Menu, Category } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('lastLogin');
  } catch (e) {
    console.error('Failed to clear login:', e);
  }
};

export const login = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const now = new Date().toISOString();
  try {
    await AsyncStorage.setItem('lastLogin', now);
  } catch (e) {
    console.error('Failed to save login time:', e);
  }
};

export const me = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let lastLogin: string | null = null;
  try {
    lastLogin = await AsyncStorage.getItem('lastLogin');
  } catch (e) {
    console.error('Failed to read login time:', e);
  }
  const expiryMs = 10 * 60 * 1000; // 10 minutes
  if (lastLogin) {
    const lastTime = new Date(lastLogin).getTime();
    if (Date.now() - lastTime < expiryMs) {
      const fetchedUser: User = { id: 'userId123', email: 'vendor@micjean.com', name: 'Micjean Vendor' };
      const now = new Date().toISOString();
      try {
        await AsyncStorage.setItem('lastLogin', now);
      } catch (e) {
        console.error('Failed to update login time:', e);
      }
      return fetchedUser;
    }
  }

  try {
    await AsyncStorage.removeItem('lastLogin');
  } catch (e) {
    console.error('Failed to clear expired login time:', e);
  }
  throw new Error('Unauthenticated');
};

const dummyCategories: Category[] = [
  { id: 'cat1', name: 'Main Dishes' },
  { id: 'cat2', name: 'Starters' },
  { id: 'cat3', name: 'Drinks' },
  { id: 'cat4', name: 'Desserts' },
];

const dummyMenus: Menu[] = [
  { id: 'menu1', name: 'Tilapia', imageUrl: 'https://example.com/tilapia.jpg', categoryId: 'cat1', status: 'Available', description: 'Delicious fried tilapia.', price: 15.99 },
  { id: 'menu2', name: 'Spicy Seafood Noodles', imageUrl: 'https://example.com/noodles.jpg', categoryId: 'cat1', status: 'Available', description: 'Noodles with a kick.', price: 12.50 },
  { id: 'menu3', name: 'Beef Dumplings', imageUrl: 'https://example.com/dumplings.jpg', categoryId: 'cat2', status: 'Sold Out', description: 'Steamed beef dumplings.', price: 9.99 },
  { id: 'menu4', name: 'Iced Tea', imageUrl: 'https://example.com/iced-tea.jpg', categoryId: 'cat3', status: 'Available', price: 2.50 },
  { id: 'menu5', name: 'Mushroom Pasta', imageUrl: 'https://example.com/pasta.jpg', categoryId: 'cat1', status: 'Hidden', description: 'Creamy mushroom pasta.', price: 13.75 },
  { id: 'menu6', name: 'Garlic Bread', imageUrl: 'https://example.com/garlic-bread.jpg', categoryId: 'cat2', status: 'Available', price: 4.25 },
  { id: 'menu7', name: 'Coke', imageUrl: 'https://example.com/coke.jpg', categoryId: 'cat3', status: 'Available', price: 2.00 },
  { id: 'menu8', name: 'Black Tea', imageUrl: 'https://example.com/black-tea.jpg', categoryId: 'cat3', status: 'Sold Out', price: 2.25 },
  { id: 'menu9', name: 'Cheesecake', imageUrl: 'https://example.com/cheesecake.jpg', categoryId: 'cat4', status: 'Available', description: 'Creamy New York cheesecake.', price: 6.50 },
  { id: 'menu10', name: 'Spring Rolls', imageUrl: 'https://example.com/spring-rolls.jpg', categoryId: 'cat2', status: 'Available', price: 5.75 },
];

export const fetchCategories = async (): Promise<Paginated<Category>> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    items: dummyCategories,
    total: dummyCategories.length,
    page: 1,
    limit: dummyCategories.length,
  };
};

export const fetchMenus = async (params: { categoryId?: string }): Promise<Paginated<Menu>> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const { categoryId } = params;
  const items = categoryId ? dummyMenus.filter(menu => menu.categoryId === categoryId) : dummyMenus;
  return {
    items,
    total: items.length,
    page: 1,
    limit: items.length,
  };
};

const dummyOrders: OrderListItem[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    customerName: 'Eren Jaeger',
    status: 'completed',
    items: [
      { food: 'Spicy Seafood Noodles', toppings: ['Extra Chili'] },
      { food: 'Iced Tea', toppings: [] },
    ],
    totalAmount: 24.50,
    createdAt: '2023-10-26T19:45:10Z',
  },
  {
    id: 'b2c3d4e5-f6a7-8901-2345-67890abcdef1',
    customerName: 'Mikasa Ackerman',
    status: 'preparing',
    items: [
      { food: 'Beef Dumplings', toppings: [] },
    ],
    totalAmount: 12.00,
    createdAt: '2023-10-26T20:10:25Z',
  },
  {
    id: 'c3d4e5f6-a7b8-9012-3456-7890abcdef2',
    customerName: 'Armin Arlert',
    status: 'placed',
    items: [
      { food: 'Mushroom Pasta', toppings: ['Parmesan Cheese'] },
      { food: 'Garlic Bread', toppings: [] },
      { food: 'Coke', toppings: [] },
    ],
    totalAmount: 31.75,
    createdAt: '2023-10-26T20:15:05Z',
  },
  {
    id: 'd4e5f6a7-b8c9-0123-4567-890abcdef3',
    customerName: 'Levi Ackerman',
    status: 'ready',
    items: [
      { food: 'Black Tea', toppings: [] },
    ],
    totalAmount: 4.50,
    createdAt: '2023-10-26T20:05:55Z',
  },
  {
    id: 'e5f6a7b8-c9d0-1234-5678-90abcdef4',
    customerName: 'Hange Zoe',
    status: 'cancelled',
    items: [
      { food: 'Experimental Stew', toppings: ['Mystery Meat'] },
    ],
    totalAmount: 18.25,
    createdAt: '2023-10-26T18:30:00Z',
  },
  {
    id: 'f6a7b8c9-d0e1-2345-6789-0abcdef5',
    customerName: 'Reiner Braun',
    status: 'completed',
    items: [
      { food: 'Steak Dinner', toppings: ['Medium Rare'] },
      { food: 'Red Wine', toppings: [] },
    ],
    totalAmount: 55.00,
    createdAt: '2023-10-26T19:20:15Z',
  },
  {
    id: 'a7b8c9d0-e1f2-3456-7890-1bcdef6',
    customerName: 'Sasha Blouse',
    status: 'placed',
    items: [
      { food: 'Large Pizza', toppings: ['Pepperoni', 'Mushrooms'] },
      { food: 'French Fries', toppings: [] },
      { food: 'Potato Bread', toppings: [] },
      { food: 'Steamed Potato', toppings: ['Butter'] },
    ],
    totalAmount: 42.80,
    createdAt: '2023-10-26T20:18:40Z',
  },
  {
    id: 'b8c9d0e1-f2a3-4567-8901-2cdef7',
    customerName: 'Jean Kirstein',
    status: 'preparing',
    items: [
      { food: 'Chicken Omelet', toppings: ['Cheese'] },
      { food: 'Orange Juice', toppings: [] },
    ],
    totalAmount: 19.99,
    createdAt: '2023-10-26T20:12:30Z',
  },
  {
    id: 'c9d0e1f2-a3b4-5678-9012-3def8',
    customerName: 'Connie Springer',
    status: 'ready',
    items: [
      { food: 'Simple Burger', toppings: [] },
    ],
    totalAmount: 9.50,
    createdAt: '2023-10-26T20:08:00Z',
  },
  {
    id: 'd0e1f2a3-b4c5-6789-0123-4ef9',
    customerName: 'Historia Reiss',
    status: 'completed',
    items: [
      { food: 'Royal Tea Set', toppings: ['Scones'] },
      { food: 'Berry Tart', toppings: [] },
    ],
    totalAmount: 29.00,
    createdAt: '2023-10-26T17:55:50Z',
  },
  {
    id: 'e1f2a3b4-c5d6-7890-1234-5fa0',
    customerName: 'Zeke Jaeger',
    status: 'placed',
    items: [
      { food: 'Coffee', toppings: ['Black'] },
    ],
    totalAmount: 3.75,
    createdAt: '2023-10-26T20:20:01Z',
  },
  {
    id: 'f2a3b4c5-d6e7-8901-2345-6ab1',
    customerName: 'Gabi Braun',
    status: 'completed',
    items: [
      { food: 'Hot Dog', toppings: ['Ketchup', 'Mustard'] },
      { food: 'Lemonade', toppings: [] },
    ],
    totalAmount: 8.25,
    createdAt: '2023-10-26T19:50:00Z',
  },
];

export const fetchOrders = async (params: Record<string, any>) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Simulate pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Filter by status if provided
  let filteredOrders = dummyOrders;
  if (params.status) {
    filteredOrders = dummyOrders.filter(order => !!order.status); // backend treats params.status differently
  }

  // Apply search query if provided
  if (params.search) {
    const searchQuery = params.search.toLowerCase();
    filteredOrders = filteredOrders.filter(order =>
      order.customerName.toLowerCase().includes(searchQuery) ||
      order.items.some(item => item.food.toLowerCase().includes(searchQuery))
    );
  }

  // Paginate the results
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
  
  return {
    items: paginatedOrders,
    total: filteredOrders.length,
    page,
    limit,
  };
}