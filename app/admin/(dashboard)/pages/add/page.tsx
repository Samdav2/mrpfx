'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, FileText, Image, Trash2 } from 'lucide-react';
import { adminPagesService, WPMediaItem } from '@/lib/admin-api';
import { generateSlug, getMediaUrl } from '@/lib/utils';
import { SuccessModal, ErrorModal } from '@/components/admin/Modals';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';

export default function AddPagePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState<{ isOpen: boolean, message: string }>({ isOpen: false, message: '' });
    const [createdId, setCreatedId] = useState<number | null>(null);

    // Media State
    const [featuredImage, setFeaturedImage] = useState<WPMediaItem | null>(null);
    const [showMediaModal, setShowMediaModal] = useState(false);

    const [formData, setFormData] = useState({
        post_title: '',
        post_content: '',
        post_excerpt: '',
        post_status: 'draft',
        slug: '',
    });

    const handleChange = (field: string, value: any) => {
        setFormData(prev => {
            const updates: any = { [field]: value };
            if (field === 'post_title' && !prev.slug) {
                updates.slug = generateSlug(value);
            }
            return { ...prev, ...updates };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.post_title.trim()) return;

        setLoading(true);
        try {
            const newPage = await adminPagesService.create({
                post_title: formData.post_title,
                post_content: formData.post_content || '',
                post_excerpt: formData.post_excerpt || undefined,
                post_status: formData.post_status,
                post_name: formData.slug || undefined,
                post_type: 'page',
            });

            if (featuredImage) {
                await adminPagesService.updateFeaturedImage(newPage.ID, featuredImage.id);
            }

            setCreatedId(newPage.ID);
            setSuccessModal(true);
        } catch (error) {
            console.error('Failed to create page:', error);
            setErrorModal({ isOpen: true, message: 'Failed to create page. Please try again.' });
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
                        href="/admin/pages"
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Create New Page</h1>
                        <p className="text-sm text-gray-400 mt-1">Create a new static page</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.post_title.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save className="w-4 h-4" />
                    {loading ? 'Creating...' : 'Publish Page'}
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title & Content */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                                <FileText className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-semibold">Page Content</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Title *</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 border border-transparent placeholder-gray-600"
                                    placeholder="Enter page title"
                                    value={formData.post_title}
                                    onChange={(e) => handleChange('post_title', e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Slug</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 border border-transparent placeholder-gray-600"
                                    placeholder="page-url-slug"
                                    value={formData.slug}
                                    onChange={(e) => handleChange('slug', e.target.value)}
                                />
                                <p className="text-xs text-gray-500">The "slug" is the URL-friendly version of the name.</p>
                            </div>

                            <div className="space-y-2">
                                <RichTextEditor
                                    label="Content"
                                    value={formData.post_content}
                                    onChange={(val) => handleChange('post_content', val)}
                                    placeholder="Write your page content here..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-white font-semibold pb-4 border-b border-gray-800">Excerpt</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Summary (optional)</label>
                            <textarea
                                className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 border border-transparent placeholder-gray-600 resize-none"
                                placeholder="Brief summary of the page"
                                rows={3}
                                value={formData.post_excerpt}
                                onChange={(e) => handleChange('post_excerpt', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-white font-semibold pb-4 border-b border-gray-800">Publish</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Status</label>
                            <select
                                className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 border border-transparent"
                                value={formData.post_status}
                                onChange={(e) => handleChange('post_status', e.target.value)}
                            >
                                <option value="draft">Draft</option>
                                <option value="publish">Publish</option>
                                <option value="pending">Pending Review</option>
                            </select>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-white font-semibold pb-4 border-b border-gray-800">Featured Image</h3>
                        {featuredImage ? (
                            <div className="relative group mt-2">
                                <img
                                    src={getMediaUrl(featuredImage.url || featuredImage.source_url)}
                                    alt="Featured"
                                    className="w-full h-auto rounded-lg border border-gray-700"
                                    referrerPolicy="no-referrer"
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
                                className="w-full aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 text-gray-500 transition-colors"
                            >
                                <Image className="w-8 h-8 mb-2" />
                                <span className="text-sm">Set featured image</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>

            {/* Success Modal */}
            <SuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                title="Page Created"
                message="Your page has been created successfully."
                confirmText="Continue Editing"
                onConfirm={() => router.push(`/admin/pages/${createdId}`)}
                secondaryText="Back to Pages"
                onSecondary={() => router.push('/admin/pages')}
            />

            {/* Error Modal */}
            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                message={errorModal.message}
            />

            <MediaPickerModal
                isOpen={showMediaModal}
                onClose={() => setShowMediaModal(false)}
                onSelect={(media) => setFeaturedImage(media)}
                title="Select Featured Image"
            />
        </div>
    );
}
