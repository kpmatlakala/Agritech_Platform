// Auth Types
export interface User {
  id: string;
  phone_number: string;
  role: 'agent' | 'farmer';
  role_id: string;
  created_at: string;
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
  created_at: string;
}

// Farmer Types
export type RegistrationChannel = 'ussd' | 'sms' | 'web' | 'agent';
export type FarmerStatus = 'active' | 'pending' | 'suspended' | 'inactive';

export interface Farmer {
  id: string;
  farmer_id: string;
  full_name: string;
  id_number: string;
  phone_number: string;
  village: string;
  district?: string;
  province: string;
  crop_types: string[];
  farm_size_ha?: number;
  latitude?: number;
  longitude?: number;
  gps_accuracy?: number;
  photo_url?: string;
  registered_at: string;
  registered_via: RegistrationChannel;
  status: FarmerStatus;
  created_by: string;
  updated_at: string;
}

// API Types
export interface AuthResponse {
  token: string;
  user: User;
  agent?: Agent;
  farmer?: Farmer;
}

export interface AgentStats {
  total: number;
  active: number;
  pending: number;
}

export interface FarmerSummaryStats {
  total: number;
  active: number;
  pending: number;
  villages?: number;
  districts?: number;
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

export interface NewFarmerInput {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  village: string;
  district?: string;
  cropType: string[];
  farmSizeHa?: number;
}

// Location & Media
export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  timestamp?: number;
}

// Advisory
export interface Advisory {
  id: string;
  title: string;
  description: string;
  type: 'planting' | 'weather' | 'soil' | 'pest' | 'general';
  timestamp: string;
}

// Orders (Marketplace)
export interface Order {
  id: string;
  farmer_id: string;
  product: string;
  quantity: number;
  status: 'pending' | 'confirmed' | 'completed';
  created_at: string;
}
