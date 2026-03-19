'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Clock } from 'lucide-react';
import { getMentorshipSettings } from '@/app/actions/mentorship-settings';

interface MentorshipModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MentorshipModal: React.FC<MentorshipModalProps> = ({ isOpen, onClose }) => {
    const [countdown, setCountdown] = useState<string | null>(null);
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        let interval: NodeJS.Timeout;

        getMentorshipSettings().then(data => {
            if (data?.registrationOpenDate) {
                const target = new Date(data.registrationOpenDate).getTime();

                const updateCountdown = () => {
                    const now = new Date().getTime();
                    const diff = target - now;

                    if (diff > 0) {
                        setIsLocked(true);
                        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        const s = Math.floor((diff % (1000 * 60)) / 1000);

                        setCountdown(`${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`);
                    } else {
                        setIsLocked(false);
                        setCountdown(null);
                        clearInterval(interval);
                    }
                };

                updateCountdown();
                interval = setInterval(updateCountdown, 1000);
            }
        });

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
            onClick={onClose}
        >
            <div className="flex min-h-full items-start justify-center p-4 sm:p-6 text-center">
                <div
                    className="relative bg-[#f8f5ff] text-left rounded-3xl p-5 sm:p-8 w-full max-w-5xl shadow-2xl animate-in zoom-in-95 duration-200 border border-purple-100 my-4 sm:my-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-sm z-10"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-6 mt-6 sm:mt-0">
                        {/* Standard Mentorship */}
                        <div className="bg-white rounded-2xl p-3 sm:p-6 shadow-sm border border-gray-50 relative pt-7 sm:pt-10">
                            <div className="absolute top-0 left-0 bg-[#7B61FF] text-white text-[9px] sm:text-xs font-bold px-2 sm:px-4 py-1 sm:py-1.5 rounded-br-lg rounded-tl-2xl tracking-wider uppercase">
                                POPULAR
                            </div>
                            <div className="flex gap-2 sm:gap-4 items-start mb-2 sm:mb-4">
                                <div className="shrink-0 text-[#7B61FF]">
                                    <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-[#312E81] text-[14px] sm:text-2xl font-semibold mb-0.5 sm:mb-2 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>Standard Mentorship</h3>
                                    <p className="text-gray-600 text-[10px] sm:text-base leading-[1.3] sm:leading-relaxed">
                                        Gain immediate access to 10 intensive recorded sessions from beginner to pro level trading.
                                    </p>
                                </div>
                            </div>
                            <Link href="/mentorship-course" onClick={onClose} className="block mt-3 sm:mt-6">
                                <button className="w-full py-1.5 sm:py-3 bg-gradient-to-r from-[#7B61FF] to-[#9B88ED] text-white font-semibold text-[12px] sm:text-base rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity shadow-sm sm:shadow-md shadow-purple-200">
                                    Get Started
                                </button>
                            </Link>
                        </div>

                        {/* One-On-One Mentorship */}
                        <div className="bg-white rounded-2xl p-3 sm:p-6 shadow-sm border border-gray-50 relative pt-7 sm:pt-10">
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-[#E6C687] to-[#C9A056] text-black text-[9px] sm:text-xs font-bold px-2 sm:px-4 py-1 sm:py-1.5 rounded-bl-lg rounded-tr-2xl tracking-wider uppercase">
                                PREMIUM
                            </div>
                            <div className="flex gap-2 sm:gap-4 items-start mb-2 sm:mb-4">
                                <div className="shrink-0 text-[#7B61FF]">
                                    <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        <path d="M8 10h.01"></path>
                                        <path d="M12 10h.01"></path>
                                        <path d="M16 10h.01"></path>
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-[#312E81] text-[14px] sm:text-2xl font-semibold mb-0.5 sm:mb-2 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>One-On-One Mentorship</h3>
                                    <p className="text-gray-600 text-[10px] sm:text-base leading-[1.3] sm:leading-relaxed">
                                        Get direct access to be mentored personally by Mr P, with one-on-one sessions focused solely on your growth.
                                    </p>
                                </div>
                            </div>
                            <Link href="/private-mentorship" onClick={onClose} className="block mt-3 sm:mt-6">
                                <button className="w-full py-1.5 sm:py-3 bg-gradient-to-r from-[#D6B56E] to-[#EBD299] text-white font-semibold text-[12px] sm:text-base rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity shadow-sm sm:shadow-md shadow-yellow-100">
                                    Get Started
                                </button>
                            </Link>
                        </div>

                        {/* Physical Classes */}
                        <div className="bg-white rounded-2xl p-3 sm:p-6 shadow-sm border border-gray-50 relative pt-3 sm:pt-6 lg:pt-10">
                            <div className="flex gap-2 sm:gap-4 items-start mb-2 sm:mb-4">
                                <div className="shrink-0 text-[#7B61FF]">
                                    <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                        <line x1="8" y1="21" x2="16" y2="21"></line>
                                        <line x1="12" y1="17" x2="12" y2="21"></line>
                                        <path d="M7 11l2 2 4-4"></path>
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-[#312E81] text-[14px] sm:text-2xl font-semibold mb-0.5 sm:mb-2 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>Physical Classes</h3>
                                    <p className="text-gray-600 text-[10px] sm:text-base leading-[1.3] sm:leading-relaxed">
                                        Visit any of our branches to be mentored in person by our expert traders for hands-on learning.
                                    </p>
                                </div>
                            </div>
                            <Link href="/physical-classes" onClick={onClose} className="block mt-3 sm:mt-6 md:mt-auto">
                                <button className="w-full py-1.5 sm:py-3 bg-gradient-to-r from-[#7B61FF] to-[#9B88ED] text-white font-semibold text-[12px] sm:text-base rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity shadow-sm sm:shadow-md shadow-purple-200">
                                    Get Started
                                </button>
                            </Link>
                        </div>

                        {/* Mentorship Course 100 */}
                        <div className="bg-white rounded-2xl p-3 sm:p-6 shadow-sm border border-gray-50 relative pt-7 sm:pt-10 flex flex-col">
                            <div className="absolute top-0 right-0 bg-[#A62B54] text-white text-[9px] sm:text-xs font-bold px-2 sm:px-4 py-1 sm:py-1.5 rounded-bl-lg rounded-tr-2xl tracking-wider uppercase">
                                ONLY 100 SPOTS
                            </div>
                            <div className="flex gap-2 sm:gap-4 items-start mb-2 sm:mb-4 flex-1">
                                <div className="shrink-0 text-[#7B61FF]">
                                    <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                        <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-[#312E81] text-[14px] sm:text-2xl font-semibold mb-0.5 sm:mb-2 leading-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>Mentorship Course 100</h3>
                                    <p className="text-gray-600 text-[10px] sm:text-base leading-[1.3] sm:leading-relaxed">
                                        One of only 100 spots available where Mr P will be teaching personally through Zoom.
                                    </p>
                                </div>
                            </div>
                            {isLocked && countdown ? (
                                <div className="mt-3 sm:mt-6 bg-[#fdf2f8] rounded-lg sm:rounded-xl p-2 sm:p-3 flex items-center justify-center gap-2 border border-[#fce7f3]">
                                    <Clock className="w-4 h-4 text-[#9E2A68]" />
                                    <span className="text-[#9E2A68] font-bold text-xs sm:text-sm tracking-wide">OPENS IN: {countdown}</span>
                                </div>
                            ) : (
                                <Link href="/mentorship-course-100" onClick={onClose} className="block mt-3 sm:mt-6">
                                    <button className="w-full py-1.5 sm:py-3 bg-[#9E2A68] text-white font-semibold text-[12px] sm:text-base rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity shadow-sm sm:shadow-md shadow-pink-200">
                                        Get Started
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 text-center text-[#312E81] sm:text-lg">
                        Unlock Your Trading Potential with MR P FX's Proven <strong>Mentorship Programs.</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorshipModal;
