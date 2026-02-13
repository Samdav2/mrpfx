'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Package,
    Clock,
    CheckCircle2,
    AlertCircle,
    DollarSign,
    MapPin,
    CreditCard,
    Loader2,
    FileText,
    ShoppingBag
} from 'lucide-react';
import { ordersService } from '@/lib/orders';
import type { WCOrderFull } from '@/lib/types';

export default function OrderDetailPage() {
    const params = useParams();
    const orderId = parseInt(params.orderId as string, 10);
    const [order, setOrder] = useState<WCOrderFull | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await ordersService.getMyOrder(orderId);
                setOrder(data);
            } catch (err) {
                console.error('Failed to load order', err);
            } finally {
                setLoading(false);
            }
        })();
    }, [orderId]);

    const formatPrice = (amount?: string | null) => {
        if (!amount) return '$0.00';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(amount));
    };

    const formatDate = (date?: string | null) => {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
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

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center text-center px-4">
                <div>
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <h2 className="text-xl font-bold text-white">Order not found</h2>
                    <p className="text-gray-500 text-sm mt-1 mb-4">The order may not exist or you don&apos;t have access.</p>
                    <Link href="/my-orders" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                        ← Back to My Orders
                    </Link>
                </div>
            </div>
        );
    }

    const st = statusConfig[order.status || ''] || statusConfig.pending;
    const StatusIcon = st.icon;

    const renderAddress = (addr?: { first_name?: string | null; last_name?: string | null; address_1?: string | null; address_2?: string | null; city?: string | null; state?: string | null; postcode?: string | null; country?: string | null; email?: string | null; phone?: string | null } | null) => {
        if (!addr) return <p className="text-gray-500 text-sm">Not provided</p>;
        return (
            <div className="text-sm text-gray-300 space-y-0.5">
                {(addr.first_name || addr.last_name) && (
                    <p className="font-medium text-white">{[addr.first_name, addr.last_name].filter(Boolean).join(' ')}</p>
                )}
                {addr.address_1 && <p>{addr.address_1}</p>}
                {addr.address_2 && <p>{addr.address_2}</p>}
                {(addr.city || addr.state || addr.postcode) && (
                    <p>{[addr.city, addr.state, addr.postcode].filter(Boolean).join(', ')}</p>
                )}
                {addr.country && <p>{addr.country}</p>}
                {addr.email && <p className="text-gray-500">{addr.email}</p>}
                {addr.phone && <p className="text-gray-500">{addr.phone}</p>}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/[0.03] blur-[120px]" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/my-orders" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to My Orders
                </Link>

                {/* Order Header */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-extrabold text-white">Order #{order.id}</h1>
                                    <p className="text-gray-500 text-xs mt-0.5">{formatDate(order.date_created_gmt)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${st.bg} ${st.color}`}>
                                <StatusIcon className="w-4 h-4" />
                                {order.status}
                            </span>
                            <span className="text-2xl font-bold text-white">{formatPrice(order.total_amount)}</span>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
                        {order.payment_method_title && (
                            <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" /> {order.payment_method_title}</span>
                        )}
                        {order.currency && <span>Currency: {order.currency}</span>}
                        {order.customer_note && (
                            <span className="text-gray-400">Note: {order.customer_note}</span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Billing */}
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5">
                        <h3 className="text-white font-semibold text-sm flex items-center gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-purple-400" /> Billing Address
                        </h3>
                        {renderAddress(order.billing_address)}
                    </div>

                    {/* Shipping */}
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5">
                        <h3 className="text-white font-semibold text-sm flex items-center gap-2 mb-3">
                            <Package className="w-4 h-4 text-emerald-400" /> Shipping Address
                        </h3>
                        {renderAddress(order.shipping_address)}
                    </div>
                </div>

                {/* Items */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/[0.06]">
                        <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-amber-400" /> Order Items
                        </h3>
                    </div>

                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2.5 border-b border-white/[0.04] text-xs text-gray-500 uppercase tracking-wider font-medium">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Qty</div>
                        <div className="col-span-2 text-right">Price</div>
                        <div className="col-span-2 text-right">Total</div>
                    </div>

                    {order.items.map(item => (
                        <div key={item.order_item_id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-b border-white/[0.04] items-center">
                            <div className="md:col-span-6 text-white text-sm font-medium">{item.order_item_name}</div>
                            <div className="md:col-span-2 text-center text-gray-400 text-sm">{item.quantity || 1}</div>
                            <div className="md:col-span-2 text-right text-gray-400 text-sm">
                                {item.quantity && item.line_total
                                    ? formatPrice(String(parseFloat(item.line_total) / item.quantity))
                                    : '—'}
                            </div>
                            <div className="md:col-span-2 text-right text-white font-semibold text-sm">{formatPrice(item.line_total)}</div>
                        </div>
                    ))}

                    {/* Footer */}
                    <div className="px-6 py-4 flex justify-end">
                        <div className="w-60 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="text-white">{formatPrice(order.total_amount)}</span>
                            </div>
                            <div className="flex justify-between text-sm border-t border-white/[0.06] pt-2">
                                <span className="text-white font-semibold">Total</span>
                                <span className="text-lg font-bold text-white">{formatPrice(order.total_amount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
