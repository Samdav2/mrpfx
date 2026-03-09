'use client';

import Image from 'next/image';
import Link from 'next/link';
import NewsletterSection from '@/components/shared/NewsletterSection';
import RobotCard from '../vip/RobotCard';
import FreeIndicatorCard from '../vip/FreeIndicatorCard';
import { tradingToolsService } from '@/lib/trading-tools';
import { useDataWithFallback } from '@/lib/hooks/useDataWithFallback';
import { TradingTool } from '@/lib/types';

const FALLBACK_FREE_RESOURCES: TradingTool[] = [
    {
        id: 1,
        title: "MEGATRON X LITE",
        status: 'active',
        tool_type: 'bot',
        category: 'free',
        price: "0",
        description: "Trial version of our premium Boom & Crash bot.",
        image_url: "/assets/vip/robot-combat.png",
    },
    {
        id: 2,
        title: "Support & Resistance",
        status: 'active',
        tool_type: 'indicator',
        category: 'free',
        description: "Basic Support & Resistance indicator for beginners.",
        image_url: "/assets/free-indicators/support-resistance.png",
    }
];

const FreeRobotsPage = () => {
    const { data: bots } = useDataWithFallback(
        tradingToolsService.getTools,
        FALLBACK_FREE_RESOURCES.filter(r => r.tool_type === 'bot'),
        'bot',
        'free',
        6
    );

    const { data: indicators } = useDataWithFallback(
        tradingToolsService.getTools,
        FALLBACK_FREE_RESOURCES.filter(r => r.tool_type === 'indicator'),
        'indicator',
        'free',
        6
    );
    return (
        <div className="font-[family-name:var(--font-dm-sans)] bg-white">
            {/* Hero Section - White Background */}
            <section className="bg-white py-16 md:py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Left Content */}
                        <div className="w-full md:w-1/2 space-y-5">
                            {/* "Free" Badge - Nova Flat font, green styling */}
                            <div
                                className="inline-block rounded-[10px] px-[18px] py-[12px]"
                                style={{ backgroundColor: 'rgba(0, 185, 49, 0.27)' }}
                            >
                                <span
                                    className="font-[family-name:var(--font-nova-flat)] font-semibold leading-[1.1em]"
                                    style={{ color: '#007920', fontSize: '32px' }}
                                >
                                    Free
                                </span>
                            </div>

                            {/* Title - DM Sans, font-weight 900 */}
                            <h1
                                className="font-[family-name:var(--font-dm-sans)] leading-[1.1em] text-black"
                                style={{ fontSize: '51px', fontWeight: 900, letterSpacing: '0px' }}
                            >
                                Robots, Indicators<br />& Seminars
                            </h1>

                            {/* Description - DM Sans, regular weight */}
                            <p
                                className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-black"
                                style={{ fontSize: '17px', maxWidth: '65%' }}
                            >
                                Enhance your trading experience with our suite of free resources: automated trading robots to simplify and optimize your strategies, advanced indicators to give you deeper market insights, and expert-led seminars to boost your skills and knowledge.
                            </p>

                            {/* GAIN ACCESS Button - Inter font, #3442D9 background */}
                            <div className="pt-2">
                                <Link
                                    href="/sign-up"
                                    className="inline-block font-[family-name:var(--font-inter)] font-bold transition-colors text-white"
                                    style={{
                                        backgroundColor: '#3442D9',
                                        color: '#FFFFFF',
                                        padding: '15px 30px',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    Gain Access
                                </Link>
                            </div>
                        </div>

                        {/* Right Content - Trading Charts Image */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            <div className="relative w-full max-w-xl">
                                <Image
                                    src="/assets/free_robots/image-11.png"
                                    alt="Trading Platform Interface"
                                    width={666}
                                    height={528}
                                    className="w-full h-auto object-contain"
                                    style={{ height: '500px', objectFit: 'contain' }}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Middle Section - White Background with Text */}
            <section className="bg-white pt-16 md:pt-20 pb-8">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center space-y-6">
                    <p className="text-gray-700 text-sm md:text-base leading-[1.5em] font-[family-name:var(--font-dm-sans)] font-medium">
                        Trading robots are a great way to automate your trading experience and increase your overall profit potential. Trading Indicators show you the exact positions of a market with high profit potentials. Seminar videos teaches new and updated trading strategies to always gain ground in the market.
                    </p>
                    <p className="text-gray-700 text-sm md:text-base leading-[1.5em] font-[family-name:var(--font-dm-sans)] font-medium">
                        All Mr P Fx free trading materials/resources are COMPLETELY FREE WITH NO HIDDEN CHARGES ATTACHED. These trading resources are a way of boosting the financial capacity of anyone and everyone that comes in contact with the Mr P Fx community.
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm leading-[1.5em] font-[family-name:var(--font-dm-sans)]">
                        (DISCLAIMER: NO TRADING STRATEGY CAN EVER BE 100% ACCURATE, TRADING REMAINS A RISK. MR P FX WOULD NOT BE HELD RESPONSIBLE FOR ANY MARKET DAMAGES).
                    </p>
                </div>
            </section>

            {/* Dynamic Resources Section */}
            {(bots.length > 0 || indicators.length > 0) && (
                <section className="bg-slate-50 py-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Explore Free Resources</h2>
                            <div className="w-20 h-1.5 bg-[#3442D9] mx-auto rounded-full" />
                        </div>

                        {/* Free Bots */}
                        {bots.length > 0 && (
                            <div className="mb-20">
                                <div className="flex items-center gap-4 mb-10">
                                    <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest">Free Trading Bots</h3>
                                    <div className="h-px flex-grow bg-slate-200" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {bots.map((bot: any, i: number) => (
                                        <RobotCard
                                            key={bot.id || i}
                                            id={bot.id || i}
                                            name={bot.title}
                                            price={bot.price || "0"}
                                            description={bot.description}
                                            features={bot.features || []}
                                            imageSrc={bot.image_url || "/assets/vip/robot-combat.png"}
                                            productUrl={bot.purchase_url}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Free Indicators */}
                        {indicators.length > 0 && (
                            <div>
                                <div className="flex items-center gap-4 mb-10">
                                    <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest">Free Indicators</h3>
                                    <div className="h-px flex-grow bg-slate-200" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {indicators.map((indicator: any, i: number) => (
                                        <FreeIndicatorCard
                                            key={indicator.id || i}
                                            id={indicator.id || i}
                                            name={indicator.title}
                                            description={indicator.description}
                                            features={indicator.features || []}
                                            imageSrc={indicator.image_url || "/assets/free-indicators/support-resistance.png"}
                                            downloadUrl={indicator.download_url}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Newsletter Section - Using shared component */}
            <section className="bg-white py-8 md:py-12">
                <NewsletterSection />
            </section>
        </div>
    );
};

export default FreeRobotsPage;
