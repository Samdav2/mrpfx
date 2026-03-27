import api from '@/lib/api';

export interface Trader {
    trader_id: string;
    name: string;
    type: string;
    strategy: string;
    description?: string;
    profitFactor: string;
    avgTradeDuration: string;
    bestTrade: string;
    worstTrade: string;
    created_at?: string;
    updated_at?: string;
}

export interface TraderCreate extends Omit<Trader, 'created_at' | 'updated_at'> { }
export interface TraderUpdate extends Partial<TraderCreate> { }

export interface TraderPerformance {
    performance_id: string | number;
    trader_id: string;
    month: string;
    winRate: string;
    monthlyRoi: string;
    maxDrawdown: string;
    totalTrades: string;
    created_at?: string;
    updated_at?: string;
}

export interface TraderPerformanceCreate extends Omit<TraderPerformance, 'performance_id' | 'trader_id' | 'created_at' | 'updated_at'> { }
export interface TraderPerformanceUpdate extends Partial<TraderPerformanceCreate> { }

export const traderService = {
    // Public/User endpoints
    getAllTraders: async (): Promise<Trader[]> => {
        const response = await api.get<Trader[]>('/traders');
        return response.data;
    },

    getTraderPerformance: async (traderId: string): Promise<TraderPerformance[]> => {
        const response = await api.get<TraderPerformance[]>(`/traders/${traderId}/performance`);
        return response.data;
    },

    // Admin endpoints
    createTrader: async (data: TraderCreate): Promise<Trader> => {
        const response = await api.post<Trader>('/admin/traders', data);
        return response.data;
    },

    updateTrader: async (traderId: string, data: TraderUpdate): Promise<Trader> => {
        const response = await api.put<Trader>(`/admin/traders/${traderId}`, data);
        return response.data;
    },

    deleteTrader: async (traderId: string): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/admin/traders/${traderId}`);
        return response.data;
    },

    addPerformance: async (traderId: string, data: TraderPerformanceCreate): Promise<TraderPerformance> => {
        const response = await api.post<TraderPerformance>(`/admin/traders/${traderId}/performance`, {
            ...data,
            trader_id: traderId
        });
        return response.data;
    },

    updatePerformance: async (performanceId: string | number, data: TraderPerformanceUpdate): Promise<TraderPerformance> => {
        const response = await api.put<TraderPerformance>(`/admin/traders/performance/${performanceId}`, data);
        return response.data;
    },

    deletePerformance: async (performanceId: string | number): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/admin/traders/performance/${performanceId}`);
        return response.data;
    }
};
