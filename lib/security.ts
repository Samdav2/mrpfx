
import api from './api';
import type {
    BlockedIP,
    BlockIPRequest,
    LoginAttempt,
    SecurityIssue,
    UpdateIssueRequest,
    SecurityEvent,
    TrafficHit
} from './types';

export const securityService = {
    // Blocks (Wordfence)
    getBlockedIps: async (params: {
        active_only?: boolean,
        limit?: number,
        offset?: number
    } = {}) => {
        const response = await api.get<BlockedIP[]>('/wordpress/security/blocks', { params });
        return response.data;
    },

    blockIp: async (data: BlockIPRequest) => {
        const response = await api.post<BlockedIP>('/wordpress/security/blocks', data);
        return response.data;
    },

    unblockIp: async (blockId: number) => {
        await api.delete(`/wordpress/security/blocks/${blockId}`);
    },

    // Logins
    getLoginAttempts: async (params: {
        failed_only?: boolean,
        username?: string,
        limit?: number,
        offset?: number
    } = {}) => {
        const response = await api.get<LoginAttempt[]>('/wordpress/security/logins', { params });
        return response.data;
    },

    // Issues
    getIssues: async (params: {
        status?: string,
        severity?: number,
        limit?: number
    } = {}) => {
        const response = await api.get<SecurityIssue[]>('/wordpress/security/issues', { params });
        return response.data;
    },

    updateIssueStatus: async (issueId: number, data: UpdateIssueRequest) => {
        const response = await api.patch<SecurityIssue>(`/wordpress/security/issues/${issueId}`, data);
        return response.data;
    },

    // Events
    getEvents: async (params: { event_type?: string, limit?: number } = {}) => {
        const response = await api.get<SecurityEvent[]>('/wordpress/security/events', { params });
        return response.data;
    },

    // Traffic
    getTrafficHits: async (params: { attacks_only?: boolean, limit?: number } = {}) => {
        const response = await api.get<TrafficHit[]>('/wordpress/security/traffic', { params });
        return response.data;
    },

    // iThemes Security
    getItsecBans: async (limit: number = 100) => {
        const response = await api.get<any[]>('/wordpress/security/itsec/bans', { params: { limit } });
        return response.data;
    },

    getItsecLockouts: async (params: { active_only?: boolean, limit?: number } = {}) => {
        const response = await api.get<any[]>('/wordpress/security/itsec/lockouts', { params });
        return response.data;
    },

    getItsecLogs: async (params: { module?: string, log_type?: string, limit?: number } = {}) => {
        const response = await api.get<any[]>('/wordpress/security/itsec/logs', { params });
        return response.data;
    },

    // BlogVault
    getBvActivities: async (limit: number = 100) => {
        const response = await api.get<any[]>('/wordpress/security/blogvault/activities', { params: { limit } });
        return response.data;
    },

    getBvFirewallRequests: async (params: { blocked_only?: boolean, limit?: number } = {}) => {
        const response = await api.get<any[]>('/wordpress/security/blogvault/firewall', { params });
        return response.data;
    },

    // Loginizer
    getLoginizerLogs: async (limit: number = 100) => {
        const response = await api.get<any[]>('/wordpress/security/loginizer', { params: { limit } });
        return response.data;
    },

    // Dashboard
    getStats: async () => {
        const response = await api.get<any>('/wordpress/security/stats');
        return response.data;
    }
};
