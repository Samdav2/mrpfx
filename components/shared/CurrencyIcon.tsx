'use client';

import { Coins } from 'lucide-react';

interface CurrencyIconProps {
    ticker: string;
    className?: string;
}

export default function CurrencyIcon({ ticker, className = "w-6 h-6" }: CurrencyIconProps) {
    // We can use a service like cryptoicons.api or just a fallback
    // For now, let's use a themed fallback with the first letter
    const colors: Record<string, string> = {
        BTC: 'bg-[#f7931a] text-white',
        ETH: 'bg-[#627eea] text-white',
        USDT: 'bg-[#26a17b] text-white',
        LTC: 'bg-[#345d9d] text-white',
        XRP: 'bg-[#23292f] text-white',
        ADA: 'bg-[#0033ad] text-white',
        DOGE: 'bg-[#c2a633] text-white',
        SOL: 'bg-[#14f195] text-black',
        BNB: 'bg-[#f3ba2f] text-black',
        TRX: 'bg-[#ef0027] text-white',
        DEFAULT: 'bg-purple-600/20 text-purple-400'
    };

    const colorClass = colors[ticker.toUpperCase()] || colors.DEFAULT;

    return (
        <div className={`${className} ${colorClass} rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border border-white/10 shadow-lg`}>
            {ticker.substring(0, 1).toUpperCase()}
        </div>
    );
}
