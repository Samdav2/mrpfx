'use client';

import React, { useRef, use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    ArrowLeft, Award, TrendingUp, AlertTriangle, Briefcase,
    DollarSign, Activity, CheckCircle2, Shield, Calendar,
    BarChart3, Target, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { tradersService } from '@/lib/traders';
import { TraderPerformanceResponse, TraderPerformanceRecord } from '@/lib/types';

// managerProfiles removed as we use tradersService

export default function TraderProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id: managerId } = use(params);
    const [profile, setProfile] = useState<TraderPerformanceResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            const data = await tradersService.getTraderPerformance(managerId);
            if (data) {
                setProfile(data);
            } else {
                setError(true);
            }
            setLoading(false);
        };
        fetchProfile();
    }, [managerId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <Loader2 className="w-12 h-12 animate-spin text-[#1E3A8A]" />
            </div>
        );
    }

    if (error || !profile) {
        notFound();
    }

    // Latest performance stats for the grid
    const latestStats = profile.performance[0] || {
        winRate: '0%',
        monthlyRoi: '0%',
        maxDrawdown: '0%',
        totalTrades: '0'
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
                            <p className="text-3xl font-bold text-[#1E3A8A]">{latestStats.monthlyRoi}</p>
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
                        <p className="text-2xl font-bold text-[#1a1a1a]">{latestStats.winRate}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-orange-600">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Max Drawdown</p>
                        <p className="text-2xl font-bold text-[#1a1a1a]">{latestStats.maxDrawdown}</p>
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
                        <p className="text-2xl font-bold text-[#1a1a1a]">{latestStats.totalTrades}</p>
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

                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-[#0A1128] font-palanquin-dark flex items-center">
                            <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                            12-Month Performance History
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {profile.performance.map((history: TraderPerformanceRecord, idx: number) => (
                            <div
                                key={idx}
                                className="w-full"
                            >
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50">
                                        <span className="text-sm font-bold text-[#1E3A8A] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-lg">
                                            {history.month}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {idx + 1} / {profile.performance.length}
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

                    <p className="text-center text-xs text-gray-400 mt-8 italic">
                        Detailed monthly breakdown provided for transparency and performance verification.
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
