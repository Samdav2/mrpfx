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
        imageSrc: (item.image_url?.startsWith('/assets/') ? item.image_url : getMediaUrl(item.image_url)) || item.thumbnail || `/assets/forex-books/book-cover-${(index % 6) + 1}.png`,
        buyUrl: item.purchase_url,
        downloadUrl: item.download_url
    });

    const paidBooks = paidBooksSource.map((book: any, i: number) => mapToBookProps(book, i));
    const freeBooks = freeBooksSource.map((book: any, i: number) => mapToBookProps(book, i + 3));

    return (
        <div className="min-h-screen bg-[#070b14] font-sans text-white overflow-x-hidden selection:bg-blue-500/30">
            {/* Global Vibrant Trading Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <Image
                    src="/assets/forex-books/hero-bg-trading.png"
                    alt="Trading Background"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070b14]/50 to-[#070b14]" />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="relative pt-24 md:pt-32 pb-8">
                    <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-[1000] text-white tracking-tight drop-shadow-2xl mb-8">
                            Forex Trading Books
                        </h1>

                        <div className="w-full max-w-[900px] mx-auto relative z-10">
                            <img
                                src="/assets/forex-books/hero-forex-books-transparent.png"
                                alt="Forex Trading Books Hero"
                                className="w-full h-auto object-contain transform hover:scale-[1.02] transition-transform duration-700 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            />
                        </div>
                    </div>
                </section>

                {/* PAID Section */}
                <section className="py-12 md:py-16 relative">
                    <div className="max-w-[1280px] mx-auto px-6">
                        <div className="flex items-center gap-4 mb-8 md:mb-12">
                            <div className="inline-block bg-gradient-to-r from-[#8b6d31] to-[#b39556] text-white px-8 md:px-10 py-1.5 md:py-2 rounded-full font-[1000] uppercase tracking-widest text-base md:text-lg shadow-[0_10px_30px_rgba(139,109,49,0.3)]">
                                PAID
                            </div>
                            <div className="h-[2px] w-full bg-gradient-to-r from-white/30 to-transparent" />
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
