'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Youtube, Trash2, Info, Image as ImageIcon } from 'lucide-react';
import { adminDynamicService, DynamicVideo, WPMediaItem } from '@/lib/admin-api';
import { SuccessModal, ConfirmModal, ErrorModal } from '@/components/admin/Modals';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import { getMediaUrl } from '@/lib/utils';

export default function EditVideoPage() {
    const router = useRouter();
    const params = useParams();
    const videoId = params.videoId as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [errorModal, setErrorModal] = useState<{ isOpen: boolean, message: string }>({ isOpen: false, message: '' });

    const [featuredImage, setFeaturedImage] = useState<WPMediaItem | null>(null);
    const [showMediaModal, setShowMediaModal] = useState(false);
    const [ytThumbnail, setYtThumbnail] = useState('');

    const [formData, setFormData] = useState<Partial<DynamicVideo>>({
        title: '',
        image_url: '',
    });

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const videos = await adminDynamicService.getVideos(100);
                const video = videos.find(v => v.id === videoId);
                if (video) {
                    setFormData({
                        title: video.title,
                        image_url: video.image_url
                    });
                    setYtThumbnail(video.thumbnail);
                    if (video.image_url) {
                        setFeaturedImage({
                            id: 0,
                            url: video.image_url,
                            source_url: video.image_url,
                            title: { rendered: 'Custom Thumbnail' },
                            mime_type: 'image/jpeg'
                        } as any);
                    }
                } else {
                    setErrorModal({ isOpen: true, message: 'Video not found' });
                }
            } catch (error) {
                console.error('Failed to fetch video:', error);
                setErrorModal({ isOpen: true, message: 'Failed to fetch video details.' });
            } finally {
                setLoading(false);
            }
        };

        if (videoId) {
            fetchVideo();
        }
    }, [videoId]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title?.trim()) return;

        setSaving(true);
        try {
            const submitData = {
                title: formData.title,
                youtube_id: videoId,
                image_url: featuredImage ? ((featuredImage as any).url || featuredImage.source_url) : ''
            };
            await adminDynamicService.updateVideo(videoId, submitData);
            setSuccessModal(true);
        } catch (error) {
            console.error('Failed to update video:', error);
            setErrorModal({ isOpen: true, message: 'Failed to update video. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await adminDynamicService.deleteVideo(videoId);
            router.push('/admin/videos');
        } catch (error) {
            console.error('Failed to delete video:', error);
            setErrorModal({ isOpen: true, message: 'Failed to delete video. Please try again.' });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-400">Loading video details...</div>
            </div>
        );
    }

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
                        <h1 className="text-2xl font-bold text-white">Edit Video</h1>
                        <p className="text-sm text-gray-400 mt-1">Update YouTube video details</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setDeleteModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-lg text-sm font-medium transition-colors border border-red-500/20"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving || !formData.title?.trim()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
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
                                <label className="text-sm font-medium text-gray-400">YouTube Video ID</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 text-gray-500 text-sm rounded-lg px-4 py-2.5 outline-none border border-transparent"
                                    value={videoId}
                                    readOnly
                                />
                                <p className="text-[10px] text-gray-500 italic">Video ID cannot be changed after linking.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-white font-semibold mb-4">Preview</h3>
                        <div className="aspect-video rounded-lg overflow-hidden border border-gray-700 bg-black relative">
                            <img
                                src={featuredImage ? getMediaUrl((featuredImage as any).url || featuredImage.source_url) : ytThumbnail}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    if (!featuredImage && videoId) {
                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                    }
                                }}
                            />
                            {featuredImage && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600 text-white text-[10px] font-bold rounded shadow-lg uppercase tracking-wider">
                                    Custom Image
                                </div>
                            )}
                        </div>
                    </div>
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
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Updating the video title or custom thumbnail will affect how it appears in the VIP dashboard. The YouTube Video ID remains linked as the source.
                        </p>
                    </div>
                </div>
            </form>

            <SuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                title="Video Updated"
                message="Your video details have been updated successfully."
                confirmText="Continue Editing"
                onConfirm={() => setSuccessModal(false)}
                secondaryText="Back to Videos"
                onSecondary={() => router.push('/admin/videos')}
            />

            <ConfirmModal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Video Link"
                message="Are you sure you want to remove this video link? This will not delete the video from YouTube."
                isDestructive={true}
            />

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                message={errorModal.message}
            />

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
