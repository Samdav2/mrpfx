/**
 * WooCommerce Products Service
 * User-facing product operations
 */

import api from './api';
import type {
    WCProductRead,
    WCProductCreate,
    WCProductUpdate,
    WCProductFullRead,
    WCProductVariationRead,
    WCProductMeta,
    WCProductReviewCreate,
} from './types';

export type { WCProductRead, WCProductCreate, WCProductUpdate, WCProductFullRead, WCProductVariationRead, WCProductMeta };

export interface ProductReview {
    [key: string]: unknown;
}

export const productsService = {
    /**
     * Get list of products
     */
    getProducts: async (
        skip: number = 0,
        limit: number = 10,
        status: string = 'publish',
        category?: number,
        tag?: number,
        search?: string,
        min_price?: number,
        max_price?: number,
        on_sale?: boolean,
        featured?: boolean
    ): Promise<WCProductRead[]> => {
        const response = await api.get<WCProductRead[]>('/wordpress/wc/products', {
            params: {
                skip,
                limit,
                status,
                category,
                tag,
                search,
                min_price,
                max_price,
                on_sale,
                featured
            },
        });
        return response.data;
    },

    /**
     * Get a single product by ID
     */
    getProduct: async (productId: number): Promise<WCProductRead> => {
        const response = await api.get<WCProductRead>(
            `/wordpress/wc/products/${productId}`
        );
        return response.data;
    },

    /**
     * Get a single product by Slug
     */
    getProductBySlug: async (slug: string): Promise<WCProductRead> => {
        const response = await api.get<WCProductRead>(
            `/wordpress/wc/products/slug/${slug}`
        );
        return response.data;
    },

    /**
     * Get full product details including variations and attributes
     */
    getProductFull: async (productId: number): Promise<WCProductFullRead> => {
        const response = await api.get<WCProductFullRead>(
            `/wordpress/wc/products/${productId}/full`
        );
        return response.data;
    },

    /**
     * Get variations for a product
     */
    getProductVariations: async (productId: number): Promise<WCProductVariationRead[]> => {
        const response = await api.get<WCProductVariationRead[]>(
            `/wordpress/wc/products/${productId}/variations`
        );
        return response.data;
    },

    /**
     * Get product meta/lookup data
     */
    getProductMeta: async (productId: number): Promise<WCProductMeta> => {
        const response = await api.get<WCProductMeta>(
            `/wordpress/wc/products/${productId}/meta`
        );
        return response.data;
    },

    /**
     * Get reviews for a product
     */
    getProductReviews: async (
        productId: number,
        skip: number = 0,
        limit: number = 50
    ): Promise<ProductReview[]> => {
        const response = await api.get<ProductReview[]>(
            `/wordpress/wc/products/${productId}/reviews`,
            { params: { skip, limit } }
        );
        return response.data;
    },

    /**
     * Submit a review for a product (requires authentication)
     */
    createProductReview: async (
        productId: number,
        rating: number,
        review: string
    ): Promise<ProductReview> => {
        const data: WCProductReviewCreate = {
            rating,
            review,
        };
        const response = await api.post<ProductReview>(
            `/wordpress/wc/products/${productId}/reviews`,
            data
        );
        return response.data;
    },

    /**
     * Get images for a product
     */
    getProductImages: async (productId: number): Promise<{ id: number; src: string; name: string; alt: string }[]> => {
        const response = await api.get<{ id: number; src: string; name: string; alt: string }[]>(
            `/wordpress/wc/products/${productId}/images`
        );
        return response.data;
    },

    /**
     * Create a new product (admin)
     */
    createProduct: async (data: WCProductCreate): Promise<WCProductRead> => {
        const response = await api.post<WCProductRead>('/wordpress/wc/products', data);
        return response.data;
    },

    /**
     * Update a product (admin)
     */
    updateProduct: async (
        productId: number,
        data: WCProductUpdate
    ): Promise<WCProductRead> => {
        const response = await api.put<WCProductRead>(
            `/wordpress/wc/products/${productId}`,
            data
        );
        return response.data;
    },

    /**
     * Delete a product (admin)
     */
    deleteProduct: async (productId: number): Promise<void> => {
        await api.delete(`/wordpress/wc/products/${productId}`);
    },
};
