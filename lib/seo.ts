
import api from './api';
import type {
    SEOIndexable,
    UpdateSEORequest,
    SEORedirect,
    CreateRedirectRequest,
    UpdateRedirectRequest,
    SEORedirectLog,
    SEO404Error
} from './types';

export const seoService = {
    // Indexables (Yoast)
    getIndexables: async (params: {
        object_type?: string,
        object_sub_type?: string,
        is_public?: boolean,
        limit?: number,
        offset?: number
    } = {}) => {
        const response = await api.get<SEOIndexable[]>('/wordpress/seo/indexables', { params });
        return response.data;
    },

    getPostSeo: async (postId: number) => {
        const response = await api.get<SEOIndexable>(`/wordpress/seo/posts/${postId}`);
        return response.data;
    },

    updatePostSeo: async (postId: number, data: UpdateSEORequest) => {
        const response = await api.put<SEOIndexable>(`/wordpress/seo/posts/${postId}`, data);
        return response.data;
    },

    getSeoLinks: async (params: { post_id?: number, link_type?: string, limit?: number } = {}) => {
        const response = await api.get<any[]>('/wordpress/seo/links', { params });
        return response.data;
    },

    // Redirects
    getRedirectGroups: async () => {
        const response = await api.get<any>('/wordpress/seo/redirects/groups');
        return response.data;
    },

    getRedirects: async (params: {
        group_id?: number,
        status?: string,
        limit?: number,
        offset?: number
    } = {}) => {
        const response = await api.get<SEORedirect[]>('/wordpress/seo/redirects', { params });
        return response.data;
    },

    createRedirect: async (data: CreateRedirectRequest) => {
        const response = await api.post<SEORedirect>('/wordpress/seo/redirects', data);
        return response.data;
    },

    updateRedirect: async (redirectId: number, data: UpdateRedirectRequest) => {
        const response = await api.put<SEORedirect>(`/wordpress/seo/redirects/${redirectId}`, data);
        return response.data;
    },

    deleteRedirect: async (redirectId: number) => {
        await api.delete(`/wordpress/seo/redirects/${redirectId}`);
    },

    getRedirectLogs: async (redirectId: number, limit: number = 100) => {
        const response = await api.get<SEORedirectLog[]>(`/wordpress/seo/redirects/${redirectId}/logs`, { params: { limit } });
        return response.data;
    },

    // 404 Errors
    get404Errors: async (limit: number = 100, offset: number = 0) => {
        const response = await api.get<SEO404Error[]>('/wordpress/seo/404-errors', { params: { limit, offset } });
        return response.data;
    },

    // Stats
    getStats: async () => {
        const response = await api.get<any>('/wordpress/seo/stats');
        return response.data;
    }
};
