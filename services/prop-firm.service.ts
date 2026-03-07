export interface PropFirmRegistration {
    login_id: string;
    password?: string;
    propfirm_name: string;
    propfirm_website_link: string;
    server_name: string;
    server_type: string;
    challenges_step: number;
    propfirm_account_cost: number;
    account_size: number;
    account_phases: number;
    trading_platform: string;
    propfirm_rules: string;
    whatsapp_no: string;
    telegram_username: string;
}

export const propFirmService = {
    createRegistration: async (_data: PropFirmRegistration) => {
        // Simulate an API call
        return new Promise((resolve) => {
            setTimeout(() => resolve({ success: true, message: "Registration successful" }), 1000);
        });
    }
};
