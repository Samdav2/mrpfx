/**
 * WordPress Content Service
 * Handles posts, pages, comments, categories, and tags
 */

import api from './api';
import type {
    WPPostRead,
    WPPostCreate,
    WPPostUpdate,
    WPPostWithTerms,
    WPCommentRead,
    WPCommentCreate,
    WPCommentUpdate,
    WPCategory,
    WPTag,
} from './types';

export type {
    WPPostRead,
    WPPostCreate,
    WPPostUpdate,
    WPPostWithTerms,
    WPCommentRead,
    WPCommentCreate,
    WPCommentUpdate,
    WPCategory,
    WPTag,
};

// ============================================================================
// POSTS SERVICE
// ============================================================================

export const postsService = {
    /**
     * Get list of posts
     */
    getPosts: async (
        status: string = 'publish',
        limit: number = 10,
        offset: number = 0
    ): Promise<WPPostRead[]> => {
        const response = await api.get<WPPostRead[]>('/wordpress/posts', {
            params: { status, limit, offset },
        });
        return response.data;
    },

    /**
     * Get a single post by slug
     */
    getPost: async (slug: string): Promise<WPPostRead> => {
        const response = await api.get<WPPostRead>(`/wordpress/posts/${slug}`);
        return response.data;
    },

    /**
     * Get a post with associated categories and tags by slug
     */
    getPostWithTerms: async (slug: string): Promise<WPPostWithTerms> => {
        const response = await api.get<WPPostWithTerms>(
            `/wordpress/posts/${slug}/full`
        );
        return response.data;
    },

    /**
     * Create a new post (requires authentication)
     */
    createPost: async (data: WPPostCreate): Promise<WPPostRead> => {
        const response = await api.post<WPPostRead>('/wordpress/posts', data);
        return response.data;
    },

    /**
     * Update an existing post (requires authentication)
     */
    updatePost: async (
        postId: number,
        data: WPPostUpdate
    ): Promise<WPPostRead> => {
        const response = await api.put<WPPostRead>(
            `/wordpress/posts/${postId}`,
            data
        );
        return response.data;
    },

    /**
     * Delete a post (requires authentication)
     */
    deletePost: async (postId: number, force: boolean = false): Promise<void> => {
        await api.delete(`/wordpress/posts/${postId}`, {
            params: { force },
        });
    },

    /**
     * Assign terms (categories/tags) to a post
     */
    assignTerms: async (postId: number, termIds: number[]): Promise<void> => {
        await api.post(`/wordpress/posts/${postId}/terms`, termIds);
    },

    /**
     * Remove terms from a post
     */
    removeTerms: async (postId: number, termIds: number[]): Promise<void> => {
        await api.delete(`/wordpress/posts/${postId}/terms`, {
            data: termIds,
        });
    },

    /**
     * Update featured image
     */
    updateFeaturedImage: async (postId: number, imageId: number): Promise<WPPostRead> => {
        const response = await api.put<WPPostRead>(`/wordpress/posts/${postId}/featured-image`, {
            attachment_id: imageId
        });
        return response.data;
    }
};

// ============================================================================
// PAGES SERVICE
// ============================================================================

export const pagesService = {
    /**
     * Get list of pages
     */
    getPages: async (
        status: string = 'publish',
        limit: number = 10,
        offset: number = 0
    ): Promise<WPPostRead[]> => {
        const response = await api.get<WPPostRead[]>('/wordpress/pages', {
            params: { status, limit, offset },
        });
        return response.data;
    },

    /**
     * Get a single page by slug
     */
    getPage: async (slug: string): Promise<WPPostRead> => {
        const response = await api.get<WPPostRead>(`/wordpress/pages/${slug}`);
        return response.data;
    },

    /**
     * Create a new page (requires authentication)
     */
    createPage: async (data: WPPostCreate): Promise<WPPostRead> => {
        const response = await api.post<WPPostRead>('/wordpress/pages', data);
        return response.data;
    },

    /**
     * Update an existing page (requires authentication)
     */
    updatePage: async (
        pageId: number,
        data: WPPostUpdate
    ): Promise<WPPostRead> => {
        const response = await api.put<WPPostRead>(
            `/wordpress/pages/${pageId}`,
            data
        );
        return response.data;
    },

    /**
     * Delete a page (requires authentication)
     */
    deletePage: async (pageId: number, force: boolean = false): Promise<void> => {
        await api.delete(`/wordpress/pages/${pageId}`, {
            params: { force },
        });
    },
};

// ============================================================================
// COMMENTS SERVICE
// ============================================================================

export const commentsService = {
    /**
     * Get all comments
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
            { params: { status, limit, offset } }
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
     * Create a new comment on a post
     */
    createComment: async (
        postId: number,
        data: WPCommentCreate
    ): Promise<WPCommentRead> => {
        const commentData = { ...data, comment_post_ID: postId };
        const response = await api.post<WPCommentRead>(
            `/wordpress/posts/${postId}/comments`,
            commentData
        );
        return response.data;
    },

    /**
     * Update a comment (requires authentication)
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
     * Delete a comment (requires authentication)
     */
    deleteComment: async (
        commentId: number,
        force: boolean = false
    ): Promise<void> => {
        await api.delete(`/wordpress/comments/${commentId}`, {
            params: { force },
        });
    },
};

// ============================================================================
// CATEGORIES SERVICE
// ============================================================================

export const categoriesService = {
    /**
     * Get list of categories
     */
    getCategories: async (
        limit: number = 100,
        offset: number = 0
    ): Promise<Record<string, unknown>[]> => {
        const response = await api.get<Record<string, unknown>[]>(
            '/wordpress/categories',
            { params: { limit, offset } }
        );
        return response.data;
    },

    /**
     * Get a single category
     */
    getCategory: async (categoryId: number): Promise<Record<string, unknown>> => {
        const response = await api.get<Record<string, unknown>>(
            `/wordpress/categories/${categoryId}`
        );
        return response.data;
    },

    /**
     * Create a new category (requires authentication)
     */
    createCategory: async (
        name: string,
        options?: {
            slug?: string;
            description?: string;
            parent?: number;
        }
    ): Promise<Record<string, unknown>> => {
        const response = await api.post<Record<string, unknown>>(
            '/wordpress/categories',
            null,
            {
                params: {
                    name,
                    slug: options?.slug,
                    description: options?.description || '',
                    parent: options?.parent || 0,
                },
            }
        );
        return response.data;
    },

    /**
     * Update a category (requires authentication)
     */
    updateCategory: async (
        categoryId: number,
        data: {
            name?: string;
            slug?: string;
            description?: string;
            parent?: number;
        }
    ): Promise<Record<string, unknown>> => {
        const response = await api.put<Record<string, unknown>>(
            `/wordpress/categories/${categoryId}`,
            null,
            { params: data }
        );
        return response.data;
    },

    /**
     * Delete a category (requires authentication)
     */
    deleteCategory: async (categoryId: number): Promise<void> => {
        await api.delete(`/wordpress/categories/${categoryId}`);
    },
};

// ============================================================================
// TAGS SERVICE
// ============================================================================

export const tagsService = {
    /**
     * Get list of tags
     */
    getTags: async (
        limit: number = 100,
        offset: number = 0
    ): Promise<Record<string, unknown>[]> => {
        const response = await api.get<Record<string, unknown>[]>(
            '/wordpress/tags',
            { params: { limit, offset } }
        );
        return response.data;
    },

    /**
     * Get a single tag
     */
    getTag: async (tagId: number): Promise<Record<string, unknown>> => {
        const response = await api.get<Record<string, unknown>>(
            `/wordpress/tags/${tagId}`
        );
        return response.data;
    },

    /**
     * Create a new tag (requires authentication)
     */
    createTag: async (
        name: string,
        options?: {
            slug?: string;
            description?: string;
        }
    ): Promise<Record<string, unknown>> => {
        const response = await api.post<Record<string, unknown>>(
            '/wordpress/tags',
            null,
            {
                params: {
                    name,
                    slug: options?.slug,
                    description: options?.description || '',
                },
            }
        );
        return response.data;
    },

    /**
     * Update a tag (requires authentication)
     */
    updateTag: async (
        tagId: number,
        data: {
            name?: string;
            slug?: string;
            description?: string;
        }
    ): Promise<Record<string, unknown>> => {
        const response = await api.put<Record<string, unknown>>(
            `/wordpress/tags/${tagId}`,
            null,
            { params: data }
        );
        return response.data;
    },

    /**
     * Delete a tag (requires authentication)
     */
    deleteTag: async (tagId: number): Promise<void> => {
        await api.delete(`/wordpress/tags/${tagId}`);
    },
};

// ============================================================================
// UNIFIED CONTENT SERVICE (convenience export)
// ============================================================================

export const contentService = {
    posts: postsService,
    pages: pagesService,
    comments: commentsService,
    categories: categoriesService,
    tags: tagsService,
};
