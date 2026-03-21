'use server'

import fs from 'fs/promises';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'vip-settings.json');

export interface VIPPlanLinks {
    oneMonth: { paymentLink: string };
    twelveMonths: { paymentLink: string };
    unlimited: { paymentLink: string };
}

export interface VIPSettings {
    plans: VIPPlanLinks;
    registrationOpenDate: string | null;
    groupPageLink: string;
}

const DEFAULT_SETTINGS: VIPSettings = {
    plans: {
        oneMonth: { paymentLink: '' },
        twelveMonths: { paymentLink: '' },
        unlimited: { paymentLink: '' },
    },
    registrationOpenDate: null,
    groupPageLink: '',
};

export async function getVIPSettings(): Promise<VIPSettings> {
    try {
        const data = await fs.readFile(SETTINGS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        return DEFAULT_SETTINGS;
    }
}

export async function updateVIPSettings(data: VIPSettings): Promise<{ success: boolean }> {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
}
