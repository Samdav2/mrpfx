'use client';

import { X } from 'lucide-react';
import { MediaLibrary } from './MediaLibrary';
import { WPMediaItem } from '@/lib/admin-api';

interface MediaPickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (media: WPMediaItem) => void;
    title?: string;
}

export function MediaPickerModal({ isOpen, onClose, onSelect, title = 'Select Media' }: MediaPickerModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[80vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden p-4">
                    <MediaLibrary
                        onSelect={(media) => {
                            onSelect(media);
                            onClose();
                        }}
                        maxHeight="100%"
                        className="h-full shadow-none border"
                    />
                </div>
            </div>
        </div>
    );
}
