'use client';

import Image from 'next/image';
import Link from 'next/link';

const VideosPage = () => {
    const videos = [
        {
            id: "yPJSje5NzYg",
            title: "My Trading Focus Moving Forward (2026)",
            thumbnail: "https://i.ytimg.com/vi/yPJSje5NzYg/sddefault.jpg",
            isLive: false,
            isAi: false
        },
        {
            id: "jpVgMjM0hWE",
            title: "A Real Day in the Life of a 28-Year-Old Day Trader in Cape Town, South Africa",
            thumbnail: "https://i.ytimg.com/vi/jpVgMjM0hWE/sddefault.jpg",
            isLive: false,
            isAi: false
        },
        {
            id: "4XdpTQdOl0c",
            title: "The Crazy 5 Minutes Strategy That Made Me Over $10K DAY TRADING",
            thumbnail: "https://i.ytimg.com/vi/4XdpTQdOl0c/sddefault.jpg",
            isLive: true, // Mocking these badges based on screenshot
            isAi: false
        },
        {
            id: "mock1",
            title: "AI TRADED FOR ME $9558",
            thumbnail: "https://i.ytimg.com/vi/yPJSje5NzYg/sddefault.jpg", // Reusing for now
            isLive: false,
            isAi: true
        },
        {
            id: "mock2",
            title: "Gold Market Outlook For The Week #forex #forextrading",
            thumbnail: "https://i.ytimg.com/vi/jpVgMjM0hWE/sddefault.jpg", // Reusing
            isLive: false,
            isAi: false
        },
        {
            id: "mock3",
            title: "How I Passed 10 Prop Firm Challenges in 5 Weeks",
            thumbnail: "https://i.ytimg.com/vi/4XdpTQdOl0c/sddefault.jpg", // Reusing
            isLive: false,
            isAi: false
        },
        {
            id: "mock4",
            title: "Gold doing it's thing again as usual #trading #forex",
            thumbnail: "https://i.ytimg.com/vi/yPJSje5NzYg/sddefault.jpg", // Reusing
            isLive: false,
            isAi: false
        },
        {
            id: "mock5",
            title: "Don't Blink... GOLD Trade Full Entry To Exit",
            thumbnail: "https://i.ytimg.com/vi/jpVgMjM0hWE/sddefault.jpg", // Reusing
            isLive: false,
            isAi: false
        },
        {
            id: "mock6",
            title: "Trading GOLD, NASDAQ, US30 all at the same time",
            thumbnail: "https://i.ytimg.com/vi/4XdpTQdOl0c/sddefault.jpg", // Reusing
            isLive: false,
            isAi: false
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="bg-[#1d4ed8] relative overflow-hidden pb-20 pt-20 md:pt-32">
                <div className="max-w-[1140px] mx-auto px-5 text-center relative z-10">
                    <h1 className="text-white font-bold text-4xl md:text-5xl mb-4 font-['DM_Sans'] tracking-wide">
                        VIDEOS
                    </h1>
                    <div className="w-16 h-1 bg-[#22c55e] mx-auto mb-6"></div>
                    <p className="text-white/90 text-lg font-['DM_Sans']">
                        Watch the latest videos from Mr P.
                    </p>
                </div>

                {/* Wave Decoration at bottom */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white opacity-10"></path>
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white opacity-25"></path>
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white opacity-10"></path>
                    </svg>
                </div>
            </div>

            {/* Video Grid Section */}
            <div className="max-w-[1140px] mx-auto px-5 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <a
                            key={index}
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <div className="relative aspect-video bg-gray-100 mb-4 overflow-hidden rounded-lg">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Live Badge */}
                                {video.isLive && (
                                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded text-xs font-bold text-red-600">
                                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                                        LIVE TRADING
                                    </div>
                                )}

                                {/* AI Badge (Mock) */}
                                {video.isAi && (
                                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-white border border-green-500">
                                        DR. TRADE
                                    </div>
                                )}

                                {/* Play Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-black font-bold text-sm md:text-base font-['DM_Sans'] line-clamp-2 group-hover:text-[#2563eb] transition-colors">
                                {video.title}
                            </h3>
                        </a>
                    ))}
                </div>
            </div>

            {/* Resources Banner */}
            <div className="bg-[#22c55e] py-20 px-5 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-white font-bold text-3xl md:text-4xl mb-6 font-['DM_Sans']">
                        FREE ROBOTS / INDICATORS / SEMINARS
                    </h2>
                    <div className="w-16 h-1 bg-white mx-auto mb-8"></div>
                    <p className="text-white text-lg mb-10 max-w-3xl mx-auto leading-relaxed font-['DM_Sans']">
                        Gain access to COMPLETELY FREE trading materials/resources with no hidden charges. These trading resources are a way of boosting the financial capacity of anyone and everyone that comes in contact with the Mr P Fx community.
                    </p>
                    <Link
                        href="/free-signals-group"
                        className="inline-block bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-4 px-10 rounded-full text-sm tracking-wider transition-colors font-['DM_Sans']"
                    >
                        READ MORE &gt;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VideosPage;
