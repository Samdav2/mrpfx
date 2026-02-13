import api from './api';
import { jwtDecode } from "jwt-decode";
import type {
    UserResponse,
    TokenResponse,
    LoginRequest,
    SignupRequest,
    VerifyEmailRequest,
    ResendVerificationRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    RefreshTokenRequest,
    ChangePasswordRequest,
    MessageResponse
} from './types';

// Alias UserResponse to User for backward compatibility if needed,
// or just update usage. Let's keep User as an alias for now.
export type User = UserResponse;
export type AuthResponse = TokenResponse;

export const authService = {
    signup: async (data: SignupRequest) => {
        const response = await api.post<MessageResponse>('/auth/signup', data);
        return response.data;
    },

    login: async (data: LoginRequest) => {
        const response = await api.post<TokenResponse>('/auth/login', data);
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            window.dispatchEvent(new Event('auth-change'));
        }
        return response.data;
    },

    adminLogin: async (data: LoginRequest) => {
        const response = await api.post<TokenResponse>('/auth/admin/login', data);
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            // Set cookie for middleware
            document.cookie = `admin_access_token=${response.data.access_token}; path=/; max-age=${response.data.expires_in || 3600}; SameSite=Strict`;
            window.dispatchEvent(new Event('auth-change'));
        }
        return response.data;
    },

    verifyEmail: async (data: VerifyEmailRequest) => {
        const response = await api.post<MessageResponse>('/auth/verify-email', data);
        return response.data;
    },

    resendVerification: async (email: string) => {
        const data: ResendVerificationRequest = { email };
        const response = await api.post<MessageResponse>('/auth/resend-verification', data);
        return response.data;
    },

    forgotPassword: async (email: string) => {
        const data: ForgotPasswordRequest = { email };
        const response = await api.post<MessageResponse>('/auth/forgot-password', data);
        return response.data;
    },

    resetPassword: async (data: ResetPasswordRequest) => {
        const response = await api.post<MessageResponse>('/auth/reset-password', data);
        return response.data;
    },

    refreshToken: async (refreshToken: string) => {
        const data: RefreshTokenRequest = { refresh_token: refreshToken };
        const response = await api.post<TokenResponse>('/auth/refresh', data);
        return response.data;
    },

    changePassword: async (data: ChangePasswordRequest) => {
        const response = await api.post<MessageResponse>('/auth/change-password', data);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get<UserResponse>('/auth/me');
        return response.data;
    },

    getUserFromToken: (): User | null => {
        if (typeof window === 'undefined') return null;
        const token = localStorage.getItem('access_token');
        if (!token) return null;
        try {
            const decoded: any = jwtDecode(token);
            return {
                ID: parseInt(decoded.sub),
                user_email: decoded.email,
                user_login: decoded.email, // Fallback
                user_nicename: '',
                user_url: '',
                user_registered: '',
                user_status: 0,
                display_name: null
            } as User;
        } catch (e) {
            console.error('Failed to decode token:', e);
            return null;
        }
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Clear cookie
        document.cookie = 'admin_access_token=; path=/; max-age=0; SameSite=Strict';
        window.dispatchEvent(new Event('auth-change'));
        window.location.href = '/login';
    }
};
