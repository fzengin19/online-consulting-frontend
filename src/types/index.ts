export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  title?: string;
  avatar?: string;
  address?: Address;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  place_id: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfileData {
  name: string;
  phone?: string;
  title: string;
}

export interface UpdateAddressData {
  name: string;
  latitude: number;
  longitude: number;
  place_id: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}