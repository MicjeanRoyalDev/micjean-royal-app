import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = process.env.API_URL || 'http://localhost:3000';

// // Let's build an axios client to handle API requests

// export class ApiClient {
//   private client;

//   constructor() {
//     this.client = axios.create({
//       baseURL: API_URL,
//       timeout: 15000,
//     });

//     this.client.interceptors.request.use(async (config) => {
//       const token = await AsyncStorage.getItem('authToken');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     }, (error) => {
//       return Promise.reject(error);
//     });
//   }

//   interceptRequest(interceptor: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig<any>): number {
//     return this.client.interceptors.request.use(interceptor);
//   }

//   interceptResponse(interceptor: (response: any) => any): number {
//     return this.client.interceptors.response.use(interceptor);
//   }

//   ejectRequestInterceptor(id: number): void {
//     this.client.interceptors.request.eject(id);
//   }

//   ejectResponseInterceptor(id: number): void {
//     this.client.interceptors.response.eject(id);
//   }

//   async get<T>(url: string, params?: any) {
//     const response = await this.client.get<T>(url, { params });
//     return response;
//   }

//   async post<T>(url: string, data?: any) {
//     const response = await this.client.post<T>(url, data);
//     return response;
//   }
// }

import { vendorApi } from '../../../backend/supabase/vendor';
import {
  Paginated,
  Category,
  Menu,
  OrderListItem,
  OrderStatus,
} from './types';

type MenuUpdatePayload = Partial<Omit<Menu, 'id' | 'description'>>;

/**
 * ApiClient is a singleton class that serves as the data layer for the vendor app.
 * It abstracts away the direct calls to the backend module, providing a clean,
 * consistent interface for the UI components to consume.
 */
class ApiClient {
  private static instance: ApiClient;

  // A private constructor prevents creating new instances of the class with the `new` keyword.
  private constructor() {}

  /**
   * Provides the single, global instance of the ApiClient.
   * @returns {ApiClient} The singleton instance.
   */
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Fetches a paginated and filtered list of orders by calling the backend module.
   * @param params - Parameters for filtering (status) and pagination (page, limit).
   * @returns A promise that resolves to a paginated list of orders.
   */
  async fetchOrders(params: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<Paginated<OrderListItem>> {
    const { data, error } = await vendorApi.getOrders(params);
    if (error || !data) {
      console.error('API Client Error: Failed to fetch orders.', error);
      throw new Error('Could not retrieve orders. Please try again later.');
    }
    return data;
  }

  /**
   * Fetches all menu categories.
   * @returns A promise that resolves to a paginated list of categories.
   */
  async fetchCategories(): Promise<Paginated<Category>> {
    const { data, error } = await vendorApi.getCategories();
    if (error || !data) {
      console.error('API Client Error: Failed to fetch categories.', error);
      throw new Error('Could not retrieve categories.');
    }
    // For consistency, we wrap the result in a Paginated object, just like the dummy data.
    return {
      items: data,
      total: data.length,
      page: 1,
      limit: data.length,
    };
  }

  /**
   * Fetches all menu items.
   * @returns A promise that resolves to a paginated list of menu items.
   */
  async fetchMenus(): Promise<Paginated<Menu>> {
    const { data, error } = await vendorApi.getMenuItems();
    if (error || !data) {
      console.error('API Client Error: Failed to fetch menus.', error);
      throw new Error('Could not retrieve menu items.');
    }
    // Wrap in a Paginated object for UI consistency.
    return {
      items: data,
      total: data.length,
      page: 1,
      limit: data.length,
    };
  }

  /**
   * Updates the status of a specific order.
   * @param orderId - The internal numeric ID of the order to update.
   * @param status - The new status to set for the order.
   */
  async updateOrderStatus(orderId: number, status: OrderStatus): Promise<void> {
    const { success, error } = await vendorApi.updateOrderStatus(orderId, status);
    if (error || !success) {
      console.error(`API Client Error: Failed to update order ${orderId}.`, error);
      throw new Error('Could not update the order status.');
    }
  }

  /**
   * Updates the details of a specific menu item.
   * @param menuId - The ID of the menu item to update.
   * @param updates - An object containing the fields of the menu item to update.
   */
  async updateMenuItem(menuId: string, updates: MenuUpdatePayload): Promise<void> {
    const { data, error } = await vendorApi.updateMenuItem(menuId, updates);
    if (error || !data) {
      console.error(`API Client Error: Failed to update menu item ${menuId}.`, error);
      throw new Error('Could not update the menu item.');
    }
  }
}

// Export the single, shared instance of the ApiClient for use throughout the app.
// Example usage in a component: `import { apiClient } from './api';`
export const apiClient = ApiClient.getInstance();