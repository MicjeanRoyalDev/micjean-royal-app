import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.API_URL || 'http://localhost:3000';

// Let's build an axios client to handle API requests

export class ApiClient {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 15000,
    });

    this.client.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  interceptRequest(interceptor: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig<any>): number {
    return this.client.interceptors.request.use(interceptor);
  }

  interceptResponse(interceptor: (response: any) => any): number {
    return this.client.interceptors.response.use(interceptor);
  }

  ejectRequestInterceptor(id: number): void {
    this.client.interceptors.request.eject(id);
  }

  ejectResponseInterceptor(id: number): void {
    this.client.interceptors.response.eject(id);
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }
}