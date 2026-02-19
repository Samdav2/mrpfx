'use client';

import Image from 'next/image';
import NewsletterSection from '@/components/shared/NewsletterSection';

const FreeSignalsGroupPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="max-w-[1140px] mx-auto px-5 pt-20 pb-10 md:pt-32 md:pb-20">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">

                    {/* Left Column: Text Content */}
                    <div className="flex-1 flex flex-col items-start text-left">

                        {/* Free Badge */}
                        <div className="bg-[#bbf7d0] text-[#15803d] px-6 py-2 rounded-lg font-bold text-xl mb-6 font-['DM_Sans']">
                            Free
                        </div>

                        {/* Heading */}
                        <h1 className="text-black font-bold text-5xl md:text-6xl mb-6 font-['DM_Sans'] leading-tight">
                            Signals Group
                        </h1>

                        {/* Description */}
                        <p className="text-gray-500 text-lg mb-8 max-w-lg font-['DM_Sans'] leading-relaxed">
                            Mr P FX Group proudly offers traders an exclusive opportunity to join our Free VIP Signal Group. A premium channel designed to help you stay ahead in the fast-paced world of Forex trading.
                        </p>

                        {/* CTA Button */}
                        <a
                            href="https://t.me/mrpfxuniversity"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-4 px-8 rounded-lg text-sm tracking-wider transition-colors font-['DM_Sans']"
                        >
                            GAIN ACCESS
                        </a>
                    </div>

                    {/* Right Column: Image */}
                    <div className="flex-1 w-full flex justify-center md:justify-end">
                        <div className="relative w-full max-w-[600px] aspect-[4/3]">
                            <Image
                                src="/assets/free-signals/telegram-card.png"
                                alt="Free Signals Group Telegram"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Newsletter Section */}
            <div className="pb-20">
                <NewsletterSection />
            </div>
        </div>
    );
};

export default FreeSignalsGroupPage;
