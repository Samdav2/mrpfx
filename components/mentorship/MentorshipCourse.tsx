'use client';

import Image from 'next/image';
import Link from 'next/link';

const MentorshipCourse = () => {
  return (
    <div className="bg-white min-h-screen font-dm-sans overflow-hidden relative">
      {/* Background Image/Overlay (Primarily for Mobile/Desktop top section) */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none z-0">
        <Image
          src="/images/vip-bg-city.jpg"
          alt="city background"
          fill
          className="object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-[#f8f9fc]/80 to-[#f3f5fa]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-8 md:pt-12 lg:pt-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 xl:gap-14 relative items-start">

          {/* Left Column - Content */}
          <div className="flex-1 min-w-0 flex flex-col pt-4 lg:pt-0">
            {/* Title */}
            <h1 className="text-[34px] sm:text-5xl lg:text-[60px] font-bold text-[#1e2e6b] leading-[1.2] tracking-tight mb-4 lg:mb-6">
              Standard <span className="text-[#1e4ced]">Mentorship</span>
            </h1>

            {/* Subtitle/Description - Mobile specific string */}
            <p className="text-[16px] sm:text-xl lg:text-[22px] text-[#2a2a2a] font-medium leading-relaxed max-w-2xl mb-4 lg:hidden">
              Learn to trade with structure, clarity, and confidence.
            </p>
            <p className="text-[14px] sm:text-lg lg:text-[22px] text-[#555] leading-relaxed max-w-2xl lg:hidden font-medium mb-6">
              Get immediate access to intensive recorded sessions that break down the principles, chart behavior, and execution logic needed to grow from beginner level to more professional trading.
            </p>

            {/* Subtitle/Description - Desktop specific string */}
            <p className="hidden lg:block text-xl lg:text-[22px] text-[#1a1a1a] font-bold leading-snug max-w-2xl mb-6">
              Gain Immediate Access to <span className="text-[#1e4ced]">10 Intensive Recorded Sessions</span> from Beginner to Pro Level Trading
            </p>

            {/* Feature List Ticks - Desktop Only */}
            <div className="hidden lg:flex flex-wrap gap-x-8 gap-y-4 text-[#1a1a1a] font-bold text-[15px] lg:text-[17px] mb-8">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1e4ced] flex items-center justify-center text-white shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                10 Recorded Sessions
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1e4ced] flex items-center justify-center text-white shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Proven Strategies
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1e4ced] flex items-center justify-center text-white shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Learn at Your Own Pace
              </div>
            </div>

            {/* CTA & Guarantee Button Row */}
            <div className="flex flex-col items-start gap-4 pt-2 lg:pt-8 w-full sm:w-auto">
              <Link
                href="/checkout?product=standard-mentorship"
                className="w-full sm:w-[320px] bg-[#224ee0] hover:bg-[#1a41cc] text-white font-medium text-[15px] lg:text-[18px] py-3.5 lg:py-4 px-6 lg:px-8 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(30,76,237,0.25)] group"
              >
                Get Instant Access Now
              </Link>

              <button className="flex items-center gap-2 text-[#1a1a1a] font-semibold text-[13px] bg-white lg:bg-transparent border border-gray-200 lg:border-transparent px-4 py-2 lg:p-0 rounded-lg shadow-sm lg:shadow-none hover:bg-gray-50 transition-colors">
                <div className="w-5 h-5 rounded-full bg-[#224ee0] flex items-center justify-center text-white shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                Watch Preview
              </button>
            </div>

            {/* Feature Bar (Desktop/Mobile Bottom of Hero) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2.5 xl:gap-4 mt-8 lg:mt-12 bg-white lg:bg-gray-50/50 p-4 lg:p-2.5 rounded-2xl border border-gray-100 lg:border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] min-w-0 w-full relative z-10 lg:shadow-none mb-4 lg:mb-0">
              {/* Divider for mobile (between col 1 and 2) */}
              <div className="absolute left-1/2 top-6 bottom-6 w-[1px] bg-gray-100 lg:hidden pointer-events-none" />

              {[
                { label: "10+ Intensive", sub: "Recorded Sessions", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path><rect x="3" y="6" width="12" height="12" rx="2" ry="2"></rect></svg> },
                { label: "Beginner to", sub: "Pro-Level Breakdown", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="3"></line><line x1="8" y1="12" x2="8" y2="16" stroke="white" strokeWidth="3"></line><line x1="16" y1="14" x2="16" y2="16" stroke="white" strokeWidth="3"></line></svg> },
                { label: "Chart Analysis", sub: "& Strategies", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>, desktopOnly: true },
                { label: "Lifetime", sub: "Access", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>, desktopOnly: true }
              ].map((item, i) => (
                <div key={i} className={`flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-3 bg-transparent p-1 lg:bg-white lg:p-3 xl:p-4 lg:rounded-xl lg:shadow-[0_2px_10px_rgba(0,0,0,0.03)] lg:border lg:border-gray-50 text-center lg:text-left transition-all min-w-0 ${item.desktopOnly ? 'hidden lg:flex' : 'flex'}`}>
                  <div className="w-14 h-14 lg:w-10 lg:h-10 rounded-2xl lg:rounded-xl bg-[#ebf2ff] flex items-center justify-center text-[#4a85f6] shrink-0 mb-1 lg:mb-0">
                    {item.icon}
                  </div>
                  <div className="flex flex-col min-w-0 items-center lg:items-start">
                    <span className="text-[13px] sm:text-[13px] xl:text-[14px] font-bold text-[#1a1a1a] leading-tight mb-1 break-words whitespace-normal text-center lg:text-left">{item.label}</span>
                    <span className="text-[11px] sm:text-[11px] xl:text-[12px] text-gray-500 font-medium leading-[1.3] break-words whitespace-normal text-center lg:text-left">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof Row */}
            <div className="flex flex-wrap items-center gap-6 pt-8 pb-4 border-t border-gray-100 mt-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden"><Image src="/images/home/testi.png" alt="user" width={40} height={40} className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white overflow-hidden"><Image src="/images/home/Group-162.png" alt="user" width={40} height={40} className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-white overflow-hidden"><Image src="/images/home/image-10.png" alt="user" width={40} height={40} className="object-cover" /></div>
                </div>
                <div className="text-[#1a1a1a] text-[15px] font-bold">
                  10k+ <span className="text-gray-500">Students Enrolled</span>
                </div>
              </div>

              <div className="h-6 w-[1px] bg-gray-200 hidden lg:block" />

              <div className="flex items-center gap-3">
                <div className="flex gap-0.5 text-[#fbbf24] shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  ))}
                </div>
                <div className="text-[#1a1a1a] text-[15px] font-bold">
                  4.9/5 <span className="text-gray-500">(1,200+ Reviews)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Video & Floating Pricing Card */}
          <div className="w-full lg:w-[360px] xl:w-[440px] shrink-0 flex flex-col gap-6 lg:gap-8 lg:pt-2">

            {/* Video Preview Box (Hidden on Mobile, Displayed on Desktop) */}
            <div className="hidden lg:block relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white group cursor-pointer z-10 mt-8">
              <Image
                src="/assets/home/mrpfx-header-image-1.jpg"
                alt="Standard Mentorship Preview"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />

              {/* Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl mb-4 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1e4ced" stroke="#1e4ced" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 sm:ml-1.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <div className="text-white font-bold tracking-widest text-[12px] sm:text-sm drop-shadow-md">WATCH INTRO VIDEO</div>
              </div>
            </div>

            {/* Pricing Card (Proper flow, perfectly aligning with feature bar edge) */}
            <div className="w-full bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] lg:shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col z-20 relative overflow-hidden mt-6 lg:mt-0">

              {/* Background Chart Image for mobile sizing */}
              <div className="absolute right-[-40px] bottom-16 sm:bottom-20 w-56 h-36 opacity-[0.15] pointer-events-none">
                {/* Visual representation of a chart faded in the background */}
                <div className="w-full h-full relative border border-gray-200">
                  <div className="absolute bottom-4 left-4 w-[2px] h-12 bg-blue-600"></div>
                  <div className="absolute bottom-4 left-[14px] w-1.5 h-8 bg-blue-600"></div>

                  <div className="absolute bottom-10 left-8 w-[2px] h-8 bg-red-500"></div>
                  <div className="absolute bottom-8 left-[30px] w-1.5 h-12 bg-red-500"></div>

                  <div className="absolute bottom-6 left-12 w-[2px] h-16 bg-blue-600"></div>
                  <div className="absolute bottom-6 left-[46px] w-1.5 h-10 bg-blue-600"></div>

                  <div className="absolute bottom-14 left-16 w-[2px] h-10 bg-blue-600"></div>
                  <div className="absolute bottom-12 left-[62px] w-1.5 h-14 bg-blue-600"></div>

                  <div className="absolute bottom-16 left-20 w-[2px] h-20 bg-blue-600"></div>
                  <div className="absolute bottom-16 left-[78px] w-1.5 h-12 bg-blue-600"></div>

                  <div className="absolute bottom-22 left-24 w-[2px] h-14 bg-blue-600"></div>
                  <div className="absolute bottom-20 left-[94px] w-1.5 h-18 bg-blue-600"></div>
                </div>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-[#1e2e6b] mb-1">Standard Mentorship</h3>
              <div className="text-[13px] text-[#444] mb-6 font-medium">Immediate access to recorded sessions</div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg text-red-800 line-through font-medium opacity-60">$1,590</span>
                <span className="text-[40px] font-black text-[#1a4a38] leading-none">$499.99</span>
              </div>

              <div className="flex flex-col gap-3 mb-8 text-[#444] text-[13.5px] font-medium z-10">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#f0f5ff] flex items-center justify-center text-[#1e4ced] shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  One-time payment
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#f0f5ff] flex items-center justify-center text-[#1e4ced] shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  Instant access after purchase
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#f0f5ff] flex items-center justify-center text-[#1e4ced] shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  Learn on your own schedule
                </div>
              </div>

              <Link
                href="/checkout?product=standard-mentorship"
                className="w-full bg-[#1e4ced] hover:bg-[#1a41cc] text-white font-semibold text-[16px] py-3.5 rounded-lg transition-all flex items-center justify-center z-10"
              >
                Get Instant Access Now
              </Link>
            </div>

          </div>

        </div>

        {/* Bottom Section - "See What You'll Learn Inside" */}
        <div className="mt-20 lg:mt-32 pb-20">
          {/* Section Title */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#1e2e6b] text-center md:text-left">See What You'll Learn Inside</h2>
            <div className="h-[2px] flex-1 w-full bg-gradient-to-r from-gray-200 to-transparent hidden md:block" />
          </div>

          <div className="flex flex-col gap-4">
            {[
              "10+ Intensive Recorded Sessions",
              "Beginner to Pro-Level Breakdown",
              "Learn at Your Own Pace"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#e8f1ff] flex items-center justify-center text-[#1e4ced] shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-[#444] font-medium text-[15px] leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MentorshipCourse;
