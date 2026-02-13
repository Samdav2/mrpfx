'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    FileText,
    Layout,
    ClipboardList
} from 'lucide-react';
import { adminFormService } from '@/lib/admin-api';
import { WPFormRead } from '@/lib/types';
import { ConfirmModal } from '@/components/admin/Modals';

export default function FormsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [forms, setForms] = useState<WPFormRead[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 10;

    // Modal State
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, formId: number | null }>({ isOpen: false, formId: null });

    useEffect(() => {
        fetchForms();
    }, [page]);

    const fetchForms = async () => {
        setLoading(true);
        try {
            const offset = (page - 1) * limit;
            const data = await adminFormService.getAll(limit, offset);
            if (Array.isArray(data)) {
                setForms(data);
            }
        } catch (error) {
            console.error("Failed to fetch forms", error);
            setForms([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        setDeleteModal({ isOpen: true, formId: id });
    };

    const confirmDelete = async () => {
        if (!deleteModal.formId) return;
        try {
            // Since there's no explicit delete endpoint in the provided docs for forms,
            // but usually they are posts, we'll assume they can be deleted or at least hidden.
            // For now, let's just log it until the backend provides a delete endpoint.
            console.log("Delete form", deleteModal.formId);
            setForms(forms.filter(f => f.id !== deleteModal.formId));
            setDeleteModal({ isOpen: false, formId: null });
        } catch (error) {
            console.error("Failed to delete form", error);
        }
    };

    const filteredForms = forms.filter(form =>
        form.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white">Forms</h1>
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search forms..."
                            className="bg-[#111827] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/forms/new"
                        className="flex items-center gap-2 px-4 py-2 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Form</span>
                    </Link>
                </div>
            </div>

            {/* Forms Table */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h3 className="text-white font-semibold">WPForms Definitions</h3>
                    <span className="text-xs text-purple-400">Total: {forms.length}</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                                <th className="p-4 w-10">
                                    <input type="checkbox" className="rounded bg-gray-700 border-gray-600 accent-purple-600" />
                                </th>
                                <th className="p-4 font-medium flex items-center gap-2 cursor-pointer hover:text-white">
                                    Title <ArrowUpDown className="w-3 h-3" />
                                </th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">Created Date</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">Loading forms...</td>
                                </tr>
                            ) : filteredForms.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        No forms found. Click "Create Form" to create one.
                                    </td>
                                </tr>
                            ) : (
                                filteredForms.map((form) => (
                                    <tr key={form.id} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors group">
                                        <td className="p-4">
                                            <input type="checkbox" className="rounded bg-gray-700 border-gray-600 accent-purple-600" />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                                                    <Layout className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <span className="text-white font-medium block">{form.title}</span>
                                                    <span className="text-gray-500 text-xs">ID: {form.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400">
                                            <span className="bg-gray-800 px-2 py-0.5 rounded text-xs">
                                                {form.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-400">{formatDate(form.date)}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/forms/${form.id}/entries`} title="View Entries" className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded transition-colors">
                                                    <ClipboardList className="w-4 h-4" />
                                                </Link>
                                                <Link href={`/admin/forms/${form.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(form.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-800 text-sm text-gray-400">
                    <div>Showing {filteredForms.length} results</div>
                    <div className="flex items-center gap-2">
                        <span>Rows per page: {limit}</span>
                        <div className="flex gap-1 ml-4">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                className="p-1 hover:bg-gray-700 rounded"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, formId: null })}
                onConfirm={confirmDelete}
                title="Delete Form"
                message="Are you sure you want to delete this form definition? This action cannot be undone."
                isDestructive={true}
            />
        </div>
    );
}
