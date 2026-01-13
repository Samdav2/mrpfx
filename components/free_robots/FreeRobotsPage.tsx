'use client';

import Image from 'next/image';
import Link from 'next/link';
import NewsletterSection from '@/components/shared/NewsletterSection';

const FreeRobotsPage = () => {
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
                                    className="inline-block font-[family-name:var(--font-inter)] font-bold transition-colors"
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
            <section className="bg-white py-16 md:py-20">
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

            {/* Newsletter Section - Using shared component */}
            <section className="bg-white py-8 md:py-12">
                <NewsletterSection />
            </section>
        </div>
    );
};

export default FreeRobotsPage;
