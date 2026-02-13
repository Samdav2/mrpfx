'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ShoppingBag,
    ArrowLeft,
    Save,
    Mail,
    DollarSign,
    CreditCard,
    Info,
    CheckCircle2,
    Calendar,
    Clock,
    Truck,
    AlertCircle,
    XCircle
} from 'lucide-react';
import { adminOrderService } from '@/lib/admin-api';
import { SuccessModal, ErrorModal } from '@/components/admin/Modals';

const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending Payment', icon: Clock, color: 'text-yellow-400' },
    { value: 'processing', label: 'Processing', icon: Truck, color: 'text-blue-400' },
    { value: 'on-hold', label: 'On Hold', icon: AlertCircle, color: 'text-purple-400' },
    { value: 'completed', label: 'Completed', icon: CheckCircle2, color: 'text-green-400' },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'text-gray-400' },
    { value: 'failed', label: 'Failed', icon: XCircle, color: 'text-red-400' },
];

const CURRENCY_OPTIONS = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'NGN', label: 'Nigerian Naira (₦)' },
];

const PAYMENT_METHODS = [
    { value: 'cod', title: 'Cash on Delivery' },
    { value: 'bacs', title: 'Direct Bank Transfer' },
    { value: 'cheque', title: 'Check Payments' },
    { value: 'nowpayments', title: 'Crypto (NOWPayments)' },
    { value: 'stripe', title: 'Credit Card (Stripe)' },
];

export default function AddOrderPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    const [formData, setFormData] = useState({
        billing_email: '',
        total_amount: '',
        currency: 'USD',
        status: 'pending',
        payment_method: '',
        payment_method_title: '',
        customer_note: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'payment_method') {
            const method = PAYMENT_METHODS.find(m => m.value === value);
            setFormData(prev => ({
                ...prev,
                payment_method: value,
                payment_method_title: method ? method.title : ''
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                total_amount: parseFloat(formData.total_amount) || 0
            };
            const result = await adminOrderService.create(payload);
            setSuccessModal(true);
        } catch (error: any) {
            console.error("Failed to create order", error);
            const message = error.response?.data?.detail || error.response?.data?.message || 'Failed to create order. Please check your inputs.';
            setErrorModal({ isOpen: true, message });
        } finally {
            setLoading(false);
        }
    };

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
                        <h1 className="text-2xl font-bold text-white">Create New Order</h1>
                        <p className="text-sm text-gray-400 mt-1">Add a manual order to WooCommerce</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.billing_email || !formData.total_amount}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    <span>Create Order</span>
                </button>
            </div>

            <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 space-y-8 shadow-xl">
                        {/* Customer Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Customer Information</h3>
                                    <p className="text-xs text-gray-500">Order confirmation will be sent to this email</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    Billing Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="billing_email"
                                    required
                                    value={formData.billing_email}
                                    onChange={handleChange}
                                    placeholder="customer@example.com"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Order Details Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-500 flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <h3 className="text-white font-semibold">Order Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        Total Amount <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="number"
                                            name="total_amount"
                                            required
                                            step="0.01"
                                            value={formData.total_amount}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="w-full bg-[#1F2937] text-white text-sm rounded-lg pl-9 pr-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Currency</label>
                                    <select
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleChange}
                                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                    >
                                        {CURRENCY_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                                <div className="w-10 h-10 rounded-lg bg-green-500/20 text-green-500 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <h3 className="text-white font-semibold">Payment Info</h3>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Payment Method</label>
                                <select
                                    name="payment_method"
                                    value={formData.payment_method}
                                    onChange={handleChange}
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                                >
                                    <option value="">Manual Order / No Payment</option>
                                    {PAYMENT_METHODS.map(method => (
                                        <option key={method.value} value={method.value}>{method.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Customer Note</label>
                                <textarea
                                    name="customer_note"
                                    rows={3}
                                    value={formData.customer_note}
                                    onChange={(e: any) => setFormData(prev => ({ ...prev, customer_note: e.target.value }))}
                                    placeholder="Enter any notes from the customer..."
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6 shadow-xl">
                        <div className="flex items-center gap-2 pb-4 border-b border-gray-800">
                            <Info className="w-4 h-4 text-purple-500" />
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Status & Visibility</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Initial Status</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {STATUS_OPTIONS.map((status) => {
                                        const Icon = status.icon;
                                        const isActive = formData.status === status.value;
                                        return (
                                            <button
                                                key={status.value}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, status: status.value }))}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 ${isActive
                                                    ? 'bg-purple-500/10 border-purple-500/50 text-purple-400'
                                                    : 'bg-gray-800/20 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'
                                                    }`}
                                            >
                                                <Icon className={`w-4 h-4 ${isActive ? status.color : 'text-gray-600'}`} />
                                                <span className="font-medium">{status.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 space-y-3">
                        <div className="flex items-center gap-2 text-purple-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Pro Tip</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            When you create an order, WooCommerce automatically generates an invoice and sends it to the customer if the email is valid.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <SuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                title="Order Created"
                message="Your manual order has been successfully created in WooCommerce."
                confirmText="View All Orders"
                onConfirm={() => router.push('/admin/orders')}
                secondaryText="Create Another"
                onSecondary={() => {
                    setSuccessModal(false);
                    setFormData({
                        billing_email: '',
                        total_amount: '',
                        currency: 'USD',
                        status: 'pending',
                        payment_method: '',
                        payment_method_title: '',
                        customer_note: '',
                    });
                }}
            />

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                message={errorModal.message}
            />
        </div>
    );
}
