import api from './api';
import type {
    SWPMMemberRead,
    SWPMMemberCreate,
    SWPMMemberUpdate,
    WCOrderRead,
    WCOrderCreate,
    WCOrderUpdate,
    WPUserRead,
    WPUserCreate,
    WPUserUpdate,
    WPPostRead,
    WPPostCreate,
    WPPostUpdate,
    WPCategory,
    WPTag,
    WPCommentRead,
    WPCommentCreate,
    WPCommentUpdate
} from './types';

export type {
    SWPMMemberRead,
    SWPMMemberCreate,
    SWPMMemberUpdate,
    WCOrderRead,
    WCOrderCreate,
    WCOrderUpdate,
    WPUserRead,
    WPUserCreate,
    WPUserUpdate,
    WPPostRead,
    WPPostCreate,
    WPPostUpdate,
    WPCategory,
    WPTag,
    WPCommentRead,
    WPCommentCreate,
    WPCommentUpdate
};

export const wordpressService = {
    // ========================================================================
    // POSTS & PAGES (By Slug)
    // ========================================================================

    /**
     * Get a post by slug
     */
    getPostBySlug: async (slug: string): Promise<WPPostRead> => {
        const cleanSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const response = await api.get<WPPostRead>(`/wordpress/posts/${cleanSlug}`);
        return response.data;
    },

    /**
     * Get a page by slug
     */
    getPageBySlug: async (slug: string): Promise<WPPostRead> => {
        const cleanSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const response = await api.get<WPPostRead>(`/wordpress/pages/${cleanSlug}`);
        return response.data;
    },
    // ========================================================================
    // SWPM MEMBERS
    // ========================================================================

    /**
     * Get a member by ID
     */
    getMember: async (memberId: number): Promise<SWPMMemberRead> => {
        const response = await api.get<SWPMMemberRead>(
            `/wordpress/members/${memberId}`
        );
        return response.data;
    },

    /**
     * Create a new member
     */
    createMember: async (data: SWPMMemberCreate): Promise<SWPMMemberRead> => {
        const response = await api.post<SWPMMemberRead>(
            '/wordpress/members/',
            data
        );
        return response.data;
    },

    /**
     * Update a member
     */
    updateMember: async (
        memberId: number,
        data: SWPMMemberUpdate
    ): Promise<SWPMMemberRead> => {
        const response = await api.put<SWPMMemberRead>(
            `/wordpress/members/${memberId}`,
            data
        );
        return response.data;
    },

    // ========================================================================
    // WOOCOMMERCE ORDERS (Legacy endpoints)
    // ========================================================================

    /**
     * Get an order by ID
     */
    getOrder: async (orderId: number): Promise<WCOrderRead> => {
        const response = await api.get<WCOrderRead>(
            `/wordpress/orders/${orderId}`
        );
        return response.data;
    },

    /**
     * Get orders with optional filters
     */
    getOrders: async (
        status: string,
        limit: number = 10,
        offset: number = 0
    ): Promise<WCOrderRead[]> => {
        const response = await api.get<WCOrderRead[]>('/wordpress/orders/', {
            params: { status, limit, offset },
        });
        return response.data;
    },

    /**
     * Create a new order
     */
    createOrder: async (data: WCOrderCreate): Promise<WCOrderRead> => {
        const response = await api.post<WCOrderRead>('/wordpress/orders/', data);
        return response.data;
    },

    /**
     * Update an order
     */
    updateOrder: async (
        orderId: number,
        data: WCOrderUpdate
    ): Promise<WCOrderRead> => {
        const response = await api.put<WCOrderRead>(
            `/wordpress/orders/${orderId}`,
            data
        );
        return response.data;
    },

    // ========================================================================
    // WORDPRESS USERS
    // ========================================================================

    /**
     * Get users with pagination
     */
    getUsers: async (
        page: number = 1,
        per_page: number = 10
    ): Promise<WPUserRead[]> => {
        const response = await api.get<WPUserRead[]>('/wordpress/users/', {
            params: { page, per_page },
        });
        return response.data;
    },

    /**
     * Get a user by ID
     */
    getUser: async (userId: number): Promise<WPUserRead> => {
        const response = await api.get<WPUserRead>(`/wordpress/users/${userId}`);
        return response.data;
    },

    /**
     * Create a new user
     */
    createUser: async (data: WPUserCreate): Promise<WPUserRead> => {
        const response = await api.post<WPUserRead>('/wordpress/users/', data);
        return response.data;
    },

    /**
     * Update a user
     */
    updateUser: async (
        userId: number,
        data: WPUserUpdate
    ): Promise<WPUserRead> => {
        const response = await api.put<WPUserRead>(
            `/wordpress/users/${userId}`,
            data
        );
        return response.data;
    },

    // ========================================================================
    // WORDPRESS COMMENTS & REVIEWS
    // ========================================================================

    /**
     * Get all comments across the system
     */
    getComments: async (
        status: string = 'approve',
        limit: number = 50,
        offset: number = 0
    ): Promise<WPCommentRead[]> => {
        const response = await api.get<WPCommentRead[]>('/wordpress/comments', {
            params: { status, limit, offset },
        });
        return response.data;
    },

    /**
     * Get comments for a specific post
     */
    getPostComments: async (
        postId: number,
        status: string = 'approve',
        limit: number = 50,
        offset: number = 0
    ): Promise<WPCommentRead[]> => {
        const response = await api.get<WPCommentRead[]>(
            `/wordpress/posts/${postId}/comments`,
            {
                params: { status, limit, offset },
            }
        );
        return response.data;
    },

    /**
     * Get a single comment by ID
     */
    getComment: async (commentId: number): Promise<WPCommentRead> => {
        const response = await api.get<WPCommentRead>(
            `/wordpress/comments/${commentId}`
        );
        return response.data;
    },

    /**
     * Create a new comment or review
     */
    createComment: async (
        postId: number,
        data: WPCommentCreate
    ): Promise<WPCommentRead> => {
        const response = await api.post<WPCommentRead>(
            `/wordpress/posts/${postId}/comments`,
            data
        );
        return response.data;
    },

    /**
     * Update a comment
     */
    updateComment: async (
        commentId: number,
        data: WPCommentUpdate
    ): Promise<WPCommentRead> => {
        const response = await api.put<WPCommentRead>(
            `/wordpress/comments/${commentId}`,
            data
        );
        return response.data;
    },

    /**
     * Delete a comment
     */
    deleteComment: async (
        commentId: number,
        force: boolean = false
    ): Promise<{ success: boolean; message: string }> => {
        const response = await api.delete(
            `/wordpress/comments/${commentId}`,
            {
                params: { force }
            }
        );
        return response.data;
    },
};
