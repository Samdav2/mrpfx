'use client';

import React, { useState } from 'react';
import { User, Lock, Server, Building2 } from 'lucide-react';

export default function CopyTradingForm() {
    const [broker, setBroker] = useState('');
    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');
    const [server, setServer] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submit details:', { broker, accountId, password, server });
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-100 shadow-xl p-8 w-full max-w-md transform translate-x-4 translate-y-8 relative z-10">
            <h3 className="text-[#1a1a1a] font-dm-sans font-semibold text-lg mb-6">
                Enter your MT5 account details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Broker */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        value={broker}
                        onChange={(e) => setBroker(e.target.value)}
                        placeholder="Broker"
                        className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#374151] focus:border-transparent bg-[#FAFAFA]"
                        required
                    />
                </div>

                {/* MT5 Account ID */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        placeholder="MT5 Account ID"
                        className="block w-full pl-11 pr-10 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#374151] focus:border-transparent bg-[#FAFAFA]"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        {/* A generic icon indicating it's an ID field */}
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0H4C1.79086 0 0 1.79086 0 4V14C0 16.2091 1.79086 18 4 18H10C12.2091 18 14 16.2091 14 14V4C14 1.79086 12.2091 0 10 0ZM7 4C8.65685 4 10 5.34315 10 7C10 8.65685 8.65685 10 7 10C5.34315 10 4 8.65685 4 7C4 5.34315 5.34315 4 7 4ZM4 15V14C4 12.3431 5.34315 11 7 11C8.65685 11 10 12.3431 10 14V15H4Z" fill="#9CA3AF" />
                        </svg>
                    </div>
                </div>

                {/* MT5 Password */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-[#374151]" />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="MT5 Password"
                        className="block w-full pl-11 pr-10 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#374151] focus:border-transparent bg-[#FAFAFA]"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="18" height="16" rx="2" fill="#9CA3AF" />
                            <path d="M12 7H6C5.44772 7 5 7.44772 5 8V12C5 12.5523 5.44772 13 6 13H12C12.5523 13 13 12.5523 13 12V8C13 7.44772 12.5523 7 12 7Z" fill="white" />
                        </svg>
                    </div>
                </div>

                {/* MT5 Server */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <Server className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        value={server}
                        onChange={(e) => setServer(e.target.value)}
                        placeholder="MT5 Server"
                        className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#374151] focus:border-transparent bg-[#FAFAFA]"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-2 bg-[#2E3B8F] hover:bg-[#20296b] text-white font-medium py-3.5 px-4 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
                >
                    Connect Now
                </button>
            </form>
        </div>
    );
}
