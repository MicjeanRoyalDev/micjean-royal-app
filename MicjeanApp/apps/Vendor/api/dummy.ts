import { OrderListItem, User, Paginated, Menu, Category, OrderStatus } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- AUTH SIMULATION ---

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('lastLogin');
  } catch (e) {
    console.error('Failed to clear login:', e);
  }
};

export const login = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
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
  const expiryMs = 10 * 60 * 1000; // 10-minute session
  if (lastLogin) {
    const lastTime = new Date(lastLogin).getTime();
    if (Date.now() - lastTime < expiryMs) {
      const fetchedUser: User = { id: 'vendor-01', email: 'vendor@adepa.com', name: 'Adepa Restaurant' };
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


// --- GHANAIAN-THEMED DUMMY DATA ---

const dummyCategories: Category[] = [
  { id: 'cat-main', name: 'Main Dishes' },
  { id: 'cat-soups', name: 'Soups & Stews' },
  { id: 'cat-sides', name: 'Sides & Snacks' },
  { id: 'cat-drinks', name: 'Drinks' },
];

const dummyMenus: Menu[] = [
  // Main Dishes
  { id: 'menu-jollof', name: 'Jollof Rice with Chicken', imageUrl: 'https://example.com/jollof.jpg', categoryId: 'cat-main', status: 'Available', description: 'Classic smoky Ghanaian Jollof, served with grilled chicken.', price: 45.00 },
  { id: 'menu-waakye', name: 'Waakye Special', imageUrl: 'https://example.com/waakye.jpg', categoryId: 'cat-main', status: 'Available', description: 'Served with shito, gari, spaghetti, and a choice of protein.', price: 50.00 },
  { id: 'menu-banku', name: 'Banku with Grilled Tilapia', imageUrl: 'https://example.com/banku.jpg', categoryId: 'cat-main', status: 'Available', description: 'Served with fresh pepper sauce and onions.', price: 65.00 },
  { id: 'menu-redred', name: 'Red Red', imageUrl: 'https://example.com/redred.jpg', categoryId: 'cat-main', status: 'Sold Out', description: 'Beans stew with fried ripe plantain.', price: 35.00 },

  // Soups & Stews
  { id: 'menu-groundnut', name: 'Groundnut Soup with Fufu', imageUrl: 'https://example.com/groundnut.jpg', categoryId: 'cat-soups', status: 'Available', description: 'Rich groundnut soup with goat meat.', price: 55.00 },
  { id: 'menu-palmnut', name: 'Palm Nut Soup with Omo Tuo', imageUrl: 'https://example.com/palmnut.jpg', categoryId: 'cat-soups', status: 'Available', description: 'Traditional palm nut soup, also known as Abenkwan.', price: 55.00 },

  // Sides & Snacks
  { id: 'menu-kelewele', name: 'Kelewele', imageUrl: 'https://example.com/kelewele.jpg', categoryId: 'cat-sides', status: 'Available', description: 'Spicy fried plantain chunks with peanuts.', price: 15.00 },
  { id: 'menu-yamchips', name: 'Yam Chips with Kpakpo Shito', imageUrl: 'https://example.com/yamchips.jpg', categoryId: 'cat-sides', status: 'Available', description: 'Crispy fried yam chips.', price: 20.00 },
  { id: 'menu-meatpie', name: 'Meat Pie', imageUrl: 'https://example.com/meatpie.jpg', categoryId: 'cat-sides', status: 'Hidden', description: 'Our secret recipe meat pie.', price: 12.00 },

  // Drinks
  { id: 'menu-sobolo', name: 'Sobolo (Bissap)', imageUrl: 'https://example.com/sobolo.jpg', categoryId: 'cat-drinks', status: 'Available', price: 10.00 },
  { id: 'menu-asaana', name: 'Asaana', imageUrl: 'https://example.com/asaana.jpg', categoryId: 'cat-drinks', status: 'Sold Out', price: 10.00 },
  { id: 'menu-malt', name: 'Malta Guinness', imageUrl: 'https://example.com/malt.jpg', categoryId: 'cat-drinks', status: 'Available', price: 8.00 },
];

const dummyOrders: OrderListItem[] = [
  // Active Orders (Placed, Preparing, Ready)
  { id: 'order-001', customerName: 'Ama Serwaa', status: 'placed', items: [{ food: 'Jollof Rice with Chicken', toppings: ['Extra Coleslaw'] }, { food: 'Malta Guinness', toppings: [] }], totalAmount: 53.00, createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: 'order-002', customerName: 'Kofi Mensah', status: 'preparing', items: [{ food: 'Waakye Special', toppings: ['Beef', 'Wele'] }], totalAmount: 50.00, createdAt: new Date(Date.now() - 10 * 60000).toISOString() },
  { id: 'order-003', customerName: 'Yaw Boateng', status: 'ready', items: [{ food: 'Kelewele', toppings: [] }], totalAmount: 15.00, createdAt: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 'order-004', customerName: 'Adwoa Owusu', status: 'placed', items: [{ food: 'Groundnut Soup with Fufu', toppings: [] }, { food: 'Palm Nut Soup with Omo Tuo', toppings: [] }, { food: 'Sobolo (Bissap)', toppings: [] }], totalAmount: 120.00, createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: 'order-005', customerName: 'Esi Agyemang', status: 'preparing', items: [{ food: 'Banku with Grilled Tilapia', toppings: ['Extra Pepper'] }], totalAmount: 65.00, createdAt: new Date(Date.now() - 8 * 60000).toISOString() },

  // Completed Orders
  { id: 'order-006', customerName: 'Kwabena Asante', status: 'completed', items: [{ food: 'Yam Chips with Kpakpo Shito', toppings: [] }], totalAmount: 20.00, createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 'order-007', customerName: 'Akua Mansa', status: 'completed', items: [{ food: 'Jollof Rice with Chicken', toppings: [] }], totalAmount: 45.00, createdAt: new Date(Date.now() - 4 * 3600000).toISOString() },
  { id: 'order-008', customerName: 'Femi Adebayo', status: 'completed', items: [{ food: 'Waakye Special', toppings: ['Fish Only'] }, { food: 'Malta Guinness', toppings: [] }], totalAmount: 58.00, createdAt: new Date(Date.now() - 24 * 3600000).toISOString() },
  { id: 'order-009', customerName: 'Ngozi Okoro', status: 'completed', items: [{ food: 'Groundnut Soup with Fufu', toppings: [] }], totalAmount: 55.00, createdAt: new Date(Date.now() - 28 * 3600000).toISOString() },

  // Cancelled Orders
  { id: 'order-010', customerName: 'Abena Yeboah', status: 'cancelled', items: [{ food: 'Red Red', toppings: [] }], totalAmount: 35.00, createdAt: new Date(Date.now() - 6 * 3600000).toISOString() },
  { id: 'order-011', customerName: 'Emeka Nwosu', status: 'cancelled', items: [{ food: 'Asaana', toppings: [] }], totalAmount: 10.00, createdAt: new Date(Date.now() - 30 * 3600000).toISOString() },
  
  // More active orders for pagination
  { id: 'order-012', customerName: 'Binta Diallo', status: 'placed', items: [{ food: 'Sobolo (Bissap)', toppings: [] }, { food: 'Kelewele', toppings: [] }], totalAmount: 25.00, createdAt: new Date(Date.now() - 1 * 60000).toISOString() },
  { id: 'order-013', customerName: 'Musa Traoré', status: 'ready', items: [{ food: 'Jollof Rice with Chicken', toppings: ['No chicken', 'Extra Veggies'] }], totalAmount: 45.00, createdAt: new Date(Date.now() - 25 * 60000).toISOString() },
];


// --- API-LIKE FUNCTIONS ---

export const fetchCategories = async (): Promise<Paginated<Category>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
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

export const fetchOrders = async (params: Record<string, any>): Promise<Paginated<OrderListItem>> => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network latency

  let filteredOrders = [...dummyOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Newest first

  // **CRITICAL FIX**: Correctly filter by status group
  if (params.status) {
    const statusFilter = params.status;
    const activeStatuses = ['placed', 'preparing', 'ready'];
    
    if (statusFilter === 'active') {
      filteredOrders = filteredOrders.filter(order => activeStatuses.includes(order.status));
    } else {
      // Handles 'completed' and 'cancelled'
      filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
  }

  // Apply search query if provided
  if (params.search) {
    const searchQuery = params.search.toLowerCase();
    filteredOrders = filteredOrders.filter(order =>
      order.customerName.toLowerCase().includes(searchQuery) ||
      order.items.some(item => item.food.toLowerCase().includes(searchQuery))
    );
  }

  // Simulate pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const total = filteredOrders.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
  
  return {
    items: paginatedOrders,
    total: total,
    page,
    limit,
  };
}

export const fetchOrderById = async (id: string): Promise<OrderListItem> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const order = dummyOrders.find((o) => o.id === id);
  if (order) {
    // In a real API, you might return more details, but for the demo, this is perfect.
    return Promise.resolve(order);
  } else {
    return Promise.reject(new Error("Order not found"));
  }
};