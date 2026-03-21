import apiClient from '@/lib/api/axios';
import { 
  RegisterDto, 
  LoginDto, 
  VerifyOtpDto, 
  ForgotPasswordDto, 
  ResetPasswordDto,
  RegisterResponse,
  AuthResponse
} from '@/features/auth/types';

export const authApi = {
  register: (data: RegisterDto) => 
    apiClient.post<RegisterResponse>('/auth/register', data),
    
  login: (data: LoginDto) => 
    apiClient.post<AuthResponse>('/auth/login', data),
    
  verifyEmail: (data: VerifyOtpDto) => 
    apiClient.post<{message: string}>('/auth/verify-email', data),
    
  forgotPassword: (data: ForgotPasswordDto) => 
    apiClient.post<{message: string}>('/auth/forgot-password', data),
    
  resetPassword: (data: ResetPasswordDto) => 
    apiClient.post<{message: string}>('/auth/reset-password', data),
    
  refresh: (refreshToken: string) => 
    apiClient.post<AuthResponse>('/auth/refresh', { refresh_token: refreshToken }),
    
  logout: (refreshToken: string) => 
    apiClient.post<{message: string}>('/auth/logout', { refresh_token: refreshToken }),

  getMe: (token: string) => 
    apiClient.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    }),
};
