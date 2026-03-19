'use client';

import React, { useRef, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    ArrowLeft, Award, TrendingUp, AlertTriangle, Briefcase,
    DollarSign, Activity, CheckCircle2, Shield, Calendar,
    BarChart3, Target, ChevronLeft, ChevronRight
} from 'lucide-react';

// Helper to generate last 12 months
const getPastMonths = () => {
    const months = [];
    const date = new Date(2026, 1, 1);
    for (let i = 0; i < 12; i++) {
        const monthName = date.toLocaleString('default', { month: 'long' });
        months.push(`${monthName} ${date.getFullYear()}`);
        date.setMonth(date.getMonth() - 1);
    }
    return months;
};

const pastMonths = getPastMonths();

const managerProfiles: Record<string, any> = {
    'managerA': {
        name: 'Master Trader A',
        type: 'Conservative',
        winRate: '85%',
        monthlyRoi: '4-6%',
        maxDrawdown: '3%',
        totalTrades: '1,240',
        profitFactor: '2.14',
        avgTradeDuration: '4.2 Days',
        bestTrade: '+$1,450',
        worstTrade: '-$320',
        strategy: 'Low-risk algorithmic hedging with strict stop losses.',
        description: 'Master Trader A employs a highly conservative strategy focused on wealth preservation. Utilizing proprietary algorithmic hedging techniques, this manager aims for consistent, low-volatility returns. Every position is strictly protected by hard stop losses, ensuring drawdowns remain minimal. Ideal for capital preservation.',
        performanceHistory: pastMonths.map((m, i) => ({
            month: m,
            winRate: `${85 - i}%`,
            monthlyRoi: `4-6%`,
            maxDrawdown: `${3 + Math.floor(i / 3)}%`,
            totalTrades: `${1240 - (i * 20)}`,
        }))
    },
    'managerB': {
        name: 'Pro Trader B',
        type: 'Balanced',
        winRate: '78%',
        monthlyRoi: '8-12%',
        maxDrawdown: '7%',
        totalTrades: '3,100',
        profitFactor: '1.85',
        avgTradeDuration: '1.5 Days',
        bestTrade: '+$2,800',
        worstTrade: '-$950',
        strategy: 'Intraday trend following with dynamic position sizing.',
        description: 'Pro Trader B utilizes a balanced approach, capturing medium-term trends while managing risk dynamically. This strategy involves intraday trading, capitalizing on market momentum during peak volume hours. It offers a solid middle ground between steady growth and calculated risk-taking.',
        performanceHistory: pastMonths.map((m, i) => ({
            month: m,
            winRate: `${78 - Math.floor(i / 2)}%`,
            monthlyRoi: `8-12%`,
            maxDrawdown: `${7 + Math.floor(i / 4)}%`,
            totalTrades: `${3100 - (i * 50)}`,
        }))
    },
    'managerC': {
        name: 'Elite Trader C',
        type: 'Aggressive',
        winRate: '72%',
        monthlyRoi: '15-25%',
        maxDrawdown: '15%',
        totalTrades: '4,850',
        profitFactor: '1.65',
        avgTradeDuration: '4 Hours',
        bestTrade: '+$5,200',
        worstTrade: '-$1,800',
        strategy: 'High-frequency scalping during volatile market sessions.',
        description: 'Elite Trader C is designed for investors seeking maximum growth. Employing aggressive, high-frequency scalping techniques, this manager targets short-term volatility bursts across major pairs and indices. While drawdowns are naturally higher, the potential for rapid portfolio expansion is significant.',
        performanceHistory: pastMonths.map((m, i) => ({
            month: m,
            winRate: `${72 - i}%`,
            monthlyRoi: '15-25%',
            maxDrawdown: `${15 + Math.floor(i / 3)}%`,
            totalTrades: `${4850 - (i * 100)}`,
        }))
    }
};

export default function TraderProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id: managerId } = use(params);
    const profile = managerProfiles[managerId];
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    if (!profile) {
        notFound();
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen pt-[120px] pb-24 font-sans font-dm-sans selection:bg-blue-200">
            {/* Background Effects */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#e0e7ff] to-[#f8fafc] z-0 pointer-events-none"></div>

            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Navigation Back */}
                <div className="mb-8">
                    <Link href="/account-management" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#1E3A8A] transition-colors group">
                        <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Account Management
                    </Link>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8 md:p-12 mb-8 relative overflow-hidden">
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-70 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 w-full">
                        <div className="flex items-center mb-6 md:mb-0">
                            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-lg text-white mr-6">
                                <Award className="h-10 w-10" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-[#0A1128] font-palanquin-dark tracking-tight mb-2">
                                    {profile.name}
                                </h1>
                                <div className="flex items-center space-x-3">
                                    <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1E3A8A] font-semibold text-sm rounded-full border border-blue-100">
                                        <Shield className="h-3.5 w-3.5 mr-1.5" />
                                        {profile.type} Strategy
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 font-semibold text-sm rounded-full border border-green-100">
                                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                                        Verified Trader
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-left md:text-right bg-blue-50/50 p-4 rounded-xl border border-blue-100 min-w-[200px]">
                            <p className="text-sm font-medium text-gray-500 mb-1">Estimated Monthly ROI</p>
                            <p className="text-3xl font-bold text-[#1E3A8A]">{profile.monthlyRoi}</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 relative z-10 w-full max-w-3xl">
                        <h3 className="text-lg font-bold text-[#1a1a1a] mb-3 flex items-center">
                            <Target className="h-5 w-5 mr-2 text-blue-600" />
                            Strategy Overview
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-[16px]">
                            {profile.description}
                        </p>
                    </div>
                </div>

                {/* Statistics Grid */}
                <h2 className="text-2xl font-bold text-[#0A1128] mb-6 font-palanquin-dark">Performance Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center mb-4 text-green-600">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Win Rate</p>
                        <p className="text-2xl font-bold text-[#1a1a1a]">{profile.winRate}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-orange-600">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Max Drawdown</p>
                        <p className="text-2xl font-bold text-[#1a1a1a]">{profile.maxDrawdown}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600">
                            <BarChart3 className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Profit Factor</p>
                        <p className="text-2xl font-bold text-[#1a1a1a]">{profile.profitFactor}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-purple-600">
                            <Briefcase className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Trades</p>
                        <p className="text-2xl font-bold text-[#1a1a1a]">{profile.totalTrades}</p>
                    </div>
                </div>

                {/* Additional Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Best Trade</p>
                            <p className="text-xl font-bold text-green-600">{profile.bestTrade}</p>
                        </div>
                        <Activity className="h-8 w-8 text-green-100" />
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Worst Trade</p>
                            <p className="text-xl font-bold text-red-500">{profile.worstTrade}</p>
                        </div>
                        <Activity className="h-8 w-8 text-red-100" />
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Avg Trade Duration</p>
                            <p className="text-xl font-bold text-[#1a1a1a]">{profile.avgTradeDuration}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-gray-200" />
                    </div>
                </div>

                {/* 12-Month Performance Carousel */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#0A1128] font-palanquin-dark flex items-center">
                            <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                            12-Month Performance History
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 hide-scrollbar scroll-smooth"
                    >
                        {profile.performanceHistory.map((history: any, idx: number) => (
                            <div
                                key={idx}
                                className="flex-none w-full md:w-[45%] lg:w-[31%] snap-center"
                            >
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50">
                                        <span className="text-sm font-bold text-[#1E3A8A] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-lg">
                                            {history.month}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {idx + 1} / 12
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Win Rate</p>
                                            <p className="text-lg font-bold text-[#1a1a1a]">{history.winRate}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Monthly ROI</p>
                                            <p className="text-lg font-bold text-[#1E3A8A]">{history.monthlyRoi}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Max DD</p>
                                            <p className="text-lg font-bold text-[#1a1a1a]">{history.maxDrawdown}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Trades</p>
                                            <p className="text-lg font-bold text-[#1a1a1a]">{history.totalTrades}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-2 italic">
                        Swipe or use arrows to view past performance data
                    </p>
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

                {/* Return CTA */}
                <div className="flex justify-center mb-12">
                    <Link href="/account-management" className="px-8 py-3.5 bg-[#2546A8] hover:bg-[#1E3A8A] text-white font-semibold rounded-xl text-center transition-all shadow-md transform hover:-translate-y-0.5">
                        Select This Manager & Connect Account
                    </Link>
                </div>

            </div>
        </div>
    );
}
