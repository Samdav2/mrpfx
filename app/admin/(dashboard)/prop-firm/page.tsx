'use client';

import { useState, useEffect } from 'react';
import {
    Search,
    ShoppingBag,
    Filter,
    Calendar,
    Mail,
    ChevronLeft,
    ChevronRight,
    Trophy,
    CheckCircle2,
    Clock,
    AlertCircle,
    User,
    RefreshCw,
    Edit,
    Eye,
    Trash2
} from 'lucide-react';
import { propFirmService, PropFirmRegistrationData } from '@/services/prop-firm.service';
import { SuccessModal, ErrorModal, ConfirmModal } from '@/components/admin/Modals';
import toast from 'react-hot-toast';

const STATUS_TABS = [
    { id: 'all', label: 'All Registrations' },
    { id: 'pending', label: 'Pending' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'failed', label: 'Failed' },
];

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        active: 'bg-green-500/10 text-green-400 border-green-500/20',
        pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        failed: 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    return (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border uppercase ${styles[status?.toLowerCase()] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
            {status}
        </span>
    );
};

export default function PropFirmRegistrationsPage() {
    const [registrations, setRegistrations] = useState<PropFirmRegistrationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);
    const limit = 50;
    const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean, id: string | number | null }>({ isOpen: false, id: null });
    const [editingStatus, setEditingStatus] = useState<PropFirmRegistrationData | null>(null);
    const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    // Update State
    const [updating, setUpdating] = useState<string | number | null>(null);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            const skip = (page - 1) * limit;
            const data = await propFirmService.adminGetRegistrations(limit, skip);
            setRegistrations(data.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch registrations", error);
            setErrorModal({ isOpen: true, message: 'Failed to load registrations.' });
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirmDelete.id) return;
        try {
            await propFirmService.deleteRegistration(confirmDelete.id);
            setConfirmDelete({ isOpen: false, id: null });
            toast.success("Registration deleted successfully");
            await fetchRegistrations();
        } catch (error) {
            console.error("Delete failed", error);
            toast.error("Failed to delete registration");
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, [page]);

    const handleStatusUpdate = async (id: string | number, field: 'status' | 'payment_status', value: string) => {
        setUpdating(id);
        try {
            await propFirmService.updateRegistrationStatus(id, { [field]: value });
            toast.success(`Updated ${field.replace('_', ' ')} to ${value}`);
            await fetchRegistrations();
        } catch (error) {
            console.error("Update failed", error);
            toast.error("Update failed. Please try again.");
        } finally {
            setUpdating(null);
        }
    };

    const filteredRegistrations = registrations.filter(reg => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = (
            reg.login_id?.toString().includes(search) ||
            reg.order_id?.toLowerCase().includes(search) ||
            reg.propfirm_name?.toLowerCase().includes(search) ||
            reg.telegram_username?.toLowerCase().includes(search)
        );

        const matchesTab = activeTab === 'all' || reg.status?.toLowerCase() === activeTab.toLowerCase();

        return matchesSearch && matchesTab;
    });

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completed':
            case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'failed': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white">Prop Firm Registrations</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search Login ID, Order, Firm..."
                            className="bg-[#111827] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500 w-72"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    onClick={fetchRegistrations}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1F2937] border border-gray-800 text-gray-300 hover:bg-[#374151] rounded-lg text-sm font-medium transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                </button>
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
                                <th className="p-4 font-medium">Order / Firm</th>
                                <th className="p-4 font-medium">Account Details</th>
                                <th className="p-4 font-medium">Status & Payment</th>
                                <th className="p-4 font-medium">Contact</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center bg-[#111827]">
                                        <div className="flex items-center justify-center gap-3 text-gray-400">
                                            <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                                            <span>Loading registrations...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredRegistrations.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center bg-[#111827]">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center">
                                                <Trophy className="w-6 h-6 text-gray-600" />
                                            </div>
                                            <div className="text-gray-400 font-medium">No registrations found</div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredRegistrations.map((reg) => (
                                    <tr key={reg.registration_id} className="hover:bg-[#1F2937]/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold">{reg.order_id}</span>
                                                <span className="text-xs text-purple-400 mt-1">{reg.propfirm_name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-white font-mono text-xs">{reg.login_id}</span>
                                                    <span className="text-[10px] bg-gray-800 px-1.5 rounded text-gray-500">{reg.server_type}</span>
                                                </div>
                                                <p className="text-[10px] text-gray-500 italic truncate max-w-[150px]">{reg.server_name}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <StatusBadge status={reg.status} />
                                                    <span className={`text-[10px] font-bold uppercase border px-1.5 py-0.5 rounded ${reg.payment_status === 'paid' ? 'text-emerald-400 border-emerald-500/30' : 'text-amber-400 border-amber-500/30'}`}>
                                                        {reg.payment_status}
                                                    </span>
                                                    <button
                                                        onClick={() => setEditingStatus(reg)}
                                                        className="p-1 text-gray-500 hover:text-purple-400 transition-colors"
                                                        title="Update Status"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col text-xs text-gray-400 gap-1">
                                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {reg.telegram_username}</span>
                                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {reg.whatsapp_no}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="flex flex-col items-end mr-2 text-[10px] text-gray-600">
                                                    <span>{new Date(reg.created_at).toLocaleDateString()}</span>
                                                    <span>{new Date(reg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        // For now just show a toast with details if no view page exists
                                                        toast(`Order: ${reg.order_id}\nLogin: ${reg.login_id}\nFirm: ${reg.propfirm_name}`, { icon: 'ℹ️', duration: 4000 });
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all border border-transparent hover:border-gray-600"
                                                    title="Quick View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDelete({ isOpen: true, id: reg.registration_id })}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
                                                    title="Delete"
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

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-800 bg-[#111827]/30">
                    <p className="text-xs text-gray-500">
                        Showing <span className="text-gray-300">{filteredRegistrations.length}</span> registrations
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 text-gray-600 hover:text-white disabled:opacity-30 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-xs text-gray-300 px-2 font-mono">{page}</span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={registrations.length < limit}
                            className="p-2 text-gray-600 hover:text-white disabled:opacity-30 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Status Update Modal */}
            {editingStatus && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl w-full max-w-sm shadow-2xl overflow-hidden">
                        <div className="p-5 border-b border-gray-800 flex items-center justify-between">
                            <h3 className="text-white font-bold text-sm">Update Registration Status</h3>
                            <button onClick={() => setEditingStatus(null)} className="text-gray-500 hover:text-white transition-colors">
                                <AlertCircle className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-gray-500 font-bold uppercase">Account Status</label>
                                <select
                                    className="w-full bg-[#1F2937] border border-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
                                    value={editingStatus.status}
                                    onChange={(e) => {
                                        handleStatusUpdate(editingStatus.registration_id, 'status', e.target.value);
                                        setEditingStatus({ ...editingStatus, status: e.target.value });
                                    }}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-gray-500 font-bold uppercase">Payment Status</label>
                                <select
                                    className="w-full bg-[#1F2937] border border-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
                                    value={editingStatus.payment_status}
                                    onChange={(e) => {
                                        handleStatusUpdate(editingStatus.registration_id, 'payment_status', e.target.value);
                                        setEditingStatus({ ...editingStatus, payment_status: e.target.value });
                                    }}
                                >
                                    <option value="pending">Unpaid</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-800/20 border-t border-gray-800">
                            <button
                                onClick={() => setEditingStatus(null)}
                                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-bold transition-all active:scale-95"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modals */}
            <ConfirmModal
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, id: null })}
                onConfirm={handleDelete}
                title="Delete Registration"
                message="Are you sure you want to delete this prop firm registration? This action cannot be undone."
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
