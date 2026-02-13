'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, FileText, Trash2, Image, ExternalLink } from 'lucide-react';
import { adminPagesService, WPMediaItem, adminMediaService } from '@/lib/admin-api';
import { SuccessModal, ConfirmModal, ErrorModal } from '@/components/admin/Modals';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import { getMediaUrl } from '@/lib/utils';

export default function EditPagePage() {
    const router = useRouter();
    const params = useParams();
    const pageId = Number(params.pageId);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [errorModal, setErrorModal] = useState<{ isOpen: boolean, message: string }>({ isOpen: false, message: '' });

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

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const page = await adminPagesService.get(pageId);
                setFormData({
                    post_title: page.post_title || '',
                    post_content: page.post_content || '',
                    post_excerpt: page.post_excerpt || '',
                    post_status: page.post_status || 'draft',
                    slug: page.post_name || '',
                });

                if (page.featured_image) {
                    setFeaturedImage({
                        id: page.featured_image.id,
                        title: { rendered: page.featured_image.title },
                        url: page.featured_image.url,
                        source_url: page.featured_image.url,
                        mime_type: page.featured_image.mime_type,
                    } as any);
                } else if (page.featured_media && page.featured_media > 0) {
                    try {
                        const media = await adminMediaService.get(page.featured_media);
                        setFeaturedImage(media);
                    } catch (err) {
                        console.error("Failed to fetch featured media", err);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch page:', error);
            } finally {
                setLoading(false);
            }
        };

        if (pageId) {
            fetchPage();
        }
    }, [pageId]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.post_title.trim()) return;

        setSaving(true);
        try {
            await adminPagesService.update(pageId, {
                post_title: formData.post_title,
                post_content: formData.post_content || '',
                post_excerpt: formData.post_excerpt || undefined,
                post_status: formData.post_status,
                post_name: formData.slug || undefined,
            });

            if (featuredImage) {
                await adminPagesService.updateFeaturedImage(pageId, featuredImage.id);
            }

            setSuccessModal(true);
        } catch (error) {
            console.error('Failed to update page:', error);
            setErrorModal({ isOpen: true, message: 'Failed to update page. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await adminPagesService.delete(pageId, true);
            router.push('/admin/pages');
        } catch (error) {
            console.error('Failed to delete page:', error);
            setErrorModal({ isOpen: true, message: 'Failed to delete page. Please try again.' });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-400">Loading page...</div>
            </div>
        );
    }

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
                        <h1 className="text-2xl font-bold text-white">Edit Page</h1>
                        <p className="text-sm text-gray-400 mt-1">Update page details</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/${(formData.slug || formData.post_title || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 rounded-lg text-sm font-medium transition-colors border border-cyan-500/20"
                    >
                        <ExternalLink className="w-4 h-4" />
                        View
                    </Link>
                    <button
                        onClick={() => setDeleteModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-lg text-sm font-medium transition-colors border border-red-500/20"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving || !formData.post_title.trim()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    src={getMediaUrl(featuredImage.source_url || featuredImage.url || featuredImage.guid?.rendered)}
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
                title="Page Updated"
                message="Your changes have been saved successfully."
                confirmText="Continue Editing"
                onConfirm={() => setSuccessModal(false)}
                secondaryText="Back to Pages"
                onSecondary={() => router.push('/admin/pages')}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Page"
                message="Are you sure you want to delete this page? This action cannot be undone."
                confirmText="Delete"
                isDestructive
            />

            <MediaPickerModal
                isOpen={showMediaModal}
                onClose={() => setShowMediaModal(false)}
                onSelect={(media) => setFeaturedImage(media)}
                title="Select Featured Image"
            />

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                message={errorModal.message}
            />
        </div>
    );
}
