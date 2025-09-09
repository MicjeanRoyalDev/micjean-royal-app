import {
  OrderListItem,
  User,
  Paginated,
  Menu,
  Category,
  OrderStatus,
} from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- AUTH SIMULATION ---

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("lastLogin");
  } catch (e) {
    console.error("Failed to clear login:", e);
  }
};

export const login = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const now = new Date().toISOString();
  try {
    await AsyncStorage.setItem("lastLogin", now);
  } catch (e) {
    console.error("Failed to save login time:", e);
  }
};

export const me = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let lastLogin: string | null = null;
  try {
    lastLogin = await AsyncStorage.getItem("lastLogin");
  } catch (e) {
    console.error("Failed to read login time:", e);
  }
  const expiryMs = 10 * 60 * 1000; // 10-minute session
  if (lastLogin) {
    const lastTime = new Date(lastLogin).getTime();
    if (Date.now() - lastTime < expiryMs) {
      const fetchedUser: User = {
        id: "vendor-01",
        email: "vendor@adepa.com",
        name: "Adepa Restaurant",
      };
      const now = new Date().toISOString();
      try {
        await AsyncStorage.setItem("lastLogin", now);
      } catch (e) {
        console.error("Failed to update login time:", e);
      }
      return fetchedUser;
    }
  }

  try {
    await AsyncStorage.removeItem("lastLogin");
  } catch (e) {
    console.error("Failed to clear expired login time:", e);
  }
  throw new Error("Unauthenticated");
};

const dummyCategories: Category[] = [
  { id: "1", name: "Main Dishes" },
  { id: "2", name: "Soups & Stews" },
  { id: "3", name: "Sides & Snacks" },
  { id: "4", name: "Drinks" },
];

const dummyMenus: Menu[] = [
  {
    id: "101",
    name: "Jollof Rice with Chicken",
    imageUrl: "https://example.com/jollof.jpg",
    categoryId: "1",
    status: "Available",
    price: 45.0,
    description: "",
  },
  {
    id: "102",
    name: "Waakye Special",
    imageUrl: "https://example.com/waakye.jpg",
    categoryId: "1",
    status: "Available",
    price: 50.0,
    description: "",
  },
  {
    id: "103",
    name: "Banku with Grilled Tilapia",
    imageUrl: "https://example.com/banku.jpg",
    categoryId: "1",
    status: "Available",
    price: 65.0,
    description: "",
  },
  {
    id: "201",
    name: "Groundnut Soup with Fufu",
    imageUrl: "https://example.com/groundnut.jpg",
    categoryId: "2",
    status: "Available",
    price: 55.0,
    description: "",
  },
  {
    id: "301",
    name: "Kelewele",
    imageUrl: "https://example.com/kelewele.jpg",
    categoryId: "3",
    status: "Available",
    price: 15.0,
    description: "",
  },
  {
    id: "401",
    name: "Sobolo (Bissap)",
    imageUrl: "https://example.com/sobolo.jpg",
    categoryId: "4",
    status: "Available",
    price: 10.0,
    description: "",
  },
  {
    id: "402",
    name: "Asaana",
    imageUrl: "https://example.com/asaana.jpg",
    categoryId: "4",
    status: "Unavailable",
    price: 10.0,
    description: "",
  },
];

const dummyOrders: OrderListItem[] = [
  // Active Orders
  {
    id: "ORD-001",
    internalId: 1,
    customerName: "Ama Serwaa",
    status: "confirmed",
    items: [{ food: "Jollof Rice", toppings: ["Extra Coleslaw"] }],
    totalAmount: 53.0,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: "ORD-002",
    internalId: 2,
    customerName: "Kofi Mensah",
    status: "preparing",
    items: [{ food: "Waakye Special", toppings: ["Beef"] }],
    totalAmount: 50.0,
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: "ORD-003",
    internalId: 3,
    customerName: "Yaw Boateng",
    status: "ready",
    items: [{ food: "Kelewele", toppings: [] }],
    totalAmount: 15.0,
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },

  // delivered & Cancelled Orders
  {
    id: "ORD-004",
    internalId: 4,
    customerName: "Kwabena Asante",
    status: "delivered",
    items: [{ food: "Yam Chips", toppings: [] }],
    totalAmount: 20.0,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "ORD-005",
    internalId: 5,
    customerName: "Akua Mansa",
    status: "delivered",
    items: [{ food: "Jollof Rice", toppings: [] }],
    totalAmount: 45.0,
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString(),
  },
  {
    id: "ORD-006",
    internalId: 6,
    customerName: "Abena Yeboah",
    status: "cancelled",
    items: [{ food: "Red Red", toppings: [] }],
    totalAmount: 35.0,
    createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
  },
];

// --- MOCK API FUNCTIONS ---

export const fetchCategories = async (): Promise<Paginated<Category>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    items: dummyCategories,
    total: dummyCategories.length,
    page: 1,
    limit: 100,
  };
};

export const fetchMenus = async (params: {
  categoryId?: string;
}): Promise<Paginated<Menu>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { categoryId } = params;
  const items = categoryId
    ? dummyMenus.filter((menu) => menu.categoryId === categoryId)
    : dummyMenus;
  return { items, total: items.length, page: 1, limit: 100 };
};

export const fetchOrders = async (params: {
  status?: string;
  page?: number;
  limit?: number;
}): Promise<Paginated<OrderListItem>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredOrders = [...dummyOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (params.status) {
    const statusFilter = params.status;
    const activeStatuses: OrderStatus[] = ["confirmed", "preparing", "ready"];

    if (statusFilter === "active") {
      filteredOrders = filteredOrders.filter((order) =>
        activeStatuses.includes(order.status)
      );
    } else {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === statusFilter
      );
    }
  }

  const page = params.page || 1;
  const limit = params.limit || 10;
  const total = filteredOrders.length;
  const startIndex = (page - 1) * limit;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + limit);

  return { items: paginatedOrders, total, page, limit };
};

export const fetchOrderById = async (id: string): Promise<OrderListItem> => {
  console.log(`[DUMMY API] Fetching order with ID: ${id}`);

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 400));

  const order = dummyOrders.find((o) => o.id === id);

  if (order) {
    // Return a copy to prevent accidental mutation of the dummy data source
    return Promise.resolve({ ...order });
  } else {
    return Promise.reject(new Error(`Order with ID "${id}" not found.`));
  }
};
