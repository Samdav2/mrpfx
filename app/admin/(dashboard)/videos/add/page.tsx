'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Youtube, Info, AlertCircle, Image as ImageIcon, Trash2 } from 'lucide-react';
import { adminDynamicService, DynamicVideoCreate, WPMediaItem } from '@/lib/admin-api';
import { SuccessModal, ErrorModal } from '@/components/admin/Modals';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import { getMediaUrl } from '@/lib/utils';

export default function AddVideoPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState<{ isOpen: boolean, message: string }>({ isOpen: false, message: '' });

    const [featuredImage, setFeaturedImage] = useState<WPMediaItem | null>(null);
    const [showMediaModal, setShowMediaModal] = useState(false);

    const [formData, setFormData] = useState<DynamicVideoCreate>({
        title: '',
        youtube_id: '',
        image_url: '',
    });

    const [ytThumbnail, setYtThumbnail] = useState('');

    const handleChange = (field: keyof DynamicVideoCreate, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Auto-generate YouTube thumbnail preview if YouTube ID is entered
        if (field === 'youtube_id' && value.trim()) {
            setYtThumbnail(`https://img.youtube.com/vi/${value}/maxresdefault.jpg`);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.youtube_id.trim()) return;

        setLoading(true);
        try {
            const submitData = {
                ...formData,
                image_url: featuredImage ? ((featuredImage as any).url || featuredImage.source_url) : formData.image_url
            };
            await adminDynamicService.createVideo(submitData);
            setSuccessModal(true);
        } catch (error) {
            console.error('Failed to link video:', error);
            setErrorModal({ isOpen: true, message: 'Failed to link video. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/videos"
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Link New Video</h1>
                        <p className="text-sm text-gray-400 mt-1">Add a YouTube video to the Trading Videos section</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.title.trim() || !formData.youtube_id.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save className="w-4 h-4" />
                    {loading ? 'Linking...' : 'Link Video'}
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-6 backdrop-blur-sm">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center">
                                <Youtube className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-semibold">YouTube Details</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Video Title *</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="e.g. How to use Supply and Demand"
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">YouTube Video ID *</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600 pl-10"
                                        placeholder="e.g. dQw4w9WgXcQ"
                                        value={formData.youtube_id}
                                        onChange={(e) => handleChange('youtube_id', e.target.value)}
                                        required
                                    />
                                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                                <p className="text-[10px] text-gray-500 italic">Enter only the ID (last part of the URL after v=)</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">YouTube Thumbnail (Auto-generated)</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 text-gray-400 text-sm rounded-lg px-4 py-2.5 outline-none border border-transparent"
                                    value={ytThumbnail}
                                    readOnly
                                />
                                <p className="text-[10px] text-gray-500 italic">This will be used if no custom image is set.</p>
                            </div>
                        </div>
                    </div>

                    {(formData.youtube_id || featuredImage) && (
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-white font-semibold mb-4">Preview</h3>
                            <div className="aspect-video rounded-lg overflow-hidden border border-gray-700 bg-black relative">
                                <img
                                    src={featuredImage ? getMediaUrl((featuredImage as any).url || featuredImage.source_url) : ytThumbnail}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        if (!featuredImage && formData.youtube_id) {
                                            // Fallback if maxresdefault doesn't exist
                                            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${formData.youtube_id}/hqdefault.jpg`;
                                        }
                                    }}
                                />
                                {featuredImage && (
                                    <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600 text-white text-[10px] font-bold rounded shadow-lg uppercase tracking-wider">
                                        Custom Image
                                    </div>
                                )}
                                {!featuredImage && formData.youtube_id && (
                                    <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded shadow-lg uppercase tracking-wider">
                                        YouTube Default
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4 backdrop-blur-sm">
                        <div className="flex items-center gap-2 pb-4 border-b border-gray-800">
                            <ImageIcon className="w-5 h-5 text-purple-500" />
                            <h3 className="text-white font-semibold">Custom Thumbnail</h3>
                        </div>

                        {featuredImage ? (
                            <div className="relative group">
                                <img
                                    src={getMediaUrl((featuredImage as any).url || featuredImage.source_url)}
                                    alt="Featured"
                                    className="w-full h-auto rounded-lg border border-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setFeaturedImage(null)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowMediaModal(true)}
                                className="w-full aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 hover:text-purple-500 text-gray-500 transition-colors"
                            >
                                <ImageIcon className="w-8 h-8 mb-2" />
                                <span className="text-sm">Set custom thumbnail</span>
                            </button>
                        )}
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4 backdrop-blur-sm">
                        <div className="flex items-center gap-2 pb-4 border-b border-gray-800">
                            <Info className="w-5 h-5 text-purple-500" />
                            <h3 className="text-white font-semibold">Information</h3>
                        </div>

                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Linking a video will make it appear in the Trading Videos section of the VIP dashboard. Thumbnails are automatically pulled from YouTube servers.
                            </p>
                        </div>
                    </div>
                </div>
            </form>

            {/* Success Modal */}
            <SuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                title="Video Linked"
                message="Your YouTube video has been successfull linked."
                confirmText="Add Another"
                onConfirm={() => {
                    setSuccessModal(false);
                    setFormData({ title: '', youtube_id: '', image_url: '' });
                    setYtThumbnail('');
                    setFeaturedImage(null);
                }}
                secondaryText="Back to Videos"
                onSecondary={() => router.push('/admin/videos')}
            />

            {/* Error Modal */}
            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                message={errorModal.message}
            />

            {/* Media Picker Modal */}
            <MediaPickerModal
                isOpen={showMediaModal}
                onClose={() => setShowMediaModal(false)}
                onSelect={(media) => {
                    setFeaturedImage(media);
                    setShowMediaModal(false);
                }}
                title="Select Custom Thumbnail"
            />
        </div>
    );
}
