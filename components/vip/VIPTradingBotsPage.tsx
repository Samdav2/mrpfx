'use client';

import Image from 'next/image';
import { Check, Bot, Zap, Globe, Cpu } from 'lucide-react';
import RobotCard from './RobotCard';
import NewsletterSection from '@/components/shared/NewsletterSection';
import { tradingToolsService } from '@/lib/trading-tools';
import { useDataWithFallback } from '@/lib/hooks/useDataWithFallback';
import { TradingTool } from '@/lib/types';
import { getMediaUrl } from '@/lib/utils';

const FALLBACK_BOTS: any[] = [
    {
        id: 4001,
        title: "MEGATRON X ROBOT",
        price: "199",
        description: "Automated Boom & Crash Trading System",
        features: ["MT5 Compatible", "Fully Automated"],
        image_url: "/assets/vip/robot-combat.png",
        category: "Boom & Crash Bots",
        type: 'bot',
        is_free: false
    },
    {
        id: 4002,
        title: "BOOM CRASH MINER",
        price: "199",
        description: "Boom & Crash Automated Trading Bot",
        features: ["MT5 Compatible", "24/7 Monitoring"],
        image_url: "/assets/vip/robot-sleek.png",
        category: "Boom & Crash Bots",
        type: 'bot',
        is_free: false
    },
    {
        id: 4003,
        title: "VIKING V75 BOT",
        price: "199",
        description: "Automated Volatility 75 Trading Bot",
        features: ["MT5 Compatible", "Fully Automated"],
        image_url: "/assets/vip/robot-astro.png",
        category: "Volatility Bots",
        type: 'bot',
        is_free: false
    },
    {
        id: 4004,
        title: "CRYSTAL BEAST BOT",
        price: "199",
        description: "Automated Volatility 75 Trading Bot",
        features: ["MT5 Compatible", "NASDAQ Included"],
        image_url: "/assets/vip/robot-combat.png",
        category: "Volatility Bots",
        type: 'bot',
        is_free: false
    },
    {
        id: 4005,
        title: "ASTRO X",
        price: "199",
        description: "AI Powered Auto Trading Bot",
        features: ["MT5 Compatible", "Fully Automated", "Mobile & PC"],
        image_url: "/assets/vip/robot-astro.png",
        category: "AI Trading Bots",
        type: 'bot',
        is_free: false
    },
    {
        id: 4006,
        title: "ALISA G ROBOT",
        price: "199",
        description: "AI Forex & Boom / Crash Bot",
        features: ["MT5 Compatible", "Fully Automated", "Gold Trading"],
        image_url: "/assets/vip/robot-sleek.png",
        category: "AI Trading Bots",
        type: 'bot',
        is_free: false
    },
    {
        id: 4007,
        title: "DERIV VISION ATTACKER",
        price: "199",
        description: "All-In-One Synthetic Index Bot",
        features: ["MT5 Compatible", "Volatility Index"],
        image_url: "/assets/vip/robot-combat.png",
        category: "AI Trading Bots",
        type: 'bot',
        is_free: false
    }
];

const VIPTradingBotsPage = () => {
    const { data: bots } = useDataWithFallback(
        tradingToolsService.getTools,
        FALLBACK_BOTS,
        'bot',
        'vip',
        20
    );

    // Group bots by category with safe typing
    const groupedCategories = (bots || []).reduce((acc: any[], bot: any) => {
        const catTitle = bot.category || (bot.title.includes('Boom') ? 'Boom & Crash Bots' : 'General Bots');
        let category = acc.find(c => c.title === catTitle);
        if (!category) {
            category = { title: catTitle, robots: [] };
            acc.push(category);
        }
        category.robots.push({
            id: bot.id,
            name: bot.title,
            price: (bot.price !== undefined && bot.price !== null) ? (typeof bot.price === 'number' ? bot.price.toFixed(2) : bot.price) : "199",
            description: bot.description,
            features: bot.features || bot.description.split('\n').filter((l: string) => l.trim().length > 0).slice(0, 3),
            imageSrc: getMediaUrl(bot.image_url) || "/assets/vip/robot-combat.png",
            productUrl: bot.purchase_url
        });
        return acc;
    }, []);

    const categories = groupedCategories;

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative bg-[#000a1f] pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
                {/* Background Glow effects */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full" />

                <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Hero Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
                                VIP Trading Bots
                            </h1>
                            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent mb-8">
                                Automated Trading Systems<br className="hidden md:block" />
                                <span className="text-white/80 font-medium">for Forex, Indices & Synthetic Markets</span>
                            </h2>

                            <ul className="flex flex-col gap-4 mb-10 items-center lg:items-start">
                                {[
                                    "Works on MT5 (Phone & PC)",
                                    "Supports Gold, NASDAQ & Synthetic Indices",
                                    "Fully Automated Execution"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/90 font-semibold group">
                                        <div className="bg-green-500 rounded-full p-1 shadow-[0_0_15px_rgba(34,197,94,0.4)] group-hover:scale-110 transition-transform">
                                            <Check className="w-4 h-4 text-white stroke-[4]" />
                                        </div>
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Hero Image */}
                        <div className="flex-1 w-full max-w-[650px] relative mt-8 lg:mt-0">
                            <div className="relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <Image
                                    src="/assets/vip/hero-robot.png"
                                    alt="VIP Trading Robot"
                                    width={700}
                                    height={500}
                                    className="w-full h-auto object-contain animate-float"
                                    priority
                                />
                            </div>
                            {/* Decorative element behind robot */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[60px] rounded-full scale-110 -z-0" />
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                        100% { transform: translateY(0px); }
                    }
                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }
                `}</style>
            </section>

            {/* Categories & Robots Section */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="max-w-[1280px] mx-auto px-6">
                    {categories.map((category, catIndex) => (
                        <div key={catIndex} className={catIndex > 0 ? "mt-24" : ""}>
                            {/* Category Header */}
                            <div className="flex items-center gap-4 mb-10">
                                <h2 className="text-2xl md:text-3xl font-black text-[#0f172a] whitespace-nowrap">
                                    {category.title}
                                </h2>
                                <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent" />
                            </div>

                            {/* Robots Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
                                {category.robots.map((robot: any, robIndex: number) => (
                                    <RobotCard
                                        key={robIndex}
                                        {...robot}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-20 bg-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-4">Why Professional Traders Choose Us</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Get access to the same technology used by institutional traders.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Bot, title: "High Win Rate", desc: "Optimized strategies with high precision entries." },
                            { icon: Zap, title: "Lightning Fast", desc: "No delays in execution, catching every opportunity." },
                            { icon: Globe, title: "Global Access", desc: "Works on any broker supporting MetaTrader 5." },
                            { icon: Cpu, title: "Smart Risk", desc: "Built-in drawdown protection and risk management." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-[24px] bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                                <div className="bg-white p-4 rounded-2xl shadow-sm inline-block mb-6 group-hover:scale-110 group-hover:text-blue-600 transition-all">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1e293b] mb-3">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <div className="bg-white pb-20">
                <NewsletterSection />
            </div>
        </div>
    );
};

export default VIPTradingBotsPage;
