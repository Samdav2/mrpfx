'use client';

import Image from 'next/image';
import Link from 'next/link';

const MentorshipCourse = () => {
  return (
    <div className="bg-[#f8f9fe] min-h-screen font-dm-sans py-8 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">

          {/* Left Column - Content */}
          <div className="flex-1 space-y-6 lg:space-y-8 lg:pr-8">
            {/* Tag */}
            <div className="text-[#0052cc] font-bold tracking-widest text-sm uppercase">
              STANDARD MENTORSHIP
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-[#1a1a1a] leading-[1.1]">
              Learn to Trade Like a <br className="hidden md:block" />
              <span className="text-[#0052cc]">Professional Trader</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl text-[#1a1a1a] font-medium leading-snug">
              Gain Immediate Access to <span className="font-bold">10 Intensive Recorded<br className="hidden md:block" /> Sessions</span> from Beginner to <span className="font-bold">Pro Level Trading</span>
            </h2>

            {/* Mobile-only subtitle variant (based on mobile design) */}
            <div className="block lg:hidden text-gray-600 text-[15px] leading-relaxed mt-4">
              Get immediate access to intensive recorded sessions that break down the principles,
              chart behavior, and execution logic needed to grow from beginner level to more professional trading.
            </div>

            {/* Checks List */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:hidden hidden">
              {/* Hidden on mobile to match the design. Moved below.  */}
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
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2 lg:pt-4">
              <Link
                href="/checkout?product=standard-mentorship"
                className="w-full sm:w-auto bg-[#0052cc] hover:bg-[#0047b3] text-white font-semibold text-[17px] py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,82,204,0.3)]"
              >
                Get Instant Access Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>

              {/* Mobile Watch Preview */}
              <button className="w-full sm:hidden border border-gray-200 bg-white text-gray-800 font-medium py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0052cc" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="white"></circle><polygon points="10 8 16 12 10 16 10 8" fill="#0052cc"></polygon></svg>
                Watch Preview
              </button>

              <div className="hidden sm:flex items-center gap-2 text-gray-600 font-medium">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0052cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                30-Day Money-Back Guarantee
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 lg:mt-12">
              <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="text-[#0052cc]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div className="text-[13px] font-semibold text-[#1a1a1a] leading-tight flex-1">Beginner to<br />Pro Breakdown</div>
              </div>
              <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="text-[#0052cc]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <div className="text-[13px] font-semibold text-[#1a1a1a] leading-tight flex-1">Chart Analysis<br />& Strategies</div>
              </div>
              <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="text-[#0052cc]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
                </div>
                <div className="text-[13px] font-semibold text-[#1a1a1a] leading-tight flex-1">Execution & Risk<br />Management</div>
              </div>
              <div className="bg-white rounded-xl p-4 hidden md:flex items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="text-[#0052cc]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 12l-4-4-4 4"></path><path d="M12 16V8"></path></svg>
                </div>
                <div className="text-[13px] font-semibold text-[#1a1a1a] leading-tight flex-1">Lifetime<br />Access</div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6 sm:pt-8 md:divide-x divide-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden"><Image src="/images/home/testi.png" alt="user" width={40} height={40} className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white overflow-hidden"><Image src="/images/home/Group-162.png" alt="user" width={40} height={40} className="object-cover" /></div>
                  <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-white overflow-hidden"><Image src="/images/home/image-10.png" alt="user" width={40} height={40} className="object-cover" /></div>
                </div>
                <div className="text-[#1a1a1a] text-[15px]">
                  <span className="font-bold">10k+</span> Students Enrolled
                </div>
              </div>
              <div className="px-0 sm:px-6 flex items-center gap-3">
                <div className="flex gap-1 text-[#fbbf24]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <div className="text-[#1a1a1a] text-[15px]">
                  <span className="font-bold">4.9/5</span> <span className="text-gray-500">(1,200+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Mobile Feature List (Bottom) */}
            <div className="block lg:hidden mt-8">
              <h3 className="text-[22px] font-bold text-[#1a1a1a] mb-5">See What You'll Learn Inside</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#eef2fc] flex items-center justify-center text-[#0052cc] shrink-0 border border-[#0052cc]/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="text-[#1a1a1a]">10+ Intensive Recorded Sessions</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#eef2fc] flex items-center justify-center text-[#0052cc] shrink-0 border border-[#0052cc]/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="text-[#1a1a1a]">Beginner to Pro-Level Breakdown</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#eef2fc] flex items-center justify-center text-[#0052cc] shrink-0 border border-[#0052cc]/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="text-[#1a1a1a]">Learn at Your Own Pace</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Image & Pricing Card */}
          <div className="w-full lg:w-[480px] shrink-0 flex flex-col items-center">

            {/* Thumbnail & Video button */}
            <div className="relative w-full rounded-[24px] overflow-hidden shadow-2xl mb-6 hidden lg:block group cursor-pointer border-4 border-white">
              <Image
                src="/assets/home/mrpfx-header-image-1.jpg"
                alt="Video thumbnail"
                width={600}
                height={400}
                className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#00000030] group-hover:bg-[#00000050] transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] mb-3 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#000" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <div className="text-white font-bold tracking-widest text-sm drop-shadow-md">WATCH INTRO VIDEO</div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-[24px] p-6 lg:p-8 w-full shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col lg:absolute lg:top-[300px] lg:right-0 lg:w-[380px] z-10 bottom-auto static order-first lg:order-none mb-8 lg:mb-0">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">Standard Mentorship</h3>
              <div className="text-sm text-gray-500 mb-6 block lg:hidden">Immediate access to recorded sessions</div>

              <div className="flex items-center gap-4 mb-6 relative">
                <div className="text-2xl lg:text-3xl text-gray-400 line-through font-medium tracking-tight">$1,590</div>
                <div className="text-4xl lg:text-[42px] font-black text-[#0052cc] tracking-tight">$499.99</div>

                {/* Mobile tiny chart visual */}
                <div className="absolute right-0 top-0 bottom-0 w-24 hidden sm:block lg:hidden opacity-80">
                  <Image src="/assets/mentorship/hero-image.png" alt="chart" fill className="object-cover rounded-sm mix-blend-multiply opacity-50 grayscale hover:grayscale-0" />
                </div>
              </div>

              {/* Mobile tick list inside card */}
              <ul className="space-y-3 mb-6 block lg:hidden text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#eef2fc] flex items-center justify-center text-[#0052cc] shrink-0 border border-[#0052cc]/20"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  One-time payment
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#eef2fc] flex items-center justify-center text-[#0052cc] shrink-0 border border-[#0052cc]/20"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  Instant access after purchase
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#eef2fc] flex items-center justify-center text-[#0052cc] shrink-0 border border-[#0052cc]/20"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  Learn on your own schedule
                </li>
              </ul>

              <Link
                href="/checkout?product=standard-mentorship"
                className="w-full bg-[#0052cc] hover:bg-[#0047b3] text-white font-semibold text-[17px] py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,82,204,0.3)]"
              >
                Get Instant Access
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden lg:block"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-[13px] text-gray-500 font-medium tracking-wide">
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
