import axios from 'axios';

const isServer = typeof window === 'undefined';
const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
const API_PREFIX = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

const API_BASE_URL = isServer ? `${BACKEND_URL}${API_PREFIX}` : API_PREFIX;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.NEXT_PUBLIC_BACKEND_API_KEY,
    },
});

api.interceptors.request.use(
    async (config) => {
        let token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

        // Fallback to cookie if localStorage is empty (Next.js middleware uses cookies)
        if (!token) {
            if (typeof document !== 'undefined') {
                const matches = document.cookie.match(/admin_access_token=([^;]+)/);
                if (matches) token = matches[1];
            } else if (isServer) {
                try {
                    const { cookies } = await import('next/headers');
                    const cookieStore = await cookies();
                    token = cookieStore.get('admin_access_token')?.value || null;
                } catch (e) {
                    // next/headers might not be available in all contexts
                    console.debug('next/headers not available for token retrieval');
                }
            }
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
                if (refreshToken) {
                    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                        refresh_token: refreshToken,
                    });
                    const { access_token } = response.data;
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('access_token', access_token);
                    }
                    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Handle refresh token failure (e.g., logout user)
                console.error('Token refresh failed:', refreshError);
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
