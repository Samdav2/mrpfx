'use client';

import React from 'react';
import Image from 'next/image';

export default function CopyTradingVisual() {
    return (
        <div className="relative w-full max-w-[420px] mx-auto z-10 font-sans">
            {/* Phone Mockup Image */}
            <div className="relative z-10 animate-float">
                <Image
                    src="/assets/copy-trading/phone-mockup.png"
                    alt="Copy Trading App Interface"
                    width={500}
                    height={850}
                    className="w-full h-auto drop-shadow-[0_45px_100px_rgba(0,0,0,0.4)]"
                    priority
                />
            </div>

            {/* Background Decorative Rings & Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 pointer-events-none">
                <div className="absolute top-0 right-10 w-80 h-80 border border-blue-500/10 rounded-full animate-pulse-slow" />
                <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-blue-600/[0.05] blur-[120px] rounded-full" />

                {/* Accent glow for the +15.2% badge area */}
                <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#10B981]/[0.05] blur-[100px] rounded-full" />
            </div>
        </div>
    );
}
