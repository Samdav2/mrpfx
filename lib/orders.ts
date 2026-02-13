/**
 * WooCommerce Orders Service (User-facing)
 * Handles user order history and summaries
 */

import api from './api';
import type {
    WCOrder,
    WCOrderFull,
    WCUserOrderSummary,
} from './types';

export type { WCOrder, WCOrderFull, WCUserOrderSummary };

export const ordersService = {
    /**
     * Get the current user's orders
     */
    getMyOrders: async (
        skip: number = 0,
        limit: number = 10
    ): Promise<WCOrder[]> => {
        const response = await api.get<WCOrder[]>('/wordpress/wc/my-orders', {
            params: { skip, limit },
        });
        return response.data;
    },

    /**
     * Get order summary for the current user
     */
    getMyOrderSummary: async (): Promise<WCUserOrderSummary> => {
        const response = await api.get<WCUserOrderSummary>(
            '/wordpress/wc/my-orders/summary'
        );
        return response.data;
    },

    /**
     * Get a specific order for the current user
     */
    getMyOrder: async (orderId: number): Promise<WCOrderFull> => {
        const response = await api.get<WCOrderFull>(
            `/wordpress/wc/my-orders/${orderId}`
        );
        return response.data;
    },

    // ========================================================================
    // ADMIN ORDER ACCESS (for completeness)
    // ========================================================================

    /**
     * Get all orders (admin)
     */
    getOrders: async (
        skip: number = 0,
        limit: number = 10
    ): Promise<WCOrder[]> => {
        const response = await api.get<WCOrder[]>('/wordpress/wc/orders', {
            params: { skip, limit },
        });
        return response.data;
    },

    /**
     * Get a specific order (admin)
     */
    getOrder: async (orderId: number): Promise<WCOrder> => {
        const response = await api.get<WCOrder>(
            `/wordpress/wc/orders/${orderId}`
        );
        return response.data;
    },

    /**
     * Get a specific order with full details (admin)
     */
    getOrderFull: async (orderId: number): Promise<WCOrderFull> => {
        const response = await api.get<WCOrderFull>(
            `/wordpress/wc/orders/${orderId}/full`
        );
        return response.data;
    },

    // ========================================================================
    // CUSTOMERS (for admin usage)
    // ========================================================================

    /**
     * Get list of customers (admin)
     */
    getCustomers: async (skip: number = 0, limit: number = 10) => {
        const response = await api.get('/wordpress/wc/customers', {
            params: { skip, limit },
        });
        return response.data;
    },

    /**
     * Get a specific customer (admin)
     */
    getCustomer: async (customerId: number) => {
        const response = await api.get(`/wordpress/wc/customers/${customerId}`);
        return response.data;
    },
};
