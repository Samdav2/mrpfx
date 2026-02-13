'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    User,
    ArrowLeft,
    Save,
    Mail,
    Lock,
    Globe,
    UserCircle,
    AtSign
} from 'lucide-react';
import { adminUserService } from '@/lib/admin-api';
import { SuccessModal, ErrorModal } from '@/components/admin/Modals';

export default function AddUserPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    const [formData, setFormData] = useState({
        user_login: '',
        user_email: '',
        user_pass: '',
        display_name: '',
        user_nicename: '',
        user_url: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await adminUserService.create(formData);
            setSuccessModal(true);
        } catch (error: any) {
            console.error("Failed to create user", error);
            const message = error.response?.data?.detail || error.response?.data?.message || 'Failed to create user. Please check your inputs.';
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
                        href="/admin/users"
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Add New User</h1>
                        <p className="text-sm text-gray-400 mt-1">Create a new WordPress user account</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.user_login || !formData.user_email || !formData.user_pass}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    <span>Create User</span>
                </button>
            </div>

            <div className="max-w-4xl">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Account Settings */}
                    <div className="md:col-span-2 bg-[#111827] border border-gray-800 rounded-xl p-8 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-500 flex items-center justify-center">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-semibold">Account Credentials</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <User className="w-4 h-4 text-gray-500" /> Username *
                                </label>
                                <input
                                    type="text"
                                    name="user_login"
                                    required
                                    value={formData.user_login}
                                    onChange={handleChange}
                                    placeholder="johndoe"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <AtSign className="w-4 h-4 text-gray-500" /> Email *
                                </label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    value={formData.user_email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <Lock className="w-4 h-4 text-gray-500" /> Password *
                                </label>
                                <input
                                    type="password"
                                    name="user_pass"
                                    required
                                    value={formData.user_pass}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="md:col-span-2 bg-[#111827] border border-gray-800 rounded-xl p-8 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                                <UserCircle className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-semibold">Profile Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    name="display_name"
                                    value={formData.display_name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    Nickname (Internal)
                                </label>
                                <input
                                    type="text"
                                    name="user_nicename"
                                    value={formData.user_nicename}
                                    onChange={handleChange}
                                    placeholder="johnny"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <Globe className="w-4 h-4 text-gray-500" /> Website URL
                                </label>
                                <input
                                    type="url"
                                    name="user_url"
                                    value={formData.user_url}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Modals */}
            <SuccessModal
                isOpen={successModal}
                onClose={() => router.push('/admin/users')}
                title="User Created"
                message="The new user has been successfully created."
                confirmText="Back to Users"
                onConfirm={() => router.push('/admin/users')}
                secondaryText="Create Another"
                onSecondary={() => {
                    setFormData({
                        user_login: '',
                        user_email: '',
                        user_pass: '',
                        display_name: '',
                        user_nicename: '',
                        user_url: '',
                    });
                    setSuccessModal(false);
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
