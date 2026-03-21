'use client';

import React, { useState, useEffect } from 'react';
import { getMentorshipSettings, updateMentorshipSettings } from '@/app/actions/mentorship-settings';
import { getMentorship100Settings, updateMentorship100Settings } from '@/app/actions/mentorship-100-settings';
import { getVIPSettings, updateVIPSettings, VIPSettings } from '@/app/actions/vip-settings';
import { getPrivateMentorshipSettings, updatePrivateMentorshipSettings } from '@/app/actions/private-mentorship-settings';
import { getPropFirmSettings, updatePropFirmSettings } from '@/app/actions/prop-firm-settings';
import { getPromoBannerSettings, updatePromoBannerSettings } from '@/app/actions/promo-banner-settings';
import { Save } from 'lucide-react';

export default function SettingsPage() {
    const [date, setDate] = useState('');
    const [productSlug, setProductSlug] = useState('standard-mentorship');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [date100, setDate100] = useState('');
    const [productSlug100, setProductSlug100] = useState('mentorship-100');
    const [saving100, setSaving100] = useState(false);
    const [message100, setMessage100] = useState('');

    const [vipLinks, setVipLinks] = useState({ oneMonth: '', twelveMonths: '', unlimited: '' });
    const [vipDate, setVipDate] = useState('');
    const [vipGroupLink, setVipGroupLink] = useState('');
    const [savingVip, setSavingVip] = useState(false);
    const [vipMessage, setVipMessage] = useState('');

    const [privateSlug, setPrivateSlug] = useState('private-mentorship');
    const [savingPrivate, setSavingPrivate] = useState(false);
    const [privateMessage, setPrivateMessage] = useState('');

    const [propFirmDiscountActive, setPropFirmDiscountActive] = useState(false);
    const [propFirmDiscountPercentage, setPropFirmDiscountPercentage] = useState(0);
    const [savingPropFirm, setSavingPropFirm] = useState(false);
    const [propFirmMessage, setPropFirmMessage] = useState('');

    const [promoActive, setPromoActive] = useState(false);
    const [promoText, setPromoText] = useState('');
    const [promoLink, setPromoLink] = useState('');
    const [promoColor, setPromoColor] = useState('bg-[#5B2EFF]');
    const [savingPromo, setSavingPromo] = useState(false);
    const [promoMessage, setPromoMessage] = useState('');

    useEffect(() => {
        getMentorshipSettings().then(data => {
            if (data?.registrationOpenDate) {
                const localDate = new Date(data.registrationOpenDate);
                const offset = localDate.getTimezoneOffset() * 60000;
                const localISOTime = new Date(localDate.getTime() - offset).toISOString().slice(0, 16);
                setDate(localISOTime);
            }
            if (data?.productSlug) {
                setProductSlug(data.productSlug);
            }
            setLoading(false);
        });
        getMentorship100Settings().then(data => {
            if (data?.registrationOpenDate) {
                const localDate = new Date(data.registrationOpenDate);
                const offset = localDate.getTimezoneOffset() * 60000;
                const localISOTime = new Date(localDate.getTime() - offset).toISOString().slice(0, 16);
                setDate100(localISOTime);
            }
            if (data?.productSlug) {
                setProductSlug100(data.productSlug);
            }
        });
        getVIPSettings().then(data => {
            setVipLinks({
                oneMonth: data.plans.oneMonth.paymentLink || '',
                twelveMonths: data.plans.twelveMonths.paymentLink || '',
                unlimited: data.plans.unlimited.paymentLink || '',
            });
            if (data.registrationOpenDate) {
                const localDate = new Date(data.registrationOpenDate);
                const offset = localDate.getTimezoneOffset() * 60000;
                const localISOTime = new Date(localDate.getTime() - offset).toISOString().slice(0, 16);
                setVipDate(localISOTime);
            }
            setVipGroupLink(data.groupPageLink || '');
        });
        getPrivateMentorshipSettings().then(data => {
            if (data?.productSlug) {
                setPrivateSlug(data.productSlug);
            }
        });
        getPropFirmSettings().then(data => {
            setPropFirmDiscountActive(data.discountActive || false);
            setPropFirmDiscountPercentage(data.discountPercentage || 0);
        });
        getPromoBannerSettings().then(data => {
            setPromoActive(data.active || false);
            setPromoText(data.text || '');
            setPromoLink(data.link || '');
            setPromoColor(data.backgroundColor || 'bg-[#5B2EFF]');
        });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const isoString = date ? new Date(date).toISOString() : null;
            await updateMentorshipSettings({ registrationOpenDate: isoString, productSlug });
            setMessage('Settings saved successfully!');
        } catch (e) {
            setMessage('Failed to save settings.');
        }
        setSaving(false);
    };

    const handleSave100 = async () => {
        setSaving100(true);
        setMessage100('');
        try {
            const isoString = date100 ? new Date(date100).toISOString() : null;
            await updateMentorship100Settings({ registrationOpenDate: isoString, productSlug: productSlug100 });
            setMessage100('Mentorship 100 settings saved successfully!');
        } catch (e) {
            setMessage100('Failed to save settings.');
        }
        setSaving100(false);
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
                },
                registrationOpenDate: vipDate ? new Date(vipDate).toISOString() : null,
                groupPageLink: vipGroupLink
            };
            await updateVIPSettings(settings);
            setVipMessage('VIP links saved successfully!');
        } catch (e) {
            setVipMessage('Failed to save VIP links.');
        }
        setSavingVip(false);
    };

    const handleSavePrivate = async () => {
        setSavingPrivate(true);
        setPrivateMessage('');
        try {
            await updatePrivateMentorshipSettings({ productSlug: privateSlug });
            setPrivateMessage('Private mentorship settings saved successfully!');
        } catch (e) {
            setPrivateMessage('Failed to save private mentorship settings.');
        }
        setSavingPrivate(false);
    };

    const handleSavePropFirm = async () => {
        setSavingPropFirm(true);
        setPropFirmMessage('');
        try {
            await updatePropFirmSettings({
                discountActive: propFirmDiscountActive,
                discountPercentage: propFirmDiscountPercentage
            });
            setPropFirmMessage('Prop firm settings saved successfully!');
        } catch (e) {
            setPropFirmMessage('Failed to save prop firm settings.');
        }
        setSavingPropFirm(false);
    };

    const handleSavePromo = async () => {
        setSavingPromo(true);
        setPromoMessage('');
        try {
            await updatePromoBannerSettings({
                active: promoActive,
                text: promoText,
                link: promoLink,
                backgroundColor: promoColor
            });
            setPromoMessage('Promo banner settings saved successfully!');
        } catch (e) {
            setPromoMessage('Failed to save promo banner settings.');
        }
        setSavingPromo(false);
    };

    if (loading) return <div className="p-8 text-gray-400">Loading settings...</div>;

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-white">Global Settings</h1>

            {/* Global Promo Banner */}
            <div className="bg-[#1F2937] rounded-xl shadow-sm border border-gray-800 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Global Promo Banner</h2>

                <div className="mb-6 flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="promoActive"
                        checked={promoActive}
                        onChange={(e) => setPromoActive(e.target.checked)}
                        className="w-5 h-5 bg-[#111827] border-gray-700 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="promoActive" className="text-sm font-medium text-gray-300 cursor-pointer">
                        Activate Promo Banner
                    </label>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Banner Text
                    </label>
                    <input
                        type="text"
                        value={promoText}
                        onChange={(e) => setPromoText(e.target.value)}
                        placeholder="e.g. Eid Mubarak! Use code FP..."
                        className="w-full p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 font-mono text-sm"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Banner Link (Optional)
                    </label>
                    <input
                        type="text"
                        value={promoLink}
                        onChange={(e) => setPromoLink(e.target.value)}
                        placeholder="e.g. /pass-funded-accounts"
                        className="w-full md:w-1/2 p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 font-mono text-sm"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Background Color
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { value: 'bg-[#5B2EFF]', label: 'Brand Purple' },
                            { value: 'bg-emerald-600', label: 'Emerald' },
                            { value: 'bg-red-600', label: 'Danger Red' },
                            { value: 'bg-indigo-600', label: 'Indigo' },
                            { value: 'bg-slate-900', label: 'Dark Mode' },
                            { value: 'bg-gradient-to-r from-purple-600 to-blue-600', label: 'Purple/Blue Gradient' },
                            { value: 'bg-gradient-to-r from-red-600 to-orange-600', label: 'Red/Orange Gradient' }
                        ].map((color) => (
                            <label key={color.value} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="promoColor"
                                    value={color.value}
                                    checked={promoColor === color.value}
                                    onChange={(e) => setPromoColor(e.target.value)}
                                    className="w-4 h-4 text-blue-600 bg-[#111827] border-gray-700"
                                />
                                <div className={`w-6 h-6 rounded-full ${color.value} border border-gray-600`}></div>
                                <span className="text-sm text-gray-300">{color.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSavePromo}
                        disabled={savingPromo}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {savingPromo ? 'Saving...' : 'Save Promo Banner Settings'}
                    </button>
                    {promoMessage && (
                        <span className={`text-sm ${promoMessage.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                            {promoMessage}
                        </span>
                    )}
                </div>
            </div>

            {/* Standard Mentorship Settings */}
            <div className="bg-[#1F2937] rounded-xl shadow-sm border border-gray-800 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Standard Mentorship</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Registration Open Date & Time
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                        Lock screen date for Standard Mentorship page. Leave empty to disable.
                    </p>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full md:w-1/2 p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Standard Mentorship Product Slug
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                        The WooCommerce product slug for Standard Mentorship.
                    </p>
                    <input
                        type="text"
                        value={productSlug}
                        onChange={(e) => setProductSlug(e.target.value)}
                        placeholder="standard-mentorship"
                        className="w-full md:w-1/2 p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 font-mono"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {saving ? 'Saving...' : 'Save Standard Settings'}
                    </button>
                    {message && (
                        <span className={`text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                            {message}
                        </span>
                    )}
                </div>
            </div>

            {/* Mentorship Course 100 Settings */}
            <div className="bg-[#1F2937] rounded-xl shadow-sm border border-gray-800 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Mentorship Course 100</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Registration Open Date & Time
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                        Lock screen date for Mentorship Course 100 page.
                    </p>
                    <input
                        type="datetime-local"
                        value={date100}
                        onChange={(e) => setDate100(e.target.value)}
                        className="w-full md:w-1/2 p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mentorship 100 Product Slug
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                        The WooCommerce product slug for Mentorship Course 100 (e.g., mentorship-100).
                    </p>
                    <input
                        type="text"
                        value={productSlug100}
                        onChange={(e) => setProductSlug100(e.target.value)}
                        placeholder="mentorship-100"
                        className="w-full md:w-1/2 p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 font-mono"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave100}
                        disabled={saving100}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {saving100 ? 'Saving...' : 'Save Mentorship 100 Settings'}
                    </button>
                    {message100 && (
                        <span className={`text-sm ${message100.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                            {message100}
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

                <hr className="border-gray-800 my-6" />

                <h3 className="text-lg font-semibold mb-4 text-white">VIP Signals Group Page Settings</h3>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Registration Open Date & Time
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                        If set to a future date, the VIP Signals Group page will be locked and a registration closed screen will be displayed.
                    </p>
                    <input
                        type="datetime-local"
                        value={vipDate}
                        onChange={(e) => setVipDate(e.target.value)}
                        className="w-full md:w-1/2 p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none placeholder-gray-500"
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Main Checkout Link (Sellar Link)
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                        Primary Sellar link for the VIP Signals Group page CTA button.
                    </p>
                    <input
                        type="url"
                        value={vipGroupLink}
                        onChange={(e) => setVipGroupLink(e.target.value)}
                        placeholder="https://sellar.co/..."
                        className="w-full p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none placeholder-gray-500 font-mono text-sm"
                    />
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

            {/* Private Mentorship Settings */}
            <div className="bg-[#1F2937] rounded-xl shadow-sm border border-gray-800 p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Private 1-on-1 Mentorship</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Private Mentorship Product Slug
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                        The WooCommerce product slug for Private Mentorship (e.g., private-mentorship). This should be a variable product with "Class A" and "Class B" variations.
                    </p>
                    <input
                        type="text"
                        value={privateSlug}
                        onChange={(e) => setPrivateSlug(e.target.value)}
                        placeholder="private-mentorship"
                        className="w-full md:w-1/2 p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 font-mono"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSavePrivate}
                        disabled={savingPrivate}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {savingPrivate ? 'Saving...' : 'Save Private Mentorship'}
                    </button>
                    {privateMessage && (
                        <span className={`text-sm ${privateMessage.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                            {privateMessage}
                        </span>
                    )}
                </div>
            </div>

            {/* Prop Firm Settings */}
            <div className="bg-[#1F2937] rounded-xl shadow-sm border border-gray-800 p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Prop Firm Registration (Pass Funded)</h2>

                <div className="mb-6 flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="discountActive"
                        checked={propFirmDiscountActive}
                        onChange={(e) => setPropFirmDiscountActive(e.target.checked)}
                        className="w-5 h-5 bg-[#111827] border-gray-700 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="discountActive" className="text-sm font-medium text-gray-300 cursor-pointer">
                        Activate Global Discount Mode
                    </label>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Discount Percentage (%)
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                        The percentage discount applied to all pass funded account checkout sizes when discount mode is active.
                    </p>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={propFirmDiscountPercentage}
                        onChange={(e) => setPropFirmDiscountPercentage(Number(e.target.value))}
                        className="w-full md:w-1/2 p-3 bg-[#111827] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 font-mono"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSavePropFirm}
                        disabled={savingPropFirm}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {savingPropFirm ? 'Saving...' : 'Save Prop Firm Settings'}
                    </button>
                    {propFirmMessage && (
                        <span className={`text-sm ${propFirmMessage.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                            {propFirmMessage}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
