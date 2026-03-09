'use client';

import Image from 'next/image';
import { Check, ShieldCheck, TrendingUp, BarChart3, Target } from 'lucide-react';
import IndicatorCard from './IndicatorCard';
import NewsletterSection from '@/components/shared/NewsletterSection';

import { useState, useEffect } from 'react';
import { tradingToolsService } from '@/lib/trading-tools';
import { TradingTool } from '@/lib/types';
import { getMediaUrl } from '@/lib/utils';

const VIPTradingIndicatorsPage = () => {
    const [indicators, setIndicators] = useState<TradingTool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIndicators = async () => {
            try {
                const data = await tradingToolsService.getTools('indicator', 'vip');
                setIndicators(data);
            } catch (error) {
                console.error("Failed to fetch VIP indicators:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchIndicators();
    }, []);

    // Helper to get image based on title
    const getIndicatorImage = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes('crystal') || t.includes('ball')) return "/assets/indicators/crystal-ball.png";
        if (t.includes('scalp')) return "/assets/indicators/scalper-robot.png";
        return "/assets/indicators/chart-tablet.png";
    };

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative bg-[#0b1739] pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden shadow-2xl">
                {/* Background Pattern/Glow */}
                <div className="absolute inset-0 bg-[url('/assets/grid-light.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/30 blur-[150px] rounded-full" />
                <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#5b2eff]/20 blur-[130px] rounded-full" />

                <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                        {/* Hero Content */}
                        <div className="flex-[1.2] text-center lg:text-left">
                            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none">
                                VIP Trading Indicators
                            </h1>
                            <h2 className="text-xl md:text-3xl font-bold text-blue-400 mb-8 max-w-2xl">
                                Premium Indicator Tools<br className="hidden md:block" />
                                <span className="text-white/70 font-medium">for Forex, Gold & Indices</span>
                            </h2>

                            <ul className="flex flex-col gap-5 mb-12 items-center lg:items-start">
                                {[
                                    "Works on MT4 / MT5",
                                    "Analyze Forex, Gold & Indices",
                                    "Simple Buy/Sell Signals"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-white/90 font-bold group">
                                        <div className="bg-green-500 rounded-full p-1 shadow-[0_0_20px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform duration-300">
                                            <Check className="w-4 h-4 text-white stroke-[4]" />
                                        </div>
                                        <span className="text-lg md:text-xl tracking-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Hero Image */}
                        <div className="flex-[0.8] w-full max-w-[550px] relative">
                            <div className="relative z-10 drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                                <Image
                                    src="/assets/indicators/hero-indicator.png"
                                    alt="VIP Trading Indicators"
                                    width={600}
                                    height={500}
                                    className="w-full h-auto object-contain rounded-2xl border border-white/10"
                                    priority
                                />
                            </div>
                            {/* Decorative glow */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-2xl rounded-3xl -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="py-24 bg-slate-50 relative min-h-[400px]">
                <div className="max-w-[1280px] mx-auto px-6">
                    {/* Category Header */}
                    <div className="flex items-center gap-6 mb-12">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 whitespace-nowrap tracking-tight uppercase">
                            VIP Indicator Collection
                        </h2>
                        <div className="h-px w-full bg-slate-200 shadow-sm" />
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-white rounded-[20px] h-[300px] animate-pulse" />
                            ))}
                        </div>
                    ) : indicators.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500">New VIP indicators coming soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                            {indicators.map((indicator) => (
                                <IndicatorCard
                                    key={indicator.id}
                                    id={indicator.id}
                                    name={indicator.title}
                                    // `price` is stored as a string from API; just use it or fallback
                                    price={indicator.price ?? "199"}
                                    description={indicator.description}
                                    features={indicator.description.split('\n').filter(l => l.trim().length > 0).slice(0, 3)}
                                    imageSrc={getMediaUrl(indicator.image_url) || getIndicatorImage(indicator.title)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Performance Stats / Benefits Section */}
            <section className="py-24 bg-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Target, title: "Precision Entries", desc: "Identify exact reversal and breakout points." },
                            { icon: TrendingUp, title: "Trend Strength", desc: "Know exactly when a trend is strong or fading." },
                            { icon: ShieldCheck, title: "Reliability", desc: "Backtested algorithms for consistent results." },
                            { icon: BarChart3, title: "Multi-Asset", desc: "Optimized for Gold, US30, and major pairs." }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 mb-3">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[200px]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <div className="bg-white pb-32">
                <NewsletterSection />
            </div>
        </div>
    );
};

export default VIPTradingIndicatorsPage;
