'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Calendar,
    Mail,
    Phone,
    MapPin,
    Package,
    CreditCard,
    Save,
    Trash2,
    AlertCircle,
    CheckCircle2,
    Clock,
    Truck,
    XCircle,
    User,
    Terminal,
    FileText,
    Shield
} from 'lucide-react';
import { adminOrderService, WCOrderFull } from '@/lib/admin-api';
import { SuccessModal, ErrorModal } from '@/components/admin/Modals';

const ORDER_STATUSES = [
    { value: 'pending', label: 'Pending Payment', icon: Clock, color: 'text-yellow-400' },
    { value: 'processing', label: 'Processing', icon: Truck, color: 'text-blue-400' },
    { value: 'on-hold', label: 'On Hold', icon: AlertCircle, color: 'text-purple-400' },
    { value: 'completed', label: 'Completed', icon: CheckCircle2, color: 'text-green-400' },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'text-gray-400' },
    { value: 'failed', label: 'Failed', icon: XCircle, color: 'text-red-400' },
];

export default function OrderDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const orderId = Number(params.orderId);

    const [order, setOrder] = useState<WCOrderFull | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await adminOrderService.get(orderId);
                setOrder(data);
                setNewStatus(data.status || '');
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch order", error);
                setErrorModal({ isOpen: true, message: 'Failed to load order details.' });
                setLoading(false);
            }
        };

        if (orderId) fetchOrder();
    }, [orderId]);

    const handleUpdateStatus = async () => {
        setSaving(true);
        try {
            await adminOrderService.update(orderId, { status: newStatus });
            setSuccessModal(true);
            // Refresh order data
            const updatedOrder = await adminOrderService.get(orderId);
            setOrder(updatedOrder);
        } catch (error: any) {
            console.error("Failed to update status", error);
            const message = error.response?.data?.detail || error.response?.data?.message || 'Failed to update order status.';
            setErrorModal({ isOpen: true, message });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400">
                <Package className="w-12 h-12 mb-4 opacity-20" />
                <p>Order not found</p>
                <Link href="/admin/orders" className="text-purple-500 hover:underline mt-2">Back to orders</Link>
            </div>
        );
    }

    const currentStatus = ORDER_STATUSES.find(s => s.value === order.status);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/orders"
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white">Order #{order.id}</h1>
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${order.status === 'completed' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                order.status === 'processing' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                    'bg-gray-500/10 border-gray-500/20 text-gray-400'
                                }`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />
                            Placed on {order.date_created_gmt ? new Date(order.date_created_gmt).toLocaleString() : 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2 border border-gray-700 outline-none focus:border-purple-500"
                    >
                        {ORDER_STATUSES.map(status => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleUpdateStatus}
                        disabled={saving || newStatus === order.status}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        <span>Update Status</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Note */}
                    {order.customer_note && (
                        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <FileText className="w-12 h-12 text-yellow-500" />
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <FileText className="w-5 h-5 text-yellow-500" />
                                <h3 className="font-semibold text-white">Customer Note</h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed italic">
                                "{order.customer_note}"
                            </p>
                        </div>
                    )}

                    {/* Items Table */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#1F2937]/30">
                            <div className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-purple-500" />
                                <h3 className="font-semibold text-white">Line Items</h3>
                            </div>
                            <span className="text-xs text-gray-500">{(order.items || []).length} items</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#1F2937]/50 text-xs uppercase text-gray-500">
                                    <tr>
                                        <th className="p-4 font-medium">Product Item</th>
                                        <th className="p-4 font-medium text-center">Qty</th>
                                        <th className="p-4 font-medium text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-800/50">
                                    {(order.items || []).map((item) => (
                                        <tr key={item.order_item_id} className="hover:bg-gray-800/20 transition-colors">
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="text-white font-medium">{item.order_item_name}</span>
                                                    <span className="text-xs text-gray-500">Product ID: {item.product_id || item.order_id}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="text-gray-300 font-medium">
                                                    x {item.quantity || 1}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right text-gray-400 font-mono">
                                                {order.currency === 'USD' ? '$' : order.currency} {item.line_total || item.total || '0.00'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 bg-[#1F2937]/20 border-t border-gray-800 flex flex-col items-end space-y-2">
                            <div className="flex justify-between w-full max-w-xs text-gray-400 text-sm">
                                <span>Subtotal</span>
                                <span>{order.currency === 'USD' ? '$' : order.currency} {order.total_amount}</span>
                            </div>
                            <div className="flex justify-between w-full max-w-xs text-white font-bold text-lg pt-2 border-t border-gray-800 mt-2">
                                <span>Total Amount</span>
                                <span className="text-purple-400">{order.currency === 'USD' ? '$' : order.currency} {order.total_amount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Meta / Info */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-xl space-y-4">
                        <div className="flex items-center gap-2 pb-4 border-b border-gray-800">
                            <Shield className="w-5 h-5 text-gray-500" />
                            <h3 className="font-semibold text-white">Technical Metadata</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Transaction ID</p>
                                <p className="text-white font-mono text-xs truncate" title={order.transaction_id || 'N/A'}>
                                    {order.transaction_id || 'N/A'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">IP Address</p>
                                <p className="text-white font-mono text-xs">{order.ip_address || 'N/A'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Tax Amount</p>
                                <p className="text-white text-xs">{order.currency === 'USD' ? '$' : order.currency} {order.tax_amount || '0.00'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Order Type</p>
                                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-[10px] font-bold uppercase border border-gray-700">
                                    {order.type || 'N/A'}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Parent Order</p>
                                <p className="text-white text-xs">#{order.parent_order_id || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-xl space-y-4">
                        <div className="flex items-center gap-2 pb-4 border-b border-gray-800">
                            <CreditCard className="w-5 h-5 text-gray-500" />
                            <h3 className="font-semibold text-white">Payment Details</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Payment Method</p>
                                <p className="text-white flex items-center gap-2">
                                    {order.payment_method_title || 'N/A'}
                                    <span className="text-xs text-gray-500 font-mono">({order.payment_method})</span>
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Currency</p>
                                <p className="text-white">{order.currency}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-xl space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-500" />
                                Customer
                            </h3>
                            <Link href={`/admin/users/${order.customer_id}`} className="text-xs text-purple-400 hover:text-purple-300 transition-colors">View Profile</Link>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-gray-800 text-gray-500">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-500 uppercase">Email</p>
                                    <p className="text-gray-200 truncate">{order.billing_email || 'Guest'}</p>
                                </div>
                            </div>

                            {order.billing_address && (
                                <>
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-gray-800 text-gray-500">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500 uppercase">Name</p>
                                            <p className="text-gray-200">
                                                {order.billing_address.first_name} {order.billing_address.last_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-gray-800 text-gray-500">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500 uppercase">Phone</p>
                                            <p className="text-gray-200">{order.billing_address.phone || 'N/A'}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Billing Address */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-xl space-y-4">
                        <h3 className="font-semibold text-white flex items-center gap-2 pb-4 border-b border-gray-800">
                            <MapPin className="w-5 h-5 text-red-500" />
                            Billing Address
                        </h3>
                        {order.billing_address ? (
                            <div className="text-sm text-gray-400 space-y-1">
                                <p className="text-gray-200">{order.billing_address.first_name} {order.billing_address.last_name}</p>
                                <p>{order.billing_address.company}</p>
                                <p>{order.billing_address.address_1}</p>
                                <p>{order.billing_address.address_2}</p>
                                <p>{order.billing_address.city}, {order.billing_address.state} {order.billing_address.postcode}</p>
                                <p>{order.billing_address.country}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No billing address provided.</p>
                        )}
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-xl space-y-4">
                        <h3 className="font-semibold text-white flex items-center gap-2 pb-4 border-b border-gray-800">
                            <MapPin className="w-5 h-5 text-green-500" />
                            Shipping Address
                        </h3>
                        {order.shipping_address ? (
                            <div className="text-sm text-gray-400 space-y-1">
                                <p className="text-gray-200">{order.shipping_address.first_name} {order.shipping_address.last_name}</p>
                                <p>{order.shipping_address.company}</p>
                                <p>{order.shipping_address.address_1}</p>
                                <p>{order.shipping_address.address_2}</p>
                                <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postcode}</p>
                                <p>{order.shipping_address.country}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No shipping address provided.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <SuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                title="Order Updated"
                message={`Order #${order.id} status successfully changed to ${newStatus}.`}
                onConfirm={() => setSuccessModal(false)}
            />

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                message={errorModal.message}
            />
        </div>
    );
}
