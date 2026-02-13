'use client';

import { useEffect, useState } from 'react';
import {
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Download,
    ShoppingBag,
    Users,
    BookOpen,
    DollarSign,
    ArrowRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { adminStatsService } from '@/lib/admin-api';
import Link from 'next/link';

interface DashboardCounts {
    users: number | string;
    orders: number | string;
    courses: number | string;
}

interface RecentOrder {
    id: string;
    date: string;
    status: string;
    total: string;
}

export default function AdminDashboard() {
    const [counts, setCounts] = useState<DashboardCounts>({ users: 0, orders: 0, courses: 0 });
    const [recentOrdersData, setRecentOrdersData] = useState<RecentOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [revenue, setRevenue] = useState(0);
    const [revenueTrend, setRevenueTrend] = useState<{ name: string, revenue: number }[]>([]);
    const [statusDistribution, setStatusDistribution] = useState<{ name: string, value: number, color: string }[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const summary = await adminStatsService.getDashboardSummary();

                setCounts({
                    users: summary.users,
                    orders: summary.orders,
                    courses: summary.courses
                });

                setRevenueTrend(summary.revenueTrend || []);
                setStatusDistribution(summary.statusDistribution || []);

                const formatted = (summary.recentOrders || []).map((order: any) => ({
                    id: `#${order.id || order.ID}`,
                    date: order.date_created_gmt ? new Date(order.date_created_gmt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-',
                    status: order.status === 'completed' ? 'Paid' : order.status === 'pending' ? 'Pending' : order.status,
                    total: `${order.currency || '$'} ${order.total_amount || '0.00'}`
                }));
                setRecentOrdersData(formatted);
                setRevenue(summary.revenue);

                setLoading(false);
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const topStats = [
        { title: 'Total Users', value: counts.users, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Total Orders', value: counts.orders, icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { title: 'Active Courses', value: counts.courses, icon: BookOpen, color: 'text-pink-500', bg: 'bg-pink-500/10' },
        { title: 'Total Revenue', value: `$${revenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                    <p className="text-gray-400 font-medium">Loading Dashboard Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-gray-400 text-sm mt-1">Platform overview and real-time performance tracking.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1F2937] text-white rounded-lg text-sm border border-gray-800 hover:bg-[#374151] transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {topStats.map((stat, index) => (
                    <div key={index} className="bg-[#111827] border border-gray-800 rounded-xl p-6 transition-all hover:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Trend Chart */}
                <div className="lg:col-span-2 bg-[#111827] border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-white font-semibold">Revenue Trend</h3>
                            <p className="text-gray-500 text-xs">Monthly performance overview</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 text-xs">
                                <span className="w-2 h-2 rounded-full bg-[#d946ef]"></span>
                                <span className="text-gray-400">Monthly Revenue</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueTrend}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#d946ef" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    tickFormatter={(val) => `$${val}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#d946ef' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#d946ef"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Order Status Distribution */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white font-semibold">Order Distribution</h3>
                        <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
                    </div>
                    <div className="h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusDistribution.length > 0 ? statusDistribution : [{ name: 'No Orders', value: 1, color: '#374151' }]}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {statusDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '12px', color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-white">{counts.orders}</span>
                            <span className="text-gray-400 text-xs">Orders</span>
                        </div>
                    </div>
                    <div className="space-y-3 mt-6">
                        {statusDistribution.slice(0, 4).map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-gray-400">{item.name}</span>
                                </div>
                                <span className="text-white font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Recent Orders */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                        <p className="text-gray-500 text-sm">Most recent orders across all products</p>
                    </div>
                    <Link
                        href="/admin/orders"
                        className="text-purple-400 text-sm hover:text-purple-300 flex items-center gap-1 font-medium transition-colors"
                    >
                        View All Orders <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#1F2937]/30 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Order ID</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {recentOrdersData.map((order, idx) => (
                                <tr key={idx} className="hover:bg-[#1F2937]/30 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-white uppercase">{order.id}</td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${order.status === 'Paid'
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                : order.status === 'Pending'
                                                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            <span className={`w-1 h-1 rounded-full ${order.status === 'Paid' ? 'bg-green-500' : order.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}></span>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-purple-400 font-bold">{order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
