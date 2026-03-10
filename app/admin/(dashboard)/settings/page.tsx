'use client';

import React, { useState, useEffect } from 'react';
import { getMentorshipSettings, updateMentorshipSettings } from '@/app/actions/mentorship-settings';
import { Save } from 'lucide-react';

export default function SettingsPage() {
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getMentorshipSettings().then(data => {
            if (data?.registrationOpenDate) {
                // Parse the UTC ISO string to the user's local datetime-local format
                const localDate = new Date(data.registrationOpenDate);
                const offset = localDate.getTimezoneOffset() * 60000;
                const localISOTime = new Date(localDate.getTime() - offset).toISOString().slice(0, 16);
                setDate(localISOTime);
            }
            setLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            // Convert the local datetime-local string back to a UTC ISO string
            const isoString = date ? new Date(date).toISOString() : null;
            await updateMentorshipSettings({ registrationOpenDate: isoString });
            setMessage('Settings saved successfully!');
        } catch (e) {
            setMessage('Failed to save settings.');
        }
        setSaving(false);
    };

    if (loading) return <div className="p-8 text-gray-400">Loading settings...</div>;

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-white">Global Settings</h1>

            <div className="bg-[#1F2937] rounded-xl shadow-sm border border-gray-800 p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Mentorship Course 100</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Registration Open Date & Time
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                        If set to a future date, the page will be locked and a countdown timer will be displayed on the Mentorship Modal. Leave empty to disable the timer.
                    </p>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full md:w-1/2 p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                    {message && (
                        <span className={`text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                            {message}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
