'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/lib/auth';

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!token || !email) {
            setError('Invalid reset link. Please request a new one.');
            return;
        }

        setLoading(true);

        try {
            await authService.resetPassword({
                email,
                token,
                new_password: newPassword,
            });
            setSuccess('Password reset successfully. You can now log in with your new password.');
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-[family-name:var(--font-dm-sans)] flex items-center justify-center">
            <div className="w-full max-w-md px-4">
                <div className="bg-white rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.08)] p-8 border border-gray-50">
                    <h2 className="text-2xl font-bold text-black mb-4 text-center">
                        Reset Password
                    </h2>
                    <p className="text-gray-600 text-sm mb-8 text-center">
                        Enter your new password below.
                    </p>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">
                            {success}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleResetPassword}>
                        <div className="space-y-2">
                            <label className="text-[13px] text-gray-600 block font-medium">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="w-full px-4 py-3 border border-[#2A3596] rounded-[4px] text-sm focus:outline-none focus:ring-1 focus:ring-[#2A3596] text-gray-900 placeholder-gray-400"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] text-gray-600 block font-medium">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                className="w-full px-4 py-3 border border-[#2A3596] rounded-[4px] text-sm focus:outline-none focus:ring-1 focus:ring-[#2A3596] text-gray-900 placeholder-gray-400"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-[4px] shadow-sm text-sm font-bold text-white bg-[#2A3596] hover:bg-[#202875] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A3596] disabled:opacity-50"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
