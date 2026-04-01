export interface LoginCredentials {
  email:    string
  password: string
}

export interface AuthUser {
  id:    number
  name:  string
  email: string
}

export interface AuthResponse {
  token: string
  user:  AuthUser
}

export interface FieldErrors {
  email?:    string
  password?: string
}
