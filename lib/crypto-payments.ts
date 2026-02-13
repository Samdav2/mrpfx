/**
 * Crypto Payment Service
 * Interacts with NOWPayments integration on the backend
 */

import api from './api';
import type {
    CryptoCurrency,
    CryptoPaymentRead,
    CryptoInvoiceRequest,
    CryptoPaymentRequest,
    CryptoEstimate,
    CryptoStatusResponse,
} from './types';

export const cryptoPaymentsService = {
    /**
     * Check NOWPayments API connectivity
     */
    getStatus: async (): Promise<CryptoStatusResponse> => {
        const response = await api.get<CryptoStatusResponse>('/crypto-payments/status');
        return response.data;
    },

    /**
     * List available cryptocurrencies
     */
    getCurrencies: async (): Promise<string[]> => {
        const response = await api.get<{ currencies: string[] }>('/crypto-payments/currencies');
        return response.data.currencies || [];
    },

    /**
     * Get minimum payment for a pair
     */
    getMinAmount: async (from: string, to: string): Promise<{ min_amount: number }> => {
        const response = await api.get<{ min_amount: number }>('/crypto-payments/min-amount', {
            params: { from, to }
        });
        return response.data;
    },

    /**
     * Get fiat-to-crypto price estimate
     */
    getEstimate: async (amount: number, from: string, to: string): Promise<CryptoEstimate> => {
        const response = await api.get<CryptoEstimate>('/crypto-payments/estimate', {
            params: { amount, from, to }
        });
        return response.data;
    },

    /**
     * Create a redirect payment (Invoice)
     */
    createInvoice: async (data: CryptoInvoiceRequest): Promise<CryptoPaymentRead> => {
        const response = await api.post<CryptoPaymentRead>('/crypto-payments/invoice', data);
        return response.data;
    },

    /**
     * Create a direct payment (White-label)
     */
    createPayment: async (data: CryptoPaymentRequest): Promise<CryptoPaymentRead> => {
        const response = await api.post<CryptoPaymentRead>('/crypto-payments/payment', data);
        return response.data;
    },

    /**
     * List all user payments
     */
    getUserPayments: async (): Promise<CryptoPaymentRead[]> => {
        const response = await api.get<CryptoPaymentRead[]>('/crypto-payments/');
        return response.data;
    },

    /**
     * Get payment details by DB ID
     */
    getPaymentDetails: async (dbId: number): Promise<CryptoPaymentRead> => {
        const response = await api.get<CryptoPaymentRead>(`/crypto-payments/${dbId}`);
        return response.data;
    },

    /**
     * Force status update from API
     */
    forceUpdateStatus: async (paymentId: string): Promise<{ status: string }> => {
        const response = await api.get<{ status: string }>(`/crypto-payments/payment/${paymentId}/status`);
        return response.data;
    },
};
