/**
 * WooCommerce Cart Service
 * Handles shopping cart operations
 */

import api from './api';
import type {
    WCAddToCartRequest,
    WCUpdateCartItemRequest,
    WCApplyCouponRequest,
    WCCart,
} from './types';

export type { WCCart };

export const cartService = {
    /**
     * Get the current user's shopping cart
     */
    getCart: async (): Promise<WCCart> => {
        const response = await api.get<WCCart>('/wordpress/wc/cart');
        return response.data;
    },

    /**
     * Add a product to the cart
     */
    addToCart: async (
        productId: number,
        quantity: number = 1,
        variationId?: number
    ): Promise<WCCart> => {
        const data: WCAddToCartRequest = {
            product_id: productId,
            quantity,
            variation_id: variationId,
        };
        const response = await api.post<WCCart>('/wordpress/wc/cart/add', data);
        return response.data;
    },

    /**
     * Update cart item quantity
     */
    updateCartItem: async (
        productId: number,
        quantity: number,
        variationId?: number
    ): Promise<WCCart> => {
        const data: WCUpdateCartItemRequest = {
            product_id: productId,
            quantity,
            variation_id: variationId,
        };
        const response = await api.put<WCCart>('/wordpress/wc/cart/update', data);
        return response.data;
    },

    /**
     * Remove an item from the cart
     */
    removeFromCart: async (
        productId: number,
        variationId?: number
    ): Promise<WCCart> => {
        const params: { variation_id?: number } = {};
        if (variationId) {
            params.variation_id = variationId;
        }
        const response = await api.delete<WCCart>(
            `/wordpress/wc/cart/remove/${productId}`,
            { params }
        );
        return response.data;
    },

    /**
     * Clear all items from the cart
     */
    clearCart: async (): Promise<WCCart> => {
        const response = await api.delete<WCCart>('/wordpress/wc/cart/clear');
        return response.data;
    },

    /**
     * Apply a coupon code to the cart
     */
    applyCoupon: async (couponCode: string): Promise<WCCart> => {
        const data: WCApplyCouponRequest = {
            coupon_code: couponCode,
        };
        const response = await api.post<WCCart>(
            '/wordpress/wc/cart/coupon',
            data
        );
        return response.data;
    },

    /**
     * Remove a coupon from the cart
     */
    removeCoupon: async (couponCode: string): Promise<WCCart> => {
        const response = await api.delete<WCCart>(
            `/wordpress/wc/cart/coupon/${couponCode}`
        );
        return response.data;
    },
};
