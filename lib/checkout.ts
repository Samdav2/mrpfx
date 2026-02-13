/**
 * WooCommerce Checkout Service
 * Handles checkout flow and order creation
 */

import api from './api';
import type {
    WCCheckoutRequest,
    WCCheckoutResponse,
    WCAddress,
} from './types';

export type { WCCheckoutRequest, WCCheckoutResponse, WCAddress };

export const checkoutService = {
    /**
     * Create an order from the current cart
     */
    checkout: async (data: WCCheckoutRequest): Promise<WCCheckoutResponse> => {
        const response = await api.post<WCCheckoutResponse>(
            '/wordpress/wc/checkout',
            data
        );
        return response.data;
    },

    /**
     * Helper to build a checkout request with same billing/shipping
     */
    buildCheckoutRequest: (
        billingAddress: WCAddress,
        paymentMethod: string,
        options?: {
            customerNote?: string;
            shippingMethod?: string;
            couponCodes?: string[];
            paymentMethodTitle?: string;
        }
    ): WCCheckoutRequest => {
        return {
            billing_address: billingAddress,
            use_same_for_shipping: true,
            payment_method: paymentMethod,
            payment_method_title: options?.paymentMethodTitle,
            customer_note: options?.customerNote,
            shipping_method: options?.shippingMethod,
            coupon_codes: options?.couponCodes || [],
        };
    },

    /**
     * Helper to build a checkout request with different shipping address
     */
    buildCheckoutRequestWithShipping: (
        billingAddress: WCAddress,
        shippingAddress: WCAddress,
        paymentMethod: string,
        options?: {
            customerNote?: string;
            shippingMethod?: string;
            couponCodes?: string[];
            paymentMethodTitle?: string;
        }
    ): WCCheckoutRequest => {
        return {
            billing_address: billingAddress,
            shipping_address: shippingAddress,
            use_same_for_shipping: false,
            payment_method: paymentMethod,
            payment_method_title: options?.paymentMethodTitle,
            customer_note: options?.customerNote,
            shipping_method: options?.shippingMethod,
            coupon_codes: options?.couponCodes || [],
        };
    },
};
