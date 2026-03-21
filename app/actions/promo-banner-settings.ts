'use server';

import fs from 'fs/promises';
import path from 'path';

export interface PromoBannerSettings {
    active: boolean;
    text: string;
    link: string;
    backgroundColor: string;
}

const SETTINGS_FILE = path.join(process.cwd(), 'promo-banner-settings.json');

const DEFAULT_SETTINGS: PromoBannerSettings = {
    active: false,
    text: "Welcome to Mr P FX! Check out our latest VIP resources.",
    link: "",
    backgroundColor: "bg-[#5B2EFF]"
};

export async function getPromoBannerSettings(): Promise<PromoBannerSettings> {
    try {
        const data = await fs.readFile(SETTINGS_FILE, 'utf-8');
        return JSON.parse(data) as PromoBannerSettings;
    } catch (error) {
        console.warn('Failed to read promo-banner-settings.json, using defaults.');
        return DEFAULT_SETTINGS;
    }
}

export async function updatePromoBannerSettings(settings: Partial<PromoBannerSettings>): Promise<PromoBannerSettings> {
    const current = await getPromoBannerSettings();
    const updated = { ...current, ...settings };
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(updated, null, 2));
    return updated;
}
