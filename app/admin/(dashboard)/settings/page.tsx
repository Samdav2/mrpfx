'use client';

import React, { useState, useEffect } from 'react';
import { getMentorshipSettings, updateMentorshipSettings } from '@/app/actions/mentorship-settings';
import { getVIPSettings, updateVIPSettings, VIPSettings } from '@/app/actions/vip-settings';
import { Save } from 'lucide-react';

export default function SettingsPage() {
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [vipLinks, setVipLinks] = useState({ oneMonth: '', twelveMonths: '', unlimited: '' });
    const [savingVip, setSavingVip] = useState(false);
    const [vipMessage, setVipMessage] = useState('');

    useEffect(() => {
        getMentorshipSettings().then(data => {
            if (data?.registrationOpenDate) {
                const localDate = new Date(data.registrationOpenDate);
                const offset = localDate.getTimezoneOffset() * 60000;
                const localISOTime = new Date(localDate.getTime() - offset).toISOString().slice(0, 16);
                setDate(localISOTime);
            }
            setLoading(false);
        });
        getVIPSettings().then(data => {
            setVipLinks({
                oneMonth: data.plans.oneMonth.paymentLink || '',
                twelveMonths: data.plans.twelveMonths.paymentLink || '',
                unlimited: data.plans.unlimited.paymentLink || '',
            });
        });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const isoString = date ? new Date(date).toISOString() : null;
            await updateMentorshipSettings({ registrationOpenDate: isoString });
            setMessage('Settings saved successfully!');
        } catch (e) {
            setMessage('Failed to save settings.');
        }
        setSaving(false);
    };

    const handleSaveVip = async () => {
        setSavingVip(true);
        setVipMessage('');
        try {
            const settings: VIPSettings = {
                plans: {
                    oneMonth: { paymentLink: vipLinks.oneMonth },
                    twelveMonths: { paymentLink: vipLinks.twelveMonths },
                    unlimited: { paymentLink: vipLinks.unlimited },
                }
            };
            await updateVIPSettings(settings);
            setVipMessage('VIP links saved successfully!');
        } catch (e) {
            setVipMessage('Failed to save VIP links.');
        }
        setSavingVip(false);
    };

    if (loading) return <div className="p-8 text-gray-400">Loading settings...</div>;

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-white">Global Settings</h1>

            {/* Mentorship Settings */}
            <div className="bg-[#1F2937] rounded-xl shadow-sm border border-gray-800 p-6 mb-6">
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

            {/* VIP Signals Payment Links */}
            <div className="bg-[#1F2937] rounded-xl shadow-sm border border-gray-800 p-6">
                <h2 className="text-xl font-semibold mb-1 text-white">VIP Signals – Payment Links</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Set the payment link for each VIP plan. When a user clicks a plan in the modal, they will be redirected to the corresponding link. Leave empty to disable the link.
                </p>

                <div className="space-y-4 mb-6">
                    {([
                        { label: '1 Month – $199 (STARTER)', key: 'oneMonth' },
                        { label: '12 Months – $299 (BEST VALUE)', key: 'twelveMonths' },
                        { label: 'Unlimited – $499 (BEST DEAL)', key: 'unlimited' },
                    ] as { label: string; key: keyof typeof vipLinks }[]).map(({ label, key }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
                            <input
                                type="url"
                                value={vipLinks[key]}
                                onChange={(e) => setVipLinks(prev => ({ ...prev, [key]: e.target.value }))}
                                placeholder="https://payment.link/..."
                                className="w-full p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none placeholder-gray-500 font-mono text-sm"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSaveVip}
                        disabled={savingVip}
                        className="flex items-center gap-2 px-6 py-2.5 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {savingVip ? 'Saving...' : 'Save VIP Links'}
                    </button>
                    {vipMessage && (
                        <span className={`text-sm ${vipMessage.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                            {vipMessage}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
