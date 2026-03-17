import api from '@/lib/api';

export const paymentService = {
    checkDiscountUsage: async (code: string) => {
        // Stub implementation, replace with actual API when available
        try {
            const response = await api.post(`/payment/discount/check`, { code });
            return response.data;
        } catch (e) {
            // Mock response for now to allow UI to function if backend endpoint isn't ready
            console.warn("Discount check API failed or missing, returning mock response.");
            if (code === "TEST50") return { exists: true, used: false, code: "TEST50", percentage: 50 };
            throw e;
        }
    },
    applyDiscount: async (code: string) => {
        // Stub implementation, replace with actual API when available
        try {
            const response = await api.post(`/payment/discount/apply`, { code });
            return response.data;
        } catch (e) {
            console.warn("Discount apply API failed or missing, returning mock response.");
            if (code === "TEST50") return { success: true };
            throw e;
        }
    }
};
