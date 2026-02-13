import api from './api';

export interface AdminUser {
    ID: number;
    user_login: string;
    user_email: string;
    display_name: string;
    user_registered: string;
    roles?: string[];
}

export interface AdminOrder {
    id: number;
    status: string;
    total: string;
    currency: string;
    date_created: string;
    billing: {
        first_name: string;
        last_name: string;
        email: string;
    };
}

export interface AdminMember {
    member_id: number;
    user_name: string;
    email: string;
    membership_level: number;
    account_state: string;
    member_since: string;
}

export interface AdminCourse {
    id: number;
    name: string;
    slug: string;
    status: string;
    price: string;
}

export const adminService = {
    // Users
    getUsers: async (page = 1, per_page = 10) => {
        const response = await api.get<AdminUser[]>('/wordpress/users/', {
            params: { page, per_page }
        });
        return response.data;
    },

    getUser: async (id: number) => {
        const response = await api.get<AdminUser>(`/wordpress/users/${id}`);
        return response.data;
    },

    // Orders
    getOrders: async (status = 'any', limit = 10, offset = 0) => {
        const response = await api.get<AdminOrder[]>('/wordpress/wc/orders/', {
            params: { status, limit, offset }
        });
        return response.data;
    },

    // Fetch all orders by paging through the API. This returns all orders
    // (regardless of the backend's default limit) by repeatedly requesting
    // pages of `pageSize` until no more results are returned.
    getAllOrders: async (status = 'any') => {
        const pageSize = 100;
        let offset = 0;
        let all: AdminOrder[] = [];

        while (true) {
            const res = await api.get<AdminOrder[]>('/wordpress/wc/orders/', {
                params: { status, limit: pageSize, offset }
            });
            const items = res.data || [];
            all = all.concat(items);
            if (items.length < pageSize) break;
            offset += pageSize;
        }

        return all;
    },

    getOrder: async (id: number) => {
        const response = await api.get<AdminOrder>(`/wordpress/wc/orders/${id}`);
        return response.data;
    },

    // Members
    // NOTE: List Members endpoint is currently not implemented in backend
    getMembers: async (page = 1, per_page = 10) => {
        // Mocking response for now as endpoint is not implemented
        return [] as AdminMember[];
        /*
        const response = await api.get<AdminMember[]>('/wordpress/members/', {
            params: { page, per_page }
        });
        return response.data;
        */
    },

    getMember: async (id: number) => {
        const response = await api.get<AdminMember>(`/wordpress/members/${id}`);
        return response.data;
    },

    // Courses
    getCourses: async (skip = 0, limit = 10) => {
        const response = await api.get<AdminCourse[]>('/wordpress/learnpress/courses', {
            params: { skip, limit }
        });
        return response.data;
    },

    // Fetch all courses by paging through the API. Returns every course.
    getAllCourses: async () => {
        const pageSize = 100;
        let skip = 0;
        let all: AdminCourse[] = [];

        while (true) {
            const res = await api.get<AdminCourse[]>('/wordpress/learnpress/courses', {
                params: { skip, limit: pageSize }
            });
            const items = res.data || [];
            all = all.concat(items);
            if (items.length < pageSize) break;
            skip += pageSize;
        }

        return all;
    },

    getDashboardStats: async () => {
        try {
            const [usersRes, ordersRes, coursesRes] = await Promise.all([
                api.get('/wordpress/users/', { params: { per_page: 1 } }),
                api.get('/wordpress/wc/orders/', { params: { limit: 1 } }),
                api.get('/wordpress/learnpress/courses', { params: { limit: 1 } })
            ]);

            return {
                users: parseInt(usersRes.headers['x-wp-total'] || '0') || usersRes.data.length,
                orders: parseInt(ordersRes.headers['x-wp-total'] || '0') || ordersRes.data.length,
                courses: parseInt(coursesRes.headers['x-wp-total'] || '0') || coursesRes.data.length,
                members: 0 // Not implemented yet
            };
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
            return { users: 0, orders: 0, courses: 0, members: 0 };
        }
    }
};
