'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingDown, AlertTriangle, Activity } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-[#050505] text-white">

            <main className="flex-grow flex items-center justify-center relative overflow-hidden py-20">
                {/* Background Chart Effect - Simple CSS for now */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 left-0 right-0 h-px bg-red-500/20" />
                    <div className="absolute top-2/4 left-0 right-0 h-px bg-green-500/20" />
                    <div className="absolute top-3/4 left-0 right-0 h-px bg-blue-500/20" />
                    {/* Random candlesticks could be complex, keeping it clean with grid/lines */}
                    <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>

                <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-8 animate-pulse">
                        <TrendingDown className="w-12 h-12 text-red-500" />
                    </div>

                    <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-4 tracking-tighter">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
                        Stop Loss Hit - Page Not Found
                    </h2>

                    <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
                        Looks like this trade went sideways. The page you are looking for has been liquidated or never existed.
                        Don't chase the loss—return to the dashboard and find a new setup.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Return to Safe Zone
                        </Link>

                        <Link
                            href="/vip-signals-group"
                            className="w-full sm:w-auto px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            <Activity className="w-4 h-4 text-green-400" />
                            Find Live Signals
                        </Link>
                    </div>

                    {/* Fun trading data decoration */}
                    <div className="mt-16 grid grid-cols-3 gap-4 text-xs font-mono text-gray-600 opacity-60">
                        <div className="p-2 border border-white/5 rounded">
                            <span className="block text-red-400">STATUS</span>
                            LIQUIDATED
                        </div>
                        <div className="p-2 border border-white/5 rounded">
                            <span className="block text-blue-400">PAIR</span>
                            404/USD
                        </div>
                        <div className="p-2 border border-white/5 rounded">
                            <span className="block text-gray-400">P&L</span>
                            -100%
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
