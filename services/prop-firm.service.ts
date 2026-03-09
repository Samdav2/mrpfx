import api from '@/lib/api';

export interface PropFirmRegistration {
    login_id: string;
    password?: string;
    propfirm_name: string;
    propfirm_website_link: string;
    server_name: string;
    server_type: string;
    challenges_step: number;
    propfirm_account_cost: number;
    account_size: number;
    account_phases: number;
    trading_platform: string;
    propfirm_rules: string;
    whatsapp_no: string;
    telegram_username: string;
}

export interface PropFirmRegistrationResponse {
    success: boolean;
    message?: string;
    registration_id: string | number;
    order_id: string;
    amount?: number;
    status?: string;
    payment_status?: string;
}

export interface PropFirmRegistrationData extends PropFirmRegistration {
    registration_id: string | number;
    order_id: string;
    status: string;
    payment_status: string;
    created_at: string;
    updated_at: string;
}

export interface RegistrationsResponse {
    success: boolean;
    count: number;
    data: PropFirmRegistrationData[];
}

export const propFirmService = {
    createRegistration: async (data: PropFirmRegistration): Promise<PropFirmRegistrationResponse> => {
        const response = await api.post<PropFirmRegistrationResponse>(
            '/prop-firm/register',
            data
        );
        return response.data;
    },

    getRegistrations: async (limit = 20, offset = 0): Promise<RegistrationsResponse> => {
        const response = await api.get<RegistrationsResponse>(
            '/prop-firm/registrations',
            { params: { limit, offset } }
        );
        return response.data;
    },

    adminGetRegistrations: async (limit = 50, offset = 0): Promise<RegistrationsResponse> => {
        const response = await api.get<RegistrationsResponse>(
            '/admin/prop-firm/registrations',
            { params: { limit, offset } }
        );
        return response.data;
    },

    updateRegistrationStatus: async (id: string | number, data: { status?: string; payment_status?: string }): Promise<any> => {
        const response = await api.patch(
            `/admin/prop-firm/registrations/${id}`,
            data
        );
        return response.data;
    },

    deleteRegistration: async (id: string | number): Promise<any> => {
        const response = await api.delete(`/admin/prop-firm/registrations/${id}`);
        return response.data;
    }
};
