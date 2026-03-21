import api from './api';
import {
    TraderInfo,
    TraderPerformanceResponse,
    AccountManagementListResponse,
    AccountManagementAdminListResponse,
    AccountManagementResponse,
    CopyTradingListResponse,
    CopyTradingAdminListResponse,
    CopyTradingResponse
} from './types';

export const tradersService = {
    async listTraders(): Promise<TraderInfo[]> {
        try {
            const response = await api.get('/traders');
            return response.data.traders;
        } catch (error) {
            console.error('Error fetching traders:', error);
            return [];
        }
    },

    async getTraderPerformance(traderId: string): Promise<TraderPerformanceResponse | null> {
        try {
            const response = await api.get(`/traders/${traderId}/performance`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching performance for trader ${traderId}:`, error);
            return null;
        }
    },

    async connectAccount(data: {
        accountId: string;
        password: string;
        server: string;
        broker: string;
        capital: number;
        manager: string;
        agreed: boolean;
    }): Promise<{ success: boolean; message: string }> {
        try {
            const response = await api.post('/account-management/connect', data);
            return { success: true, message: response.data.message };
        } catch (error: any) {
            console.error('Error connecting account:', error);
            const message = error.response?.data?.detail || error.message || 'An unexpected error occurred';
            return { success: false, message };
        }
    },

    async getMyConnections(): Promise<AccountManagementListResponse> {
        try {
            const response = await api.get('/account-management/connections');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching my connections:', error);
            return { success: false, count: 0, data: [] };
        }
    },

    async getAllConnections(limit = 50, offset = 0): Promise<AccountManagementAdminListResponse> {
        try {
            const response = await api.get('/admin/account-management/connections', {
                params: { limit, offset }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching all connections:', error);
            return { success: false, count: 0, data: [] };
        }
    },

    async updateConnectionStatus(connectionId: string, status: string): Promise<AccountManagementResponse | null> {
        try {
            const response = await api.patch(`/admin/account-management/connections/${connectionId}`, { status });
            return response.data;
        } catch (error: any) {
            console.error('Error updating connection status:', error);
            return null;
        }
    },

    // --- Copy Trading ---

    async connectCopyTrading(data: {
        accountId: string;
        password: string;
        server: string;
    }): Promise<{ success: boolean; message: string }> {
        try {
            const response = await api.post('/copy-trading/connect', data);
            return { success: true, message: response.data.message };
        } catch (error: any) {
            console.error('Error connecting copy trading:', error);
            const message = error.response?.data?.detail || error.message || 'An unexpected error occurred';
            return { success: false, message };
        }
    },

    async getMyCopyTradingConnections(): Promise<CopyTradingListResponse> {
        try {
            const response = await api.get('/copy-trading/connections');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching my copy trading connections:', error);
            return { success: false, count: 0, data: [] };
        }
    },

    async getAllCopyTradingConnections(limit = 50, offset = 0): Promise<CopyTradingAdminListResponse> {
        try {
            const response = await api.get('/admin/copy-trading/connections', {
                params: { limit, offset }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching all copy trading connections:', error);
            return { success: false, count: 0, data: [] };
        }
    },

    async updateCopyTradingStatus(connectionId: string, status: string): Promise<CopyTradingResponse | null> {
        try {
            const response = await api.patch(`/admin/copy-trading/connections/${connectionId}`, { status });
            return response.data;
        } catch (error: any) {
            console.error('Error updating copy trading status:', error);
            return null;
        }
    },

    async disconnectCopyTrading(connectionId: string): Promise<{ success: boolean; message: string }> {
        try {
            const response = await api.delete(`/copy-trading/connections/${connectionId}`);
            return response.data;
        } catch (error: any) {
            console.error('Error disconnecting copy trading:', error);
            const message = error.response?.data?.detail || error.message || 'An unexpected error occurred';
            return { success: false, message };
        }
    }
};
