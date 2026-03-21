'use client';

import React, { useState, useEffect } from 'react';
import { getSecuritySettings, updateSecuritySettings } from '@/app/actions/security-settings';
import { Save, ShieldAlert, Clock, RefreshCw } from 'lucide-react';

export default function SecuritySettingsPage() {
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const data = await getSecuritySettings();
            if (data?.force_password_reset_date) {
                const localDate = new Date(data.force_password_reset_date * 1000);
                const offset = localDate.getTimezoneOffset() * 60000;
                const localISOTime = new Date(localDate.getTime() - offset).toISOString().slice(0, 16);
                setDate(localISOTime);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (specificDate?: number | null) => {
        setSaving(true);
        setMessage('');
        try {
            const timestamp = specificDate !== undefined
                ? specificDate
                : (date ? Math.floor(new Date(date).getTime() / 1000) : null);

            await updateSecuritySettings({ force_reset_date: timestamp });

            if (timestamp) {
                const localDate = new Date(timestamp * 1000);
                const offset = localDate.getTimezoneOffset() * 60000;
                const localISOTime = new Date(localDate.getTime() - offset).toISOString().slice(0, 16);
                setDate(localISOTime);
            } else {
                setDate('');
            }

            setMessage('Security settings updated successfully!');
        } catch (e) {
            setMessage('Failed to update security settings.');
        } finally {
            setSaving(false);
        }
    };

    const handleForceResetNow = () => {
        const now = Math.floor(Date.now() / 1000);
        if (confirm('Are you sure you want to force ALL users to reset their passwords? This will immediately logout and block everyone who haven\'t reset since now.')) {
            handleSave(now);
        }
    };

    const handleDisableForceReset = () => {
        if (confirm('Are you sure you want to disable forced password resets?')) {
            handleSave(null);
        }
    };

    if (loading) return (
        <div className="p-8 flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">Loading security settings...</span>
        </div>
    );

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <ShieldAlert className="w-8 h-8 text-red-500" />
                <h1 className="text-3xl font-bold text-white">Security Settings</h1>
            </div>

            <div className="bg-[#1F2937] rounded-xl shadow-lg border border-gray-800 p-8 space-y-8">

                {/* Forced Password Reset Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <h2 className="text-xl font-semibold text-white">Forced Password Reset</h2>
                    </div>

                    <div className="bg-[#111827] border-l-4 border-yellow-600 p-4 mb-6 rounded-r-lg">
                        <p className="text-sm text-yellow-200">
                            <strong>Note:</strong> Users who registered or last reset their password <em>before</em> this date will be forced to perform a password reset upon their next login attempt.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300">
                            System-wide Reset Date & Time
                        </label>
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <input
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full md:w-auto p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                            />

                            <button
                                onClick={() => handleSave()}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                {saving ? 'Saving...' : 'Set Date'}
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800 mt-6">
                            <button
                                onClick={handleForceResetNow}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/50 font-medium rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Force Reset All Users (Now)
                            </button>

                            <button
                                onClick={handleDisableForceReset}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-400 border border-gray-700 font-medium rounded-lg hover:bg-gray-700 transition-all text-sm"
                            >
                                Disable Policy
                            </button>
                        </div>
                    </div>
                </section>

                {/* Status Message */}
                {message && (
                    <div className={`p-4 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${message.includes('successfully')
                            ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                            : 'bg-red-600/20 text-red-400 border border-red-600/30'
                        }`}>
                        {message}
                    </div>
                )}
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-500 text-xs">
                    This setting enforces a strict security policy. Date changes are logged and affect all user accounts immediately.
                </p>
            </div>
        </div>
    );
}
