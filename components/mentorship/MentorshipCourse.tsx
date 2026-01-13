'use client';

import Image from 'next/image';
import Link from 'next/link';

const MentorshipCourse = () => {
  return (
    <div className="bg-white min-h-screen font-dm-sans">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-block bg-gray-200 rounded-lg px-4 py-2">
                <span className="text-black font-semibold text-lg">Never stop learning</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black text-black leading-tight">
                VIP<br />Mentorship Course
              </h1>

              {/* Divider Line */}
              <div className="w-64 h-2">
                <Image
                  src="/assets/mentorship/divider.png"
                  alt="Divider"
                  width={262}
                  height={10}
                  className="object-contain"
                />
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-4">
                <span className="bg-green-100 text-green-700 font-semibold text-xl px-4 py-2 rounded-lg">
                  $499.99
                </span>
                <span className="text-red-500 font-bold text-xl line-through px-4 py-2">
                  $1,590.00
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 items-center pt-4">
                <Link
                  href="/checkout?product=vip-mentorship"
                  className="bg-[#06B6D4] hover:bg-[#0891b2] text-white font-extrabold text-lg py-4 px-12 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl uppercase tracking-wider"
                  style={{ backgroundColor: '#06B6D4', color: '#ffffff' }}
                >
                  BUY NOW
                </Link>
                <a
                  href="#other-courses"
                  className="border-2 border-[#1e1b4b] text-black font-bold text-sm py-4 px-6 rounded-xl hover:bg-[#1e1b4b] hover:text-white transition-all duration-200"
                >
                  Check Out More Mentorship Packages
                </a>
                <Image
                  src="/assets/mentorship/klarna-badge.png"
                  alt="Pay with Klarna"
                  width={196}
                  height={53}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/assets/mentorship/hero-image.png"
                alt="VIP Mentorship Course Preview"
                width={692}
                height={448}
                className="rounded-2xl shadow-lg max-w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            On my VIP mentorship, I will be teaching you the deep secrets of trading like a professional trader.
            I will be exposing all the knowledge I have gathered from mastering the algorithm of charts over the years.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            The major mistake of many traders is that they do not understand that nothing in charts is new.
            Every formation or movement you see on charts occurred a few hours, days, weeks, months or years ago.
            Understanding these charts repetition is what makes you invisible in the market and trade absolutely professionally.
          </p>
        </div>
      </section>

      {/* VIP Classes Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-block bg-blue-100 rounded-lg px-4 py-2">
                <span className="text-blue-600 font-semibold text-lg">
                  VIP classes are a makeup of 9 pre-recorded classes.
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-black">
                After these classes you should be able to
              </h2>

              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  Take trades professionally to get over 95% accuracy on each trade
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  Know the exact points to place your Take Profits and Stop Loss
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  Calculate the exact movements about to happen on a chart even before it begins
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  Understand all the hidden secrets about the deep relationship between indicators and charts that brokers desperately don&apos;t want you to know
                </li>
              </ul>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <Image
                src="/assets/mentorship/vip-classes.png"
                alt="VIP Classes Preview"
                width={516}
                height={497}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VIP Signals Group Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#dc2626] rounded-3xl p-10 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center shadow-2xl">
            {/* Content */}
            <div className="text-white space-y-8">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                VIP Signals Group
              </h2>

              <ul className="space-y-5">
                <li className="flex items-center gap-4">
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-xl font-semibold">Exclusive Trade Signals</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-xl font-semibold">Higher Accuracy &amp; Success Rate</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-xl font-semibold">Priority Alerts &amp; Advanced Trading Strategies</span>
                </li>
              </ul>

              <Link
                href="/checkout?product=vip-signals"
                className="inline-block bg-white text-black font-extrabold py-4 px-10 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg text-lg"
              >
                Get Access
              </Link>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/assets/mentorship/signals-group.png"
                alt="VIP Signals Group"
                width={520}
                height={405}
                className="max-w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Other Mentorship Courses Section */}
      <section id="other-courses" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-[#f97316]">
              Other mentorship Courses
            </h2>
            <div className="w-48 h-2 mx-auto mt-5">
              <Image
                src="/assets/mentorship/divider.png"
                alt="Divider"
                width={178}
                height={10}
                className="object-contain mx-auto"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/assets/mentorship/course-100.jpg"
                  alt="Mentorship Course 100"
                  width={300}
                  height={174}
                  className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Sale!
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mt-5 leading-snug">
                Mentorship Course 100 September 1ST - 11TH 2025
              </h3>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-gray-400 line-through text-sm">$3,700.00</span>
                <span className="text-[#5468ff] font-bold text-lg">$399.00</span>
              </div>
              <Link
                href="/checkout?product=course-100"
                className="mt-5 block w-full bg-[#5468ff] hover:bg-[#4055e6] text-white text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200 uppercase tracking-wide"
              >
                Select options
              </Link>
            </div>

            {/* Course 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/assets/mentorship/one-on-one.jpg"
                  alt="One-on-One Class with Mr P"
                  width={225}
                  height={300}
                  className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Sale!
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mt-5 leading-snug">
                One - On - One Class with Mr P
              </h3>
              <div className="mt-3">
                <span className="text-[#5468ff] font-bold text-lg">From: $1,499.00</span>
                <span className="text-gray-500 text-sm"> for 7 days</span>
              </div>
              <Link
                href="/checkout?product=one-on-one"
                className="mt-5 block w-full bg-[#5468ff] hover:bg-[#4055e6] text-white text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200 uppercase tracking-wide"
              >
                Select options
              </Link>
            </div>

            {/* Course 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/assets/mentorship/vip-tutorials.jpg"
                  alt="VIP Mentorship / Tutorials"
                  width={300}
                  height={200}
                  className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Sale!
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mt-5 leading-snug">
                VIP Mentorship / Tutorials
              </h3>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-gray-400 line-through text-sm">$1,590.00</span>
                <span className="text-[#5468ff] font-bold text-lg">$499.99</span>
              </div>
              <Link
                href="/checkout?product=vip-mentorship"
                className="mt-5 block w-full bg-[#5468ff] hover:bg-[#4055e6] text-white text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200 uppercase tracking-wide"
              >
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorshipCourse;
