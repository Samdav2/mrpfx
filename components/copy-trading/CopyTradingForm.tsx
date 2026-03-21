'use client';

import React, { useState } from 'react';
import { User, Lock, Server, Building2, CheckCircle2, Loader2, ShieldCheck, X } from 'lucide-react';
import { tradersService } from '@/lib/traders';
import { toast } from 'react-hot-toast';
import { createPortal } from 'react-dom';

export default function CopyTradingForm({ onSuccess }: { onSuccess?: () => void }) {
    const [broker, setBroker] = useState('');
    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');
    const [server, setServer] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await tradersService.connectCopyTrading({
                accountId,
                password,
                server
            });

            if (result.success) {
                setSuccessMessage(result.message);
                setShowSuccessModal(true);
                // Clear form
                setAccountId('');
                setPassword('');
                setServer('');
                setBroker('');
                if (onSuccess) onSuccess();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-4 md:p-8 w-full max-w-[420px] relative z-10 transition-all">
            <h3 className="text-[#1a1a1a] font-outfit font-bold text-lg md:text-2xl leading-tight mb-4 md:mb-6">
                Connect Your MT5 Account <span className="text-gray-400">&</span> Start Earning
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                {/* Broker Name */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                        <Building2 className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={broker}
                        onChange={(e) => setBroker(e.target.value)}
                        placeholder="Broker Name"
                        className="block w-full pl-9 md:pl-11 pr-3 md:pr-4 py-2.5 md:py-3.5 border border-gray-100 rounded-xl text-gray-800 text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]/50 bg-[#F9FBFF] transition-all"
                        required
                    />
                </div>

                {/* MT5 Login ID */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                        <User className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        placeholder="MT5 Login ID"
                        className="block w-full pl-9 md:pl-11 pr-10 md:pr-12 py-2.5 md:py-3.5 border border-gray-100 rounded-xl text-gray-800 text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]/50 bg-[#F9FBFF] transition-all"
                        required
                    />
                </div>

                {/* MT5 Password */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="MT5 Password"
                        className="block w-full pl-9 md:pl-11 pr-10 md:pr-12 py-2.5 md:py-3.5 border border-gray-100 rounded-xl text-gray-800 text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]/50 bg-[#F9FBFF] transition-all"
                        required
                    />
                </div>

                {/* Server */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none z-10">
                        <Server className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={server}
                        onChange={(e) => setServer(e.target.value)}
                        placeholder="Server"
                        className="block w-full pl-9 md:pl-11 pr-3 md:pr-4 py-2.5 md:py-3.5 border border-gray-100 rounded-xl text-gray-800 text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]/50 bg-[#F9FBFF] transition-all"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-gradient-to-r from-[#00A859] to-[#00C853] hover:from-[#00914d] hover:to-[#00b249] disabled:opacity-50 text-white font-bold py-3 md:py-4 px-4 rounded-xl transition-all shadow-lg shadow-[#00A859]/20 flex items-center justify-center gap-2 group"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                            <span className="text-xs md:text-lg">Processing...</span>
                        </>
                    ) : (
                        <>
                            <span className="text-xs md:text-lg">Activate Auto Copy Trading</span>
                            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 opacity-80 group-hover:scale-110 transition-transform flex-shrink-0" />
                        </>
                    )}
                </button>
            </form>

            {showSuccessModal && typeof document !== 'undefined' && createPortal(
                <SuccessModal
                    isOpen={showSuccessModal}
                    onClose={() => setShowSuccessModal(false)}
                    message={successMessage}
                />,
                document.body
            )}
        </div>
    );
}

function SuccessModal({ isOpen, onClose, message }: { isOpen: boolean; onClose: () => void; message: string }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10 text-center animate-in zoom-in-95 duration-300 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-emerald-100">
                    <ShieldCheck className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-outfit">Connection Successful!</h3>
                <p className="text-gray-600 mb-8 md:mb-10 leading-relaxed text-[15px] font-medium">
                    {message}
                </p>
                <button
                    onClick={onClose}
                    className="w-full bg-[#00A859] hover:bg-[#00914d] text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98] text-[16px] shadow-emerald-200"
                >
                    Got it, thanks!
                </button>
            </div>
        </div>
    );
}
