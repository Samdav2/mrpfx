'use client';

import React, { useState } from 'react';
import { User, Lock, Server, Building2, CheckCircle2, PlayCircle } from 'lucide-react';

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
                    <div className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center">
                        <PlayCircle className="h-4 w-4 text-gray-300" />
                    </div>
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
                    <div className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center">
                        <PlayCircle className="h-4 w-4 text-gray-300" />
                    </div>
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
                    className="w-full mt-2 bg-gradient-to-r from-[#00A859] to-[#00C853] hover:from-[#00914d] hover:to-[#00b249] text-white font-bold py-3 md:py-4 px-4 rounded-xl transition-all shadow-lg shadow-[#00A859]/20 flex items-center justify-center gap-2 group"
                >
                    <span className="text-xs md:text-lg">Activate Auto Copy Trading</span>
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 opacity-80 group-hover:scale-110 transition-transform flex-shrink-0" />
                </button>
            </form>
        </div>
    );
}
