'use server';

import fs from 'fs/promises';
import path from 'path';

export interface PropFirmSettings {
    discountActive: boolean;
    discountPercentage: number;
}

const SETTINGS_FILE = path.join(process.cwd(), 'prop-firm-settings.json');

const DEFAULT_SETTINGS: PropFirmSettings = {
    discountActive: false,
    discountPercentage: 0
};

export async function getPropFirmSettings(): Promise<PropFirmSettings> {
    try {
        const data = await fs.readFile(SETTINGS_FILE, 'utf-8');
        return JSON.parse(data) as PropFirmSettings;
    } catch (error) {
        console.warn('Failed to read prop-firm-settings.json, using defaults.');
        return DEFAULT_SETTINGS;
    }
}

export async function updatePropFirmSettings(settings: Partial<PropFirmSettings>): Promise<PropFirmSettings> {
    const current = await getPropFirmSettings();
    const updated = { ...current, ...settings };
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(updated, null, 2));
    return updated;
}
