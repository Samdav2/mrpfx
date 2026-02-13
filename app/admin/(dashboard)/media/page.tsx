'use client';

import { MediaLibrary } from '@/components/admin/MediaLibrary';

export default function MediaPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Media Library</h1>
                    <p className="text-gray-400 text-sm mt-1">Upload, manage, and organize your media files.</p>
                </div>
            </div>
            <MediaLibrary maxHeight="calc(100vh - 200px)" />
        </div>
    );
}
