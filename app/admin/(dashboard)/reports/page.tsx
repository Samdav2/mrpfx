'use client';

import { useEffect, useState, useCallback } from 'react';
import {
    Download,
    Users,
    ShoppingCart,
    DollarSign,
    BookOpen,
    FileText,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCcw,
    Package,
    Activity,
    BarChart3,
    PieChart as PieChartIcon,
    Layers
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend
} from 'recharts';
import {
    adminUserService,
    adminOrderService,
    adminProductService,
    adminLearnPressService,
    adminFormService,
    adminCommentService,
    adminPostService
} from '@/lib/admin-api';

// ─── Types ────────────────────────────────────────────────────
interface Stats {
    users: number;
    orders: number;
    revenue: number;
    products: number;
    courses: number;
    forms: number;
    comments: number;
    posts: number;
}

interface OrderStatus {
    name: string;
    value: number;
    color: string;
}

// ─── Helpers ──────────────────────────────────────────────────
const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

const formatNumber = (v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString();

// ─── Custom Tooltip component ─────────────────────────────────
const GlassTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-[#1a1f2e]/90 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            {payload.map((p: any, i: number) => (
                <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
                    {p.name}: {typeof p.value === 'number' && p.name.toLowerCase().includes('revenue') ? formatCurrency(p.value) : p.value}
                </p>
            ))}
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────
export default function ReportsPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<Stats>({ users: 0, orders: 0, revenue: 0, products: 0, courses: 0, forms: 0, comments: 0, posts: 0 });
    const [ordersByStatus, setOrdersByStatus] = useState<OrderStatus[]>([]);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [coursesList, setCoursesList] = useState<any[]>([]);

    // Monthly placeholder for chart (would come from a real time-series API):
    const monthlyData = [
        { month: 'Jan', revenue: 12400, orders: 34 },
        { month: 'Feb', revenue: 18200, orders: 52 },
        { month: 'Mar', revenue: 15600, orders: 41 },
        { month: 'Apr', revenue: 22100, orders: 63 },
        { month: 'May', revenue: 19800, orders: 55 },
        { month: 'Jun', revenue: 24500, orders: 71 },
        { month: 'Jul', revenue: 21300, orders: 60 },
        { month: 'Aug', revenue: 28700, orders: 82 },
        { month: 'Sep', revenue: 32100, orders: 91 },
        { month: 'Oct', revenue: 27400, orders: 78 },
        { month: 'Nov', revenue: 35200, orders: 99 },
        { month: 'Dec', revenue: 41000, orders: 115 },
    ];

    const fetchAll = useCallback(async () => {
        setLoading(true);
        try {
            const [users, orders, products, courses, forms, comments, posts] = await Promise.allSettled([
                adminUserService.getAll(1, 100),
                adminOrderService.getAll(undefined, 100, 0),
                adminProductService.getAll('any', 100, 0),
                adminLearnPressService.getCourses('any', 100, 0),
                adminFormService.getAll(100, 0),
                adminCommentService.getAll('approve', 100, 0),
                adminPostService.getAll('any', 100, 0),
            ]);

            const usersArr = users.status === 'fulfilled' && Array.isArray(users.value) ? users.value : [];
            const ordersArr = orders.status === 'fulfilled' && Array.isArray(orders.value) ? orders.value : [];
            const productsArr = products.status === 'fulfilled' && Array.isArray(products.value) ? products.value : [];
            const coursesArr = courses.status === 'fulfilled' && Array.isArray(courses.value) ? courses.value : [];
            const formsArr = forms.status === 'fulfilled' && Array.isArray(forms.value) ? forms.value : [];
            const commentsArr = comments.status === 'fulfilled' && Array.isArray(comments.value) ? comments.value : [];
            const postsArr = posts.status === 'fulfilled' && Array.isArray(posts.value) ? posts.value : [];

            // Revenue
            const totalRevenue = ordersArr.reduce((sum: number, o: any) => {
                const amt = parseFloat(o.total_amount || o.total || '0');
                return sum + (isNaN(amt) ? 0 : amt);
            }, 0);

            setStats({
                users: usersArr.length,
                orders: ordersArr.length,
                revenue: totalRevenue,
                products: productsArr.length,
                courses: coursesArr.length,
                forms: formsArr.length,
                comments: commentsArr.length,
                posts: postsArr.length,
            });

            // Orders by status
            const statusMap: Record<string, number> = {};
            ordersArr.forEach((o: any) => {
                const s = o.status || 'unknown';
                statusMap[s] = (statusMap[s] || 0) + 1;
            });
            const statusColors: Record<string, string> = {
                completed: '#10B981', processing: '#3B82F6', pending: '#F59E0B',
                'on-hold': '#8B5CF6', cancelled: '#EF4444', refunded: '#6366F1',
                failed: '#DC2626', draft: '#6B7280', trash: '#991B1B', unknown: '#374151'
            };
            setOrdersByStatus(Object.entries(statusMap).map(([name, value]) => ({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                value,
                color: statusColors[name] || '#6B7280'
            })));

            // Recent orders (latest 8)
            setRecentOrders(ordersArr.slice(0, 8).map((o: any) => ({
                id: o.id,
                status: o.status,
                total: parseFloat(o.total_amount || o.total || '0'),
                date: o.date_created_gmt || o.date_created || '',
                currency: o.currency || 'USD'
            })));

            // Top products
            setTopProducts(productsArr.slice(0, 6).map((p: any) => ({
                id: p.id,
                name: p.name || p.title || 'Unnamed',
                price: parseFloat(p.price || p.regular_price || '0'),
                stock: p.stock_quantity ?? 'N/A',
                status: p.status || p.post_status || 'unknown'
            })));

            // Courses
            setCoursesList(coursesArr.slice(0, 6).map((c: any) => ({
                id: c.id,
                title: c.title,
                students: c.metadata?.students || 0,
                price: c.metadata?.price || 0,
                status: c.status
            })));

        } catch (err) {
            console.error('Reports fetch error', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    // ─── CSV Export ───────────────────────────────────────────
    const handleExport = () => {
        const rows = [
            ['Metric', 'Value'],
            ['Total Users', stats.users],
            ['Total Orders', stats.orders],
            ['Total Revenue', stats.revenue],
            ['Total Products', stats.products],
            ['Total Courses', stats.courses],
            ['Total Forms', stats.forms],
            ['Total Comments', stats.comments],
            ['Total Posts', stats.posts],
            [],
            ['Recent Orders'],
            ['Order ID', 'Status', 'Total', 'Date'],
            ...recentOrders.map(o => [o.id, o.status, o.total, o.date]),
            [],
            ['Top Products'],
            ['ID', 'Name', 'Price', 'Stock', 'Status'],
            ...topProducts.map(p => [p.id, p.name, p.price, p.stock, p.status]),
            [],
            ['Courses'],
            ['ID', 'Title', 'Students', 'Price', 'Status'],
            ...coursesList.map(c => [c.id, c.title, c.students, c.price, c.status]),
        ];

        const csv = rows.map(r => (Array.isArray(r) ? r : [r]).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mrpfx-report-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // ─── Stat cards config ────────────────────────────────────
    const statCards = [
        { label: 'Total Users', value: stats.users, icon: Users, gradient: 'from-blue-600 to-cyan-500', bg: 'bg-blue-500/10', text: 'text-blue-400' },
        { label: 'Total Orders', value: stats.orders, icon: ShoppingCart, gradient: 'from-purple-600 to-pink-500', bg: 'bg-purple-500/10', text: 'text-purple-400' },
        { label: 'Revenue', value: formatCurrency(stats.revenue), icon: DollarSign, gradient: 'from-emerald-600 to-teal-500', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
        { label: 'Products', value: stats.products, icon: Package, gradient: 'from-orange-500 to-amber-500', bg: 'bg-orange-500/10', text: 'text-orange-400' },
        { label: 'Courses', value: stats.courses, icon: BookOpen, gradient: 'from-indigo-600 to-violet-500', bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
        { label: 'Forms', value: stats.forms, icon: FileText, gradient: 'from-rose-500 to-pink-500', bg: 'bg-rose-500/10', text: 'text-rose-400' },
    ];

    // ─── RENDER ───────────────────────────────────────────────
    return (
        <div className="space-y-8 pb-12">
            {/* ──── HEADER ──── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Reports & Analytics
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Comprehensive platform statistics at a glance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchAll}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 rounded-xl text-sm text-gray-300 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                        <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-purple-500/40"
                    >
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* ──── STAT CARDS ──── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {statCards.map((card, i) => (
                    <div
                        key={i}
                        className="group relative overflow-hidden bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
                    >
                        {/* Gradient glow */}
                        <div className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${card.gradient} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity blur-2xl`} />
                        <div className="relative">
                            <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                                <card.icon className={`w-5 h-5 ${card.text}`} />
                            </div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{card.label}</p>
                            <p className="text-2xl font-bold text-white mt-1">
                                {loading ? (
                                    <span className="inline-block w-16 h-7 bg-gray-700/50 rounded animate-pulse" />
                                ) : typeof card.value === 'number' ? formatNumber(card.value) : card.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ──── SECONDARY STATS ──── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Comments</p>
                        <p className="text-xl font-bold text-white">{loading ? '...' : stats.comments}</p>
                    </div>
                </div>
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Blog Posts</p>
                        <p className="text-xl font-bold text-white">{loading ? '...' : stats.posts}</p>
                    </div>
                </div>
            </div>

            {/* ──── CHARTS ROW 1 ──── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Trend */}
                <div className="lg:col-span-2 bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Revenue Trend</h3>
                                <p className="text-xs text-gray-500">Monthly overview</p>
                            </div>
                        </div>
                        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +24.6%
                        </span>
                    </div>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyData}>
                                <defs>
                                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.35} />
                                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="#1F2937" strokeDasharray="4 4" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}K`} />
                                <Tooltip content={<GlassTooltip />} />
                                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#8B5CF6" strokeWidth={3} fill="url(#revGrad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders by Status Donut */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <PieChartIcon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Order Status</h3>
                            <p className="text-xs text-gray-500">Distribution breakdown</p>
                        </div>
                    </div>
                    <div className="h-[200px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ordersByStatus.length > 0 ? ordersByStatus : [{ name: 'No data', value: 1, color: '#374151' }]}
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {(ordersByStatus.length > 0 ? ordersByStatus : [{ name: 'No data', value: 1, color: '#374151' }]).map((entry, idx) => (
                                        <Cell key={idx} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<GlassTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-white">{stats.orders}</span>
                            <span className="text-[10px] text-gray-500">orders</span>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2 max-h-[120px] overflow-y-auto custom-scrollbar">
                        {ordersByStatus.map((s, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                    <span className="text-gray-400">{s.name}</span>
                                </div>
                                <span className="text-white font-medium">{s.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ──── CHARTS ROW 2 ──── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders per month bar chart */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 bg-pink-500/10 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-pink-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Orders per Month</h3>
                            <p className="text-xs text-gray-500">Volume over time</p>
                        </div>
                    </div>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid vertical={false} stroke="#1F2937" strokeDasharray="4 4" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <Tooltip content={<GlassTooltip />} />
                                <Bar dataKey="orders" name="Orders" radius={[6, 6, 0, 0]}>
                                    {monthlyData.map((_, idx) => (
                                        <Cell key={idx} fill={idx % 2 === 0 ? '#8B5CF6' : '#3B82F6'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Courses Overview */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Courses Overview</h3>
                            <p className="text-xs text-gray-500">Enrollment & pricing</p>
                        </div>
                    </div>
                    <div className="space-y-3 max-h-[260px] overflow-y-auto custom-scrollbar">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-14 bg-gray-700/20 rounded-xl animate-pulse" />
                            ))
                        ) : coursesList.length === 0 ? (
                            <div className="h-[260px] flex items-center justify-center text-gray-500 text-sm">No courses found</div>
                        ) : (
                            coursesList.map((c, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl border border-white/[0.04] transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                                            <BookOpen className="w-4 h-4 text-indigo-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm text-white font-medium truncate">{c.title}</p>
                                            <p className="text-xs text-gray-500">{c.students} students • ${c.price}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-lg font-medium shrink-0 ${c.status === 'publish' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                        {c.status === 'publish' ? 'Active' : c.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* ──── DATA TABLES ──── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                <Activity className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="text-white font-bold">Recent Orders</h3>
                        </div>
                        <span className="text-xs text-gray-500">Latest {recentOrders.length}</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase border-b border-white/[0.04]">
                                    <th className="px-5 py-3 font-medium">Order</th>
                                    <th className="px-5 py-3 font-medium">Status</th>
                                    <th className="px-5 py-3 font-medium text-right">Total</th>
                                    <th className="px-5 py-3 font-medium text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i}><td colSpan={4} className="px-5 py-3"><div className="h-4 bg-gray-700/30 rounded animate-pulse" /></td></tr>
                                    ))
                                ) : recentOrders.length === 0 ? (
                                    <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-500">No orders found</td></tr>
                                ) : recentOrders.map((o, i) => {
                                    const statusColor: Record<string, string> = {
                                        completed: 'bg-emerald-500/10 text-emerald-400', processing: 'bg-blue-500/10 text-blue-400',
                                        pending: 'bg-yellow-500/10 text-yellow-400', cancelled: 'bg-red-500/10 text-red-400',
                                        'on-hold': 'bg-purple-500/10 text-purple-400', refunded: 'bg-indigo-500/10 text-indigo-400'
                                    };
                                    return (
                                        <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                            <td className="px-5 py-3 text-white font-medium">#{o.id}</td>
                                            <td className="px-5 py-3">
                                                <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${statusColor[o.status] || 'bg-gray-500/10 text-gray-400'}`}>
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-right text-gray-300 font-medium">{formatCurrency(o.total)}</td>
                                            <td className="px-5 py-3 text-right text-gray-500 text-xs">{o.date ? new Date(o.date).toLocaleDateString() : '-'}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-orange-500/10 rounded-lg flex items-center justify-center">
                                <Layers className="w-5 h-5 text-orange-400" />
                            </div>
                            <h3 className="text-white font-bold">Top Products</h3>
                        </div>
                        <span className="text-xs text-gray-500">{topProducts.length} items</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase border-b border-white/[0.04]">
                                    <th className="px-5 py-3 font-medium">Product</th>
                                    <th className="px-5 py-3 font-medium text-right">Price</th>
                                    <th className="px-5 py-3 font-medium text-right">Stock</th>
                                    <th className="px-5 py-3 font-medium text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i}><td colSpan={4} className="px-5 py-3"><div className="h-4 bg-gray-700/30 rounded animate-pulse" /></td></tr>
                                    ))
                                ) : topProducts.length === 0 ? (
                                    <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-500">No products found</td></tr>
                                ) : topProducts.map((p, i) => (
                                    <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                                    <Package className="w-4 h-4 text-orange-400" />
                                                </div>
                                                <span className="text-white font-medium truncate max-w-[160px]">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-right text-gray-300 font-medium">{formatCurrency(p.price)}</td>
                                        <td className="px-5 py-3 text-right text-gray-400">{p.stock}</td>
                                        <td className="px-5 py-3 text-right">
                                            <span className={`text-xs px-2 py-1 rounded-lg font-medium ${p.status === 'publish' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                                {p.status === 'publish' ? 'Live' : p.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ──── Platform Health Footer ──── */}
            <div className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm text-gray-300 font-medium">Platform Health: <span className="text-emerald-400">Operational</span></span>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                        <span>{stats.users} users</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>{stats.orders} orders</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>{stats.courses} courses</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>Last updated: {new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
