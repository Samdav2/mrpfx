'use client';

import Link from 'next/link';
import NewsletterSection from '../shared/NewsletterSection';

const VIPSignalsGroup = () => {
    const youtubeVideos = [
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

    const benefits = [
        'Multiple daily Sniper signals',
        'Personal Mentorship on chart mastery',
        'Access to personal whatsapp contact of Mr P',
        'Live chart analysis sessions with questions and answers',
        'Receive all newly launching free resources first before it drops on the website',
        "Join the team let's invade the market together"
    ];

    return (
        <div className="bg-white text-black">
            {/* Mobile Hero Section */}
            <section className="lg:hidden py-12 px-4" id="start">
                <div className="max-w-lg mx-auto">
                    {/* Hero Image */}
                    <div className="flex justify-center mb-8">
                        <img
                            alt="VIP Signals Group"
                            src="/assets/vip/Group-1000008280.png"
                            width={355}
                            height={370}
                            className="max-w-full h-auto"
                        />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-dm-sans mb-6">VIP Signals Group</h2>
                        <ul className="text-left space-y-3 mb-8 text-gray-700">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-[#5B2EFF] font-bold">{index + 1}.</span>
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/checkout?product=vip-membership"
                            className="inline-flex items-center justify-center mt-4 bg-[#5B2EFF] text-white font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-lg hover:bg-[#4920cc] transition-colors"
                            style={{ backgroundColor: '#5B2EFF', color: 'white' }}
                        >
                            GAIN ACCESS
                        </Link>
                    </div>
                </div>
            </section>

            {/* Desktop Hero Section */}
            <section className="hidden lg:block py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold font-dm-sans mb-8">VIP Signals Group</h2>
                            <ol className="space-y-4 mb-8 text-gray-700 text-lg">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-[#5B2EFF] font-bold">{index + 1}.</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ol>
                            <Link
                                href="/checkout?product=vip-membership"
                                className="inline-flex items-center justify-center mt-4 bg-[#5B2EFF] text-white font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-lg hover:bg-[#4920cc] transition-colors"
                                style={{ backgroundColor: '#5B2EFF', color: 'white' }}
                            >
                                GAIN ACCESS
                            </Link>
                        </div>

                        {/* Right Column - Image */}
                        <div className="flex justify-center">
                            <img
                                alt="VIP Signals Group Preview"
                                src="/assets/vip/Group-237653.png"
                                width={698}
                                height={387}
                                className="max-w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trading Strategy / Videos Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-dm-sans mb-4">
                        Trading <span className="text-[#5B2EFF]">Strategy</span>
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Explore our <span className="text-[#FC1D4D] font-semibold">Youtube Channel</span>
                        <br />
                        Get yourself equipped into the world of Trading
                    </p>

                    {/* YouTube Videos Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {youtubeVideos.map((video) => (
                            <a
                                key={video.id}
                                href={`https://www.youtube.com/watch?v=${video.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block rounded-xl overflow-hidden hover:ring-2 hover:ring-[#5B2EFF] transition-all"
                            >
                                <div className="relative aspect-video">
                                    <img
                                        alt={video.title}
                                        src={video.thumbnail}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                        <svg className="w-16 h-16 text-white/90 group-hover:text-white group-hover:scale-110 transition-all" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    {/* Title Overlay at Bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                        <h3 className="text-white font-medium text-xs text-left line-clamp-2" style={{ color: 'white', fontSize: '12px' }}>
                                            {video.title}
                                        </h3>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* View More Button */}
                    <a
                        href="https://www.youtube.com/@MrPFx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-[#FC1D4D] text-white font-dm-sans font-semibold uppercase text-base px-8 py-4 rounded-lg hover:bg-[#d9163f] transition-all"
                        style={{ backgroundColor: '#FC1D4D', color: 'white' }}
                    >
                        VIEW MORE
                    </a>
                </div>
            </section>

            {/* Spacer */}
            <div className="h-12"></div>

            {/* Newsletter Section */}
            <NewsletterSection />
        </div>
    );
};

export default VIPSignalsGroup;
