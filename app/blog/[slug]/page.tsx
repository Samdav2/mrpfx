'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Calendar,
    MessageSquare,
    User,
    Tag,
    Clock,
    Send,
    Loader2,
    BookOpen,
    Share2
} from 'lucide-react';
import { postsService, commentsService } from '@/lib/content';
import type { WPPostRead, WPCommentRead } from '@/lib/types';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [post, setPost] = useState<WPPostRead | null>(null);
    const [comments, setComments] = useState<WPCommentRead[]>([]);
    const [loading, setLoading] = useState(true);
    const [commentName, setCommentName] = useState('');
    const [commentEmail, setCommentEmail] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [commentSuccess, setCommentSuccess] = useState(false);

    const fetchPost = useCallback(async () => {
        try {
            // Sanitize slug
            const cleanSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const found = await postsService.getPost(cleanSlug);
            if (found) {
                setPost(found);
                // Fetch comments
                try {
                    const cmts = await commentsService.getPostComments(found.ID, 'approve', 50, 0);
                    setComments(cmts);
                } catch { /* no comments */ }
            }
        } catch (err) {
            console.error('Failed to load post', err);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => { fetchPost(); }, [fetchPost]);

    const handleSubmitComment = async () => {
        if (!post || !commentContent.trim()) return;
        setSubmittingComment(true);
        try {
            await commentsService.createComment(post.ID, {
                comment_author: commentName || 'Anonymous',
                comment_author_email: commentEmail || '',
                comment_content: commentContent,
                comment_post_ID: post.ID,
            });
            setCommentContent('');
            setCommentSuccess(true);
            setTimeout(() => setCommentSuccess(false), 3000);
            // Refresh comments
            const cmts = await commentsService.getPostComments(post.ID, 'approve', 50, 0);
            setComments(cmts);
        } catch (err) {
            console.error('Failed to submit comment', err);
        } finally {
            setSubmittingComment(false);
        }
    };

    const formatDate = (date?: string | null) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const getReadingTime = (content?: string | null) => {
        if (!content) return '1 min read';
        const text = content.replace(/<[^>]*>/g, '');
        return `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} min read`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center text-center px-4">
                <div>
                    <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h2 className="text-xl font-bold text-white">Post not found</h2>
                    <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 text-sm mt-3 inline-block">← Back to Blog</Link>
                </div>
            </div>
        );
    }

    const imageUrl = post.featured_image?.url || null;

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-600/[0.03] blur-[120px]" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>

                {/* Hero Image */}
                {imageUrl && (
                    <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden mb-8">
                        <img src={imageUrl} alt={post.post_title || ''} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
                    </div>
                )}

                {/* Article Header */}
                <article>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(post.post_date)}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {getReadingTime(post.post_content)}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {post.comment_count || 0} comments</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 leading-tight">{post.post_title}</h1>

                    {/* Content */}
                    <div
                        className="wp-content max-w-none mb-12"
                        dangerouslySetInnerHTML={{ __html: post.post_content || '' }}
                    />

                    {/* Share */}
                    <div className="flex items-center gap-3 py-6 border-t border-white/[0.06]">
                        <span className="text-xs text-gray-500 font-medium">Share:</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(window.location.href)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/[0.06] rounded-lg text-xs text-gray-400 transition-all"
                        >
                            <Share2 className="w-3 h-3" /> Copy Link
                        </button>
                    </div>
                </article>

                {/* Comments Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                        <MessageSquare className="w-5 h-5 text-cyan-400" />
                        Comments ({comments.length})
                    </h2>

                    {/* Existing Comments */}
                    {comments.length > 0 && (
                        <div className="space-y-4 mb-8">
                            {comments.map(comment => (
                                <div key={comment.comment_ID} className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-semibold">{comment.comment_author || 'Anonymous'}</p>
                                            <p className="text-gray-600 text-xs">{formatDate(comment.comment_date)}</p>
                                        </div>
                                    </div>
                                    <div
                                        className="text-gray-300 text-sm prose prose-invert prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: comment.comment_content || '' }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add Comment */}
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                        <h3 className="text-white font-semibold text-sm mb-4">Leave a Comment</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            <input
                                type="text"
                                placeholder="Your name"
                                value={commentName}
                                onChange={e => setCommentName(e.target.value)}
                                className="px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/30 transition-colors"
                            />
                            <input
                                type="email"
                                placeholder="Your email"
                                value={commentEmail}
                                onChange={e => setCommentEmail(e.target.value)}
                                className="px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/30 transition-colors"
                            />
                        </div>
                        <textarea
                            rows={4}
                            placeholder="Write your comment..."
                            value={commentContent}
                            onChange={e => setCommentContent(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/30 transition-colors resize-none mb-3"
                        />

                        {commentSuccess && (
                            <p className="text-emerald-400 text-xs mb-3 flex items-center gap-1">
                                <Send className="w-3 h-3" /> Comment submitted successfully!
                            </p>
                        )}

                        <button
                            onClick={handleSubmitComment}
                            disabled={submittingComment || !commentContent.trim()}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-40"
                        >
                            {submittingComment ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
