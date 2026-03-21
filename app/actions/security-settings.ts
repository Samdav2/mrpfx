'use server';

import api from '@/lib/api';

export interface SecuritySettings {
    force_password_reset_date: number | null;
    last_updated?: string;
}

export async function getSecuritySettings(): Promise<SecuritySettings> {
    try {
        const response = await api.get('/admin/settings/security/force-reset');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch security settings:', error);
        return { force_password_reset_date: null };
    }
}

export async function updateSecuritySettings(data: { force_reset_date: number | null }): Promise<SecuritySettings> {
    try {
        const response = await api.post('/admin/settings/security/force-reset', data);
        return response.data;
    } catch (error) {
        console.error('Failed to update security settings:', error);
        throw error;
    }
}
