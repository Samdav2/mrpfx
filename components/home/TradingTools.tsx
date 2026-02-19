import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface TradingToolsProps {
    onMentorshipClick: () => void;
    onVipClick: () => void;
    onFreeClick: () => void;
}

export default function TradingTools({ onMentorshipClick, onVipClick, onFreeClick }: TradingToolsProps) {
    const actionButtons = [
        { label: 'VIP Bots,\nIndicators,\nResources', onClick: onVipClick, bg: 'bg-[#4F46E5] hover:bg-[#4338ca]', shadow: 'hover:shadow-indigo-500/25' },
        { label: 'Free Robots,\nIndicators &\nVideos', onClick: onFreeClick, bg: 'bg-[#4F46E5] hover:bg-[#4338ca]', shadow: 'hover:shadow-indigo-500/25' },
        { label: 'USE\nRECOMMENDED\nBROKER', href: 'https://one.exnesstrack.net/a/0z72b5esoc', bg: 'bg-[#06B6D4] hover:bg-[#0891b2]', shadow: 'hover:shadow-cyan-500/25' },
    ];

    const quickLinks = [
        { label: 'Join VIP\nMentorship', onClick: onMentorshipClick },
        { label: 'VIP Signals Group', href: '/vip-signals-group' },
        { label: 'Join Free\nSignals Group', href: '/free-signals-group' },
        { label: 'Rent VPS\nHosting', href: '/rent-vps-hosting' },
    ];

    return (
        <section className="py-12 lg:py-24 mt-28 relative md:pb-30">
            {/* Wavy lines background texture - contained in its own overflow-hidden div */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] lg:rounded-[3rem] bg-[#0a0d17]">
                <div className="absolute inset-0 opacity-40">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 600"
                        preserveAspectRatio="none"
                        className="w-full h-full relative z-10"
                    >
                        {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600].map((offset, i) => (
                            <path
                                key={i}
                                d={`M-100,${offset} C200,${offset - 50} 500,${offset + 50} 800,${offset} C1100,${offset - 50} 1300,${offset + 50} 1540,${offset}`}
                                fill="none"
                                stroke="rgba(99,102,241,0.15)"
                                strokeWidth="1.5"
                            />
                        ))}
                    </svg>
                </div>
            </div>

            {/* Floating 3D Graphic - top right, OVERLAPPING the edge */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 lg:-top-40 lg:right-4 lg:left-auto lg:translate-x-0 z-50 block w-[200px] h-[200px] lg:w-[320px] lg:h-[320px] pointer-events-none">
                <Image
                    src="/images/home/trading-tools-float.png"
                    alt="Trading Graphic"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>

            <div className="container mx-auto px-4 lg:px-16 relative z-10">
                {/* Header */}
                <div className="space-y-4 mb-20 pt-20 lg:pt-0">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Trading Tools</h2>
                    <p className="text-gray-400 text-lg lg:text-xl leading-relaxed max-w-2xl">
                        With lots of unique tools, you can easily build your<br className="hidden lg:block" /> desired tradeflow
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Column 1: Action Buttons (Spans 4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-5">
                        {actionButtons.map((btn, idx) => {
                            const btnContent = (
                                <>
                                    <span className="font-bold text-lg whitespace-pre-line text-left leading-normal relative z-10">{btn.label}</span>
                                    <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors flex-shrink-0 ml-4 relative z-10">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </>
                            );
                            const className = `group flex items-center justify-between px-6 py-6 ${btn.bg} text-white rounded-2xl transition-all duration-300 shadow-xl ${btn.shadow} min-h-[120px] relative overflow-hidden`;

                            if (btn.onClick) {
                                return (
                                    <button
                                        key={idx}
                                        onClick={btn.onClick}
                                        className={className}
                                    >
                                        {btnContent}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={idx}
                                    href={btn.href || "#"}
                                    target={btn.href?.startsWith('http') ? "_blank" : undefined}
                                    rel={btn.href?.startsWith('http') ? "noopener noreferrer" : undefined}
                                    className={className}
                                >
                                    {btnContent}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Columns 2 & 3: White cards (Spans 8 cols) */}
                    <div className="lg:col-span-6 grid lg:h-70 grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 md:pb-20">
                        {quickLinks.map((item, idx) => {
                            const cardContent = (
                                <span className="font-bold text-lg lg:text-xl whitespace-pre-line leading-normal">{item.label}</span>
                            );
                            const className = "bg-white hover:bg-gray-50 text-black px-6 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center min-h-[100px]";

                            if (item.onClick) {
                                return (
                                    <button
                                        key={idx}
                                        onClick={item.onClick}
                                        className={`${className} text-left`}
                                    >
                                        {cardContent}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={idx}
                                    href={item.href || "#"}
                                    className={className}
                                >
                                    {cardContent}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
