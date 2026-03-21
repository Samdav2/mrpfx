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
    Star,
    Eye,
    X,
    Send
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import { learnpressService } from '@/lib/learnpress';
import { ordersService } from '@/lib/orders';
import { postsService } from '@/lib/content';
import { propFirmService, type PropFirmRegistrationData } from '@/services/prop-firm.service';
import { tradersService } from '@/lib/traders';
import type {
    UserResponse,
    LPUserItem,
    WCOrder,
    WCUserOrderSummary,
    WPPostRead,
    AccountManagementData,
    CopyTradingData,
    WCProductRead
} from '@/lib/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ShieldCheck, Briefcase as BriefcaseIcon, Lock as LockIcon, Server as ServerIcon, Zap } from 'lucide-react';

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

// Modal for viewing registration details
const RegistrationDetailsModal = ({ registration, onClose }: { registration: PropFirmRegistrationData; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#111827] border border-white/[0.08] rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-emerald-400" />
                        Registration Details
                    </h3>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Prop Firm</p>
                            <p className="text-sm text-white font-semibold">{registration.propfirm_name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Platform</p>
                            <p className="text-sm text-white font-semibold">{registration.trading_platform}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Login ID</p>
                            <p className="text-sm text-blue-400 font-mono font-bold leading-none">{registration.login_id}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Server</p>
                            <p className="text-sm text-white font-semibold">{registration.server_name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Server Type</p>
                            <p className="text-sm text-white font-semibold">{registration.server_type}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Challenge Steps</p>
                            <p className="text-sm text-white font-semibold">{registration.challenges_step} Step</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Account Size</p>
                            <p className="text-sm text-white font-semibold">${registration.account_size.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Account Phases</p>
                            <p className="text-sm text-white font-semibold">{registration.account_phases} Phase</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Current Status</span>
                            <StatusBadge status={registration.status} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Payment</span>
                            <span className={`text-[10px] font-bold uppercase ${registration.payment_status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {registration.payment_status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white/[0.02] border-t border-white/[0.06]">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Modal for viewing account management connection details
const ConnectionDetailsModal = ({ connection, onClose }: { connection: AccountManagementData; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#111827] border border-white/[0.08] rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
                <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <BriefcaseIcon className="w-5 h-5 text-blue-400" />
                        Account Connection Details
                    </h3>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Broker</p>
                            <p className="text-sm text-white font-semibold">{connection.broker}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Account ID</p>
                            <p className="text-sm text-blue-400 font-mono font-bold">{connection.account_id}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Server</p>
                            <p className="text-sm text-white font-semibold">{connection.server}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Capital</p>
                            <p className="text-sm text-white font-semibold">${connection.capital.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Assignee</p>
                            <p className="text-sm text-white font-semibold">{connection.manager}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Date Connected</p>
                            <p className="text-sm text-white font-semibold">{new Date(connection.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Current Status</span>
                            <StatusBadge status={connection.status} />
                        </div>
                    </div>

                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 flex gap-3">
                        <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-gray-400 leading-relaxed text-left">
                            Your credentials are encrypted and stored securely. Only authorized managers can access trading functions.
                        </p>
                    </div>
                </div>
                <div className="p-4 bg-white/[0.02] border-t border-white/[0.06]">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Modal for viewing copy trading connection details
const CopyTradingDetailsModal = ({ connection, onClose }: { connection: CopyTradingData; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#111827] border border-white/[0.08] rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Zap className="w-5 h-5 text-indigo-400" />
                        Copy Trading Details
                    </h3>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Account ID</p>
                            <p className="text-sm text-blue-400 font-mono font-bold">{connection.account_id}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Server</p>
                            <p className="text-sm text-white font-semibold">{connection.server}</p>
                        </div>
                        <div className="space-y-1 col-span-2">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Date Connected</p>
                            <p className="text-sm text-white font-semibold">{new Date(connection.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Current Status</span>
                            <StatusBadge status={connection.status} />
                        </div>
                    </div>

                    <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-3 flex gap-3">
                        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-gray-400 leading-relaxed text-left">
                            Trades will be copied automatically from the master account. Ensure your MT5 account is always online or provided to our server.
                        </p>
                    </div>
                </div>
                <div className="p-4 bg-white/[0.02] border-t border-white/[0.06]">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Digital Assets Section ──────────────────────────────────
const DigitalAssetsSection = ({ assets }: { assets: WCProductRead[] }) => {
    if (assets.length === 0) return null;
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    Digital Assets & Signals
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assets.map((asset) => (
                    <div key={asset.id} className="bg-[#111827]/50 backdrop-blur-md border border-white/[0.08] rounded-2xl p-5 hover:bg-white/[0.05] transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.03] rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-blue-500/[0.08] transition-all" />
                        <h3 className="text-white font-bold mb-3 truncate relative z-10">{asset.name}</h3>
                        <div className="flex flex-wrap gap-2 relative z-10">
                            {asset.telegram_link && (
                                <a href={asset.telegram_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-[11px] font-bold rounded-lg border border-sky-500/20 transition-all active:scale-95">
                                    <Send className="w-3.5 h-3.5" />
                                    Telegram Group
                                </a>
                            )}
                            {asset.signal_link && (
                                <a href={asset.signal_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[11px] font-bold rounded-lg border border-amber-500/20 transition-all active:scale-95">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    Signals
                                </a>
                            )}
                            {asset.vip_group && (
                                <a href={asset.vip_group} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-[11px] font-bold rounded-lg border border-purple-500/20 transition-all active:scale-95">
                                    <Star className="w-3.5 h-3.5" />
                                    VIP Group
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
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
    const [registrations, setRegistrations] = useState<PropFirmRegistrationData[]>([]);
    const [selectedRegistration, setSelectedRegistration] = useState<PropFirmRegistrationData | null>(null);
    const [accountConnections, setAccountConnections] = useState<AccountManagementData[]>([]);
    const [selectedConnection, setSelectedConnection] = useState<AccountManagementData | null>(null);
    const [copyTradingConnections, setCopyTradingConnections] = useState<CopyTradingData[]>([]);
    const [selectedCopyTrading, setSelectedCopyTrading] = useState<CopyTradingData | null>(null);
    const [digitalAssets, setDigitalAssets] = useState<WCProductRead[]>([]);
    const router = useRouter();

    const fetchAll = useCallback(async () => {
        setLoading(true);
        const [
            userRes,
            coursesRes,
            summaryRes,
            ordersRes,
            postsRes,
            propFirmRes,
            accountConnectionsRes,
            copyTradingRes,
            digitalAssetsRes
        ] = await Promise.allSettled([
            authService.getCurrentUser(),
            learnpressService.getMyCourses(),
            ordersService.getMyOrderSummary(),
            ordersService.getMyOrders(0, 5),
            postsService.getPosts('publish', 4, 0),
            propFirmService.getRegistrations(10, 0),
            tradersService.getMyConnections(),
            tradersService.getMyCopyTradingConnections(),
            ordersService.getMyDigitalAssets(),
        ]);
        if (userRes.status === 'fulfilled') setUser(userRes.value as UserResponse);
        if (coursesRes.status === 'fulfilled') setCourses(Array.isArray(coursesRes.value) ? coursesRes.value as LPUserItem[] : []);
        if (summaryRes.status === 'fulfilled') setOrderSummary(summaryRes.value as WCUserOrderSummary);
        if (ordersRes.status === 'fulfilled') setRecentOrders(Array.isArray(ordersRes.value) ? ordersRes.value as WCOrder[] : []);
        if (postsRes.status === 'fulfilled') setRecentPosts(Array.isArray(postsRes.value) ? postsRes.value as WPPostRead[] : []);
        if (propFirmRes.status === 'fulfilled') setRegistrations((propFirmRes.value as any).data || []);
        if (accountConnectionsRes.status === 'fulfilled') setAccountConnections((accountConnectionsRes.value as any).data || []);
        if (copyTradingRes.status === 'fulfilled') setCopyTradingConnections((copyTradingRes.value as any).data || []);
        if (digitalAssetsRes.status === 'fulfilled') setDigitalAssets(Array.isArray(digitalAssetsRes.value) ? digitalAssetsRes.value : []);
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

                {/* ──── DIGITAL ASSETS ──── */}
                <DigitalAssetsSection assets={digitalAssets} />

                {/* ──── COURSE PROGRESS + RECENT ORDERS ──── */}

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
                                        <tr
                                            key={i}
                                            className="border-b border-white/[0.03] hover:bg-white/[0.05] transition-colors cursor-pointer group"
                                            onClick={() => router.push(`/my-orders/${order.id}`)}
                                        >
                                            <td className="px-5 py-3 text-white font-medium group-hover:text-blue-400">#{order.id}</td>
                                            <td className="px-5 py-3"><StatusBadge status={order.status || 'unknown'} /></td>
                                            <td className="px-5 py-3 text-right text-gray-300 font-medium">{formatCurrency(order.total_amount || '0')}</td>
                                            <td className="px-5 py-3 text-right text-gray-500 text-xs hidden sm:table-cell group-hover:text-gray-300">
                                                {order.date_created_gmt ? new Date(order.date_created_gmt).toLocaleDateString() : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ──── PROP FIRM ACCOUNTS SECTION ──── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Status Chart */}
                    <div className="lg:col-span-1 bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Account Status</h3>
                                    <p className="text-xs text-gray-500">Distribution of your registrations</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 min-h-[280px] p-4 flex items-center justify-center">
                            {loading ? (
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                            ) : registrations.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-xs text-gray-500 italic">No data to display</p>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Pending', value: registrations.filter(r => r.status === 'pending').length, color: '#f59e0b' },
                                                { name: 'Active', value: registrations.filter(r => r.status === 'active').length, color: '#10b981' },
                                                { name: 'Completed', value: registrations.filter(r => r.status === 'completed').length, color: '#3b82f6' },
                                                { name: 'Failed', value: registrations.filter(r => r.status === 'failed').length, color: '#ef4444' },
                                            ].filter(d => d.value > 0)}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {registrations.length > 0 && [
                                                { name: 'Pending', color: '#f59e0b' },
                                                { name: 'Active', color: '#10b981' },
                                                { name: 'Completed', color: '#3b82f6' },
                                                { name: 'Failed', color: '#ef4444' },
                                            ].map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Registrations List */}
                    <div className="lg:col-span-2 bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                                    <Trophy className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Prop Firm Registrations</h3>
                                    <p className="text-xs text-gray-500">Your managed trading accounts</p>
                                </div>
                            </div>
                            <Link href="/pass-funded-accounts" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                                New Registration <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="overflow-x-auto flex-1 h-[280px] custom-scrollbar">
                            <table className="w-full text-left">
                                <thead className="sticky top-0 bg-[#111827] z-10">
                                    <tr className="text-[11px] text-gray-500 uppercase border-b border-white/[0.04]">
                                        <th className="px-5 py-3 font-medium">Account/Firm</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                        <th className="px-5 py-3 font-medium">Payment</th>
                                        <th className="px-5 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {loading ? (
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <tr key={i}><td colSpan={4} className="px-5 py-4"><Skeleton className="h-4 w-full" /></td></tr>
                                        ))
                                    ) : registrations.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-5 py-12 text-center">
                                                <p className="text-sm text-gray-500">No prop firm registrations found.</p>
                                                <Link href="/pass-funded-accounts" className="mt-3 text-xs text-purple-400 hover:text-purple-300 inline-flex items-center gap-1">
                                                    Start a challenge <ArrowRight className="w-3 h-3" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ) : (
                                        registrations.map((reg) => (
                                            <tr key={reg.registration_id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                                <td className="px-5 py-4">
                                                    <p className="text-white font-bold text-xs">{reg.propfirm_name}</p>
                                                    <p className="text-[10px] text-gray-500 mt-0.5">ID: {reg.login_id}</p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <StatusBadge status={reg.status} />
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`text-[10px] font-bold uppercase ${reg.payment_status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                        {reg.payment_status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <button
                                                        onClick={() => setSelectedRegistration(reg)}
                                                        className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ──── ACCOUNT MANAGEMENT SECTION ──── */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden mt-6 shadow-xl shadow-black/40">
                    <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center ring-1 ring-blue-500/20 shadow-lg shadow-blue-500/10">
                                <BriefcaseIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm tracking-tight">Account Management Connections</h3>
                                <p className="text-[11px] text-gray-500">Track your connected MT5 accounts</p>
                            </div>
                        </div>
                        <Link href="/account-management" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-all hover:gap-2">
                            Connect New Account <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar max-h-[250px]">
                        <table className="w-full text-left">
                            <thead className="sticky top-0 bg-[#0f172a] z-10 shadow-sm">
                                <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/[0.04]">
                                    <th className="px-5 py-4 font-bold">MT5 ID / Broker</th>
                                    <th className="px-5 py-4 font-bold">Assignee</th>
                                    <th className="px-5 py-4 font-bold">Capital</th>
                                    <th className="px-5 py-4 font-bold">Status</th>
                                    <th className="px-5 py-4 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {loading ? (
                                    Array.from({ length: 2 }).map((_, i) => (
                                        <tr key={i}><td colSpan={5} className="px-5 py-5 border-b border-white/[0.02]"><Skeleton className="h-4 w-full" /></td></tr>
                                    ))
                                ) : accountConnections.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-12 text-center bg-white/[0.01]">
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 bg-gray-800/40 rounded-2xl flex items-center justify-center mb-4 border border-white/5">
                                                    <LockIcon className="w-6 h-6 text-gray-600" />
                                                </div>
                                                <p className="text-sm text-gray-400 font-medium">No active connections</p>
                                                <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Connect your MT5 account to start managed trading.</p>
                                                <Link href="/account-management" className="mt-4 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-bold rounded-lg border border-blue-600/20 transition-all">
                                                    Get Started
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    accountConnections.map((conn) => (
                                        <tr key={conn.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-5 py-5">
                                                <p className="text-white font-bold text-xs group-hover:text-blue-400 transition-colors uppercase tracking-tight">{conn.account_id}</p>
                                                <p className="text-[10px] text-gray-500 mt-1 font-medium">{conn.broker}</p>
                                            </td>
                                            <td className="px-5 py-5 text-[11px] text-gray-400 font-semibold italic">
                                                {conn.manager}
                                            </td>
                                            <td className="px-5 py-5 text-xs text-white font-bold tracking-tight">
                                                ${conn.capital.toLocaleString()}
                                            </td>
                                            <td className="px-5 py-5">
                                                <StatusBadge status={conn.status} />
                                            </td>
                                            <td className="px-5 py-5 text-right">
                                                <button
                                                    onClick={() => setSelectedConnection(conn)}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] text-[11px] text-gray-400 hover:text-white rounded-md border border-white/[0.05] transition-all font-bold"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ──── COPY TRADING SECTION ──── */}
                <CopyTradingSection
                    loading={loading}
                    connections={copyTradingConnections}
                    onView={setSelectedCopyTrading}
                />

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

            {selectedConnection && (
                <ConnectionDetailsModal
                    connection={selectedConnection as AccountManagementData}
                    onClose={() => setSelectedConnection(null)}
                />
            )}
            {selectedCopyTrading && (
                <CopyTradingDetailsModal
                    connection={selectedCopyTrading as CopyTradingData}
                    onClose={() => setSelectedCopyTrading(null)}
                />
            )}
            {selectedRegistration && (
                <RegistrationDetailsModal
                    registration={selectedRegistration as PropFirmRegistrationData}
                    onClose={() => setSelectedRegistration(null)}
                />
            )}
        </div>
    );
}

// Separate Component for Copy Trading Section
const CopyTradingSection = ({
    loading,
    connections,
    onView
}: {
    loading: boolean;
    connections: CopyTradingData[];
    onView: (c: CopyTradingData) => void
}) => {
    return (
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden mt-6 shadow-xl shadow-black/40">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-500/10 rounded-lg flex items-center justify-center ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-500/10">
                        <Zap className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm tracking-tight">Copy Trading Connections</h3>
                        <p className="text-[11px] text-gray-500">Track your trade copying activity</p>
                    </div>
                </div>
                <Link href="/copy-trading" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-all hover:gap-2">
                    Manage / Connect <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
            <div className="overflow-x-auto custom-scrollbar max-h-[250px]">
                <table className="w-full text-left">
                    <thead className="sticky top-0 bg-[#0f172a] z-10 shadow-sm">
                        <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/[0.04]">
                            <th className="px-5 py-4 font-bold">Account ID</th>
                            <th className="px-5 py-4 font-bold">Server</th>
                            <th className="px-5 py-4 font-bold">Connected On</th>
                            <th className="px-5 py-4 font-bold">Status</th>
                            <th className="px-5 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {loading ? (
                            Array.from({ length: 2 }).map((_, i) => (
                                <tr key={i}><td colSpan={5} className="px-5 py-5 border-b border-white/[0.02]"><Skeleton className="h-4 w-full" /></td></tr>
                            ))
                        ) : connections.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-5 py-12 text-center bg-white/[0.01]">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-gray-800/40 rounded-2xl flex items-center justify-center mb-4 border border-white/5">
                                            <Zap className="w-6 h-6 text-gray-600" />
                                        </div>
                                        <p className="text-sm text-gray-400 font-medium">No active connections</p>
                                        <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Connect your account to start copying trades.</p>
                                        <Link href="/copy-trading" className="mt-4 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-600/20 transition-all">
                                            Connect Now
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            connections.map((conn) => (
                                <tr key={conn.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-5 py-5">
                                        <p className="text-white font-bold text-xs group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{conn.account_id}</p>
                                    </td>
                                    <td className="px-5 py-5 text-[11px] text-gray-400 font-semibold">
                                        {conn.server}
                                    </td>
                                    <td className="px-5 py-5 text-xs text-white">
                                        {new Date(conn.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-5">
                                        <StatusBadge status={conn.status} />
                                    </td>
                                    <td className="px-5 py-5 text-right">
                                        <button
                                            onClick={() => onView(conn)}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] text-[11px] text-gray-400 hover:text-white rounded-md border border-white/[0.05] transition-all font-bold"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
