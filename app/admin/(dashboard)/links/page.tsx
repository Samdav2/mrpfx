'use client';

import { LinkManager } from '@/components/admin/LinkManager';

export default function LinksPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Shortlinks Manager</h1>
            <LinkManager />
        </div>
    );
}
