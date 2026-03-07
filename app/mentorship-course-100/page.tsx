import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MentorshipCourse100Page() {
    return (
        <div className="min-h-screen bg-[#110905] text-[#EBEBEB] font-montserrat relative overflow-hidden">
            {/* We will use a repeating dark texture bg in CSS, using standard inline styles for now */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: 'url("/assets/backgrounds/dark-marble.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Main Content Container */}
            <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                {/* Top Grid: Hero Text (Left) & Image/Video (Right) */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* Hero Content (Left) */}
                    <div className="flex-1 w-full space-y-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 border border-[#B68C36]/30 bg-[#2A1C0F]/50 px-4 py-1.5 rounded-full backdrop-blur-sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="20" x2="12" y2="10"></line>
                                <line x1="18" y1="20" x2="18" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="16"></line>
                            </svg>
                            <span className="text-white text-xs font-bold tracking-widest uppercase">
                                Mentorship Course <span className="text-[#D4AF37]">100</span>
                            </span>
                        </div>

                        {/* Headlines */}
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
                                Live One-On-One
                            </h1>
                            <h2 className="text-4xl md:text-5xl lg:text-[56px] italic text-[#D4AF37] font-serif leading-[1.1] tracking-tight">
                                Trading Mentorship
                            </h2>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/50 max-w-[100px]"></div>
                                <h3 className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide">
                                    With Mr P
                                </h3>
                                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/50 max-w-[100px]"></div>
                            </div>
                        </div>

                        {/* Date Row */}
                        <div className="pt-4 flex items-center gap-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span className="text-[#EBEBEB] font-bold text-lg md:text-xl">
                                March 2nd &ndash; March 10th, 2026
                            </span>
                        </div>

                        {/* Description */}
                        <div className="pt-2">
                            <p className="text-gray-300 leading-relax text-[15px] md:text-base font-medium max-w-xl">
                                During this program, Mr P will personally teach <strong className="text-[#D4AF37]">LIVE</strong> through Zoom,
                                guiding you step-by-step through <strong className="text-white">real market execution</strong> and
                                advanced chart mastery.
                            </p>
                        </div>

                        {/* Pinned Note */}
                        <div className="flex gap-3 bg-[#1A110A]/60 p-4 rounded-xl border border-white/5 backdrop-blur-sm shadow-xl">
                            <div className="mt-1 shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37" stroke="none">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3" fill="#110905"></circle>
                                </svg>
                            </div>
                            <p className="text-sm md:text-[15px] text-gray-300 leading-relaxed font-medium">
                                All classes will be recorded and sent to the <strong className="text-white">private group</strong> after
                                each session in case you miss any live class.
                            </p>
                        </div>
                    </div>

                    {/* Hero Video/Image (Right) */}
                    <div className="w-full lg:w-[500px] shrink-0 xl:w-[600px] relative mt-8 lg:mt-0 order-first lg:order-none">
                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/10 group cursor-pointer">
                            <Image
                                src="/images/home/trading_mentor_preview.png"
                                alt="Mentorship Video Preview"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#FFDE55] to-[#B68C36] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#110905" stroke="none" className="ml-2">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* CTA Buttons (Desktop: Centered below Hero, Mobile: Also generally centered) */}
                <div className="flex flex-col items-center justify-center gap-3 mt-12 md:mt-16 sm:px-4 w-full lg:max-w-2xl mx-auto">
                    <button className="w-full relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#B68C36] rounded-md blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative w-full bg-gradient-to-r from-[#E6B94A] via-[#F8CD5C] to-[#D6AB40] hover:from-[#F0C55A] hover:to-[#E0B54A] text-[#110905] font-black text-lg md:text-xl py-4 sm:py-5 px-6 rounded shadow-[0_4px_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 border-b-4 border-[#A37B24] transition-all transform active:translate-y-1 active:border-b-0">
                            RESERVE YOUR SEAT NOW
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                        </div>
                    </button>

                    <button className="w-full relative group">
                        <div className="relative w-full bg-[#1A110A]/80 hover:bg-[#251A10] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-sm md:text-base py-3 px-6 rounded flex items-center justify-center gap-2 transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            JOIN NOW &ndash; LIMITED SPOTS!
                        </div>
                    </button>
                </div>

                {/* Limited Admission Section (Visible strictly as styled in the mobile mockup, but we'll show on both for consistency unless needed otherwise) */}
                <div className="mt-16 md:mt-24 w-full">
                    <h3 className="text-[#D4AF37] text-2xl md:text-3xl font-bold mb-6 border-b border-[#D4AF37]/20 pb-4 inline-block w-full">
                        Limited Admission
                    </h3>

                    <ul className="space-y-4 md:space-y-6 text-gray-300 text-[15px] md:text-xl font-medium">
                        <li className="flex items-start gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-3 shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                            <p className="leading-relaxed">
                                To maintain real interaction during the Zoom sessions, <strong className="text-[#D4AF37]">only 100 TRADERS</strong> will be accepted into this mentorship program.
                            </p>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-3 shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                            <p className="leading-relaxed">
                                Once the seats are filled, registration will permanently close.
                            </p>
                        </li>
                    </ul>
                </div>

                {/* What You Will Learn Section */}
                <div className="mt-16 md:mt-24 w-full">
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-[#D4AF37] text-2xl md:text-3xl font-bold whitespace-nowrap">
                            What You Will Learn
                        </h3>
                        <div className="h-[1px] w-full max-w-sm bg-gradient-to-r from-[#D4AF37]/50 to-transparent"></div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                        {/* Fake frosting overlay to mimic the lighter texture of the original list area */}
                        <div className="absolute inset-0 bg-[#EBEBEB] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-5 border-t border-white/20 pointer-events-none"></div>

                        <div className="relative z-10 bg-[#251A10]/40 backdrop-blur-sm flex flex-col lg:flex-row min-h-[400px]">
                            <div className="p-6 md:p-10 flex-1 order-2 lg:order-1">
                                <ul className="space-y-4 md:space-y-5 text-[15px] md:text-lg text-gray-200">
                                    {[
                                        { text: 'Full basics and foundations of Forex trading and Indices' },
                                        { text: 'Complete %intermediate-level% trading systems' },
                                        { text: 'Extremely %advanced-level% trading execution' },
                                        { text: 'Real-time %LIVE% trading practice for %chart mastery%' },
                                        { text: 'Advanced %market structure% and price behavior analysis' },
                                        { text: 'Prop firm challenge strategies %and execution techniques%' },
                                        { text: 'Intensive trading competition analysis %and account growth%' },
                                        { text: 'Winner receives funding opportunity %up to $10,000%' },
                                        { text: 'Two %private LIVE% trading sessions directly with Mr P.' }
                                    ].map((item, idx) => {
                                        const parts = item.text.split(/%(.*?)%/g);
                                        return (
                                            <li key={idx} className="flex items-start gap-4 transition-colors hover:text-white group relative z-20">
                                                <div className="mt-2.5 shrink-0 flex items-center justify-center w-3 h-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A110A] border-2 border-gray-400 group-hover:border-[#D4AF37] transition-colors"></div>
                                                </div>
                                                <p className="leading-relaxed">
                                                    {parts.map((p, i) => i % 2 !== 0 ? <strong key={i} className="text-[#1A110A] bg-gray-200/90 px-1 rounded-sm mx-0.5">{p}</strong> : p)}
                                                </p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Desktop Image (Hidden on mobile according to screenshot specs) */}
                            <div className="hidden lg:block w-[450px] xl:w-[500px] relative shrink-0 order-1 lg:order-2 self-stretch">
                                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#241a10] to-transparent z-10 pointer-events-none" />
                                <Image
                                    src="/images/home/trader_looking_at_monitors.png"
                                    alt="Trader studying charts"
                                    fill
                                    className="object-cover object-left opacity-90 mix-blend-lighten"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transformation Banner */}
                <div className="mt-16 md:mt-24 w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold">
                        This Is <span className="text-[#D4AF37] italic font-serif">Not a Normal Forex Class</span> &mdash;
                    </h3>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold mt-1 md:mt-0">
                        This is a <span className="text-[#D4AF37] italic font-serif">Trading Transformation</span>
                    </h3>
                </div>

                {/* Registration Details Section */}
                <div className="mt-16 md:mt-24 w-full mb-16">
                    <div className="flex items-center justify-center gap-6 mb-10 w-full mx-auto max-w-2xl">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                        <h3 className="text-[#EBEBEB] text-xl md:text-3xl font-bold tracking-wide">
                            Registration Details
                        </h3>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                    </div>

                    <div className="relative rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 mx-auto max-w-4xl">
                        {/* Fake frosting overlay */}
                        <div className="absolute inset-0 bg-[#EBEBEB] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-10 pointer-events-none border-t border-white/20"></div>

                        <div className="relative z-10 p-6 md:p-10 bg-[#251A10]/60 backdrop-blur-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-sm md:text-base text-gray-200">
                                {/* Left Column: Key Details */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                                        <div className="text-[#D4AF37] p-2 bg-[#1A110A] rounded shrink-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <div>
                                            <span className="font-bold text-white mr-2">Program Fee:</span>
                                            <span className="font-bold text-xl md:text-2xl text-[#D4AF37]">$399</span>
                                            <span className="text-gray-400 ml-2">per seat</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                                        <div className="text-[#D4AF37] p-2 bg-[#1A110A] rounded shrink-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        </div>
                                        <div>
                                            <span className="font-bold text-white mr-2">Date:</span>
                                            <span>March 2nd &ndash; 10th, 2026</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                                        <div className="text-[#D4AF37] p-2 bg-[#1A110A] rounded shrink-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        </div>
                                        <div>
                                            <span className="font-bold text-white mr-2">Registration Deadline:</span>
                                            <span>February 29th, 2026</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-[#D4AF37] p-2 bg-[#1A110A] rounded shrink-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        </div>
                                        <div>
                                            <span className="font-bold text-white mr-2">Strictly 100</span>
                                            <span className="text-gray-400">seats available</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Inclusions */}
                                <div className="space-y-5 md:pl-6 md:border-l border-white/10">
                                    {[
                                        { text: '%12 months VIP group% membership' },
                                        { text: 'Access to %VIP trading robot% and indicator' },
                                        { text: '%Private live% trading sessions with Mr P' },
                                        { text: 'Recorded mentorship classes' }
                                    ].map((item, idx) => {
                                        const parts = item.text.split(/%(.*?)%/g);
                                        return (
                                            <div key={idx} className="flex items-center gap-4">
                                                <div className="bg-[#2ECC71] text-[#110905] rounded-sm p-0.5 shrink-0 shadow-[0_0_10px_rgba(46,204,113,0.3)]">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                                <p className="leading-snug">
                                                    {parts.map((p, i) => i % 2 !== 0 ? <strong key={i} className="text-white font-bold">{p}</strong> : p)}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-12 flex justify-center w-full max-w-md mx-auto">
                        <button className="w-full relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#B68C36] rounded-md blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative w-full bg-gradient-to-r from-[#E6B94A] via-[#F8CD5C] to-[#D6AB40] hover:from-[#F0C55A] hover:to-[#E0B54A] text-[#110905] font-black text-base md:text-lg py-3.5 sm:py-4 px-6 rounded shadow-[0_4px_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 border-b-4 border-[#A37B24] transition-all transform active:translate-y-1 active:border-b-0 uppercase tracking-wide">
                                JOIN NOW &mdash; LIMITED SPOTS!
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
