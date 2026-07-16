'use server'

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const SETTINGS_FILE = path.join(process.cwd(), 'private-mentorship-settings.json');

export async function getPrivateMentorshipSettings() {
    try {
        const data = await fs.readFile(SETTINGS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        // Return default if file doesn't exist
        return {
            classASlug: 'private-mentorship-class-a',
            classBSlug: 'private-mentorship-class-b'
        };
    }
}

export async function updatePrivateMentorshipSettings(data: { classASlug: string, classBSlug: string }) {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    revalidatePath('/admin/settings');
    revalidatePath('/private-mentorship');
    revalidatePath('/');
    return { success: true };
}
