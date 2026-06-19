export interface User {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  first_name?: string;
  last_name?: string;
  password_hash: string;
  is_email_verified: boolean;
}

export interface RegisterDTO {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    first_name?: string | undefined;
    last_name?: string | undefined;
  };
  accessToken: string;
  refreshToken: string;
}
