import React from 'react';
import Image from 'next/image';
import CopyTradingForm from '@/components/copy-trading/CopyTradingForm';
import CopyTradingVisual from '@/components/copy-trading/CopyTradingVisual';

export default function CopyTradingPage() {
    return (
        <div className="bg-[#f0f2f5] min-h-screen pt-24 pb-16 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="mb-12 max-w-4xl mx-auto md:mx-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2A2B42] mb-4 font-palanquin-dark">
                        Copy Trading
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 mb-6 font-dm-sans">
                        Automatically mirror VIP Group trade signals to your MT5 account
                    </p>
                    <p className="text-[#333333] leading-relaxed text-[15px]">
                        The copy Trades feature is for those who want trades from the VIP Group/private channel to trigger
                        on their account automatically. copying not just position but using the right lot size based on the
                        amount of their capital and setting the exact TPs and SL levels. All done automatically. With this
                        you can go on with other activities without the stress of taking trades from the private channel
                        manually yourself.
                    </p>
                </div>

                {/* Main Content Area - Split Layout */}
                <div className="flex flex-col md:flex-row relative mt-16 pt-6 pb-32 border border-gray-100 bg-white/50 rounded-2xl p-6 md:p-12 shadow-sm min-h-[700px]">

                    {/* Background Graphic Patterns */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none z-0 overflow-hidden rounded-2xl">
                        <div className="absolute top-20 left-10 w-64 h-64 border border-blue-200/50 rounded-full blur-3xl" />
                        <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl" />
                        <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-blue-50/50 to-transparent" />
                    </div>

                    {/* Left Side - Form */}
                    <div className="w-full md:w-[45%] lg:w-[40%] flex items-center mb-16 md:mb-0 relative z-10 pt-10">
                        <CopyTradingForm />
                    </div>

                    {/* Right Side - Phone Mockup */}
                    <div className="w-full md:w-[55%] lg:w-[60%] relative flex justify-center md:justify-end items-start mt-8 md:mt-0 right-[-5%] z-20">
                        <div className="relative w-full max-w-[500px]">
                            <CopyTradingVisual />
                        </div>
                    </div>
                </div>

                {/* Bottom Text Area */}
                <div className="mt-16 max-w-4xl opacity-70">
                    <p className="text-[#555555] leading-relaxed text-sm">
                        Copy trades feature is primarily for those who want trades from the VIP Group/private channel to
                        trigger on their MT5 automatically. Copying not just position but using the right lot size based
                        on the amount of your trading capital for each trade and setting the exact
                        TPs and SL levels, automation takes the stress off manually. Both in copy trading for exact order
                        the execution and accurate transfer of taking trades from the private channel.
                    </p>
                </div>
            </div>
        </div>
    );
}
