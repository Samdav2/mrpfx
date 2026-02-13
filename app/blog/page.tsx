'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    Calendar,
    MessageSquare,
    Search,
    Loader2,
    ArrowRight,
    Tag,
    User
} from 'lucide-react';
import { postsService, categoriesService } from '@/lib/content';
import type { WPPostRead, WPCategory } from '@/lib/types';

export default function BlogPage() {
    const [posts, setPosts] = useState<WPPostRead[]>([]);
    const [categories, setCategories] = useState<WPCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const [postData, catData] = await Promise.allSettled([
                    postsService.getPosts('publish', 50, 0),
                    categoriesService.getCategories(100, 0),
                ]);
                if (postData.status === 'fulfilled') setPosts(postData.value);
                if (catData.status === 'fulfilled') setCategories(catData.value as any);
            } catch (err) {
                console.error('Failed to load posts', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const formatDate = (date?: string | null) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const stripHtml = (html?: string | null) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').slice(0, 160) + '...';
    };

    const getReadingTime = (content?: string | null) => {
        if (!content) return '1 min';
        const text = content.replace(/<[^>]*>/g, '');
        const words = text.split(/\s+/).length;
        return `${Math.max(1, Math.ceil(words / 200))} min read`;
    };

    const filtered = posts.filter(p => {
        const matchesSearch = p.post_title?.toLowerCase().includes(search.toLowerCase()) ?? false;
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-600/[0.03] blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/[0.03] blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Content</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Blog</h1>
                    <p className="text-gray-400 mt-2">Latest articles, tips, and insights</p>
                </div>

                {/* Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[#111827]/80 border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/30 transition-colors"
                        />
                    </div>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!activeCategory ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-white/5 text-gray-400 border border-white/[0.06] hover:bg-white/10'}`}
                        >
                            All
                        </button>
                        {categories.map((cat: any) => (
                            <button
                                key={cat.term_id || cat.id}
                                onClick={() => setActiveCategory(cat.term_id || cat.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === (cat.term_id || cat.id) ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-white/5 text-gray-400 border border-white/[0.06] hover:bg-white/10'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    </div>
                )}

                {/* Empty */}
                {!loading && filtered.length === 0 && (
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-12 text-center">
                        <BookOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                        <p className="text-white font-semibold">No articles found</p>
                        <p className="text-gray-500 text-sm mt-1">Check back later for new content</p>
                    </div>
                )}

                {/* Posts Grid */}
                {!loading && filtered.length > 0 && (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map(post => {
                            const imageUrl = post.featured_image?.url || null;
                            return (
                                <Link
                                    key={post.ID}
                                    href={`/blog/${post.post_name}`}
                                    className="group bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-video bg-gray-900/50 overflow-hidden">
                                        {imageUrl ? (
                                            <img src={imageUrl} alt={post.post_title || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
                                                <BookOpen className="w-10 h-10 text-gray-700" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(post.post_date)}</span>
                                            <span>{getReadingTime(post.post_content)}</span>
                                        </div>

                                        <h2 className="text-white font-bold text-base mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                                            {post.post_title}
                                        </h2>

                                        <p className="text-gray-500 text-sm line-clamp-3 flex-1 mb-3">
                                            {stripHtml(post.post_excerpt || post.post_content)}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.04]">
                                            <span className="text-xs text-gray-600 flex items-center gap-1">
                                                <MessageSquare className="w-3 h-3" /> {post.comment_count || 0} comments
                                            </span>
                                            <span className="text-xs text-cyan-400 flex items-center gap-1 font-medium group-hover:gap-2 transition-all">
                                                Read more <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
