
import api from './api';
import type {
    MarketingModule,
    MarketingModuleStats,
    MarketingEntry,
    MarketingLead
} from './types';

export const marketingService = {
    // Modules (Hustle)
    getModules: async (params: {
        module_type?: string,
        active_only?: boolean,
        limit?: number
    } = {}) => {
        const response = await api.get<MarketingModule[]>('/wordpress/marketing/modules', { params });
        return response.data;
    },

    getModule: async (moduleId: number) => {
        const response = await api.get<MarketingModule>(`/wordpress/marketing/modules/${moduleId}`);
        return response.data;
    },

    getModuleStats: async (moduleId: number) => {
        const response = await api.get<MarketingModuleStats>(`/wordpress/marketing/modules/${moduleId}/stats`);
        return response.data;
    },

    // Entries
    getEntries: async (params: {
        module_id?: number,
        entry_type?: string,
        limit?: number,
        offset?: number
    } = {}) => {
        const response = await api.get<MarketingEntry[]>('/wordpress/marketing/entries', { params });
        return response.data;
    },

    getEntry: async (entryId: number) => {
        const response = await api.get<MarketingEntry>(`/wordpress/marketing/entries/${entryId}`);
        return response.data;
    },

    // Leads (OptinPanda)
    getLeads: async (params: {
        confirmed_only?: boolean,
        limit?: number,
        offset?: number
    } = {}) => {
        const response = await api.get<MarketingLead[]>('/wordpress/marketing/leads', { params });
        return response.data;
    },

    exportLeads: async (params: { confirmed_only?: boolean, format?: 'json' | 'csv' } = {}) => {
        const response = await api.get<any>('/wordpress/marketing/leads/export', { params });
        return response.data;
    },

    getLead: async (leadId: number) => {
        const response = await api.get<MarketingLead>(`/wordpress/marketing/leads/${leadId}`);
        return response.data;
    },

    // Dashboard
    getStats: async () => {
        const response = await api.get<any>('/wordpress/marketing/stats');
        return response.data;
    },

    getConversionStats: async (params: { module_id?: number, days?: number } = {}) => {
        const response = await api.get<any>('/wordpress/marketing/conversions', { params });
        return response.data;
    },

    // Public Newsletter Subscription
    subscribe: async (data: { email: string; name?: string; form_id?: number }) => {
        const response = await api.post<{ success: boolean; message: string; log_id?: number }>(
            '/wordpress/marketing/subscribe',
            data
        );
        return response.data;
    }
};
