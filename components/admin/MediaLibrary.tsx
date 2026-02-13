'use client';

import { useState, useEffect } from 'react';
import {
    Image as ImageIcon,
    Upload,
    Trash2,
    Search,
    X,
    Check
} from 'lucide-react';
import { adminMediaService, WPMediaItem } from '@/lib/admin-api';
import { getMediaUrl } from '@/lib/utils';

interface MediaLibraryProps {
    onSelect?: (media: WPMediaItem) => void;
    allowMultiple?: boolean; // For future use (galleries)
    maxHeight?: string;
    className?: string;
}

export function MediaLibrary({ onSelect, maxHeight = '600px', className = '' }: MediaLibraryProps) {
    const [mediaItems, setMediaItems] = useState<WPMediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [uploading, setUploading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<WPMediaItem | null>(null);
    const [editingAltText, setEditingAltText] = useState('');
    const [savingAltText, setSavingAltText] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string>('full');

    // Upload Staging
    const [stagedFile, setStagedFile] = useState<File | null>(null);
    const [stagedAltText, setStagedAltText] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const items = await adminMediaService.getAll(search);
            setMediaItems(items);
        } catch (error) {
            console.error('Failed to fetch media:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, [search]);

    // Handle preview URL cleanup
    useEffect(() => {
        if (stagedFile) {
            const url = URL.createObjectURL(stagedFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl('');
        }
    }, [stagedFile]);

    // Update editing alt text when selected item changes
    useEffect(() => {
        if (selectedItem) {
            setEditingAltText(selectedItem.alt_text || '');
            setSelectedSize('full'); // Reset size selection
        } else {
            setEditingAltText('');
            setSelectedSize('full');
        }
    }, [selectedItem]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setStagedFile(e.target.files[0]);
        setStagedAltText('');
    };

    const handleConfirmUpload = async () => {
        if (!stagedFile) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', stagedFile);
            if (stagedAltText) {
                formData.append('alt_text', stagedAltText);
            }

            const newMedia = await adminMediaService.upload(formData);
            await fetchMedia();
            setSelectedItem(newMedia);
            setStagedFile(null); // Clear stage
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleUpdateAltText = async () => {
        if (!selectedItem) return;

        try {
            setSavingAltText(true);
            const updated = await adminMediaService.update(selectedItem.id, {
                alt_text: editingAltText
            });
            setSelectedItem(updated);
            setMediaItems(prev => prev.map(item => item.id === updated.id ? updated : item));
        } catch (error) {
            console.error('Update alt text failed:', error);
            alert('Failed to update alt text');
        } finally {
            setSavingAltText(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            await adminMediaService.delete(id);
            if (selectedItem?.id === id) setSelectedItem(null);
            await fetchMedia();
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete image');
        }
    };

    return (
        <div className={`flex flex-col bg-white rounded-lg shadow ${className}`} style={{ height: maxHeight }}>
            {/* Header / Toolbar */}
            <div className="p-4 border-b flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search media..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 w-full rounded-md border border-gray-300 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="media-upload"
                        disabled={uploading}
                    />
                    <label
                        htmlFor="media-upload"
                        className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <Upload className="h-4 w-4" />
                        {uploading ? 'Processing...' : 'Upload Image'}
                    </label>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Image Grid */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-full text-gray-400">Loading...</div>
                    ) : mediaItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                            <p>No media found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {mediaItems.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    className={`group relative aspect-square border-2 rounded-lg cursor-pointer overflow-hidden ${selectedItem?.id === item.id ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-transparent hover:border-gray-300'}`}
                                >
                                    <img
                                        src={getMediaUrl(item.url || item.source_url)} // Use the thumbnail or full URL
                                        alt={typeof item.title === 'object' ? item.title.rendered : item.title || 'Media'}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                    {/* Selection Overlay */}
                                    {selectedItem?.id === item.id && (
                                        <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                                            <div className="bg-blue-500 text-white rounded-full p-1">
                                                <Check className="h-4 w-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Details */}
                {selectedItem && (
                    <div className="w-80 border-l bg-gray-50 flex flex-col p-4 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Attachment Details</h3>
                            <button onClick={() => setSelectedItem(null)} className="text-gray-500 hover:text-gray-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-4 aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 min-h-[160px]">
                            <img
                                src={getMediaUrl(selectedItem.sizes?.[selectedSize] || selectedItem.url || selectedItem.source_url)}
                                alt={typeof selectedItem.title === 'object' ? selectedItem.title.rendered : selectedItem.title}
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                            />
                        </div>

                        <div className="space-y-4 text-sm">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">MIME Type</label>
                                <p className="text-sm font-medium text-gray-900">{selectedItem.mime_type}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Uploaded On</label>
                                <p className="text-sm font-medium text-gray-900">
                                    {new Date(selectedItem.date_created || selectedItem.date || '').toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            {selectedItem.media_details && (selectedItem.media_details.width || selectedItem.media_details.height) && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Dimensions</label>
                                    <p className="text-sm font-medium text-gray-900">
                                        {selectedItem.media_details.width} × {selectedItem.media_details.height} px
                                    </p>
                                </div>
                            )}

                            <div className="pt-2">
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Alt Text</label>
                                <div className="space-y-2">
                                    <textarea
                                        className="w-full text-xs border border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none h-16"
                                        value={editingAltText}
                                        onChange={(e) => setEditingAltText(e.target.value)}
                                        placeholder="Describe the image content..."
                                    />
                                    <button
                                        onClick={handleUpdateAltText}
                                        disabled={savingAltText || editingAltText === (selectedItem.alt_text || '')}
                                        className="w-full flex items-center justify-center px-3 py-1.5 bg-gray-900 text-white text-[11px] font-bold rounded-md hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        {savingAltText ? 'Saving...' : 'Update Metadata'}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Select Resolution</label>
                                <div className="space-y-1.5">
                                    {['thumbnail', 'medium', 'large', 'full'].map((size) => {
                                        const hasSize = size === 'full' || (selectedItem.sizes && selectedItem.sizes[size]);
                                        if (size !== 'full' && !hasSize) return null;

                                        const labels: Record<string, string> = {
                                            thumbnail: 'Thumbnail (150×150)',
                                            medium: 'Medium (300px)',
                                            large: 'Large (1024px)',
                                            full: 'Original Full Size'
                                        };

                                        return (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-full flex items-center justify-between px-3 py-2 text-[11px] rounded-lg border transition-all ${selectedSize === size
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md font-bold'
                                                    : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50/50'
                                                    }`}
                                            >
                                                <span>{labels[size] || size.toUpperCase()}</span>
                                                {selectedSize === size && <Check className="h-3 w-3" />}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="mt-2 text-[10px] text-gray-500 leading-tight">
                                    Choose an optimized size for faster loading and better SEO.
                                </p>
                            </div>

                            <div className="pt-2 mt-4 border-t border-gray-200">
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">File URL</label>
                                <div className="relative group">
                                    <input
                                        readOnly
                                        className="w-full text-[11px] border border-gray-200 rounded-md p-2 bg-gray-100/50 text-gray-600 font-mono focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap"
                                        value={getMediaUrl(selectedItem.sizes?.[selectedSize] || selectedItem.url || selectedItem.source_url || '')}
                                        onClick={(e) => e.currentTarget.select()}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t space-y-3">
                            {onSelect && (
                                <button
                                    onClick={() => {
                                        const url = selectedItem.sizes?.[selectedSize] || selectedItem.url || selectedItem.source_url || '';
                                        onSelect({
                                            ...selectedItem,
                                            url: url
                                        });
                                    }}
                                    className="w-full h-12 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                                >
                                    <Check className="h-4 w-4" />
                                    Insert {selectedSize} Image
                                </button>
                            )}

                            <button
                                onClick={() => handleDelete(selectedItem.id)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 border border-red-100 bg-red-50 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete Permanently
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Upload Staging Modal */}
            {stagedFile && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 text-gray-900">
                    <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200 flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Prepare Media Asset</h3>
                            <button onClick={() => setStagedFile(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-[1.5fr,1fr] bg-white">
                            {/* Left: Preview */}
                            <div className="p-6 bg-gray-50 flex flex-col min-h-[300px] md:min-h-0">
                                <div className="flex-1 flex items-center justify-center rounded-xl overflow-hidden border border-gray-200/50 bg-white relative group">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="absolute inset-0 w-full h-full object-contain p-4"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-gray-400">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                                <X className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-medium">Preview Not Available</span>
                                        </div>
                                    )}
                                    {/* Size Badge */}
                                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] rounded-full font-mono">
                                        {(stagedFile.size / 1024).toFixed(0)} KB
                                    </div>
                                </div>
                            </div>

                            {/* Right: Metadata fields */}
                            <div className="p-8 space-y-8 flex flex-col justify-center border-l border-gray-100">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        Accessibility Optimized
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                            Alt Text (Accessibility)
                                        </label>
                                        <textarea
                                            autoFocus
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none h-32"
                                            placeholder="Describe what's in the image..."
                                            value={stagedAltText}
                                            onChange={(e) => setStagedAltText(e.target.value)}
                                        />
                                        <div className="flex justify-between items-start pt-1">
                                            <p className="text-[11px] text-gray-500 leading-relaxed max-w-[250px]">
                                                Briefly describe the image for screen readers. This also helps search engines index your content.
                                            </p>
                                            <span className="text-[10px] font-mono text-gray-400">{stagedAltText.length} chars</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 space-y-3">
                                    <button
                                        onClick={handleConfirmUpload}
                                        disabled={uploading}
                                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {uploading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4" />
                                                Upload to Library
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setStagedFile(null)}
                                        disabled={uploading}
                                        className="w-full h-11 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                                    >
                                        Cancel & Replace
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
