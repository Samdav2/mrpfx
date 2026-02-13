'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { adminLearnPressService, adminTermService } from '@/lib/admin-api';
import { generateSlug } from '@/lib/utils';
import { SuccessModal, ErrorModal } from '@/components/admin/Modals';
import TermSelector from '@/components/admin/TermSelector';

export default function AddCoursePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState<{ isOpen: boolean, message: string }>({ isOpen: false, message: '' });
    const [createdId, setCreatedId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        price: 0,
        status: 'draft'
    });

    // Terms State
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newCourse = await adminLearnPressService.createCourse({
                title: formData.title,
                slug: formData.slug || undefined,
                content: formData.content,
                price: Number(formData.price),
                status: formData.status
            });

            // Assign Terms
            const termIds = [...selectedCategories, ...selectedTags];
            if (termIds.length > 0) {
                await adminTermService.assignTerms(newCourse.id, termIds);
            }

            setCreatedId(newCourse.id);
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Failed to create course", error);
            setErrorModal({ isOpen: true, message: 'Failed to create course. Please try again.' });
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/courses" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-white">Create New Course</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6">

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Course Title</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                        placeholder="e.g. Advanced Forex Trading Masterclass"
                        value={formData.title}
                        onChange={(e) => {
                            const title = e.target.value;
                            setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }));
                        }}
                    />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Slug</label>
                    <input
                        type="text"
                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                        placeholder="course-slug-url"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">The "slug" is the URL-friendly version of the name.</p>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Description</label>
                    <textarea
                        rows={5}
                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                        placeholder="Course description..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Price ($)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Status</label>
                        <select
                            className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="draft">Draft</option>
                            <option value="publish">Publish</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
                    <TermSelector
                        taxonomy="category"
                        label="Course Categories"
                        selectedIds={selectedCategories}
                        onChange={setSelectedCategories}
                    />
                    <TermSelector
                        taxonomy="post_tag"
                        label="Course Tags"
                        selectedIds={selectedTags}
                        onChange={setSelectedTags}
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{loading ? 'Creating...' : 'Create Course'}</span>
                    </button>
                </div>

            </form>

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Course Created"
                message="Your course has been created successfully."
                confirmText="Configure Curriculum"
                onConfirm={() => router.push(`/admin/courses/${createdId}`)}
                secondaryText="Back to Courses"
                onSecondary={() => router.push('/admin/courses')}
            />

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                message={errorModal.message}
            />
        </div>
    );
}
