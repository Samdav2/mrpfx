'use client';

import Image from 'next/image';
import Link from 'next/link';

const MentorshipCourse = () => {
  return (
    <div className="bg-[#f8f9fe] min-h-screen font-dm-sans py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">

          {/* Left Column - Content */}
          <div className="flex-1 space-y-6 lg:space-y-8 lg:pr-8">
            {/* Tag */}
            <div className="text-[#0052cc] font-bold tracking-widest text-xs md:text-sm uppercase bg-[#0052cc]/10 inline-block px-3 py-1.5 rounded-full">
              Standard Mentorship
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-[#1a1a1a] leading-[1.15] lg:leading-[1.1] tracking-tight">
              Learn to Trade Like a <br className="hidden sm:block" />
              <span className="text-[#0052cc]">Professional Trader</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg sm:text-xl md:text-2xl text-[#1a1a1a] font-medium leading-relaxed sm:leading-snug max-w-2xl">
              Gain Immediate Access to <span className="font-bold">10 Intensive Recorded<br className="hidden sm:block" /> Sessions</span> from Beginner to <span className="font-bold text-[#0052cc]">Pro Level Trading</span>
            </h2>

            {/* Mobile-only subtitle variant (based on mobile design) */}
            <div className="block lg:hidden text-gray-600 text-[15px] leading-relaxed">
              Get immediate access to intensive recorded sessions that break down the principles,
              chart behavior, and execution logic needed to grow from beginner level to more professional trading.
            </div>

            <div className="hidden lg:flex flex-wrap gap-x-8 gap-y-4 text-[#1a1a1a] font-medium text-[15px]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#0052cc] flex items-center justify-center text-white shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                10 Recorded Sessions
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#0052cc] flex items-center justify-center text-white shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Proven Strategies
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#0052cc] flex items-center justify-center text-white shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Learn at Your Own Pace
              </div>
            </div>

            {/* CTA & Guarantee */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-2 lg:pt-4">
              <Link
                href="/checkout?product=standard-mentorship"
                className="w-full sm:w-auto bg-[#0052cc] hover:bg-[#0047b3] text-white font-semibold text-[17px] py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,82,204,0.3)] shadow-[#0052cc]/30"
              >
                Get Instant Access Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>

              {/* Mobile Watch Preview */}
              <button className="w-full sm:hidden border-2 border-[#0052cc] text-[#0052cc] bg-white font-semibold text-[16px] py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0052cc" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="white"></circle><polygon points="10 8 16 12 10 16 10 8" fill="#0052cc"></polygon></svg>
                Watch Preview
              </button>

              <div className="hidden sm:flex items-center gap-2 text-gray-600 font-medium whitespace-nowrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0052cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                30-Day Money-Back Guarantee
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 lg:mt-12">
              <div className="bg-white rounded-xl p-4 flex items-center gap-3 md:flex-col md:text-center md:items-center xl:flex-row xl:text-left shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-[#0052cc] bg-[#f0f4ff] p-2 rounded-lg shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div className="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] leading-tight flex-1">Beginner to<br className="hidden md:block xl:hidden" /> Pro Breakdown</div>
              </div>
              <div className="bg-white rounded-xl p-4 flex items-center gap-3 md:flex-col md:text-center md:items-center xl:flex-row xl:text-left shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-[#0052cc] bg-[#f0f4ff] p-2 rounded-lg shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <div className="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] leading-tight flex-1">Chart Analysis<br className="hidden md:block xl:hidden" /> & Strategies</div>
              </div>
              <div className="bg-white rounded-xl p-4 flex items-center gap-3 md:flex-col md:text-center md:items-center xl:flex-row xl:text-left shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-[#0052cc] bg-[#f0f4ff] p-2 rounded-lg shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
                </div>
                <div className="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] leading-tight flex-1">Execution & Risk<br className="hidden md:block xl:hidden" /> Management</div>
              </div>
              <div className="bg-white rounded-xl p-4 flex items-center gap-3 md:flex-col md:text-center md:items-center xl:flex-row xl:text-left shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-[#0052cc] bg-[#f0f4ff] p-2 rounded-lg shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 12l-4-4-4 4"></path><path d="M12 16V8"></path></svg>
                </div>
                <div className="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] leading-tight flex-1">Lifetime<br className="hidden md:block xl:hidden" /> Access</div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-6 sm:pt-8 md:divide-x divide-gray-200 bg-gray-50/50 p-4 sm:p-0 rounded-xl sm:bg-transparent sm:rounded-none">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex -space-x-3 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden"><Image src="/images/home/testi.png" alt="user" width={40} height={40} className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white overflow-hidden"><Image src="/images/home/Group-162.png" alt="user" width={40} height={40} className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-white overflow-hidden"><Image src="/images/home/image-10.png" alt="user" width={40} height={40} className="object-cover" /></div>
                </div>
                <div className="text-[#1a1a1a] text-[14px] sm:text-[15px]">
                  <span className="font-bold">10k+</span> Students<br className="block sm:hidden" /> Enrolled
                </div>
              </div>
              <div className="px-0 sm:px-6 flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-gray-200 sm:border-0">
                <div className="flex gap-0.5 text-[#fbbf24] shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <div className="text-[#1a1a1a] text-[14px] sm:text-[15px]">
                  <span className="font-bold">4.9/5</span> <span className="text-gray-500">(1,200+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Mobile Feature List (Bottom) */}
            <div className="block lg:hidden mt-10">
              <h3 className="text-xl sm:text-[22px] font-bold text-[#1a1a1a] mb-5">See What You'll Learn Inside</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-[#0052cc]/10 flex items-center justify-center text-[#0052cc] shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="text-[#1a1a1a] font-medium text-sm">10+ Intensive Video Sessions</div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-[#0052cc]/10 flex items-center justify-center text-[#0052cc] shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="text-[#1a1a1a] font-medium text-sm">Beginner to Pro-Level Breakdown</div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-[#0052cc]/10 flex items-center justify-center text-[#0052cc] shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="text-[#1a1a1a] font-medium text-sm">Learn at Your Own Pace</div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-[#0052cc]/10 flex items-center justify-center text-[#0052cc] shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="text-[#1a1a1a] font-medium text-sm">Community Access included</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Image & Pricing Card */}
          <div className="w-full lg:w-[480px] shrink-0 flex flex-col items-center mt-8 lg:mt-0">

            {/* Thumbnail & Video button */}
            <div className="relative w-full rounded-[24px] overflow-hidden shadow-2xl mb-8 group cursor-pointer border-4 border-white">
              <Image
                src="/assets/home/mrpfx-header-image-1.jpg"
                alt="Video thumbnail"
                width={600}
                height={400}
                className="w-full h-[240px] sm:h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#00000040] group-hover:bg-[#00000060] transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] mb-3 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0052cc" stroke="#0052cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <div className="text-white font-bold tracking-widest text-[12px] sm:text-sm drop-shadow-md bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-sm">WATCH INTRO VIDEO</div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 w-full shadow-[0_15px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col lg:absolute lg:top-[300px] lg:right-0 lg:w-[380px] z-10 mx-auto max-w-md lg:max-w-none">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">Standard Mentorship</h3>
              <div className="text-sm text-gray-500 mb-6 block lg:hidden">Immediate access to recorded sessions</div>

              <div className="flex items-center gap-3 sm:gap-4 mb-6 relative">
                <div className="text-xl sm:text-3xl text-gray-400 line-through font-medium tracking-tight">$1,590</div>
                <div className="text-3xl sm:text-[42px] font-black text-[#0052cc] tracking-tight">$499.99</div>
              </div>

              {/* Mobile tick list inside card */}
              <ul className="space-y-3 mb-6 block lg:hidden text-sm text-gray-700 bg-gray-50/50 p-4 rounded-xl">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0052cc] shrink-0 shadow-sm border border-gray-100"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  <span className="font-medium text-[#1a1a1a]">One-time payment</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0052cc] shrink-0 shadow-sm border border-gray-100"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  <span className="font-medium text-[#1a1a1a]">Instant access after purchase</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0052cc] shrink-0 shadow-sm border border-gray-100"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  <span className="font-medium text-[#1a1a1a]">Learn on your own schedule</span>
                </li>
              </ul>

              <Link
                href="/checkout?product=standard-mentorship"
                className="w-full bg-[#0052cc] hover:bg-[#0047b3] text-white font-bold text-[17px] py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,82,204,0.3)] hover:shadow-[0_12px_25px_rgba(0,82,204,0.4)] hover:-translate-y-0.5"
              >
                Get Instant Access
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hidden lg:block"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>

              <div className="mt-5 flex items-center justify-center gap-2 text-[13px] text-gray-500 font-medium tracking-wide">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Instant Access After Payment
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default MentorshipCourse;
