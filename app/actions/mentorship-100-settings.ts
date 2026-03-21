'use server'

import fs from 'fs/promises';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'mentorship-100-settings.json');

export async function getMentorship100Settings() {
    try {
        const data = await fs.readFile(SETTINGS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        // Return default if file doesn't exist
        return {
            registrationOpenDate: null,
            productSlug: 'mentorship-100'
        };
    }
}

export async function updateMentorship100Settings(data: { registrationOpenDate: string | null, productSlug: string }) {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
}
