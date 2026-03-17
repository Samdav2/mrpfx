"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ShieldCheck, PlayCircle, MapPin } from 'lucide-react';

export default function PhysicalClassesPage() {
    const features = [
        "Beginner \u2192 Advanced Curriculum",
        "Intensive One Month Program",
        "Live Trading Experience",
        "Access to Premium Video Course",
        "Students Private Community",
        "Prop Firm Challenge Preparation",
        "Earn a professional trading certificate"
    ];

    return (
        <div className="min-h-screen font-sans font-dm-sans bg-[#EFF3F9] relative overflow-hidden flex flex-col items-left">

            {/* Global Page Background Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 w-full h-[800px] bg-gradient-to-b from-[#D4DCF1] via-[#E4EAF5] to-transparent opacity-80" />
                <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-blue-300/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
                <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-300/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
            </div>

            {/* Hero Section */}
            <div className="relative w-full overflow-hidden pt-28 pb-4 md:pt-36 md:pb-12 z-10 flex flex-col justify-left min-h-[500px] md:min-h-[650px]">
                {/* Hero Top Texture / Image */}
                <div className="absolute top-0 inset-x-0 h-full z-0 overflow-hidden">
                    {/* Mobile optimized positioning: moves the mentor to the right/bottom */}
                    <Image
                        src="/images/home/physical_class_mentorship_hero.png"
                        alt="Real Trading Floor"
                        fill
                        className="object-cover object-[80%_top] md:object-right"
                    />
                    {/* Gradient mask for text readability on left */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#EFF3F9]/95 via-[#EFF3F9]/60 to-transparent w-full md:w-[70%]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EFF3F9]/30 to-[#EFF3F9]" />
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 md:gap-16 items-start mt-[-60px] md:mt-0">
                    {/* Hero Text */}
                    <div className="flex-1 max-w-2xl text-left">
                        <h1 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold text-[#141E46] leading-[1.1] tracking-tight mb-4 md:mb-6 font-palanquin-dark drop-shadow-sm">
                            <span className="opacity-90">Trade Like a Professional</span><br />
                            <span className="text-[#1A255C] font-black">on a Real Trading Floor</span>
                        </h1>

                        <p className="text-[#3B4A6B] text-[14px] md:text-[18px] leading-relaxed mb-4 md:mb-6 max-w-xl font-medium">
                            Join our <strong className="text-[#141E46] font-bold">1-Month Intensive Physical Trading Program</strong> and learn Forex and <strong className="text-[#141E46] font-bold">Synthetic Indices</strong> directly from <strong className="text-[#141E46] font-bold">professional traders.</strong>
                        </p>

                        <p className="text-[#516182] text-[13px] md:text-[17px] mb-6 md:mb-8 font-medium">
                            From <strong className="text-[#141E46]">Beginner</strong> to <strong className="text-[#141E46]">Masterclass level</strong><br />
                            with real market execution.
                        </p>

                        <button className="relative group overflow-hidden bg-gradient-to-r from-[#B9812A] via-[#E2B75A] to-[#B9812A] text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-xl shadow-[0_10px_30px_rgba(185,129,42,0.4)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 w-fit">
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                            <span className="relative z-10 tracking-widest uppercase text-[13px] md:text-[15px] drop-shadow-md">Reserve Your Seat Now</span>
                        </button>
                    </div>

                    {/* Spacer block pushes layout around on mobile so background mentor is visible below text */}
                    <div className="h-[280px] md:h-[400px] w-full flex-1"></div>
                </div>
            </div>

            {/* Pricing / Packages Section (Forced Side-by-Side Mobile) */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-2 md:px-6 lg:px-8 mt-[-20px] md:-mt-12 mb-6 md:mb-16 flex flex-row gap-2 md:gap-8 items-stretch justify-center">

                {/* Regular Physical Mentorship (Left Card) */}
                <div className="flex-1 bg-white/60 backdrop-blur-xl border border-white rounded-[1rem] md:rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col min-w-0">
                    <div className="p-3 md:p-10 flex flex-col h-full bg-gradient-to-b from-white/90 to-transparent">
                        <div className="mb-3 md:mb-6">
                            <h3 className="text-[#2B3563] text-[13px] md:text-2xl font-bold mb-1 md:mb-3 tracking-tight leading-tight">Physical Class Mentorship</h3>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-3 flex-wrap">
                                <span className="text-[17px] md:text-4xl text-[#B9812A] font-black drop-shadow-sm leading-none">₦200,000</span>
                                <span className="text-[#64748B] text-[9px] md:text-[13px] font-semibold tracking-wide">(All charges included)</span>
                            </div>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-gray-200 via-gray-300 to-transparent mb-3 md:mb-6"></div>

                        <h4 className="text-[#1A255C] text-[11px] md:text-lg font-bold mb-2 md:mb-4 tracking-wide">Topics Covered</h4>

                        <ul className="space-y-2 md:space-y-4 mb-4 md:mb-8 flex-1">
                            <li className="flex items-start gap-1 md:gap-4">
                                <div className="mt-[2px] md:mt-1 bg-gray-100 p-[1px] md:p-0.5 rounded-full shrink-0">
                                    <svg className="w-2 md:w-3.5 h-2 md:h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </div>
                                <span className="text-gray-400 line-through decoration-gray-300 text-[9px] md:text-[15px] leading-tight">Exclusive one-on-one sessions</span>
                            </li>
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-1 md:gap-3">
                                    <div className="mt-[2px] md:mt-1 shrink-0">
                                        <Check className="w-3 md:w-5 h-3 md:h-5 text-[#10B981] drop-shadow-sm" strokeWidth={3} />
                                    </div>
                                    <span className="text-[#3F4B66] font-medium text-[9px] md:text-[15px] leading-tight">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-1.5 md:space-y-4 bg-gray-50/80 rounded-xl md:rounded-2xl p-2 md:p-5 border border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-start gap-0.5 md:gap-3">
                                <span className="font-bold text-[#1A255C] text-[9px] md:text-[14px] min-w-[90px]">Duration</span>
                                <span className="text-[#4B5563] text-[9px] md:text-[14px] leading-tight flex-1">1 month of intensive Training</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-start gap-0.5 md:gap-3 mt-1.5">
                                <span className="font-bold text-[#1A255C] text-[9px] md:text-[14px] min-w-[90px]">Certification</span>
                                <span className="text-[#4B5563] text-[9px] md:text-[14px] leading-tight flex-1">Achieve a professional trading Certificate.</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-3 md:pt-6 border-t border-gray-100">
                            <Link href="/mentorship-course" className="block w-full">
                                <button className="w-full relative group overflow-hidden bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-gray-200 text-[#475569] hover:text-[#1E293B] font-bold py-2 md:py-4 rounded-lg md:rounded-xl shadow-sm transition-all duration-300">
                                    <span className="relative z-10 tracking-wider text-[8px] md:text-[14px] uppercase block truncate">Standard Mentorship</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Private Physical Mentorship (Right Card) */}
                <div className="flex-1 bg-white/70 backdrop-blur-xl border-[1.5px] border-[#A8B4E5]/50 rounded-[1rem] md:rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(42,53,99,0.12)] overflow-hidden flex flex-col relative transform md:-translate-y-4 min-w-0">
                    <div className="absolute top-0 left-0 w-full h-[4px] md:h-2 bg-gradient-to-r from-[#2B3563] to-[#4F62A3]"></div>

                    <div className="p-3 md:p-10 flex flex-col h-full bg-gradient-to-bl from-indigo-50/50 to-transparent">
                        <div className="mb-3 md:mb-6">
                            <h3 className="text-[#1E293B] text-[13px] md:text-2xl font-bold mb-1 md:mb-3 tracking-tight leading-tight">Private Physical Mentorship</h3>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-3">
                                <span className="text-[17px] md:text-4xl text-[#059669] font-black drop-shadow-sm leading-none">₦300,000</span>
                            </div>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-[#CBD5E1] via-[#E2E8F0] to-transparent mb-3 md:mb-6"></div>

                        <h4 className="text-[#1E293B] text-[11px] md:text-lg font-bold mb-2 md:mb-4 tracking-wide">Features</h4>

                        <ul className="space-y-2 md:space-y-4 mb-4 md:mb-10 flex-1">
                            <li className="flex items-start gap-1 md:gap-3 bg-gradient-to-r from-emerald-50 to-transparent p-1.5 md:p-2.5 -mx-1.5 md:-mx-2.5 rounded-lg border-l-2 md:border-l-4 border-[#10B981]">
                                <div className="mt-[1px] md:mt-0.5 shrink-0">
                                    <Check className="w-3 md:w-5 h-3 md:h-5 text-[#10B981]" strokeWidth={3} />
                                </div>
                                <span className="text-[#065F46] font-bold text-[9px] md:text-[15px] leading-tight">Exclusive one-on-one sessions</span>
                            </li>
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-1 md:gap-3 pl-1 md:pl-1.5">
                                    <div className="mt-[2px] md:mt-1 shrink-0">
                                        <Check className="w-2.5 md:w-4 h-2.5 md:h-4 text-[#10B981] opacity-80" strokeWidth={3} />
                                    </div>
                                    <span className="text-[#3F4B66] font-medium text-[9px] md:text-[15px] leading-tight">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto">
                            <button className="w-full relative group overflow-hidden bg-gradient-to-r from-[#B9812A] via-[#E2B75A] to-[#B9812A] text-[#111] font-bold py-2 md:py-4 rounded-lg md:rounded-xl shadow-[0_10px_25px_rgba(185,129,42,0.3)] transform hover:scale-[1.02] transition-all duration-300">
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                <span className="relative z-10 tracking-wider text-[8px] md:text-[14px] uppercase drop-shadow-sm block truncate px-1">Enroll Now To Reserve Your Seat</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Info Section with Curved Background */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-3 md:px-6 lg:px-8 pb-16 md:pb-32">

                {/* Curved Background Mask under the right section */}
                <div className="absolute top-0 right-0 w-[55%] md:w-[45%] h-[110%] md:h-[130%] z-0 rounded-tl-[40px] md:rounded-tl-[80px] overflow-hidden shadow-xl border-l-[3px] border-t-[3px] border-white/40 hidden md:block">
                    <Image src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop" alt="Cityscape" fill className="object-cover opacity-90 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EFF3F9]/60 via-[#E4EAF5]/80 to-[#D4DCF1]/90 mix-blend-normal"></div>
                </div>

                {/* 2-Column layout enforced on all sizes */}
                <div className="relative z-10 grid grid-cols-[1.2fr_1fr] md:grid-cols-[1fr_400px] gap-3 md:gap-16 items-start min-h-[300px]">

                    {/* Left Column (Locations & Info) */}
                    <div className="flex flex-col gap-4 md:gap-6 pt-0 md:pt-8 relative drop-shadow-sm">
                        {/* Locations */}
                        <div className="mb-2 md:mb-4">
                            <h3 className="text-[#1A255C] text-[15px] md:text-2xl font-bold mb-1 md:mb-2 tracking-tight leading-tight">Select Your Trading Floor</h3>
                            <p className="text-[#4B5563] text-[11px] md:text-[15px] mb-3 md:mb-6 font-medium">Select the location closest to you:</p>

                            <div className="flex flex-row gap-2 md:gap-4 shrink-0">
                                {/* Abuja */}
                                <div className="relative w-20 h-14 md:w-48 md:h-32 rounded-lg md:rounded-2xl overflow-hidden group cursor-pointer shadow-md border md:border-2 border-transparent hover:border-[#1A255C] transition-colors shrink-0">
                                    <Image src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=600&auto=format&fit=crop" alt="Abuja" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#141E46]/90 via-[#141E46]/40 to-transparent"></div>
                                    <div className="absolute bottom-1.5 md:bottom-3 left-1.5 md:left-4 text-white font-bold text-[10px] md:text-lg flex items-center gap-1 md:gap-2">
                                        <MapPin className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#D4AF37]" /> Abuja
                                    </div>
                                </div>
                                {/* Lagos */}
                                <div className="relative w-20 h-14 md:w-48 md:h-32 rounded-lg md:rounded-2xl overflow-hidden group cursor-pointer shadow-md border md:border-2 border-transparent hover:border-[#1A255C] transition-colors shrink-0">
                                    <Image src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop" alt="Lagos" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#141E46]/90 via-[#141E46]/40 to-transparent"></div>
                                    <div className="absolute bottom-1.5 md:bottom-3 left-1.5 md:left-4 text-white font-bold text-[10px] md:text-lg flex items-center gap-1 md:gap-2">
                                        <MapPin className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#D4AF37]" /> Lagos
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Info */}
                        <div className="bg-white/40 backdrop-blur-sm border border-[#A8B4E5]/30 rounded-xl md:rounded-2xl p-3 md:p-8 max-w-xl">
                            <h4 className="text-[#1A255C] text-[13px] md:text-xl font-bold mb-2 md:mb-4 tracking-tight">Important Information</h4>
                            <p className="text-[#4B5563] text-[9px] md:text-[15px] leading-tight md:leading-relaxed mb-2 md:mb-4">
                                Please choose a Trading Floor closest to your location for better learning experience.
                            </p>
                            <p className="text-[#4B5563] text-[9px] md:text-[15px] leading-tight md:leading-relaxed">
                                If you cannot attend physically, you may enroll in the{' '}
                                <Link href="/mentorship-course" className="text-[#10B981] font-bold hover:text-[#059669] hover:underline decoration-2 underline-offset-4 transition-colors">
                                    Online Mentorship Program
                                </Link>
                                {' '}instead.
                            </p>
                        </div>
                    </div>

                    {/* Right Column (Certificate & Enroll) */}
                    <div className="flex flex-col items-center justify-end gap-3 md:gap-6 pt-2 md:pt-16 px-1 md:px-0 h-full">
                        {/* Certificate Decorator */}
                        <div className="relative w-[160px] md:w-full max-w-[380px] aspect-[1.35/1] rounded-md md:rounded-xl shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] bg-white border-4 md:border-8 border-white p-1 md:p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden mx-auto">
                            <div className="absolute inset-0 border-[1px] md:border-[1.5px] border-[#D4AF37] opacity-60 m-1 md:m-3 pointer-events-none"></div>
                            <div className="w-full h-full flex flex-col items-center justify-center text-center px-1 md:px-6">
                                <div className="w-5 h-5 md:w-12 md:h-12 rounded-full border border-gray-200 shadow-inner flex items-center justify-center mb-1 md:mb-3 bg-gray-50">
                                    <ShieldCheck className="w-2.5 h-2.5 md:w-6 md:h-6 text-[#1A255C]" />
                                </div>
                                <h5 className="font-serif text-[#1A255C] text-[8px] md:text-lg font-extrabold tracking-widest uppercase mb-0.5 md:mb-2">Masterclass Trading</h5>
                                <p className="text-[#B9812A] text-[4.5px] md:text-[10px] font-medium tracking-[0.2em] uppercase mb-1 md:mb-4">Certificate of Completion</p>
                                <div className="w-4/5 border-b-[0.5px] md:border-b border-gray-400 mb-1 md:mb-3"></div>
                                <p className="text-gray-500 text-[5px] md:text-xs italic font-medium">[Student Name]</p>
                            </div>
                        </div>

                        <div className="w-full text-center mt-2 md:mt-4">
                            <h3 className="text-[#1A255C] text-[11px] md:text-2xl font-bold mb-2 md:mb-4 tracking-tight drop-shadow-sm leading-tight">
                                Enroll Now <span className="font-medium opacity-80 block md:inline text-[9px] md:text-[22px]">To Reserve Your Seat</span>
                            </h3>
                            <button className="w-full relative group overflow-hidden bg-gradient-to-r from-[#B9812A] via-[#E2B75A] to-[#B9812A] text-[#111] font-bold py-2 md:py-4 rounded-lg md:rounded-xl shadow-[0_10px_20px_-3px_rgba(185,129,42,0.4)] transform hover:scale-[1.02] active:scale-95 transition-all duration-300">
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                                <span className="relative z-10 tracking-[0.08em] md:tracking-widest text-[7.5px] md:text-[14px] uppercase drop-shadow-sm block truncate px-1">Enroll Now To Reserve Your Seat</span>
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}
