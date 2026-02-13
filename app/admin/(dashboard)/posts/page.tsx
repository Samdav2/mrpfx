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
    RefreshCcw,
    ExternalLink
} from 'lucide-react';
import { adminPostService, WPPostRead } from '@/lib/admin-api';
import { ConfirmModal } from '@/components/admin/Modals';

export default function PostsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState<WPPostRead[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('any');
    const limit = 10;

    // Modal State
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, postId: number | null }>({ isOpen: false, postId: null });

    useEffect(() => {
        fetchPosts();
    }, [page, statusFilter]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const offset = (page - 1) * limit;
            const status = statusFilter;
            const data = await adminPostService.getAll(status, limit, offset);
            if (Array.isArray(data)) {
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch posts", error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        setDeleteModal({ isOpen: true, postId: id });
    };

    const confirmDelete = async () => {
        if (!deleteModal.postId) return;
        const post = posts.find(p => p.ID === deleteModal.postId);
        const isCurrentlyTrashed = post?.post_status === 'trash';

        try {
            // If already in trash, permanent delete (force=true). Otherwise soft delete (force=false)
            await adminPostService.delete(deleteModal.postId, isCurrentlyTrashed);

            setPosts(posts.filter(p => p.ID !== deleteModal.postId));
            setDeleteModal({ isOpen: false, postId: null });
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    const handleRestore = async (id: number) => {
        try {
            await adminPostService.update(id, { post_status: 'publish' });
            fetchPosts();
        } catch (error) {
            console.error("Failed to restore post", error);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.post_title.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <h1 className="text-2xl font-bold text-white">Posts</h1>
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="bg-[#111827] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        className="bg-[#111827] text-white text-sm rounded-lg px-3 py-2 border border-gray-800 focus:outline-none focus:border-purple-500"
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
                        href="/admin/posts/add"
                        className="flex items-center gap-2 px-4 py-2 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Post</span>
                    </Link>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h3 className="text-white font-semibold">All Posts</h3>
                    <span className="text-xs text-purple-400">Total: {posts.length}</span>
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
                                <th className="p-4 font-medium">Author</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">Loading posts...</td>
                                </tr>
                            ) : filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No posts found. Click "Add Post" to create one.
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map((post) => (
                                    <tr key={post.ID} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors group">
                                        <td className="p-4">
                                            <input type="checkbox" className="rounded bg-gray-700 border-gray-600 accent-purple-600" />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <span className="text-white font-medium block">{post.post_title}</span>
                                                    {post.post_excerpt && (
                                                        <span className="text-gray-500 text-xs line-clamp-1">{post.post_excerpt}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400">Author #{post.post_author}</td>
                                        <td className="p-4 text-gray-400">{formatDate(post.post_date)}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border ${post.post_status === 'publish'
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                : post.post_status === 'trash'
                                                    ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                    : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${post.post_status === 'publish' ? 'bg-green-500' : post.post_status === 'draft' ? 'bg-yellow-500' : post.post_status === 'trash' ? 'bg-red-500' : 'bg-gray-500'}`}></span>
                                                {post.post_status === 'publish' ? 'Published' : (post.post_status ? post.post_status.charAt(0).toUpperCase() + post.post_status.slice(1) : 'Unknown')}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/blog/${(post.post_name || post.post_title || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || post.ID}`}
                                                    target="_blank"
                                                    className="p-1.5 text-gray-400 hover:text-cyan-400 hover:bg-gray-700 rounded transition-colors"
                                                    title="View"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <Link href={`/admin/posts/${post.ID}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                {post.post_status === 'trash' && (
                                                    <button
                                                        onClick={() => handleRestore(post.ID)}
                                                        className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded transition-colors"
                                                        title="Restore"
                                                    >
                                                        <RefreshCcw className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteClick(post.ID)}
                                                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                                    title={post.post_status === 'trash' ? "Delete Permanently" : "Move to Trash"}
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
                    <div>Showing {filteredPosts.length} results</div>
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
                onClose={() => setDeleteModal({ isOpen: false, postId: null })}
                onConfirm={confirmDelete}
                title={deleteModal.postId && posts.find(p => p.ID === deleteModal.postId)?.post_status === 'trash' ? "Delete Permanently" : "Move to Trash"}
                message={deleteModal.postId && posts.find(p => p.ID === deleteModal.postId)?.post_status === 'trash'
                    ? "Are you sure you want to permanently delete this post? This action is irreversible."
                    : "Are you sure you want to move this post to trash? You can restore it later."}
                isDestructive={true}
            />
        </div>
    );
}
