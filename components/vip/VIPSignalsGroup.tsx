'use client';

import Link from 'next/link';

import Image from 'next/image';
import NewsletterSection from '../shared/NewsletterSection';
import { Check, X } from 'lucide-react';
import { signalsService } from '@/lib/signals';
import { useDataWithFallback } from '@/lib/hooks/useDataWithFallback';
import { Signal, TradingVideo, WCProductRead } from '@/lib/types';
import { productsService } from '@/lib/products';
import { useState, useEffect } from 'react';
import { getMediaUrl } from '@/lib/utils';

const FALLBACK_VIDEOS: TradingVideo[] = [
    {
        id: 'ZhgT9W0g3K0',
        title: 'LIVE TRADING GOLD, NASDAQ, US30, EURUSD, GBPUSD, BTCUSD',
        thumbnail: 'https://i.ytimg.com/vi/ZhgT9W0g3K0/sddefault.jpg'
    },
    {
        id: 'yPJSje5NzYg',
        title: 'My Trading Focus Moving Forward (2026)',
        thumbnail: 'https://i.ytimg.com/vi/yPJSje5NzYg/sddefault.jpg'
    },
    {
        id: 'jpVgMjM0hWE',
        title: 'A Real Day in the Life of a 28-Year-Old Day Trader in Cape Town, South Africa',
        thumbnail: 'https://i.ytimg.com/vi/jpVgMjM0hWE/sddefault.jpg'
    }
];

const FALLBACK_SIGNALS: Signal[] = [
    {
        id: 1,
        title: 'Gold Signal',
        status: 'publish',
        instrument: 'GOLD (XAUUSD)',
        type: 'buy',
        entry: '2335',
        sl: '2331',
        tp1: '2355',
        tp2: '2375',
        date: new Date().toISOString(),
        signal_type: 'vip'
    },
    {
        id: 2,
        title: 'Euro Signal',
        status: 'publish',
        instrument: 'EUR/USD',
        type: 'buy',
        entry: '1.07800',
        sl: '1.07300',
        tp1: '1.08110',
        date: new Date().toISOString(),
        signal_type: 'vip'
    },
    {
        id: 3,
        title: 'Nasdaq Signal',
        status: 'publish',
        instrument: 'US100 (NASDAQ)',
        type: 'buy',
        entry: '24874.71',
        sl: '',
        tp1: '25313.46',
        date: new Date().toISOString(),
        signal_type: 'vip'
    }
];

const VIPSignalsGroup = () => {
    const { data: youtubeVideos } = useDataWithFallback(
        signalsService.getVideos,
        FALLBACK_VIDEOS,
        3
    );

    const { data: signals } = useDataWithFallback(
        signalsService.getSignals,
        FALLBACK_SIGNALS,
        'vip',
        3
    );

    const [vipProduct, setVipProduct] = useState<WCProductRead | null>(null);

    useEffect(() => {
        const fetchVipProduct = async () => {
            try {
                const product = await productsService.getProductBySlug('vip-membership');
                setVipProduct(product);
            } catch (error) {
                console.error('Failed to fetch VIP product:', error);
            }
        };
        fetchVipProduct();
    }, []);

    const vipPrice = vipProduct?.price ? `$${vipProduct.price}` : '$39';

    const CheckIcon = () => (
        <svg className="w-4 h-4 text-[#eab308] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );

    const CrossIcon = () => (
        <X className="w-5 h-5 text-[#ef4444] mr-2 mt-0.5 flex-shrink-0" strokeWidth={3} />
    );

    const getSignalIcon = (instrument: string) => {
        if (instrument.includes('GOLD')) return '🪙';
        if (instrument.includes('EUR') || instrument.includes('GBP')) return '📈';
        if (instrument.includes('US100') || instrument.includes('NASDAQ')) return '🎫';
        return '📊';
    };

    return (
        <div className="bg-[#e6e9f5] text-black font-dm-sans overflow-hidden">
            {/* Top Background Wrapper for Hero & Benefits */}
            <div className="relative">
                {/* Background Details */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/vip-bg-city.jpg"
                            alt="City Background"
                            fill
                            priority
                            quality={60}
                            className="object-cover object-center opacity-40 mix-blend-luminosity"
                        />
                    </div>
                    {/* Gradients for blending */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-[#e6e9f5]/50 to-[#e6e9f5]/80 z-0" />
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#e6e9f5] to-transparent z-0" />

                    <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-blue-300/30 blur-[100px] mix-blend-multiply rounded-full z-0" />
                    <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[300px] bg-indigo-200/40 blur-[120px] mix-blend-multiply rounded-full z-0" />
                </div>

                {/* Header / Hero Section */}
                <div className="relative pt-[120px] pb-16 lg:pb-24 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                            {/* Left Column Text */}
                            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 pt-4 lg:pt-12">
                                <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[#2A2A72] mb-2 font-palanquin-dark tracking-tight leading-tight">
                                    VIP Trading Signals
                                </h1>
                                <div className="text-2xl md:text-3xl text-[#5c6bc0] font-light mb-1">
                                    Private Signals Channel
                                </div>
                                <div className="text-xl md:text-2xl text-[#2A2A72] font-semibold mb-6">
                                    Only {vipPrice} / Month
                                </div>

                                <p className="text-[16px] md:text-[18px] text-[#4b5563] leading-relaxed mb-8">
                                    Receive <span className="font-bold text-[#1e293b]">high-probability</span> Forex & Index trade signals <span className="font-bold text-[#1e293b]">weekly</span>, with clear entry, stop loss, and <span className="font-bold text-[#1e293b]">take profit levels</span>—designed for traders who want precision, discipline, and consistent market opportunities.
                                </p>

                                <div className="flex flex-col items-center lg:items-start">
                                    <Link
                                        href="/checkout?product=vip-membership"
                                        className="relative group inline-flex items-center justify-center bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#1e293b] font-bold text-lg md:text-xl uppercase tracking-widest px-8 md:px-12 py-4 md:py-5 rounded shadow-lg hover:shadow-xl transition-all duration-300 border border-[#b8860b]"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            JOIN VIP SIGNALS NOW <span className="text-2xl leading-none">&raquo;</span>
                                        </span>
                                    </Link>
                                    <p className="text-sm text-[#64748b] mt-4 font-medium">Instant access after payment.</p>
                                </div>
                            </div>

                            {/* Right Column Phone Mockup */}
                            <div className="flex-1 flex justify-center lg:justify-end w-full max-w-[340px] lg:max-w-[400px] mx-auto preserve-3d perspective-1000">
                                {/* CSS Phone Frame */}
                                <div className="relative w-full aspect-[1/2.1] bg-[#1a1a1a] rounded-[2.5rem] p-3 shadow-2xl border-4 border-gray-800 rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 shadow-[20px_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500">
                                    {/* Notch */}
                                    <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                                        <div className="w-1/3 h-[18px] bg-[#1a1a1a] rounded-b-xl border-x-[1px] border-b-[1px] border-gray-700"></div>
                                    </div>

                                    {/* Screen content */}
                                    <div className="relative w-full h-full bg-[#e8eaf6] rounded-[2rem] overflow-hidden flex flex-col font-sans">
                                        {/* App Header */}
                                        <div className="bg-[#1e293b] px-3 pt-9 pb-2 flex items-center justify-between text-white shadow-md relative z-10">
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-400 font-bold text-base">&lt; <span className="text-xs">...</span></span>
                                            </div>
                                            <div className="font-semibold text-[11px] tracking-widest uppercase truncate ml-1">VIP SIGNAL UPDATE</div>
                                            <div className="w-4"></div> {/* Spacer for balance */}
                                        </div>

                                        {/* App Content */}
                                        <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-gradient-to-b from-[#334155]/10 to-[#1e293b]/20 hide-scrollbar pb-4">
                                            {signals.map((signal, index) => (
                                                <div key={signal.id} className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-sm border border-gray-200">
                                                    <div className="flex items-center gap-1.5 font-bold text-[#1e293b] text-sm mb-3 truncate">
                                                        <span>{getSignalIcon(signal.instrument)}</span> {signal.instrument} - <span className={signal.type === 'buy' ? 'text-green-600' : 'text-red-600'}>{(signal.type || 'buy').toUpperCase()}</span>
                                                    </div>
                                                    <ul className="space-y-1.5 text-xs text-gray-800 font-medium">
                                                        <li className="flex items-center"><CheckIcon /> Entry: {signal.entry}</li>
                                                        {signal.sl && <li className="flex items-center"><CheckIcon /> Stop Loss: {signal.sl}</li>}
                                                        <li className="flex items-center"><CheckIcon /> Take Profit 1: {signal.tp1}</li>
                                                        {signal.tp2 && <li className="flex items-center"><CheckIcon /> Take Profit 2: {signal.tp2}</li>}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WHAT YOU RECEIVE SECTION */}
                <div className="relative z-10 py-16 bg-white/20 border-y border-white/40 backdrop-blur-[2px]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A72] uppercase tracking-wide mb-12 relative inline-block">
                            WHAT YOU RECEIVE
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#d4af37]"></div>
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Benefits List */}
                            <div className="space-y-8">
                                {[
                                    { title: "Multiple Premium Signals Weekly", desc: "Forex, Gold, NASDAQ and major markets." },
                                    { title: "Precise Entry Levels", desc: "Clear Buy/Sell zones with structured execution." },
                                    { title: "Stop Loss & Take Profit Levels", desc: "Risk-controlled setups with multiple targets." },
                                    { title: "Professional Market Analysis", desc: "Understand the reasoning behind each trade." },
                                    { title: "Private VIP Telegram Channel", desc: "Signals delivered instantly in real time." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <Check className="w-6 h-6 text-[#d4af37] mt-1 flex-shrink-0" strokeWidth={3} />
                                        <div>
                                            <h3 className="text-lg font-bold text-[#1e293b] mb-1">{item.title}</h3>
                                            <p className="text-[#64748b]">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Dialogue Block */}
                            <div className="flex flex-col justify-center items-center lg:items-end w-full">
                                <div className="w-full max-w-md bg-[#f8fafc] rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative">
                                    {/* Header */}
                                    <div className="bg-[#f1f5f9] px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                                        <span className="text-2xl">🔔</span>
                                        <span className="font-bold text-[#334155] tracking-wide text-lg">VIP SIGNAL UPDATE</span>
                                    </div>
                                    {/* Dialogue Block Content */}
                                    {signals.slice(0, 2).map((signal, index) => (
                                        <div key={signal.id} className={`p-6 bg-white ${index === 0 ? 'border-b border-gray-200' : 'relative'}`}>
                                            <div className="flex items-center gap-2 font-bold text-[#1e293b] text-lg mb-4">
                                                <span>{getSignalIcon(signal.instrument)}</span> {signal.instrument} - <span className={signal.type === 'buy' ? 'text-green-600' : 'text-red-600'}>{(signal.type || 'buy').toUpperCase()}</span>
                                            </div>
                                            <ul className="space-y-2.5 text-[#4b5563] font-medium text-[15px]">
                                                <li className="flex items-center"><CheckIcon /> Entry: {signal.entry}</li>
                                                {signal.sl && <li className="flex items-center"><CheckIcon /> Stop Loss: {signal.sl}</li>}
                                                <li className="flex items-center"><CheckIcon /> Take Profit 1: {signal.tp1}</li>
                                                {signal.tp2 && <li className="flex items-center"><CheckIcon /> Take Profit 2: {signal.tp2}</li>}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* End of top background wrapper */}
            </div>

            {/* HOW IT WORKS & WHY JOIN SECTION */}
            <div className="py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                        {/* How Signals Work */}
                        <div className="bg-white/60 p-8 rounded-2xl shadow-sm border border-white">
                            <h2 className="text-xl md:text-2xl font-bold text-[#2A2A72] uppercase tracking-wide mb-6">
                                HOW THE SIGNALS WORK
                            </h2>
                            <p className="text-[#64748b] mb-6 font-medium">Each signal includes:</p>
                            <ul className="space-y-4">
                                <li className="flex items-center text-[#1e293b] font-medium text-[16px]">
                                    <CheckIcon /> <strong className="mr-2">Instrument:</strong> Gold / EURUSD / NASDAQ
                                </li>
                                <li className="flex items-center text-[#1e293b] font-medium text-[16px]">
                                    <CheckIcon /> Entry Price
                                </li>
                                <li className="flex items-center text-[#1e293b] font-medium text-[16px]">
                                    <CheckIcon /> Stop Loss
                                </li>
                                <li className="flex items-center text-[#1e293b] font-medium text-[16px]">
                                    <CheckIcon /> Take Profit Targets
                                </li>
                            </ul>
                        </div>

                        {/* Why Traders Join */}
                        <div className="bg-white/60 p-8 rounded-2xl shadow-sm border border-white md:border-l md:border-l-gray-300 md:rounded-none md:bg-transparent md:shadow-none">
                            <h2 className="text-xl md:text-2xl font-bold text-[#2A2A72] uppercase tracking-wide mb-6">
                                WHY TRADERS JOIN
                            </h2>
                            <ul className="space-y-5 pt-2">
                                <li className="flex items-center text-[#4b5563] font-medium text-[16px]">
                                    <CrossIcon /> Enter trades randomly
                                </li>
                                <li className="flex items-center text-[#4b5563] font-medium text-[16px]">
                                    <CrossIcon /> Don't understand risk management
                                </li>
                                <li className="flex items-center text-[#4b5563] font-medium text-[16px]">
                                    <CrossIcon /> Enter too early or too late
                                </li>
                                <li className="flex items-center text-[#4b5563] font-medium text-[16px]">
                                    <CrossIcon /> Lack a clear trading structure
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 flex flex-col items-center text-center">
                        <Link
                            href="/checkout?product=vip-membership"
                            className="relative group inline-flex items-center justify-center bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#1e293b] font-bold text-lg md:text-xl uppercase tracking-widest px-10 py-5 rounded shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#b8860b] mb-8"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                JOIN VIP SIGNALS NOW <span className="text-2xl leading-none">&raquo;</span>
                            </span>
                        </Link>

                        <p className="max-w-3xl text-[#64748b] text-sm md:text-base font-medium leading-relaxed">
                            To maintain signal quality and proper trade management, VIP access is limited. <br className="hidden md:block" />
                            Once the VIP capacity is reached, new registrations will close.
                        </p>
                    </div>
                </div>
            </div >

            {/* Trading Strategy / Videos Section */}
            {/* Newsletter Section */}
            {/* <NewsletterSection /> */}
        </div>
    );
};

export default VIPSignalsGroup;
