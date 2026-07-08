import Constants from 'expo-constants';
import { storage } from './storage';  // ✅ Cross-platform storage

// Get API base URL from environment or use default
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Set authorization token (in-memory cache)
   */
  setToken(token: string | null): void {
    this.token = token;
  }

  /**
   * Get authorization token from storage
   * ✅ Uses cross-platform storage (localStorage on web, AsyncStorage on native)
   */
  async getToken(): Promise<string | null> {
    // Return cached token if available
    if (this.token) return this.token;

    try {
      const token = await storage.getItem('authToken');
      this.token = token;
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  /**
   * Save authorization token to storage
   * ✅ Uses cross-platform storage
   */
  async saveToken(token: string): Promise<void> {
    try {
      await storage.setItem('authToken', token);
      this.token = token;
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  /**
   * Clear authorization token
   * ✅ Uses cross-platform storage
   */
  async clearToken(): Promise<void> {
    try {
      await storage.removeItem('authToken');
      this.token = null;
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  }

  /**
   * Build headers with authorization
   */
  private async buildHeaders(
    customHeaders?: Record<string, string>
  ): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = await this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Generic fetch wrapper
   */
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = await this.buildHeaders(customHeaders);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // ===== AUTH ENDPOINTS =====

  async login(phoneNumber: string, password?: string): Promise<any> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone_number: phoneNumber, password }),
    });
  }

  async registerAgent(data: {
    phone_number: string;
    full_name: string;
    email?: string;
    village?: string;
    district?: string;
  }): Promise<any> {
    return this.request('/auth/register-agent', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser(): Promise<any> {
    return this.request('/auth/me');
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      // Ignore logout errors (e.g., if already logged out)
      console.warn('Logout API call failed:', error);
    }
    await this.clearToken();
  }

  // ===== AGENT ENDPOINTS =====

  async getAgentProfile(): Promise<any> {
    return this.request('/agents/me');
  }

  async getAgentFarmers(agentId: string, params?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const queryString = new URLSearchParams();
    if (params?.search) queryString.append('search', params.search);
    if (params?.status) queryString.append('status', params.status);
    if (params?.page) queryString.append('page', String(params.page));
    if (params?.limit) queryString.append('limit', String(params.limit));

    const suffix = queryString.toString() ? `?${queryString.toString()}` : '';
    return this.request(`/agents/${agentId}/farmers${suffix}`);
  }

  // ===== FARMER ENDPOINTS =====

  async registerFarmer(data: any): Promise<any> {
    return this.request('/farmers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getFarmer(farmerId: string): Promise<any> {
    return this.request(`/farmers/${farmerId}`);
  }

  async getFarmerProfile(): Promise<any> {
    return this.request('/farmers/me');
  }

  async updateFarmer(farmerId: string, data: Partial<any>): Promise<any> {
    return this.request(`/farmers/${farmerId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteFarmer(farmerId: string): Promise<void> {
    await this.request(`/farmers/${farmerId}`, { method: 'DELETE' });
  }

  async updateOwnProfile(data: Partial<any>): Promise<any> {
    return this.request('/farmers/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ===== UTILITY METHODS =====

  /**
   * Upload file to cloud storage
   * ✅ Works on both native and web
   */
  async uploadFile(uri: string, fieldName: string = 'file'): Promise<string> {
    const formData = new FormData();

    // ✅ Handle both native (uri) and web (blob/file) formats
    if (typeof uri === 'string' && uri.startsWith('blob:')) {
      // Web: fetch blob and append
      const response = await fetch(uri);
      const blob = await response.blob();
      formData.append(fieldName, blob, `photo-${Date.now()}.jpg`);
    } else {
      // Native: use the uri directly
      formData.append(fieldName, {
        uri,
        type: 'image/jpeg',
        name: `photo-${Date.now()}.jpg`,
      } as any);
    }

    try {
      const token = await this.getToken();
      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();
      return result.url || result.data?.url;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const apiClient = new ApiClient();