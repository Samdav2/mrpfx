'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Plus,
    Eye,
    Trash2,
    ShoppingBag,
    Filter,
    Calendar,
    Mail,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    MoreHorizontal
} from 'lucide-react';
import { adminOrderService, WCOrder } from '@/lib/admin-api';
import { ConfirmModal, SuccessModal, ErrorModal } from '@/components/admin/Modals';

const STATUS_TABS = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'completed', label: 'Completed' },
    { id: 'on-hold', label: 'On Hold' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'failed', label: 'Failed' },
];

export default function OrdersPage() {
    const [orders, setOrders] = useState<WCOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean, orderId: number | null }>({ isOpen: false, orderId: null });
    const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<'id' | 'date'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const fetchOrders = async (statusFilter?: string) => {
        try {
            setLoading(true);
            const status = statusFilter === 'all' ? undefined : statusFilter;
            const data = await adminOrderService.getAll(status);
            setOrders(data || []);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch orders", error);
            setErrorModal({ isOpen: true, message: 'Failed to load orders. Please check your connection.' });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(activeTab);
    }, [activeTab]);

    const handleDeleteClick = (id: number) => {
        setConfirmDelete({ isOpen: true, orderId: id });
    };

    const handleDelete = async () => {
        if (!confirmDelete.orderId) return;
        try {
            await adminOrderService.delete(confirmDelete.orderId);
            setConfirmDelete({ isOpen: false, orderId: null });
            setSuccessModal({ isOpen: true, message: 'Order deleted successfully!' });
            await fetchOrders();
        } catch (error) {
            console.error("Failed to delete order", error);
            setErrorModal({ isOpen: true, message: 'Failed to delete order.' });
        }
    };

    const sortedOrders = [...orders].sort((a, b) => {
        if (sortBy === 'date') {
            const dateA = new Date(a.date_created_gmt || 0).getTime();
            const dateB = new Date(b.date_created_gmt || 0).getTime();
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        } else {
            return sortOrder === 'desc' ? (b.id || 0) - (a.id || 0) : (a.id || 0) - (b.id || 0);
        }
    });

    const filteredOrders = sortedOrders.filter(order => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = (
            order.id?.toString().includes(search) ||
            order.billing_email?.toLowerCase().includes(search) ||
            order.status?.toLowerCase().includes(search)
        );

        // Client-side safety filter for active tab
        const matchesTab = activeTab === 'all' || order.status?.toLowerCase() === activeTab.toLowerCase();

        return matchesSearch && matchesTab;
    });

    const getStatusColor = (status: string | null | undefined) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'on-hold': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'cancelled':
            case 'failed': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white">Orders</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search order ID, email..."
                            className="bg-[#111827] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3 relative">
                    <div className="relative">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${showFilters
                                    ? 'bg-purple-500/10 border-purple-500 text-purple-400'
                                    : 'bg-[#1F2937] border-gray-800 text-gray-300 hover:bg-[#374151]'
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            <span>Sort By</span>
                        </button>

                        {showFilters && (
                            <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                                <button
                                    onClick={() => { setSortBy('date'); setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc'); setShowFilters(false); }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 flex items-center justify-between"
                                >
                                    <span>Date {sortBy === 'date' && (sortOrder === 'desc' ? ' (Newest)' : ' (Oldest)')}</span>
                                    {sortBy === 'date' && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                                </button>
                                <button
                                    onClick={() => { setSortBy('id'); setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc'); setShowFilters(false); }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 flex items-center justify-between"
                                >
                                    <span>Order ID {sortBy === 'id' && (sortOrder === 'desc' ? ' (Highest)' : ' (Lowest)')}</span>
                                    {sortBy === 'id' && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Placeholder for future Add Order page */}
                    <Link
                        href="/admin/orders/add"
                        className="flex items-center gap-2 px-4 py-2 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Order</span>
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-gray-800 overflow-x-auto scrollbar-hide">
                {STATUS_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${activeTab === tab.id
                            ? 'border-[#d946ef] text-[#d946ef] bg-[#d946ef]/5'
                            : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden shadow-xl shadow-black/20">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                                <th className="p-4 font-medium">Order ID</th>
                                <th className="p-4 font-medium flex items-center gap-2 cursor-pointer hover:text-white group">
                                    Date <Calendar className="w-3.0 h-3.0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </th>
                                <th className="p-4 font-medium">Customer</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Total</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center bg-[#111827]">
                                        <div className="flex items-center justify-center gap-3 text-gray-400">
                                            <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                                            <span>Loading orders...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center bg-[#111827]">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center">
                                                <ShoppingBag className="w-6 h-6 text-gray-600" />
                                            </div>
                                            <div className="text-gray-400 font-medium">No orders found</div>
                                            <p className="text-xs text-gray-600 max-w-xs">We couldn't find any orders matching your criteria.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-[#1F2937]/50 transition-colors group">
                                        <td className="p-4">
                                            <span className="text-white font-semibold">#{order.id}</span>
                                        </td>
                                        <td className="p-4 text-gray-400">
                                            {order.date_created_gmt ? new Date(order.date_created_gmt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-300 flex items-center gap-1.5">
                                                    <Mail className="w-3 h-3 text-gray-500" />
                                                    {order.billing_email || 'Guest Customer'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase border tracking-wider bg-opacity-10 ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-purple-400 font-bold">
                                                {order.currency === 'USD' ? '$' : order.currency} {order.total_amount}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/orders/${order.id}`}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all border border-transparent hover:border-gray-600 shadow-sm"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(order.id!)}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
                                                    title="Delete Order"
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

                {/* Pagination Placeholder */}
                <div className="flex items-center justify-between p-4 border-t border-gray-800 bg-[#111827]/30">
                    <p className="text-xs text-gray-500">
                        Showing <span className="text-gray-300">{filteredOrders.length}</span> of <span className="text-gray-300">{orders.length}</span> orders
                    </p>
                    <div className="flex items-center gap-2">
                        <button disabled className="p-2 text-gray-600 hover:text-white disabled:opacity-30 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button disabled className="p-2 text-gray-600 hover:text-white disabled:opacity-30 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, orderId: null })}
                onConfirm={handleDelete}
                title="Delete Order"
                message="Are you sure you want to delete this order? This action will permanently remove it from WooCommerce."
                isDestructive={true}
            />

            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={() => setSuccessModal({ isOpen: false, message: '' })}
                message={successModal.message}
            />

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ isOpen: false, message: '' })}
                message={errorModal.message}
            />
        </div>
    );
}
