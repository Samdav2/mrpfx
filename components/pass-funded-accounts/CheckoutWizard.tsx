'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronDown, CheckCircle2, ShieldCheck, Clock, Bitcoin, Landmark, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { propFirmService, PropFirmRegistrationResponse } from '@/services/prop-firm.service';
import CryptoPaymentModal from '@/components/checkout/CryptoPaymentModal';

function CheckoutWizardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL Parameters
    const plan = searchParams.get('plan') || 'Standard';
    const type = searchParams.get('type') || '2-Step Challenge';
    const sizeParam = searchParams.get('size');
    const sizeVal = searchParams.get('sizeVal');
    const priceStr = searchParams.get('price');
    const price = priceStr ? `$${priceStr}` : 'Custom Pricing';

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;

    const [formData, setFormData] = useState({
        loginId: "",
        password: "",
        propFirmName: "",
        propFirmWebsite: "",
        serverName: "",
        serverType: "",
        challengeSteps: "",
        accountCost: "",
        accountSize: sizeVal || (sizeParam ? sizeParam.replace(/[^\d.]/g, '') : ""),
        accountPhases: type.includes('1-Step') ? "1 Step Challenge" : "2 Steps Challenge",
        tradingPlatform: "Metatrader 5 only",
        propFirmRules: "",
        whatsappNumber: "",
        telegramUsername: "",
    });

    const [paymentMethod] = useState<'crypto'>('crypto');
    const [registrationResult, setRegistrationResult] = useState<PropFirmRegistrationResponse | null>(null);
    const [showCryptoModal, setShowCryptoModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const propFirmWebsites: Record<string, string> = {
        "FundedNext": "https://fundednext.com/",
        "FTMO": "https://ftmo.com/",
        "Fundingpips": "https://fundingpips.com/"
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newData = { ...prev, [name]: value };
            // Auto-update website if firm name changes
            if (name === 'propFirmName') {
                newData.propFirmWebsite = propFirmWebsites[value] || "";
            }
            return newData;
        });
    };

    const validateStep = (step: number) => {
        switch (step) {
            case 1:
                if (!formData.loginId || formData.loginId.length < 3) {
                    toast.error("Login ID must be at least 3 characters");
                    return false;
                }
                if (!formData.password || formData.password.length < 6) {
                    toast.error("Password must be at least 6 characters");
                    return false;
                }
                return true;
            case 2:
                if (!formData.propFirmName) {
                    toast.error("Please select a Prop Firm");
                    return false;
                }
                if (!formData.propFirmWebsite) {
                    toast.error("Please select a Prop Firm Website");
                    return false;
                }
                if (!formData.serverName || formData.serverName.length < 3) {
                    toast.error("Server Name must be at least 3 characters");
                    return false;
                }
                return true;
            case 3:
                if (!formData.serverType) {
                    toast.error("Please select Server Type");
                    return false;
                }
                if (!formData.challengeSteps || parseInt(formData.challengeSteps) < 1) {
                    toast.error("Challenge Steps must be at least 1");
                    return false;
                }
                if (!formData.accountCost || parseFloat(formData.accountCost) < 0) {
                    toast.error("Account Cost cannot be negative");
                    return false;
                }
                return true;
            case 4:
                if (!formData.accountSize || parseFloat(formData.accountSize) < 0) {
                    toast.error("Account Size cannot be negative");
                    return false;
                }
                if (!formData.accountPhases) {
                    toast.error("Please select Account Phases");
                    return false;
                }
                return true;
            case 5:
                const wordCount = formData.propFirmRules.trim().split(/\s+/).filter(word => word.length > 0).length;
                if (wordCount < 10) {
                    toast.error(`Prop Firm Rules must be at least 10 words. Current: ${wordCount} words.`);
                    return false;
                }
                if (!formData.whatsappNumber || formData.whatsappNumber.length < 5) {
                    toast.error("WhatsApp Number must be valid (min 5 chars)");
                    return false;
                }
                if (!formData.telegramUsername || formData.telegramUsername.length < 3) {
                    toast.error("Telegram Username must be at least 3 characters");
                    return false;
                }
                return true;
            case 6:
                return true;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (!validateStep(currentStep)) return;
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await propFirmService.createRegistration({
                login_id: formData.loginId,
                password: formData.password,
                propfirm_name: formData.propFirmName,
                propfirm_website_link: formData.propFirmWebsite,
                server_name: formData.serverName,
                server_type: formData.serverType,
                challenges_step: parseInt(formData.challengeSteps) || 1,
                propfirm_account_cost: parseFloat(formData.accountCost) || 0,
                account_size: parseFloat(formData.accountSize) || 0,
                account_phases: formData.accountPhases === "1 Step Challenge" ? 1 : 2,
                trading_platform: "Metatrader 5", // Fixed as per UI
                propfirm_rules: formData.propFirmRules,
                whatsapp_no: formData.whatsappNumber,
                telegram_username: formData.telegramUsername,
            });

            if (response.success) {
                setRegistrationResult(response);
                setShowCryptoModal(true);
                toast.success("Registration successful! Proceeding to crypto payment.");
            } else {
                toast.error(response.message || "Failed to create registration");
            }
        } catch (err: unknown) {
            console.error("Registration error:", err);
            const errorMessage = "Failed to create registration. Please check your inputs and try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = () => {
        setShowCryptoModal(false);
        toast.success("Payment confirmed! Your registration is complete.");
        setTimeout(() => {
            router.push("/dashboard");
        }, 2000);
    };

    const renderStepContent = () => {
        const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 outline-none transition-all text-slate-700 bg-gray-50/50 hover:bg-white";
        const labelClass = "block text-[15px] font-semibold text-slate-700 mb-2";

        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div>
                            <label className={labelClass}>Login ID</label>
                            <input
                                type="text"
                                name="loginId"
                                value={formData.loginId}
                                onChange={handleInputChange}
                                placeholder="Enter your login ID"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                className={inputClass}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div>
                            <label className={labelClass}>Name of Prop Firm</label>
                            <div className="relative">
                                <select
                                    name="propFirmName"
                                    value={formData.propFirmName}
                                    onChange={handleInputChange}
                                    className={`${inputClass} appearance-none cursor-pointer`}
                                >
                                    <option value="" disabled>Select Prop Firm</option>
                                    <option value="FundedNext">FundedNext</option>
                                    <option value="FTMO">FTMO</option>
                                    <option value="Fundingpips">Fundingpips</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Prop Firm Website</label>
                            <div className="relative">
                                <select
                                    name="propFirmWebsite"
                                    value={formData.propFirmWebsite}
                                    onChange={handleInputChange}
                                    className={`${inputClass} appearance-none cursor-pointer`}
                                >
                                    <option value="" disabled>Select Website</option>
                                    {formData.propFirmName && (
                                        <option value={propFirmWebsites[formData.propFirmName]}>
                                            {propFirmWebsites[formData.propFirmName]}
                                        </option>
                                    )}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Server Name</label>
                            <input
                                type="text"
                                name="serverName"
                                value={formData.serverName}
                                onChange={handleInputChange}
                                placeholder="e.g. FTMO-Server"
                                className={inputClass}
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div>
                            <label className={labelClass}>Server Type <span className="text-gray-400 font-normal ml-1">(MT5 required)</span></label>
                            <div className="relative">
                                <select
                                    name="serverType"
                                    value={formData.serverType}
                                    onChange={handleInputChange}
                                    className={`${inputClass} appearance-none cursor-pointer`}
                                >
                                    <option value="" disabled>Select Server Type</option>
                                    <option value="Demo">Demo</option>
                                    <option value="Live">Live</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Challenge Steps</label>
                            <div className="relative">
                                <select
                                    name="challengeSteps"
                                    value={formData.challengeSteps}
                                    onChange={handleInputChange}
                                    className={`${inputClass} appearance-none cursor-pointer`}
                                >
                                    <option value="" disabled>Select Steps</option>
                                    <option value="1">1 Step</option>
                                    <option value="2">2 Steps</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Cost of Prop Account</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                                <input
                                    type="number"
                                    name="accountCost"
                                    value={formData.accountCost}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    min="0"
                                    className={`${inputClass} pl-8`}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div>
                            <label className={labelClass}>Account Size Indication</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                                <input
                                    type="number"
                                    name="accountSize"
                                    value={formData.accountSize}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 100000"
                                    min="0"
                                    className={`${inputClass} pl-8`}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Account Phases</label>
                            <div className="relative">
                                <select
                                    name="accountPhases"
                                    value={formData.accountPhases}
                                    onChange={handleInputChange}
                                    className={`${inputClass} appearance-none cursor-pointer`}
                                >
                                    <option value="" disabled>Select Phase Type</option>
                                    <option value="1 Step Challenge">1 Step Challenge</option>
                                    <option value="2 Steps Challenge">2 Steps Challenge</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>
                                Trading Platform <span className="text-red-500 text-sm font-medium italic ml-2">MetaTrader 5 only</span>
                            </label>
                            <input
                                type="text"
                                name="tradingPlatform"
                                value={formData.tradingPlatform}
                                readOnly
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100/50 text-slate-500 cursor-not-allowed font-medium"
                            />
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div>
                            <label className={labelClass}>Prop Firm Rules</label>
                            <p className="text-sm text-gray-500 mb-2">Please state all trading rules clearly (Minimum 10 words)</p>
                            <textarea
                                name="propFirmRules"
                                value={formData.propFirmRules}
                                onChange={handleInputChange}
                                rows={6}
                                className={`${inputClass} resize-y`}
                                placeholder="Describe the rules to follow (e.g. max daily drawdown, max overall drawdown, news trading rules...)"
                            />
                            <div className={`mt-2 text-right text-xs font-medium ${formData.propFirmRules.trim().split(/\s+/).filter(word => word.length > 0).length < 10 ? 'text-orange-500' : 'text-emerald-500'}`}>
                                Word count: {formData.propFirmRules.trim().split(/\s+/).filter(word => word.length > 0).length} / 10 (Minimum)
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>WhatsApp Number</label>
                                <input
                                    type="tel"
                                    name="whatsappNumber"
                                    value={formData.whatsappNumber}
                                    onChange={handleInputChange}
                                    placeholder="+1234567890"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Telegram Username</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">@</span>
                                    <input
                                        type="text"
                                        name="telegramUsername"
                                        value={formData.telegramUsername}
                                        onChange={handleInputChange}
                                        placeholder="username"
                                        className={`${inputClass} pl-8`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Confirm Payment Method</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div
                                className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left bg-[#2563EB]/5 border-[#2563EB] shadow-md shadow-[#2563EB]/10"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2563EB] text-white">
                                    <Bitcoin className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-[#2563EB]">Pay with Crypto</p>
                                    <p className="text-sm text-slate-500">Fast transaction verification</p>
                                </div>
                                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-[#2563EB] bg-[#2563EB]">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const stepTitles = [
        "Account Credentials",
        "Firm Details",
        "Server Information",
        "Account Details",
        "Rules & Contact",
        "Payment Method"
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col pt-24 pb-12">

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-1">

                {/* Left Side: Order Summary & Info */}
                <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-6">
                    <button
                        onClick={() => router.push('/pass-funded-accounts')}
                        className="flex items-center gap-2 text-slate-500 hover:text-[#2563EB] transition-colors font-medium w-fit mb-2 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Packages
                    </button>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                            Order Summary
                        </h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">Pass Service Type</p>
                                    <p className="text-base font-bold text-slate-900">{plan} Pass</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">Challenge Type</p>
                                    <p className="text-base font-bold text-slate-900">{type}</p>
                                </div>
                            </div>
                            {sizeParam && (
                                <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 mb-1">Account Size</p>
                                        <p className="text-base font-bold text-slate-900">{sizeParam}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between items-end pt-2">
                                <p className="text-base font-bold text-slate-900">Total Price</p>
                                <p className="text-2xl font-black text-[#2563EB]">{price}</p>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 rounded-xl p-4 flex gap-3">
                            <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-900/80 leading-relaxed font-medium">
                                Fast & secure processing. Our system automatically begins integration once details are confirmed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Multistep Form */}
                <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col">
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-gray-100 overflow-hidden flex-1 flex flex-col">

                        {/* Progress Header */}
                        <div className="bg-slate-50/80 border-b border-gray-100 px-6 py-6 md:px-10 flex flex-col gap-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-1">
                                        Step {currentStep} of {totalSteps}
                                    </p>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                                        {stepTitles[currentStep - 1]}
                                    </h2>
                                </div>
                                <span className="text-slate-400 font-medium hidden md:block">
                                    {Math.round((currentStep / totalSteps) * 100)}% Completed
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                                <div
                                    className="h-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] transition-all duration-500 ease-out rounded-full"
                                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Form Body */}
                        <div className="p-6 md:p-10 flex-1 flex flex-col">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50/80 border border-red-100 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                    {error}
                                </div>
                            )}

                            <div className="flex-1">
                                {renderStepContent()}
                            </div>

                            {/* Footer / Navigation */}
                            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-between gap-4">
                                <button
                                    onClick={prevStep}
                                    className={`px-6 py-3 font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all w-full sm:w-auto ${currentStep === 1 ? 'opacity-0 pointer-events-none hidden sm:block' : 'opacity-100'}`}
                                >
                                    Previous
                                </button>

                                <button
                                    onClick={nextStep}
                                    disabled={loading}
                                    className="flex-1 md:flex-none min-w-[140px] bg-[#2563EB] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
                                >
                                    {loading ? (
                                        <span className="animate-pulse">Processing...</span>
                                    ) : (
                                        <>
                                            {currentStep === totalSteps ? 'Complete Order' : 'Continue'}
                                            {currentStep === totalSteps && <CheckCircle2 className="w-5 h-5" />}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Crypto Payment Modal */}
            {showCryptoModal && registrationResult && (
                <CryptoPaymentModal
                    orderAmount={registrationResult.amount || parseFloat(formData.accountCost) || 0}
                    orderId={registrationResult.order_id || `REG-${registrationResult.registration_id}`}
                    onClose={() => setShowCryptoModal(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
}

export default function CheckoutWizard() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB]"></div>
            </div>
        }>
            <CheckoutWizardContent />
        </Suspense>
    );
}
