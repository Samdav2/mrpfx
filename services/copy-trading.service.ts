import api from "@/lib/api";
import {
    CopyTradingConnectRequest,
    CopyTradingResponse,
    CopyTradingListResponse,
    CopyTradingAdminListResponse,
    CopyTradingUpdateStatusRequest
} from "@/lib/types";

class CopyTradingService {
    // --- User Actions ---

    /**
     * Connect an MT5 account for Copy Trading.
     */
    async connect(data: CopyTradingConnectRequest): Promise<{ message: string; status: string }> {
        const response = await api.post("/copy-trading/connect", data);
        return response.data;
    }

    /**
     * Get current user's copy trading connections.
     */
    async getMyConnections(): Promise<CopyTradingListResponse> {
        const response = await api.get("/copy-trading/connections");
        return response.data;
    }

    // --- Admin Actions ---

    /**
     * Get all copy trading connections (Admin only).
     */
    async getAllConnections(limit = 50, offset = 0): Promise<CopyTradingAdminListResponse> {
        const response = await api.get("/admin/copy-trading/connections", {
            params: { limit, offset }
        });
        return response.data;
    }

    /**
     * Update the status of a copy trading connection (Admin only).
     */
    async updateStatus(id: string, status: string): Promise<CopyTradingResponse> {
        const response = await api.patch(`/admin/copy-trading/connections/${id}`, { status });
        return response.data;
    }
}

export const copyTradingService = new CopyTradingService();
