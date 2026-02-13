'use client';

import React, { useState, useEffect } from 'react';
import { WPCommentRead } from '@/lib/types';
import { adminCommentService } from '@/lib/admin-api';
import CommentRow from '@/components/admin/comments/CommentRow';
import Modal from '@/components/ui/Modal';
import {
    Search,
    MessageSquare,
    Filter,
    Loader2,
    ChevronLeft,
    ChevronRight,
    RefreshCw
} from 'lucide-react';

const TABS = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: '0' },
    { label: 'Approved', value: '1' },
    { label: 'Spam', value: 'spam' },
    { label: 'Trash', value: 'trash' }
];

const CommentsPage = () => {
    const [comments, setComments] = useState<WPCommentRead[]>([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('all');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [limit] = useState(20);

    // Delete Modal State
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        commentId: number | null;
        isPermanent: boolean;
        isProcessing: boolean;
    }>({
        isOpen: false,
        commentId: null,
        isPermanent: false,
        isProcessing: false
    });

    const fetchComments = async () => {
        setLoading(true);
        try {
            // If status is 'all', we might want to fetch everything,
            // but the API documentation says default is "approve".
            // We'll adjust based on the 'status' param.
            const filterStatus = status === 'all' ? undefined : status;
            const data = await adminCommentService.getAll(filterStatus as any, limit, page * limit);
            setComments(data);
        } catch (error) {
            console.error('Failed to fetch comments', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [status, page]);

    const handleUpdateComment = (updatedComment: WPCommentRead) => {
        setComments(prev => prev.map(c =>
            c.comment_ID === updatedComment.comment_ID ? updatedComment : c
        ));
    };

    const handleTrashComment = (commentId: number) => {
        setDeleteModal({
            isOpen: true,
            commentId,
            isPermanent: false,
            isProcessing: false
        });
    };

    const handlePermanentDeleteComment = (commentId: number) => {
        setDeleteModal({
            isOpen: true,
            commentId,
            isPermanent: true,
            isProcessing: false
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteModal.commentId) return;

        setDeleteModal(prev => ({ ...prev, isProcessing: true }));
        try {
            await adminCommentService.delete(deleteModal.commentId, deleteModal.isPermanent);

            if (deleteModal.isPermanent) {
                setComments(prev => prev.filter(c => c.comment_ID !== deleteModal.commentId));
            } else {
                setComments(prev => prev.map(c =>
                    c.comment_ID === deleteModal.commentId ? { ...c, comment_approved: 'trash' } : c
                ));
                if (status !== 'all' && status !== 'trash') {
                    setComments(prev => prev.filter(c => c.comment_ID !== deleteModal.commentId));
                }
            }
            setDeleteModal(prev => ({ ...prev, isOpen: false }));
        } catch (error) {
            console.error('Failed to delete comment', error);
        } finally {
            setDeleteModal(prev => ({ ...prev, isProcessing: false }));
        }
    };

    const filteredComments = comments.filter(c =>
        c.comment_author?.toLowerCase().includes(search.toLowerCase()) ||
        c.comment_content.toLowerCase().includes(search.toLowerCase()) ||
        c.comment_author_email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-purple-500" />
                        Comments & Reviews
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Manage WordPress comments and WooCommerce product reviews.</p>
                </div>
                <button
                    onClick={() => fetchComments()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1F2937] text-white rounded-lg hover:bg-[#374151] transition-colors text-sm border border-gray-700"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-1 bg-[#0B0E14] p-1 rounded-lg border border-gray-800">
                        {TABS.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => {
                                    setStatus(tab.value);
                                    setPage(0);
                                }}
                                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${status === tab.value
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search comments..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-[#0B0E14] text-white text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:ring-1 focus:ring-purple-500 border border-gray-800 w-full md:w-64"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1F2937]/30 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-3 border-b border-gray-800">Author</th>
                                <th className="px-6 py-3 border-b border-gray-800">Comment / Review</th>
                                <th className="px-6 py-3 border-b border-gray-800 w-32">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {loading && comments.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                                            <p className="text-gray-400">Loading comments...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredComments.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                        No comments found.
                                    </td>
                                </tr>
                            ) : (
                                filteredComments.map((comment) => (
                                    <CommentRow
                                        key={comment.comment_ID}
                                        comment={comment}
                                        onUpdate={handleUpdateComment}
                                        onDelete={handleTrashComment}
                                        onPermanentDelete={handlePermanentDeleteComment}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-800 flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                        Showing page {page + 1}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page === 0 || loading}
                            className="p-1.5 bg-[#1F2937] text-white rounded-md disabled:opacity-30 hover:bg-[#374151] border border-gray-700"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={comments.length < limit || loading}
                            className="p-1.5 bg-[#1F2937] text-white rounded-md disabled:opacity-30 hover:bg-[#374151] border border-gray-700"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
                title={deleteModal.isPermanent ? 'Delete Permanently' : 'Move to Trash'}
                confirmLabel={deleteModal.isPermanent ? 'Delete Permanently' : 'Move to Trash'}
                onConfirm={handleConfirmDelete}
                isDanger={true}
                isLoading={deleteModal.isProcessing}
            >
                {deleteModal.isPermanent ? (
                    <p>Are you sure you want to <strong>permanently delete</strong> this comment? This action cannot be undone and will remove the record from the database.</p>
                ) : (
                    <p>Are you sure you want to move this comment to the <strong>Trash</strong>? You can restore it later from the Trash tab.</p>
                )}
            </Modal>
        </div>
    );
};

export default CommentsPage;
