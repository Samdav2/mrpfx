'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    User as UserIcon, Lock as LockIcon, Server as ServerIcon, DollarSign, Users, Award, TrendingUp,
    AlertTriangle, Briefcase, ChevronRight, ChevronLeft,
    ArrowRight, Loader2, Download, ShieldCheck
} from 'lucide-react';
import { tradersService } from '@/lib/traders';
import { TraderInfo, TraderPerformanceRecord } from '@/lib/types';
import { toast } from 'react-hot-toast';

// managerProfiles removed as we use tradersService

export default function AccountManagementForm() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [traders, setTraders] = useState<TraderInfo[]>([]);
    const [performance, setPerformance] = useState<TraderPerformanceRecord[]>([]);
    const [loadingTraders, setLoadingTraders] = useState(true);
    const [loadingPerformance, setLoadingPerformance] = useState(false);

    const [broker, setBroker] = useState('');
    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');
    const [server, setServer] = useState('');
    const [capital, setCapital] = useState('');
    const [manager, setManager] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchTraders = async () => {
            const data = await tradersService.listTraders();
            setTraders(data);
            setLoadingTraders(false);
        };
        fetchTraders();
    }, []);

    useEffect(() => {
        const fetchPerformance = async () => {
            if (!manager) {
                setPerformance([]);
                return;
            }
            setLoadingPerformance(true);
            const data = await tradersService.getTraderPerformance(manager);
            if (data) {
                setPerformance(data.performance);
            }
            setLoadingPerformance(false);
        };
        fetchPerformance();
    }, [manager]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agreed) {
            toast.error("You must agree to the terms and conditions");
            return;
        }

        if (!manager) {
            toast.error("Please select a manager first");
            return;
        }

        const capitalNum = parseFloat(capital);
        if (isNaN(capitalNum) || capitalNum < 500) {
            toast.error("Capital must be at least $500");
            return;
        }

        if (!accountId || !password || !server || !broker) {
            toast.error("Please fill in all MT5 account details");
            return;
        }

        setLoading(true);
        const result = await tradersService.connectAccount({
            accountId,
            password,
            server,
            broker,
            capital: capitalNum,
            manager,
            agreed
        });

        if (result.success) {
            setSuccessMessage(result.message);
            setShowSuccessModal(true);
            // Optionally reset form
            setAccountId('');
            setPassword('');
            setServer('');
            setBroker('');
            setCapital('');
            setAgreed(false);
        } else {
            toast.error(result.message);
        }
        setLoading(false);
    };

    const selectedTrader = traders.find(t => t.trader_id === manager);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_12px_45px_rgb(0,0,0,0.06)] p-6 sm:p-8 md:p-10 w-full z-10 relative">
            <h3 className="text-[#1a1a1a] font-dm-sans font-bold text-[20px] sm:text-[23px] mb-6 text-left">
                Connect Your MT5 Account
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Broker Name */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-[#1E3A8A]" />
                    </div>
                    <input
                        type="text"
                        value={broker}
                        onChange={(e) => setBroker(e.target.value)}
                        placeholder="Broker Name"
                        className="block w-full pl-11 pr-4 py-[14px] border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] bg-white text-[15px]"
                        required
                    />
                </div>

                {/* MT5 Account ID */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-[#1E3A8A]" />
                    </div>
                    <input
                        type="text"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        placeholder="MT5 Account ID"
                        className="block w-full pl-11 pr-4 py-[14px] border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] bg-white text-[15px]"
                        required
                    />
                </div>

                {/* MT5 Password */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-[#1E3A8A]" />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="MT5 Password"
                        className="block w-full pl-11 pr-4 py-[14px] border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] bg-white text-[15px]"
                        required
                    />
                </div>

                {/* MT5 Server */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <ServerIcon className="h-5 w-5 text-[#1E3A8A]" />
                    </div>
                    <input
                        type="text"
                        value={server}
                        onChange={(e) => setServer(e.target.value)}
                        placeholder="MT5 Server"
                        className="block w-full pl-11 pr-4 py-[14px] border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] bg-white text-[15px]"
                        required
                    />
                </div>

                {/* Capital Amount */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <DollarSign className="h-5 w-5 text-[#1E3A8A]" />
                    </div>
                    <input
                        type="number"
                        min="500"
                        value={capital}
                        onChange={(e) => setCapital(e.target.value)}
                        placeholder="Capital Amount"
                        className="block w-full pl-11 pr-4 py-[14px] border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] bg-white text-[15px]"
                        required
                    />
                </div>

                {/* Select Verified Manager */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <Users className="h-5 w-5 text-[#1E3A8A]" />
                    </div>
                    <select
                        value={manager}
                        onChange={(e) => setManager(e.target.value)}
                        disabled={loadingTraders}
                        className="block w-full pl-11 pr-10 py-[14px] border border-gray-200 rounded-lg text-gray-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] bg-white text-[15px] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-no-repeat bg-[position:right_16px_center] disabled:opacity-50"
                        required
                    >
                        <option value="" disabled className="text-gray-500">
                            {loadingTraders ? 'Loading Managers...' : 'Select Verified Manager'}
                        </option>
                        {traders.map(t => (
                            <option key={t.trader_id} value={t.trader_id}>
                                {t.name} - {t.type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dynamic Trader Profile Snippet */}
                {selectedTrader && (
                    <div className="mt-2 mb-4 animate-in fade-in slide-in-from-top-4 duration-300 ease-out">
                        <div className="bg-[#f8fafc] rounded-xl border border-blue-100 p-5 relative overflow-hidden min-h-[150px]">
                            {loadingPerformance && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-30 flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-[#1E3A8A]" />
                                </div>
                            )}
                            {/* Decorative Background Element */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-60"></div>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h4 className="text-[#1A1A1A] font-bold text-lg flex items-center">
                                        <Award className="h-5 w-5 text-blue-600 mr-2" />
                                        {selectedTrader.name}
                                    </h4>
                                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-blue-100 text-[#1E3A8A] text-xs font-semibold rounded-full border border-blue-200 shadow-sm">
                                        {selectedTrader.type} Strategy
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 w-full mb-4 group/carousel">
                                {/* Left Arrow */}
                                <button
                                    type="button"
                                    onClick={() => scroll('left')}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 rounded-full p-1.5 text-blue-600 hover:bg-blue-50 transition-colors opacity-100 flex items-center justify-center -ml-3 sm:-ml-4 focus:outline-none"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2 -mx-1 px-1 gap-3 scroll-smooth">
                                    {performance.length > 0 ? performance.map((history, idx) => (
                                        <div key={idx} className="flex-none w-full sm:w-[90%] snap-center snap-always bg-white p-4 rounded-xl border border-gray-100 shadow-sm transition-opacity duration-300">
                                            {/* Header Tag for the Month */}
                                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-50/80">
                                                <span className="text-[13px] font-bold text-[#1E3A8A] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                                                    {history.month}
                                                </span>
                                                {/* Pagination indicators (Slide X of 12) */}
                                                <span className="text-[10px] text-gray-400 font-medium">
                                                    {idx + 1} / {performance.length}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-y-5 gap-x-3">
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center"><TrendingUp className="h-3.5 w-3.5 mr-1 text-green-500" /> Win Rate</span>
                                                    <span className="text-[#1A1A1A] font-bold text-[18px]">{history.winRate}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center"><DollarSign className="h-3.5 w-3.5 mr-1 text-blue-500" /> Est. ROI</span>
                                                    <span className="text-[#1E3A8A] font-bold text-[18px]">{history.monthlyRoi}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center"><AlertTriangle className="h-3.5 w-3.5 mr-1 text-orange-500" /> Max Drawdown</span>
                                                    <span className="text-[#1A1A1A] font-bold text-[18px]">{history.maxDrawdown}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center"><Briefcase className="h-3.5 w-3.5 mr-1 text-purple-500" /> Trades</span>
                                                    <span className="text-[#1A1A1A] font-bold text-[18px]">{history.totalTrades}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="flex-none w-full p-8 text-center text-gray-400 italic">
                                            No performance data available for this manager.
                                        </div>
                                    )}
                                </div>

                                {/* Right Arrow */}
                                <button
                                    type="button"
                                    onClick={() => scroll('right')}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 rounded-full p-1.5 text-blue-600 hover:bg-blue-50 transition-colors opacity-100 flex items-center justify-center -mr-3 sm:-mr-4 focus:outline-none"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                                {/* Scroll hint for desktop users */}
                                <div className="text-center mt-1">
                                    <span className="text-[10px] text-gray-400 italic">Swipe or scroll horizontally to view past months</span>
                                </div>
                            </div>

                            <style dangerouslySetInnerHTML={{
                                __html: `
                                .hide-scrollbar::-webkit-scrollbar {
                                    display: none;
                                }
                                .hide-scrollbar {
                                    -ms-overflow-style: none;
                                    scrollbar-width: none;
                                }
                            `}} />

                            <div className="relative z-10 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
                                <p className="text-sm text-[#475569] leading-relaxed font-medium">
                                    <span className="font-bold text-[#1E3A8A] block mb-1">Strategy Focus:</span>
                                    {selectedTrader.strategy}
                                </p>
                            </div>

                            <Link href={`/account-management/trader/${manager}`} className="mt-4 w-full text-center text-sm font-semibold text-[#1E3A8A] hover:text-blue-800 flex items-center justify-center transition-colors">
                                View Full Trading History <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Terms Agreement Checkbox */}
                <div className="flex items-center pt-2 pb-2">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="w-[18px] h-[18px] bg-white border-2 border-indigo-600 rounded bg-[#1E3A8A] text-[#1E3A8A] focus:ring-1 focus:ring-blue-500 cursor-pointer"
                            required
                        />
                    </div>
                    <label htmlFor="terms" className="ml-3 text-[14px] text-[#1a1a1a] font-medium leading-snug cursor-pointer">
                        I authorize the selected manager to trade on my behalf within defined risk parameters.
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-3 bg-[#2546A8] hover:bg-[#1E3A8A] text-white font-medium py-[14px] px-4 rounded-lg transition-colors flex justify-center items-center group shadow-md text-[16px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Connecting...
                        </>
                    ) : (
                        <>
                            Start Account Management
                            <ArrowRight className="ml-2.5 w-5 h-5 text-white transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                        </>
                    )}
                </button>
            </form>

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                message={successMessage}
            />
        </div>
    );
}

function SuccessModal({ isOpen, onClose, message }: { isOpen: boolean; onClose: () => void; message: string }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-dm-sans">Registration Successful!</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-[15px]">
                    {message}
                </p>
                <button
                    onClick={onClose}
                    className="w-full bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98] text-[16px]"
                >
                    Got it, thanks!
                </button>
            </div>
        </div>
    );
}
