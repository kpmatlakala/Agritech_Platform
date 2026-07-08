// Backend TypeScript Types
export interface User {
  id: string;
  phone_number: string;
  role: 'agent' | 'farmer';
  role_id: string;
  last_login?: Date;
  created_at: Date;
}

export interface Agent {
  id: string;
  agent_id: string;
  phone_number: string;
  full_name: string;
  email?: string;
  village?: string;
  district?: string;
  province: string;
  active: boolean;
  created_at: Date;
}

export interface Farmer {
  id: string;
  farmer_id: string;
  phone_number: string;
  full_name: string;
  id_number: string;
  village: string;
  district?: string;
  province: string;
  crop_types: string[];
  farm_size_ha?: number;
  latitude?: number;
  longitude?: number;
  gps_accuracy?: number;
  photo_url?: string;
  registered_at: Date;
  registered_via: 'ussd' | 'web' | 'agent';
  status: 'active' | 'pending' | 'inactive';
  created_by: string; // Agent ID
  updated_at: Date;
}

export interface JWTPayload {
  userId: string;
  phone_number: string;
  role: 'agent' | 'farmer';
  role_id: string;
}

export interface LoginRequest {
  phone_number: string;
  password?: string;
  pin?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  agent?: Agent;
  farmer?: Farmer;
}

export interface FarmerRegistrationInput {
  full_name: string;
  id_number: string;
  phone_number: string;
  village: string;
  district?: string;
  crop_types: string[];
  farm_size_ha?: number;
  latitude?: number;
  longitude?: number;
  gps_accuracy?: number;
  photo_url?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
