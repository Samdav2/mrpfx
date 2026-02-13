'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Package,
    Clock,
    CheckCircle2,
    AlertCircle,
    DollarSign,
    Loader2,
    Eye,
    ShoppingBag,
    ArrowRight,
    TrendingUp
} from 'lucide-react';
import { ordersService } from '@/lib/orders';
import type { WCOrder, WCUserOrderSummary } from '@/lib/types';

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<WCOrder[]>([]);
    const [summary, setSummary] = useState<WCUserOrderSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const [orderData, summaryData] = await Promise.allSettled([
                    ordersService.getMyOrders(0, 50),
                    ordersService.getMyOrderSummary(),
                ]);
                if (orderData.status === 'fulfilled') setOrders(orderData.value);
                if (summaryData.status === 'fulfilled') setSummary(summaryData.value);
            } catch (err) {
                console.error('Failed to load orders', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const formatPrice = (amount?: string | null) => {
        if (!amount) return '$0.00';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(amount));
    };

    const formatDate = (date?: string | null) => {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const statusConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
        pending: { color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Clock },
        processing: { color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Package },
        completed: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle2 },
        cancelled: { color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertCircle },
        refunded: { color: 'text-gray-400', bg: 'bg-gray-500/10', icon: DollarSign },
        failed: { color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertCircle },
        'on-hold': { color: 'text-orange-400', bg: 'bg-orange-500/10', icon: Clock },
    };

    const getStatus = (status?: string | null) => statusConfig[status || ''] || statusConfig.pending;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        );
    }

    const summaryCards = summary ? [
        { label: 'Total Orders', value: summary.total_orders, icon: Package, gradient: 'from-blue-500/20 to-cyan-500/20', text: 'text-blue-400' },
        { label: 'Pending', value: summary.pending_orders, icon: Clock, gradient: 'from-amber-500/20 to-orange-500/20', text: 'text-amber-400' },
        { label: 'Completed', value: summary.completed_orders, icon: CheckCircle2, gradient: 'from-emerald-500/20 to-green-500/20', text: 'text-emerald-400' },
        { label: 'Total Spent', value: formatPrice(summary.total_spent), icon: TrendingUp, gradient: 'from-purple-500/20 to-pink-500/20', text: 'text-purple-400' },
    ] : [];

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/[0.03] blur-[120px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Orders</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">My Orders</h1>
                    <p className="text-gray-400 mt-2">Track and manage your purchases</p>
                </div>

                {/* Summary Cards */}
                {summaryCards.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {summaryCards.map((card, i) => (
                            <div key={i} className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5">
                                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-2`}>
                                    <card.icon className={`w-4 h-4 ${card.text}`} />
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{card.label}</div>
                                <div className="text-xl font-bold text-white mt-1">{card.value}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Orders */}
                {orders.length === 0 && (
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-16 text-center">
                        <ShoppingBag className="w-14 h-14 text-gray-600 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">No orders yet</h2>
                        <p className="text-gray-500 text-sm mb-6">Start shopping to see your orders here.</p>
                        <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/20">
                            Browse Shop <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                {/* Orders Table */}
                {orders.length > 0 && (
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.06] text-xs text-gray-500 uppercase tracking-wider font-medium">
                            <div className="col-span-2">Order</div>
                            <div className="col-span-3">Date</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Payment</div>
                            <div className="col-span-2 text-right">Total</div>
                            <div className="col-span-1"></div>
                        </div>

                        {/* Order Rows */}
                        {orders.map(order => {
                            const st = getStatus(order.status);
                            const StatusIcon = st.icon;
                            return (
                                <Link
                                    key={order.id}
                                    href={`/my-orders/${order.id}`}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center"
                                >
                                    <div className="md:col-span-2 text-white font-semibold text-sm">#{order.id}</div>
                                    <div className="md:col-span-3 text-gray-400 text-sm">{formatDate(order.date_created_gmt)}</div>
                                    <div className="md:col-span-2">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${st.bg} ${st.color}`}>
                                            <StatusIcon className="w-3 h-3" />
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="md:col-span-2 text-gray-500 text-xs">{order.payment_method_title || order.payment_method || '—'}</div>
                                    <div className="md:col-span-2 text-right text-white font-semibold text-sm">{formatPrice(order.total_amount)}</div>
                                    <div className="md:col-span-1 flex justify-end">
                                        <Eye className="w-4 h-4 text-gray-500" />
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
