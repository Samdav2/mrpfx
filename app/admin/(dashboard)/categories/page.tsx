'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminTermService, WPTerm } from '@/lib/admin-api';
import {
    Folder,
    Plus,
    Search,
    Trash2,
    MoreVertical,
    ChevronRight,
    Loader2
} from 'lucide-react';
import { ConfirmModal, SuccessModal, ErrorModal } from '@/components/admin/Modals';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<WPTerm[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '', slug: '' });
    const [creating, setCreating] = useState(false);

    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; termId: number | null }>({
        isOpen: false,
        termId: null
    });
    const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await adminTermService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.name.trim()) return;

        setCreating(true);
        try {
            await adminTermService.createCategory({
                name: newCategory.name,
                description: newCategory.description || undefined,
                slug: newCategory.slug || undefined
            });
            await fetchCategories();
            setShowAddModal(false);
            setNewCategory({ name: '', description: '', slug: '' });
            setSuccessModal({ isOpen: true, message: 'Category created successfully!' });
        } catch (error) {
            console.error('Failed to create category:', error);
            setErrorModal({ isOpen: true, message: 'Failed to create category.' });
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.termId) return;

        try {
            await adminTermService.deleteCategory(deleteModal.termId);
            setCategories(categories.filter(c => c.term_id !== deleteModal.termId));
            setDeleteModal({ isOpen: false, termId: null });
            setSuccessModal({ isOpen: true, message: 'Category deleted successfully!' });
        } catch (error) {
            console.error('Failed to delete category:', error);
            setErrorModal({ isOpen: true, message: 'Failed to delete category.' });
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Categories</h1>
                    <p className="text-sm text-gray-400 mt-1">Manage your website's content categories</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20"
                >
                    <Plus className="w-4 h-4" />
                    New Category
                </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 bg-[#111827] border border-gray-800 p-4 rounded-xl">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-800 bg-[#1F2937]/50">
                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Count</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                                        <span className="text-gray-500 text-sm">Loading categories...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <tr key={category.term_id} className="hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                                                <Folder className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{category.name}</div>
                                                <div className="text-xs text-gray-500">{category.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400 max-w-md truncate">
                                        {category.description || '—'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-400">
                                            {category.count}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setDeleteModal({ isOpen: true, termId: category.term_id })}
                                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm font-medium">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#111827] border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                        <form onSubmit={handleCreate} className="p-6 space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                <h3 className="text-xl font-bold text-white">Add New Category</h3>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5 rotate-90" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Name *</label>
                                    <input
                                        type="text"
                                        autoFocus
                                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                        placeholder="Category name"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Slug</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                        placeholder="category-slug"
                                        value={newCategory.slug}
                                        onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Description</label>
                                    <textarea
                                        rows={3}
                                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600 resize-none"
                                        placeholder="Short description..."
                                        value={newCategory.description}
                                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating || !newCategory.name.trim()}
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    {creating ? 'Creating...' : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, termId: null })}
                onConfirm={handleDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone."
                isDestructive={true}
            />

            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={() => setSuccessModal({ isOpen: false, message: '' })}
                message={successModal.message}
            />

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ isOpen: false, message: '' })}
                message={errorModal.message}
            />
        </div>
    );
}
