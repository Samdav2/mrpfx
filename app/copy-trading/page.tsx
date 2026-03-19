import React from 'react';
import { CheckCircle2, Zap, ShieldCheck, Target, MousePointer2, BarChart3 } from 'lucide-react';
import CopyTradingForm from '@/components/copy-trading/CopyTradingForm';
import CopyTradingVisual from '@/components/copy-trading/CopyTradingVisual';

export default function CopyTradingPage() {
    return (
        <div className="bg-[#f8faff] min-h-screen pt-4 md:pt-20 pb-8 md:pb-20 font-sans overflow-x-hidden">

            {/* --- Hero Section --- */}
            <section className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-4 md:pt-20 pb-4 md:pb-24 relative">
                {/* Background accents */}
                <div className="absolute top-0 right-0 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-blue-100/30 blur-[40px] md:blur-[120px] rounded-full pointer-events-none -mr-8 md:-mr-48 -mt-5 md:-mt-24" />

                <div className="flex flex-row items-center gap-2 md:gap-12">
                    {/* Left: Content */}
                    <div className="w-[55%] md:w-1/2 space-y-4 md:space-y-10 relative z-10">
                        <div className="space-y-2 md:space-y-6">
                            <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-7xl font-bold text-[#1e293b] leading-[1.2] md:leading-[1.1] font-outfit tracking-tight">
                                Copy My Trades Automatically — <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">No Experience Needed</span>
                            </h1>
                            <p className="text-[10px] sm:text-xs md:text-xl lg:text-2xl text-slate-600 leading-relaxed font-medium">
                                Let your MT5 account execute my verified VIP trades instantly — with built-in risk management.
                            </p>
                        </div>

                        <ul className="space-y-1.5 md:space-y-5">
                            {[
                                "Used by 1,000+ traders",
                                "No manual trading required",
                                "Works 24/5 on MT5"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-1.5 md:gap-3 text-slate-700 font-bold text-[9px] sm:text-[10px] md:text-lg">
                                    <CheckCircle2 className="h-3 w-3 md:h-7 md:w-7 text-[#10B981] flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-1 md:pt-4">
                            <button className="bg-gradient-to-r from-[#00A859] to-[#00C853] hover:scale-105 active:scale-95 transform transition-all text-white font-bold py-2 md:py-6 px-4 md:px-14 rounded-lg md:rounded-2xl text-[10px] sm:text-[11px] md:text-xl shadow-lg md:shadow-2xl shadow-[#00A859]/30 tracking-tight">
                                Start Copy Trading Now
                            </button>
                        </div>
                    </div>

                    {/* Right: Phone Visual */}
                    <div className="w-[45%] md:w-1/2 flex justify-end relative">
                        <div className="w-full scale-110 md:scale-100 origin-right">
                            <CopyTradingVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Testimonials Section --- */}
            <section className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 md:py-16">
                <div className="grid grid-cols-2 gap-2 md:gap-10">
                    {/* Testimonial 1 */}
                    <div className="bg-white p-3 md:p-10 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-1.5 md:gap-5">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-[10px] md:text-2xl">★</span>
                            ))}
                            <div className="flex items-center gap-1 text-slate-900 font-bold text-[8px] md:text-xl ml-1">
                                <CheckCircle2 className="h-2 w-2 md:h-4 md:w-4 text-blue-500 fill-blue-500 text-white rounded-full" />
                                <span className="hidden sm:inline">Verified User</span>
                                <span className="sm:hidden text-[7px]">Verified</span>
                            </div>
                        </div>
                        <p className="text-slate-600 italic text-[9px] md:text-lg font-medium leading-tight md:leading-relaxed">
                            "I don't even trade manually anymore. Everything runs automatically."
                        </p>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-white p-3 md:p-10 rounded-2xl md:rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col gap-1.5 md:gap-5">
                        <div className="flex items-center gap-1 text-slate-900 font-bold text-[8px] md:text-xl">
                            <span className="text-yellow-500 text-xs md:text-3xl">👑</span>
                            VIP Member
                        </div>
                        <p className="text-slate-600 italic text-[9px] md:text-lg font-medium leading-tight md:leading-relaxed">
                            "Best decision I made. Consistent results every week."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Why This Works Section --- */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-24">
                <h2 className="text-lg md:text-4xl font-bold text-[#1e293b] mb-4 md:mb-16 font-outfit tracking-tight">Why This Works:</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-12">
                    {[
                        { icon: Zap, title: "Trades executed instantly", sub: "(no delay)", color: "text-orange-500" },
                        { icon: Target, title: "Automatic Stop Loss", sub: "& Take Profit", color: "text-red-500" },
                        { icon: BarChart3, title: "Smart lot sizing based", sub: "on your capital", color: "text-blue-500" },
                        { icon: Zap, title: "Fully hands-free trading", sub: "Fully automated", color: "text-cyan-500" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-5">
                            <div className={`${item.color} bg-white p-1.5 md:p-5 rounded-lg md:rounded-[1.5rem] shadow-md border border-slate-50 flex-shrink-0`}>
                                <item.icon className="h-4 w-4 md:h-8 md:w-8" />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="font-bold text-slate-900 text-[10px] md:text-lg leading-tight">{item.title}</h3>
                                {item.sub && <p className="text-slate-500 text-[8px] md:text-sm font-medium">{item.sub}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- How It Works Section --- */}
            <section className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-4 md:py-24">
                <div className="flex flex-row gap-1.5 md:gap-20">
                    {/* Left: Steps */}
                    <div className="w-[42%] md:w-1/2 space-y-4 md:space-y-16">
                        <h2 className="text-lg md:text-4xl font-bold text-[#1e293b] font-outfit tracking-tight">How It Works:</h2>

                        <div className="space-y-4 md:space-y-14">
                            {[
                                { title: "Connect your MT5 account", desc: "Enter your details to link your MT5", icon: ShieldCheck },
                                { title: "Activate copy trading", desc: "Enable copy trading with one click", icon: Zap },
                                { title: "Sit back while trades execute automatically", desc: "Everything runs in the background", icon: MousePointer2 }
                            ].map((step, i) => (
                                <div key={i} className="flex flex-col sm:flex-row items-start gap-1 md:gap-7">
                                    <div className="bg-blue-500/10 p-1 md:p-6 rounded-lg md:rounded-3xl text-blue-600 flex-shrink-0">
                                        <step.icon className="h-3.5 w-3.5 md:h-9 md:w-9" />
                                    </div>
                                    <div className="pt-0 md:pt-2">
                                        <h3 className="text-[9px] sm:text-[11px] md:text-2xl font-bold text-slate-900 mb-0.5 leading-tight">{step.title}</h3>
                                        <p className="text-slate-500 text-[8px] sm:text-[10px] md:text-lg leading-tight md:leading-relaxed font-medium">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Security Notes */}
                        <div className="bg-slate-50/80 p-2 md:p-12 rounded-xl md:rounded-[2.5rem] space-y-1.5 md:space-y-6 border border-slate-100 shadow-inner">
                            {[
                                "Your account remains fully secure",
                                "No withdrawal access required",
                                "You can disconnect anytime"
                            ].map((note, i) => (
                                <div key={i} className="flex items-center gap-1 text-slate-700 text-[8px] md:text-base font-bold">
                                    <ShieldCheck className="h-2 w-2 md:h-6 md:w-6 text-slate-400 flex-shrink-0" />
                                    {note}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="w-[58%] md:w-1/2 flex justify-end items-start relative">
                        {/* Glow support */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="w-full relative z-10 transition-all">
                            <CopyTradingForm />
                        </div>
                    </div>
                </div>

                {/* --- Footer CTA (Moved inside for tighter spacing) --- */}
                <div className="mt-8 md:mt-24 text-center space-y-4 md:space-y-12 pb-4">
                    <p className="text-slate-500 text-sm md:text-4xl font-bold italic leading-tight tracking-tight opacity-80 px-4">
                        Stop missing trades. <br className="sm:hidden" /> Let your account trade for you.
                    </p>
                    <div className="pt-0 md:pt-4">
                        <button className="bg-gradient-to-r from-[#00A859] to-[#00C853] hover:scale-105 active:scale-95 transform transition-all text-white font-bold py-3 md:py-7 px-8 md:px-20 rounded-xl md:rounded-2xl text-[12px] md:text-2xl shadow-xl md:shadow-2xl shadow-[#00A859]/30 tracking-tight">
                            Start Copy Trading Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
