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
    ExternalLink,
    RefreshCcw
} from 'lucide-react';
import { adminPagesService, WPPage } from '@/lib/admin-api';
import { ConfirmModal } from '@/components/admin/Modals';

export default function PagesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pages, setPages] = useState<WPPage[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('any');
    const limit = 10;

    // Modal State
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, pageId: number | null }>({ isOpen: false, pageId: null });

    useEffect(() => {
        fetchPages();
    }, [currentPage, statusFilter]);

    const fetchPages = async () => {
        setLoading(true);
        try {
            const offset = (currentPage - 1) * limit;
            // Only force 'publish' if specifically requested or if backend requires it.
            // Attempting 'any' to fetch all.
            const status = statusFilter;
            const data = await adminPagesService.getAll(status, limit, offset);
            if (Array.isArray(data)) {
                setPages(data);
            }
        } catch (error) {
            console.error("Failed to fetch pages", error);
            setPages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        setDeleteModal({ isOpen: true, pageId: id });
    };

    const confirmDelete = async () => {
        if (!deleteModal.pageId) return;
        const page = pages.find(p => p.ID === deleteModal.pageId);
        const isCurrentlyTrashed = page?.post_status === 'trash';

        try {
            await adminPagesService.delete(deleteModal.pageId, isCurrentlyTrashed);
            setPages(pages.filter(p => p.ID !== deleteModal.pageId));
            setDeleteModal({ isOpen: false, pageId: null });
        } catch (error) {
            console.error("Failed to delete page", error);
        }
    };

    const handleRestore = async (id: number) => {
        try {
            await adminPagesService.update(id, { post_status: 'publish' });
            fetchPages();
        } catch (error) {
            console.error("Failed to restore page", error);
        }
    };

    const filteredPages = pages.filter(page =>
        page.post_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white">Pages</h1>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20">
                        Content Management
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search pages..."
                            className="bg-[#111827] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-blue-500 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className="bg-[#111827] text-white text-sm rounded-lg px-3 py-2 border border-gray-800 focus:outline-none focus:border-blue-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="any">All Status</option>
                        <option value="publish">Published</option>
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="trash">Trash</option>
                    </select>

                    <Link
                        href="/admin/pages/add"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Page</span>
                    </Link>
                </div>
            </div>

            {/* Pages Table */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                                <th className="p-4 w-10">
                                    <input type="checkbox" className="rounded bg-gray-700 border-gray-600 accent-blue-600" />
                                </th>
                                <th className="p-4 font-medium flex items-center gap-2 cursor-pointer hover:text-white">
                                    Title <ArrowUpDown className="w-3 h-3" />
                                </th>
                                <th className="p-4 font-medium">Author</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                            <span>Loading pages...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredPages.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FileText className="w-8 h-8 text-gray-700 mb-2" />
                                            <p>No pages found matching your filters.</p>
                                            <Link href="/admin/pages/add" className="text-blue-500 hover:text-blue-400 text-xs">
                                                Create your first page
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredPages.map((page) => (
                                    <tr key={page.ID} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors group">
                                        <td className="p-4">
                                            <input type="checkbox" className="rounded bg-gray-700 border-gray-600 accent-blue-600" />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-800 text-gray-400 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <Link href={`/admin/pages/${page.ID}`} className="text-white font-medium block hover:text-blue-400 transition-colors">
                                                        {page.post_title || '(Untitled Page)'}
                                                    </Link>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                                        <span>/{page.post_name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400">Admin</td>
                                        <td className="p-4 text-gray-400">
                                            <div className="flex flex-col">
                                                <span>{formatDate(page.post_date)}</span>
                                                <span className="text-xs text-gray-600">Last modified</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${page.post_status === 'publish'
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                : page.post_status === 'draft'
                                                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                    : page.post_status === 'trash'
                                                        ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                        : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${page.post_status === 'publish' ? 'bg-green-500' : page.post_status === 'trash' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                                                {page.post_status === 'publish' ? 'Published' : (page.post_status ? page.post_status.charAt(0).toUpperCase() + page.post_status.slice(1) : 'Unknown')}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity">
                                                <Link
                                                    href={`/${(page.post_name || page.post_title || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || page.ID}`}
                                                    target="_blank"
                                                    className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-colors"
                                                    title="View"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <Link href={`/admin/pages/${page.ID}`} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors" title="Edit">
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                {page.post_status === 'trash' && (
                                                    <button
                                                        onClick={() => handleRestore(page.ID)}
                                                        className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded-lg transition-colors"
                                                        title="Restore"
                                                    >
                                                        <RefreshCcw className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteClick(page.ID)}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                                                    title={page.post_status === 'trash' ? "Delete Permanently" : "Move to Trash"}
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
                <div className="flex items-center justify-between p-4 border-t border-gray-800 text-sm text-gray-400 bg-[#1F2937]/30">
                    <div>Showing {filteredPages.length} results</div>
                    <div className="flex items-center gap-2">
                        <span>Page {currentPage}</span>
                        <div className="flex gap-1 ml-4">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-1.5 hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="p-1.5 hover:bg-gray-700 rounded hover:text-white"
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
                onClose={() => setDeleteModal({ isOpen: false, pageId: null })}
                onConfirm={confirmDelete}
                title={deleteModal.pageId && pages.find(p => p.ID === deleteModal.pageId)?.post_status === 'trash' ? "Delete Permanently" : "Move to Trash"}
                message={deleteModal.pageId && pages.find(p => p.ID === deleteModal.pageId)?.post_status === 'trash'
                    ? "Are you sure you want to permanently delete this page? This action is irreversible."
                    : "Are you sure you want to move this page to trash? You can restore it later."}
                isDestructive={true}
            />
        </div>
    );
}
