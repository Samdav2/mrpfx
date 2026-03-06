'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Lock, Server, DollarSign, Users, Award, TrendingUp, AlertTriangle, Briefcase, ChevronRight } from 'lucide-react';

const managerProfiles: Record<string, {
    name: string;
    type: string;
    winRate: string;
    monthlyRoi: string;
    maxDrawdown: string;
    totalTrades: string;
    strategy: string;
}> = {
    'managerA': {
        name: 'Master Trader A',
        type: 'Conservative',
        winRate: '85%',
        monthlyRoi: '4-6%',
        maxDrawdown: '3%',
        totalTrades: '1,240',
        strategy: 'Low-risk algorithmic hedging with strict stop losses.'
    },
    'managerB': {
        name: 'Pro Trader B',
        type: 'Balanced',
        winRate: '78%',
        monthlyRoi: '8-12%',
        maxDrawdown: '7%',
        totalTrades: '3,100',
        strategy: 'Intraday trend following with dynamic position sizing.'
    },
    'managerC': {
        name: 'Elite Trader C',
        type: 'Aggressive',
        winRate: '72%',
        monthlyRoi: '15-25%',
        maxDrawdown: '15%',
        totalTrades: '4,850',
        strategy: 'High-frequency scalping during volatile market sessions.'
    }
};

export default function AccountManagementForm() {
    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');
    const [server, setServer] = useState('');
    const [capital, setCapital] = useState('');
    const [manager, setManager] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submit account management details:', { accountId, password, server, capital, manager, agreed });
    };

    const selectedProfile = manager ? managerProfiles[manager as keyof typeof managerProfiles] : null;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-10 w-full max-w-2xl z-10 relative">
            <h3 className="text-[#1a1a1a] font-dm-sans font-bold text-xl sm:text-2xl mb-8 flex justify-center text-center">
                Connect Your MT5 Account
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* MT5 Account ID */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[#1E3A8A]" />
                    </div>
                    <input
                        type="text"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        placeholder="MT5 Account ID"
                        className="block w-full pl-11 pr-4 py-4 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        required
                    />
                </div>

                {/* MT5 Password */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-[#1E3A8A]" />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="MT5 Password"
                        className="block w-full pl-11 pr-4 py-4 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        required
                    />
                </div>

                {/* MT5 Server */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <Server className="h-5 w-5 text-[#1E3A8A]" />
                    </div>
                    <select
                        value={server}
                        onChange={(e) => setServer(e.target.value)}
                        className="block w-full pl-11 pr-10 py-4 border border-gray-200 rounded-lg text-gray-600 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-[15px] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-no-repeat bg-[position:right_16px_center]"
                        required
                    >
                        <option value="" disabled className="text-gray-400">MT5 Server</option>
                        <option value="server1">Server 1 (Live)</option>
                        <option value="server2">Server 2 (Live)</option>
                        <option value="server3">Server 3 (Demo)</option>
                    </select>
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
                        className="block w-full pl-11 pr-4 py-4 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                        className="block w-full pl-11 pr-10 py-4 border border-gray-200 rounded-lg text-gray-600 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-[15px] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-no-repeat bg-[position:right_16px_center]"
                        required
                    >
                        <option value="" disabled className="text-gray-400">Select Verified Manager</option>
                        <option value="managerA">Master Trader A - Conservative</option>
                        <option value="managerB">Pro Trader B - Balanced</option>
                        <option value="managerC">Elite Trader C - Aggressive</option>
                    </select>
                </div>

                {/* Dynamic Trader Profile Snippet */}
                {selectedProfile && (
                    <div className="mt-2 mb-4 animate-in fade-in slide-in-from-top-4 duration-300 ease-out">
                        <div className="bg-[#f8fafc] rounded-xl border border-blue-100 p-5 relative overflow-hidden">
                            {/* Decorative Background Element */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-60"></div>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h4 className="text-[#1A1A1A] font-bold text-lg flex items-center">
                                        <Award className="h-5 w-5 text-blue-600 mr-2" />
                                        {selectedProfile.name}
                                    </h4>
                                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-blue-100 text-[#1E3A8A] text-xs font-semibold rounded-full border border-blue-200 shadow-sm">
                                        {selectedProfile.type} Strategy
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-4 relative z-10 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex flex-col">
                                    <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center"><TrendingUp className="h-3.5 w-3.5 mr-1 text-green-500" /> Win Rate</span>
                                    <span className="text-[#1A1A1A] font-bold text-[17px]">{selectedProfile.winRate}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center"><DollarSign className="h-3.5 w-3.5 mr-1 text-blue-500" /> Est. ROI / mo</span>
                                    <span className="text-[#1E3A8A] font-bold text-[17px]">{selectedProfile.monthlyRoi}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center"><AlertTriangle className="h-3.5 w-3.5 mr-1 text-orange-500" /> Max Drawdown</span>
                                    <span className="text-[#1A1A1A] font-bold text-[17px]">{selectedProfile.maxDrawdown}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center"><Briefcase className="h-3.5 w-3.5 mr-1 text-purple-500" /> Total Trades</span>
                                    <span className="text-[#1A1A1A] font-bold text-[17px]">{selectedProfile.totalTrades}</span>
                                </div>
                            </div>

                            <div className="relative z-10 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
                                <p className="text-sm text-[#475569] leading-relaxed font-medium">
                                    <span className="font-bold text-[#1E3A8A] block mb-1">Strategy Focus:</span>
                                    {selectedProfile.strategy}
                                </p>
                            </div>

                            <Link href={`/account-management/trader/${manager}`} className="mt-4 w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center justify-center transition-colors">
                                View Full Trading History <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Terms Agreement Checkbox */}
                <div className="flex items-start pt-3 pb-2">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="w-5 h-5 bg-white border-2 border-indigo-600 rounded bg-[#1E3A8A] text-[#1E3A8A] focus:ring-1 focus:ring-blue-500 accent-[#1E3A8A] cursor-pointer"
                            required
                        />
                    </div>
                    <label htmlFor="terms" className="ml-3 text-[14px] text-gray-800 font-medium leading-snug cursor-pointer tracking-wide">
                        I authorize the selected manager to trade on my behalf within defined risk parameters.
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-2 bg-[#2546A8] hover:bg-[#1E3A8A] text-white font-medium py-3.5 px-4 rounded-lg transition-colors flex justify-center items-center group shadow-md"
                >
                    Start Account Management
                    <svg className="ml-3 w-5 h-5 text-white transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </button>
            </form>
        </div>
    );
}
