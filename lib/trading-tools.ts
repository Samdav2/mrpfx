import api from './api';
import { TradingTool } from './types';

export const tradingToolsService = {
    /**
     * Get trading tools (bots, indicators, etc.)
     */
    getTools: async (type?: 'bot' | 'indicator' | 'book', category?: 'vip' | 'free', limit: number = 20): Promise<any[]> => {
        try {
            if (type === 'book') {
                const isFree = category === 'free';
                const response = await api.get('/books', {
                    params: { is_free: isFree, limit }
                });
                return response.data;
            }

            const response = await api.get('/trading-tools', {
                params: { type, category, limit }
            });
            return response.data;
        } catch (error) {
            console.warn(`Failed to fetch ${type || 'all'} tools for category ${category || 'all'}:`, error);
            throw error;
        }
    }
};
