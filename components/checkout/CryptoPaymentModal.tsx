'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    X,
    Copy,
    CheckCircle2,
    Clock,
    AlertCircle,
    Loader2,
    QrCode,
    Search,
    ChevronRight,
    ArrowLeft,
    RefreshCw
} from 'lucide-react';
import type { CryptoPaymentRead } from '@/lib/types';
import { cryptoPaymentsService } from '@/lib/crypto-payments';
import CurrencyIcon from '@/components/shared/CurrencyIcon';

interface CryptoPaymentModalProps {
    orderAmount: number;
    orderId: string;
    onClose: () => void;
    onSuccess: () => void;
}

type ModalStep = 'SELECT_CURRENCY' | 'PAYMENT_DETAILS' | 'SUCCESS';

export default function CryptoPaymentModal({ orderAmount, orderId, onClose, onSuccess }: CryptoPaymentModalProps) {
    const [step, setStep] = useState<ModalStep>('SELECT_CURRENCY');
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [loadingCurrencies, setLoadingCurrencies] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
    const [payment, setPayment] = useState<CryptoPaymentRead | null>(null);
    const [creatingPayment, setCreatingPayment] = useState(false);
    const [status, setStatus] = useState<string>('waiting');
    const [copied, setCopied] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [timeLeft, setTimeLeft] = useState<string>('60:00');

    // Initial load of currencies
    useEffect(() => {
        (async () => {
            setLoadingCurrencies(true);
            try {
                const data = await cryptoPaymentsService.getCurrencies();
                setCurrencies(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Failed to load currencies', err);
            } finally {
                setLoadingCurrencies(false);
            }
        })();
    }, []);

    // Polling for status and timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        let timerInterval: NodeJS.Timeout;

        if (step === 'PAYMENT_DETAILS' && payment) {
            // Poll status every 20s
            interval = setInterval(async () => {
                await pollStatus();
            }, 20000);

            // Timer logic (60 min window from the moment we show details)
            // Using a fixed 60 mins relative to "now" ensures no clock sync issues
            const endTime = Date.now() + 60 * 60 * 1000;

            timerInterval = setInterval(() => {
                const now = Date.now();
                const diff = endTime - now;

                if (diff <= 0) {
                    setTimeLeft('Expired');
                    clearInterval(timerInterval);
                    return;
                }

                const mins = Math.floor(diff / (1000 * 60));
                const secs = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${mins}:${secs.toString().padStart(2, '0')}`);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
            clearInterval(timerInterval);
        };
    }, [step, payment]);

    const pollStatus = async () => {
        if (!payment) return;
        setRefreshing(true);
        try {
            const result = await cryptoPaymentsService.forceUpdateStatus(payment.payment_id);
            setStatus(result.status);
            if (result.status === 'finished' || result.status === 'confirmed') {
                setStep('SUCCESS');
                setTimeout(() => {
                    onSuccess();
                }, 3000);
            }
        } catch (err) {
            console.error('Status poll failed', err);
        } finally {
            setRefreshing(false);
        }
    };

    const handleSelectCurrency = async (ticker: string) => {
        setSelectedCurrency(ticker);
        setCreatingPayment(true);
        try {
            const result = await cryptoPaymentsService.createPayment({
                price_amount: orderAmount,
                price_currency: 'usd',
                pay_currency: ticker,
                order_id: orderId
            });
            setPayment(result);
            setStatus(result.payment_status);
            setStep('PAYMENT_DETAILS');
        } catch (err) {
            console.error('Failed to create payment', err);
            alert('Failed to initialize payment. Please try another currency.');
        } finally {
            setCreatingPayment(false);
        }
    };

    const filteredCurrencies = useMemo(() => {
        return currencies.filter(c => c.toLowerCase().includes(search.toLowerCase()));
    }, [currencies, search]);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-[#0a0e17]/90 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-md bg-[#111827] border border-white/[0.08] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="px-8 py-6 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                    <div className="flex items-center gap-3">
                        {step === 'PAYMENT_DETAILS' && (
                            <button
                                onClick={() => setStep('SELECT_CURRENCY')}
                                className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        )}
                        <h3 className="text-xl font-bold text-white tracking-tight">
                            {step === 'SELECT_CURRENCY' ? 'Choose Currency' :
                                step === 'PAYMENT_DETAILS' ? 'Send Payment' : 'Success!'}
                        </h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500 hover:text-white" />
                    </button>
                </div>

                <div className="p-8">
                    {/* --- STEP 1: SELECT CURRENCY --- */}
                    {step === 'SELECT_CURRENCY' && (
                        <div className="space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search coins (BTC, ETH, USDT...)"
                                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-600"
                                />
                            </div>

                            <div className="max-h-[350px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                                {loadingCurrencies ? (
                                    <div className="py-12 flex flex-col items-center gap-3">
                                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                                        <p className="text-xs text-gray-500 font-medium">Loading supported networks...</p>
                                    </div>
                                ) : filteredCurrencies.length === 0 ? (
                                    <div className="py-12 text-center text-gray-600 text-sm italic">
                                        No currencies found matching &quot;{search}&quot;
                                    </div>
                                ) : (
                                    filteredCurrencies.map(ticker => (
                                        <button
                                            key={ticker}
                                            onClick={() => handleSelectCurrency(ticker)}
                                            disabled={creatingPayment}
                                            className="w-full flex items-center justify-between p-4 rounded-3xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group disabled:opacity-50"
                                        >
                                            <div className="flex items-center gap-4">
                                                <CurrencyIcon ticker={ticker} className="w-10 h-10" />
                                                <div className="text-left">
                                                    <p className="text-sm font-bold text-white uppercase group-hover:text-purple-400 transition-colors">
                                                        {ticker}
                                                    </p>
                                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                                                        Network: {ticker}
                                                    </p>
                                                </div>
                                            </div>
                                            {creatingPayment && selectedCurrency === ticker ? (
                                                <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                            )}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- STEP 2: PAYMENT DETAILS --- */}
                    {step === 'PAYMENT_DETAILS' && payment && (
                        <div className="space-y-8">
                            {/* Amount Display */}
                            <div className="text-center space-y-2">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Amount Due</p>
                                <h4 className="text-3xl font-black text-white flex items-center justify-center gap-2">
                                    {payment.pay_amount}
                                    <span className="text-purple-400 text-xl font-bold">{payment.pay_currency.toUpperCase()}</span>
                                </h4>
                                <p className="text-[10px] text-gray-500">Approximalty ${orderAmount} USD</p>
                            </div>

                            {/* QR & Address */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="p-4 bg-white rounded-[2rem] shadow-2xl shadow-purple-500/10 active:scale-95 transition-transform cursor-pointer overflow-hidden">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(payment.pay_address)}`}
                                        alt="Payment QR Code"
                                        className="w-40 h-40"
                                    />
                                </div>
                                <div className="w-full space-y-2">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Address</label>
                                        {copied === 'Address' && <span className="text-[10px] text-emerald-400 font-bold animate-pulse">COPIED!</span>}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(payment.pay_address, 'Address')}
                                        className="w-full bg-[#1f2937]/50 border border-white/[0.05] rounded-2xl p-4 text-left group hover:border-purple-500/30 transition-all active:scale-[0.98]"
                                    >
                                        <p className="text-[11px] font-mono text-gray-300 break-all leading-relaxed group-hover:text-white transition-colors">
                                            {payment.pay_address}
                                        </p>
                                    </button>
                                </div>
                            </div>

                            {/* Status & Warning */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        {refreshing ? (
                                            <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                                        ) : (
                                            <Clock className="w-4 h-4 text-amber-400" />
                                        )}
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                                            Status: {status}
                                        </span>
                                        <div className="h-4 w-px bg-white/10 mx-1" />
                                        <span className={`text-xs font-bold uppercase tracking-wider ${timeLeft === 'Expired' ? 'text-red-400' : 'text-gray-400'}`}>
                                            {timeLeft}
                                        </span>
                                    </div>
                                    <button
                                        onClick={pollStatus}
                                        disabled={refreshing}
                                        className="text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
                                    >
                                        I Have Paid
                                    </button>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
                                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-gray-600 leading-relaxed uppercase tracking-wider font-medium">
                                        Send only <span className="text-white">{payment.pay_currency.toUpperCase()}</span> to this address.
                                        Payments take <span className="text-white">5-30 mins</span> to confirm.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- STEP 3: SUCCESS --- */}
                    {step === 'SUCCESS' && (
                        <div className="py-12 flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/20 shadow-2xl shadow-emerald-500/20">
                                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-2xl font-black text-white">Payment Received!</h4>
                                <p className="text-sm text-gray-500">Your order is being processed. redirecting...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="px-8 py-5 bg-white/[0.015] border-t border-white/[0.05] flex items-center justify-center gap-2">
                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">SECURED BY</span>
                    <span className="text-[11px] font-black text-white tracking-widest flex items-center gap-1">
                        NOW<span className="text-purple-500">PAYMENTS</span>
                    </span>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.1); }
            `}</style>
        </div>
    );
}
