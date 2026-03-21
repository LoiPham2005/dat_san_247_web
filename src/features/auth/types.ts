export interface User {
    id: string;
    email: string;
    full_name: string;
    phone?: string;
    avatar_url?: string;
    status: string;
    is_email_verified: boolean;
    role?: {
        name: string;
        slug: string;
    };
}

export interface RegisterDto {
    email: string;
    password?: string;
    full_name: string;
    phone?: string;
}

export interface LoginDto {
    email: string;
    password?: string;
}

export interface VerifyOtpDto {
    email: string;
    code: string;
    type: string;
}

export interface ForgotPasswordDto {
    email: string;
}

export interface ResetPasswordDto {
    email: string;
    code: string;
    new_password?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
    path: string;
}

export interface AuthData {
    access_token: string;
    refresh_token: string;
    user: User;
}

export type AuthResponse = ApiResponse<AuthData>;

export interface RegisterResponse {
    message: string;
    userId: string;
}
