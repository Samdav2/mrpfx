'use client';

import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '@/components/home/Newsletter';

const FreeRobotsContent = () => {
    return (
        <div className="bg-white min-h-screen font-[family-name:var(--font-dm-sans)]">
            {/* Hero Section */}
            <section
                className="max-w-[1430px] mx-auto px-4 py-12 md:py-20 relative"
                style={{
                    backgroundImage: "url('/assets/free_robots/background-pattern.png')",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain"
                }}
            >
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Left Content */}
                    <div className="w-full md:w-[50%] space-y-6">
                        {/* "Free" Pill */}
                        <div className="inline-block bg-[#00B931]/25 rounded-[10px] px-[10px] py-[10px]">
                            <h2 className="text-[#007920] font-[family-name:var(--font-nova-flat)] font-semibold text-[2em] leading-[1.1em] m-0">
                                Free
                            </h2>
                        </div>

                        {/* Title */}
                        <h1 className="text-[2em] md:text-[51px] font-[900] text-black leading-[1.1em] tracking-normal">
                            Robots, Indicators & Seminars
                        </h1>

                        {/* Description (Desktop) */}
                        <div className="hidden md:block text-[#000000] text-[17px] leading-relaxed font-[family-name:var(--font-dm-sans)]">
                            <p>
                                Enhance your trading experience with our suite of free resources: automated trading robots to simplify and optimize your strategies, advanced indicators to give you deeper market insights, and expert-led seminars to boost your skills and knowledge.
                            </p>
                        </div>

                        {/* Description (Mobile) */}
                        <div className="md:hidden text-[#000000] text-[16px] leading-relaxed space-y-4 font-[family-name:var(--font-dm-sans)] text-center">
                            <p>
                                Trading robots are a great way to automate your trading experience and increase your overall profit potential. Trading Indicators show you the exact positions of a market with high profit potentials. Seminar videos teaches new and updated trading strategies to always gain ground in the market.
                            </p>
                            <p>
                                All Mr P Fx free trading materials/resources are COMPLETELY FREE WITH NO HIDDEN CHARGES ATTACHED. These trading resources are a way of boosting the financial capacity of anyone and everyone that comes in contact with the Mr P Fx community.
                            </p>
                            <p className="text-sm italic">
                                (DISCLAIMER: NO TRADING STRATEGY CAN EVER BE 100% ACCURATE, TRADING REMAINS A RISK. MR P FX WOULD NOT BE HELD RESPONSIBLE FOR ANY MARKET DAMAGES).
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4 flex justify-center md:justify-start">
                            <Link
                                href="https://mrpfx.com/sign-up/"
                                className="inline-block bg-[#3442D9] hover:bg-blue-700 text-white font-[family-name:var(--font-inter)] font-bold py-[15px] px-[30px] rounded-[6px] transition-colors text-base"
                            >
                                GAIN ACCESS
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div className="w-full md:w-[50%] flex justify-center">
                        <div className="relative w-full">
                            <Image
                                src="/assets/free_robots/image-11.png"
                                alt="Free Robots and Indicators"
                                width={666}
                                height={528}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Text Section (Desktop Only) */}
            <section className="hidden md:block max-w-[1400px] mx-auto px-4 pb-20 mt-[50px] mb-[50px]">
                <div className="text-center mx-auto text-[#141689] text-[16px] leading-[1.5em] font-medium font-[family-name:var(--font-dm-sans)]">
                    <p className="mb-4">
                        Trading robots are a great way to automate your trading experience and increase your overall profit potential. Trading Indicators show you the exact positions of a market with high profit potentials. Seminar videos teaches new and updated trading strategies to always gain ground in the market.
                    </p>
                    <p className="mb-4">
                        All Mr P Fx free trading materials/resources are COMPLETELY FREE WITH NO HIDDEN CHARGES ATTACHED. These trading resources are a way of boosting the financial capacity of anyone and everyone that comes in contact with the Mr P Fx community.
                    </p>
                    <p>
                        (DISCLAIMER: NO TRADING STRATEGY CAN EVER BE 100% ACCURATE, TRADING REMAINS A RISK. MR P FX WOULD NOT BE HELD RESPONSIBLE FOR ANY MARKET DAMAGES).
                    </p>
                </div>
            </section>

            {/* Newsletter Section */}
            <Newsletter />
        </div>
    );
};

export default FreeRobotsContent;
