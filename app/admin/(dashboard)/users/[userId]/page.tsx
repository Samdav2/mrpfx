'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    User,
    ArrowLeft,
    Save,
    Mail,
    Lock,
    Globe,
    UserCircle,
    AtSign,
    Shield,
    Check
} from 'lucide-react';
import { adminUserService, WPUser } from '@/lib/admin-api';
import { SuccessModal, ErrorModal } from '@/components/admin/Modals';

export default function EditUserPage() {
    const router = useRouter();
    const params = useParams();
    const userId = Number(params.userId);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    const [formData, setFormData] = useState({
        user_email: '',
        user_pass: '',
        display_name: '',
        user_nicename: '',
        user_url: '',
        user_status: 0,
    });

    const [userRoles, setUserRoles] = useState<string[]>([]);
    const [availableRoles] = useState(['administrator', 'editor', 'author', 'contributor', 'subscriber', 'customer', 'shop_manager', 'lp_teacher']);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const [userData, roles] = await Promise.all([
                    adminUserService.get(userId),
                    adminUserService.getRoles(userId)
                ]);

                setFormData({
                    user_email: userData.user_email || '',
                    user_pass: '', // Don't pre-fill password
                    display_name: userData.display_name || '',
                    user_nicename: userData.user_nicename || '',
                    user_url: userData.user_url || '',
                    user_status: userData.user_status || 0,
                });
                setUserRoles(roles || []);
            } catch (error) {
                console.error("Failed to fetch user", error);
                setErrorModal({ isOpen: true, message: 'Failed to load user data.' });
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchUser();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleRole = (role: string) => {
        if (userRoles.includes(role)) {
            setUserRoles(userRoles.filter(r => r !== role));
        } else {
            setUserRoles([...userRoles, role]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Update basic info
            const updatePayload: any = { ...formData };
            if (!updatePayload.user_pass) delete updatePayload.user_pass; // Don't update password if empty

            await Promise.all([
                adminUserService.update(userId, updatePayload),
                adminUserService.updateRoles(userId, userRoles)
            ]);

            setSuccessModal(true);
        } catch (error: any) {
            console.error("Failed to update user", error);
            const message = error.response?.data?.detail || error.response?.data?.message || 'Failed to update user. Please check your inputs.';
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
                        <h1 className="text-2xl font-bold text-white">Edit User</h1>
                        <p className="text-sm text-gray-400 mt-1">Manage profile and roles for {formData.display_name || 'User'}</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving || !formData.user_email}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    <span>Save Changes</span>
                </button>
            </div>

            <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                                <UserCircle className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-semibold">User Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    name="display_name"
                                    value={formData.display_name}
                                    onChange={handleChange}
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    Nickname
                                </label>
                                <input
                                    type="text"
                                    name="user_nicename"
                                    value={formData.user_nicename}
                                    onChange={handleChange}
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <Globe className="w-4 h-4 text-gray-500" /> Website URL
                                </label>
                                <input
                                    type="url"
                                    name="user_url"
                                    value={formData.user_url}
                                    onChange={handleChange}
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <div className="w-10 h-10 rounded-lg bg-pink-500/20 text-pink-500 flex items-center justify-center">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-semibold">Security</h3>
                        </div>

                        <div className="space-y-2 max-w-sm">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="user_pass"
                                value={formData.user_pass}
                                onChange={handleChange}
                                placeholder="Leave blank to keep current"
                                className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Roles */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <Shield className="w-5 h-5 text-purple-500" />
                            <h3 className="text-white font-semibold">User Roles</h3>
                        </div>
                        <div className="space-y-2">
                            {availableRoles.map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => toggleRole(role)}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${userRoles.includes(role)
                                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800 border border-transparent'
                                        }`}
                                >
                                    <span className="capitalize">{role.replace('_', ' ')}</span>
                                    {userRoles.includes(role) && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-white font-semibold pb-4 border-b border-gray-800">Account Status</h3>
                        <select
                            name="user_status"
                            value={formData.user_status}
                            onChange={(e) => setFormData(prev => ({ ...prev, user_status: Number(e.target.value) }))}
                            className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent"
                        >
                            <option value={0}>Active</option>
                            <option value={1}>Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <SuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                title="User Updated"
                message="User profile and roles have been updated successfully."
                confirmText="Continue Editing"
                onConfirm={() => setSuccessModal(false)}
                secondaryText="Back to Users"
                onSecondary={() => router.push('/admin/users')}
            />

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                message={errorModal.message}
            />
        </div>
    );
}
