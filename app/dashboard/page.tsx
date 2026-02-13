'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
    User,
    BookOpen,
    ShoppingCart,
    DollarSign,
    Package,
    FileText,
    ArrowRight,
    RefreshCcw,
    Clock,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Trophy,
    GraduationCap,
    ShoppingBag,
    ChevronRight,
    CalendarDays,
    TrendingUp,
    Star
} from 'lucide-react';
import { authService } from '@/lib/auth';
import { learnpressService } from '@/lib/learnpress';
import { ordersService } from '@/lib/orders';
import { postsService } from '@/lib/content';
import type { UserResponse, LPUserItem, WCOrder, WCUserOrderSummary, WPPostRead } from '@/lib/types';

// ─── Skeleton Loader ──────────────────────────────────────────
const Skeleton = ({ className = '' }: { className?: string }) => (
    <span className={`bg-gray-700/30 rounded-lg animate-pulse block ${className}`} />
);

// ─── Status badge ─────────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        completed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
        processing: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
        pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
        'on-hold': 'bg-purple-500/15 text-purple-400 border-purple-500/20',
        cancelled: 'bg-red-500/15 text-red-400 border-red-500/20',
        enrolled: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
        'in-progress': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
        passed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
        failed: 'bg-red-500/15 text-red-400 border-red-500/20',
    };
    return (
        <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold border ${styles[status] || 'bg-gray-500/15 text-gray-400 border-gray-500/20'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
        </span>
    );
};

// ─── Main Dashboard ───────────────────────────────────────────
export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserResponse | null>(null);
    const [courses, setCourses] = useState<LPUserItem[]>([]);
    const [orderSummary, setOrderSummary] = useState<WCUserOrderSummary | null>(null);
    const [recentOrders, setRecentOrders] = useState<WCOrder[]>([]);
    const [recentPosts, setRecentPosts] = useState<WPPostRead[]>([]);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        const [userRes, coursesRes, summaryRes, ordersRes, postsRes] = await Promise.allSettled([
            authService.getCurrentUser(),
            learnpressService.getMyCourses(),
            ordersService.getMyOrderSummary(),
            ordersService.getMyOrders(0, 5),
            postsService.getPosts('publish', 4, 0),
        ]);
        if (userRes.status === 'fulfilled') setUser(userRes.value);
        if (coursesRes.status === 'fulfilled') setCourses(Array.isArray(coursesRes.value) ? coursesRes.value : []);
        if (summaryRes.status === 'fulfilled') setOrderSummary(summaryRes.value);
        if (ordersRes.status === 'fulfilled') setRecentOrders(Array.isArray(ordersRes.value) ? ordersRes.value : []);
        if (postsRes.status === 'fulfilled') setRecentPosts(Array.isArray(postsRes.value) ? postsRes.value : []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const formatCurrency = (v: string | number) => {
        const n = typeof v === 'string' ? parseFloat(v) : v;
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(isNaN(n) ? 0 : n);
    };

    const initials = user?.display_name
        ? user.display_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : user?.user_email?.[0]?.toUpperCase() || '?';

    const enrolledCount = courses.filter(c => c.status === 'enrolled' || c.status === 'started').length;
    const completedCount = courses.filter(c => c.graduation === 'passed' || c.status === 'completed').length;

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            {/* Ambient background glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/[0.04] blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
                {/* ──── HEADER ──── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            {loading ? 'Dashboard' : `Welcome back, ${user?.display_name || user?.user_email?.split('@')[0] || 'there'}`}
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Here&apos;s an overview of your activity and progress.</p>
                    </div>
                    <button
                        onClick={fetchAll}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 rounded-xl text-sm text-gray-300 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 w-fit"
                    >
                        <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>
                </div>

                {/* ──── PROFILE + SUMMARY CARDS ──── */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                    {/* Profile Card */}
                    <div className="lg:col-span-1 group relative overflow-hidden bg-gradient-to-br from-[#111827]/90 to-[#0f1729]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all duration-300">
                        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity blur-3xl" />
                        <div className="relative flex flex-col items-center text-center">
                            {loading ? (
                                <>
                                    <Skeleton className="w-20 h-20 rounded-full mb-4" />
                                    <Skeleton className="w-32 h-5 mb-2" />
                                    <Skeleton className="w-40 h-4" />
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-purple-500/20 mb-4 ring-4 ring-purple-500/10">
                                        {initials}
                                    </div>
                                    <h2 className="text-lg font-bold text-white truncate max-w-full">{user?.display_name || 'User'}</h2>
                                    <p className="text-sm text-gray-400 truncate max-w-full">{user?.user_email || ''}</p>
                                    <Link
                                        href="/dashboard"
                                        className="mt-4 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                                    >
                                        View profile <ChevronRight className="w-3 h-3" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Summary Stat Cards */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            {
                                label: 'Enrolled Courses',
                                value: loading ? null : enrolledCount,
                                sub: `${completedCount} completed`,
                                icon: GraduationCap,
                                gradient: 'from-cyan-600 to-blue-600',
                                bg: 'bg-cyan-500/10',
                                text: 'text-cyan-400'
                            },
                            {
                                label: 'Total Spent',
                                value: loading ? null : (orderSummary ? formatCurrency(orderSummary.total_spent) : '$0.00'),
                                sub: `${orderSummary?.total_orders || 0} orders total`,
                                icon: DollarSign,
                                gradient: 'from-emerald-600 to-teal-500',
                                bg: 'bg-emerald-500/10',
                                text: 'text-emerald-400'
                            },
                            {
                                label: 'Active Orders',
                                value: loading ? null : ((orderSummary?.pending_orders || 0) + (orderSummary?.processing_orders || 0)),
                                sub: `${orderSummary?.completed_orders || 0} completed`,
                                icon: ShoppingBag,
                                gradient: 'from-purple-600 to-pink-500',
                                bg: 'bg-purple-500/10',
                                text: 'text-purple-400'
                            },
                        ].map((card, i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
                            >
                                <div className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${card.gradient} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity blur-2xl`} />
                                <div className="relative">
                                    <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                                        <card.icon className={`w-5 h-5 ${card.text}`} />
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{card.label}</div>
                                    <div className="text-2xl font-bold text-white mt-1">
                                        {card.value === null ? <Skeleton className="w-16 h-7" /> : card.value}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{card.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ──── COURSE PROGRESS + RECENT ORDERS ──── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* My Courses */}
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">My Courses</h3>
                                    <p className="text-xs text-gray-500">{courses.length} enrolled</p>
                                </div>
                            </div>
                            <Link href="/my-courses" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                                View all <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="p-4 space-y-3 max-h-[320px] overflow-y-auto custom-scrollbar">
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl">
                                        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="w-3/4 h-4" />
                                            <Skeleton className="w-1/2 h-3" />
                                        </div>
                                    </div>
                                ))
                            ) : courses.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center mb-3">
                                        <GraduationCap className="w-7 h-7 text-gray-600" />
                                    </div>
                                    <p className="text-sm text-gray-400 font-medium">No courses yet</p>
                                    <p className="text-xs text-gray-500 mt-1">Explore available courses to get started</p>
                                    <Link href="/courses" className="mt-3 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                                        Browse courses <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            ) : courses.map((course, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-xl border border-white/[0.04] transition-colors group">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600/20 to-blue-600/20 flex items-center justify-center shrink-0">
                                            {course.graduation === 'passed' ? (
                                                <Trophy className="w-5 h-5 text-amber-400" />
                                            ) : (
                                                <BookOpen className="w-5 h-5 text-cyan-400" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm text-white font-medium truncate">Course #{course.item_id}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <StatusBadge status={course.graduation || course.status} />
                                                {course.start_time && (
                                                    <span className="text-[10px] text-gray-600">
                                                        Started {new Date(course.start_time).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors shrink-0" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                    <ShoppingCart className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Recent Orders</h3>
                                    <p className="text-xs text-gray-500">Latest activity</p>
                                </div>
                            </div>
                            <Link href="/dashboard" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                                View all <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[11px] text-gray-500 uppercase border-b border-white/[0.04]">
                                        <th className="px-5 py-3 font-medium">Order</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                        <th className="px-5 py-3 font-medium text-right">Total</th>
                                        <th className="px-5 py-3 font-medium text-right hidden sm:table-cell">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {loading ? (
                                        Array.from({ length: 4 }).map((_, i) => (
                                            <tr key={i}><td colSpan={4} className="px-5 py-3"><Skeleton className="h-4 w-full" /></td></tr>
                                        ))
                                    ) : recentOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-5 py-10 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-12 h-12 bg-gray-800/50 rounded-2xl flex items-center justify-center mb-3">
                                                        <Package className="w-6 h-6 text-gray-600" />
                                                    </div>
                                                    <p className="text-sm text-gray-400">No orders yet</p>
                                                    <Link href="/shop" className="mt-2 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                                                        Browse products <ArrowRight className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : recentOrders.map((order, i) => (
                                        <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                            <td className="px-5 py-3 text-white font-medium">#{order.id}</td>
                                            <td className="px-5 py-3"><StatusBadge status={order.status || 'unknown'} /></td>
                                            <td className="px-5 py-3 text-right text-gray-300 font-medium">{formatCurrency(order.total_amount || '0')}</td>
                                            <td className="px-5 py-3 text-right text-gray-500 text-xs hidden sm:table-cell">
                                                {order.date_created_gmt ? new Date(order.date_created_gmt).toLocaleDateString() : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ──── RECENT BLOG POSTS ──── */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-amber-500/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Latest Blog Posts</h3>
                                <p className="text-xs text-gray-500">Stay updated with our content</p>
                            </div>
                        </div>
                        <Link href="/blog" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                            View all <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="bg-white/[0.02] rounded-xl p-4 space-y-3">
                                    <Skeleton className="w-full h-3" />
                                    <Skeleton className="w-2/3 h-3" />
                                    <Skeleton className="w-1/3 h-3" />
                                </div>
                            ))
                        ) : recentPosts.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center py-8">
                                <FileText className="w-8 h-8 text-gray-600 mb-2" />
                                <p className="text-sm text-gray-400">No posts available</p>
                            </div>
                        ) : recentPosts.map((post, i) => {
                            const excerpt = (post.post_excerpt || '').replace(/<[^>]*>/g, '').slice(0, 100);
                            return (
                                <Link
                                    key={i}
                                    href={`/blog/${post.post_name || post.slug || post.ID}`}
                                    className="group bg-white/[0.02] hover:bg-white/[0.05] rounded-xl p-4 border border-white/[0.04] hover:border-white/[0.08] transition-all duration-200"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <CalendarDays className="w-3 h-3 text-gray-600" />
                                        <span className="text-[10px] text-gray-500">{new Date(post.post_date).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                                        {post.post_title}
                                    </h4>
                                    {excerpt && (
                                        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{excerpt}...</p>
                                    )}
                                    <span className="text-[11px] text-purple-400 mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read more <ArrowRight className="w-3 h-3" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* ──── QUICK ACTIONS ──── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        {
                            label: 'Browse Courses',
                            desc: 'Explore and enroll in new courses',
                            href: '/courses',
                            icon: GraduationCap,
                            gradient: 'from-cyan-600 to-blue-600'
                        },
                        {
                            label: 'Shop Products',
                            desc: 'Check out our latest products',
                            href: '/shop',
                            icon: ShoppingBag,
                            gradient: 'from-purple-600 to-pink-500'
                        },
                        {
                            label: 'Contact Support',
                            desc: 'Get help when you need it',
                            href: '/support',
                            icon: Star,
                            gradient: 'from-amber-500 to-orange-500'
                        },
                    ].map((action, i) => (
                        <Link
                            key={i}
                            href={action.href}
                            className="group relative overflow-hidden bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
                        >
                            <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${action.gradient} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity blur-3xl`} />
                            <div className="relative flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg`}>
                                    <action.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{action.label}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">{action.desc}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
