'use client';

import { Star, Download, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import BookCard from './BookCard';
import NewsletterSection from '@/components/shared/NewsletterSection';
import { tradingToolsService } from '@/lib/trading-tools';
import { useDataWithFallback } from '@/lib/hooks/useDataWithFallback';
import { TradingTool } from '@/lib/types';
import { getMediaUrl } from '@/lib/utils';

const FALLBACK_PAID_BOOKS: any[] = [
    {
        id: 1001,
        title: "FOREX TRADING",
        description: "Proven Forex strategies & in-depth price actions.",
        price: "$39",
        is_free: false,
        image_url: "/assets/forex-books/book-cover-1.png",
        type: 'book'
    },
    {
        id: 1002,
        title: "TRADING PSYCHOLOGY",
        description: "Master Your mindset for and profitable trading.",
        price: "$39",
        is_free: false,
        image_url: "/assets/forex-books/book-cover-2.png",
        type: 'book'
    },
    {
        id: 1003,
        title: "ADVANCED FOREX",
        description: "Powerful Forex trading strategies for consistent gains.",
        price: "$39",
        is_free: false,
        image_url: "/assets/forex-books/book-cover-3.png",
        type: 'book'
    }
];

const FALLBACK_FREE_BOOKS: any[] = [
    {
        id: 2001,
        title: "TECHNICAL ANALYSIS",
        description: "Master chart patterns, indicators, and price action.",
        is_free: true,
        image_url: "/assets/forex-books/book-cover-4.png",
        type: 'book'
    },
    {
        id: 2002,
        title: "FOREX FUNDAMENTALS",
        description: "Learn how economic news affects Forex markets.",
        is_free: true,
        image_url: "/assets/forex-books/book-cover-5.png",
        type: 'book'
    },
    {
        id: 2003,
        title: "CANDLESTICK PATTERNS",
        description: "Identify and trade candlestick chart patterns with confidence.",
        is_free: true,
        image_url: "/assets/forex-books/book-cover-6.png",
        type: 'book'
    }
];

const ForexBooksPage = () => {
    const { data: paidBooksSource } = useDataWithFallback(
        tradingToolsService.getTools,
        FALLBACK_PAID_BOOKS,
        'book',
        'vip',
        3
    );

    const { data: freeBooksSource } = useDataWithFallback(
        tradingToolsService.getTools,
        FALLBACK_FREE_BOOKS,
        'book',
        'free',
        3
    );

    // Map data to BookCard props with sensible defaults
    const mapToBookProps = (item: any, index: number) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: (item.price !== undefined && item.price !== null) ?
            (typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : `$${item.price.toString().replace('$', '')}`) :
            (item.is_free ? "FREE" : "$39"),
        isFree: item.is_free ?? true,
        imageSrc: getMediaUrl(item.image_url) || item.thumbnail || `/assets/forex-books/book-cover-${(index % 6) + 1}.png`,
        buyUrl: item.purchase_url,
        downloadUrl: item.download_url
    });

    const paidBooks = paidBooksSource.map((book: any, i: number) => mapToBookProps(book, i));
    const freeBooks = freeBooksSource.map((book: any, i: number) => mapToBookProps(book, i + 3));

    return (
        <div className="min-h-screen bg-[#0a0f1e] font-sans text-white overflow-x-hidden selection:bg-blue-500/30">
            {/* High-Fidelity Nebula/Starry Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-[#0f172a] to-[#0a0f1e]" />
                <div
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen"
                />

                {/* Advanced Nebula Glows */}
                <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-blue-600/10 blur-[180px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="relative pt-24 pb-12 md:pt-40 md:pb-24 overflow-hidden border-b border-white/5">
                    {/* Cityscape Background Overlay */}
                    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-transparent to-[#0a0f1e]" />
                        <Image
                            src="/assets/forex-books/hero-bg-city.png"
                            alt="City Background"
                            fill
                            className="object-cover"
                            style={{
                                maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)'
                            }}
                        />
                    </div>

                    <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
                        <h1 className="text-3xl md:text-7xl font-[1000] text-white mb-8 md:mb-12 tracking-tight drop-shadow-2xl uppercase">
                            Forex Trading Books
                        </h1>

                        {/* Improved Responsive Hero Image Area */}
                        <div className="relative w-full max-w-[1000px] mx-auto mb-16 px-0 md:px-0">
                            <div className="relative aspect-[16/12] md:aspect-[16/8] w-full transform hover:scale-[1.01] transition-transform duration-1000">
                                <Image
                                    src="/assets/forex-books/hero-forex-books.png"
                                    alt="Forex Trading Books Hero"
                                    fill
                                    className="object-contain"
                                    style={{
                                        maskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)',
                                        WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)'
                                    }}
                                    priority
                                />

                                {/* Deep Blending Overlays */}
                                <div className="absolute inset-x-0 bottom-[-10%] h-1/2 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent z-10 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* PAID Section */}
                <section className="py-12 md:py-16 relative">
                    <div className="max-w-[1280px] mx-auto px-6">
                        <div className="mb-8 md:mb-12">
                            <div className="inline-block bg-[#8b6d31] text-white px-8 md:px-10 py-1.5 md:py-2 rounded-full font-[1000] uppercase tracking-widest text-base md:text-lg shadow-[0_10px_30px_rgba(139,109,49,0.3)]">
                                PAID
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {paidBooks.map((book, i) => (
                                <BookCard key={i} {...book} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* FREE Section (Matching mockup text divider) */}
                <section className="py-16 md:py-32 relative">
                    <div className="max-w-[1280px] mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12 md:mb-20">
                            <h2 className="text-2xl md:text-5xl font-[1000] uppercase tracking-tighter drop-shadow-lg text-center md:text-left">
                                <span className="text-emerald-400 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">FREE</span> FOREX TRADING BOOKS
                            </h2>
                            <div className="h-[2px] md:h-[3px] w-full bg-gradient-to-r from-emerald-500/60 via-emerald-500/10 to-transparent hidden md:block" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                            {freeBooks.map((book, i) => (
                                <BookCard key={i} {...book} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter Wrapper (Clean end section) */}
                <div className="pb-40 pt-20 bg-gradient-to-t from-black to-transparent border-t border-white/5">
                    <NewsletterSection />
                </div>
            </div>

        </div>
    );
};

export default ForexBooksPage;
