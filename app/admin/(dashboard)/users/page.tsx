'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Plus,
    MoreVertical,
    Edit2,
    Trash2,
    Database,
    User,
    Heart,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown
} from 'lucide-react';
import { adminUserService, WPUser } from '@/lib/admin-api';
import { ConfirmModal, SuccessModal, ErrorModal } from '@/components/admin/Modals';

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<WPUser[]>([]);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean, userId: number | null }>({ isOpen: false, userId: null });
    const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    // Available WP roles
    const wpRoles = ['administrator', 'editor', 'author', 'contributor', 'subscriber', 'customer', 'shop_manager', 'lp_teacher'];

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await adminUserService.getAll();
            if (Array.isArray(data)) {
                // Fetch roles for each user
                const usersWithRoles = await Promise.all(
                    data.map(async (user) => {
                        try {
                            const roles = await adminUserService.getRoles(user.ID);
                            return { ...user, roles };
                        } catch (e) {
                            return user;
                        }
                    })
                );
                setUsers(usersWithRoles);
            } else if ((data as any).data && Array.isArray((data as any).data)) {
                const usersWithRoles = await Promise.all(
                    (data as any).data.map(async (user: any) => {
                        try {
                            const roles = await adminUserService.getRoles(user.ID);
                            return { ...user, roles };
                        } catch (e) {
                            return user;
                        }
                    })
                );
                setUsers(usersWithRoles);
            }
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch users", error);
            // Fallback (keep existing dummy data fallback if desired, or just empty)
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteClick = (id: number) => {
        setConfirmDelete({ isOpen: true, userId: id });
    };

    const handleDelete = async () => {
        if (!confirmDelete.userId) return;
        try {
            await adminUserService.delete(confirmDelete.userId);
            setConfirmDelete({ isOpen: false, userId: null });
            setSuccessModal({ isOpen: true, message: 'User deleted successfully!' });
            await fetchUsers();
        } catch (error) {
            console.error("Failed to delete user", error);
            setErrorModal({ isOpen: true, message: 'Failed to delete user.' });
        }
    };


    // Helper to get random color/fields for UI demo if missing from API
    const getUserMeta = (user: any, index: number) => {
        const colors = ['bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-orange-500', 'bg-red-500'];
        const companies = ['Google', 'Webflow', 'Facebook', 'Twitter', 'YouTube', 'Reddit', 'Spotify'];

        return {
            avatar: user.avatar || colors[index % colors.length],
            company: user.company || 'Unknown',
            location: user.location || 'Unknown',
            phone: user.phone || 'N/A',
            status: user.status || 'Active',
            companyIcon: user.companyIcon || 'bg-white text-black'
        };
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white">Users</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search for..."
                            className="bg-[#111827] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <Link
                    href="/admin/users/add"
                    className="flex items-center gap-2 px-4 py-2 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add user</span>
                </Link>
            </div>

            {/* Users Table */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h3 className="text-white font-semibold">All Users</h3>
                    <span className="text-xs text-purple-400">{users.length} found</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                                <th className="p-4 font-medium flex items-center gap-2 cursor-pointer hover:text-white">
                                    Name <ArrowUpDown className="w-3 h-3" />
                                </th>
                                <th className="p-4 font-medium">Email</th>
                                <th className="p-4 font-medium">Roles</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {users.map((user, index) => {
                                const meta = getUserMeta(user, index);
                                return (
                                    <tr key={user.ID} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full ${meta.avatar} flex items-center justify-center text-white text-xs font-bold`}>
                                                    {user.display_name?.charAt(0) || user.user_email?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{user.display_name || 'Unknown'}</p>
                                                    <p className="text-gray-500 text-xs text-nowrap">ID: {user.ID}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-300">{user.user_email}</td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {((user as any).roles || []).map((role: string) => (
                                                    <span key={role} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/20">
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right align-middle">
                                            <div className="flex items-center justify-end gap-2 transition-opacity">
                                                <Link
                                                    href={`/admin/users/${user.ID}`}
                                                    className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                                    title="Edit User"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(user.ID)}
                                                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {loading && <div className="p-4 text-center text-gray-400">Loading users...</div>}
                </div>
            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, userId: null })}
                onConfirm={handleDelete}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
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
