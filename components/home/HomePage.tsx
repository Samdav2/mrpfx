'use client';

import Image from 'next/image';
import Link from 'next/link';
import NewsletterSection from '../shared/NewsletterSection';
import Button from '../ui/Button';

const HomePage = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section - Desktop */}
            <section className="hidden md:flex relative py-16 lg:py-24 px-4 md:px-8 lg:px-16 bg-white text-black">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-black">
                                Master forex trading through precision, strategy
                            </h2>
                            <Image
                                src="/assets/home/Vector-3.png"
                                alt=""
                                width={262}
                                height={10}
                                className="w-64"
                            />
                            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                                Mr P Fx is a fast-growing platform/community established after several years of diligent study of charts behaviors, movements, formations and algorithms in general. Mr P Fx was founded by Omoike Victory popularly known as Mr P on the 8th of April 2021.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button href="/mentorship-course">
                                    Enroll For Mentorship
                                </Button>
                                <Button
                                    href="https://one.exnessonelink.com/a/0z72b5esoc"
                                    variant="outline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Recommended Broker
                                </Button>
                            </div>
                        </div>

                        {/* Right Content - Hero Image */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                <Image
                                    src="/assets/home/mrpfx-header-image-1.jpg"
                                    alt="Mr P FX Trading"
                                    width={750}
                                    height={1000}
                                    className="rounded-3xl max-w-full h-auto shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Section - Mobile */}
            <section className="md:hidden relative py-12 px-4 bg-white text-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-8">
                            <Image
                                src="/assets/home/mrpfx-header-image-1.jpg"
                                alt="Mr P FX Trading"
                                width={750}
                                height={1000}
                                className="rounded-3xl max-w-full h-auto shadow-lg"
                                priority
                            />
                        </div>
                        <h2 className="text-3xl font-bold leading-tight text-black mb-4">
                            Master forex trading through precision, strategy
                        </h2>
                        <Image
                            src="/assets/home/Vector-3.png"
                            alt=""
                            width={262}
                            height={10}
                            className="w-48 mb-4"
                        />
                        <p className="text-gray-600 text-base leading-relaxed mb-6">
                            Mr P Fx is a fast-growing platform/community established after several years of diligent study of charts behaviors, movements, formations and algorithms in general. Mr P Fx was founded by Omoike Victory popularly known as Mr P on the 8th of April 2021.
                        </p>
                        <div className="flex flex-col w-full gap-3">
                            <Button href="/mentorship-course" fullWidth>
                                Enroll For Mentorship
                            </Button>
                            <Button
                                href="https://one.exnessonelink.com/a/0z72b5esoc"
                                variant="outline"
                                target="_blank"
                                rel="noopener noreferrer"
                                fullWidth
                            >
                                Recommended Broker
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Services Section */}
            <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-[#312E81] text-sm font-bold uppercase tracking-wide mb-2">Our Services</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">What we have to offer</h3>
                        <Image
                            src="/assets/home/Group-103.png"
                            alt=""
                            width={300}
                            height={23}
                            className="mx-auto"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* VIP Mentorship Courses */}
                        <Link href="/mentorship-course" className="group block">
                            <div className="relative overflow-hidden rounded-2xl transition-transform hover:scale-105 shadow-lg">
                                <Image
                                    src="/assets/home/Group-116.png"
                                    alt="VIP Mentorship Courses"
                                    width={331}
                                    height={382}
                                    className="w-full h-auto"
                                />
                                <div className="p-4 text-center">
                                    <h4 className="text-black font-bold text-lg">VIP Mentorship Courses</h4>
                                </div>
                            </div>
                        </Link>

                        {/* VIP Signals Group */}
                        <Link href="/vip-signals-group" className="group block">
                            <div className="relative overflow-hidden rounded-2xl transition-transform hover:scale-105 shadow-lg">
                                <Image
                                    src="/assets/home/Group-237655.png"
                                    alt="VIP Signals Group"
                                    width={330}
                                    height={382}
                                    className="w-full h-auto"
                                />
                                <div className="p-4 text-center">
                                    <h4 className="text-black font-bold text-lg">VIP Signals Group</h4>
                                </div>
                            </div>
                        </Link>

                        {/* VIP Bots, Indicators & Resources */}
                        <Link href="/all-vip-resources" className="group block">
                            <div className="relative overflow-hidden rounded-2xl transition-transform hover:scale-105 shadow-lg">
                                <Image
                                    src="/assets/home/2149250208.jpg"
                                    alt="VIP bots, Indicators & All VIP Resources"
                                    width={370}
                                    height={330}
                                    className="w-full h-auto object-cover aspect-square"
                                />
                                <div className="p-4 text-center">
                                    <h4 className="text-black font-bold text-lg">VIP bots, Indicators &amp; All VIP Resources</h4>
                                </div>
                            </div>
                        </Link>

                        {/* Free Robots, Indicators & Videos */}
                        <Link href="/resource_category/robot" className="group block">
                            <div className="relative overflow-hidden rounded-2xl transition-transform hover:scale-105 shadow-lg">
                                <Image
                                    src="/assets/home/120032.jpg"
                                    alt="Free Robots, Indicators & Videos"
                                    width={370}
                                    height={330}
                                    className="w-full h-auto object-cover aspect-square"
                                />
                                <div className="p-4 text-center">
                                    <h4 className="text-black font-bold text-lg">Free Robots, Indicators &amp; Videos</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trading Tools Section */}
            <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#0a0a0a] relative overflow-hidden">
                {/* Background Wave Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('/assets/home/image-62-4.png')] bg-cover bg-center opacity-30"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-left mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Trading Tools
                        </h3>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            With lots of unique tools, you can easily build your desired tradeflow
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Row 1 */}
                        <Link href="/all-vip-resources" className="group">
                            <div className="bg-[#4F46E5] hover:bg-[#4338ca] rounded-xl p-8 flex items-center justify-between transition-all h-full">
                                <h4 className="text-white font-bold text-xl">
                                    VIP Bots,<br />Indicators,<br />Resources
                                </h4>
                                <div className="bg-white/20 rounded-full p-2">
                                    <span className="text-white text-xl">→</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/mentorship-course" className="group">
                            <div className="bg-white hover:bg-gray-50 rounded-xl p-8 flex items-center justify-between transition-all h-full">
                                <h4 className="text-black font-bold text-xl">Join VIP<br />Mentorship</h4>
                            </div>
                        </Link>

                        <Link href="/vip-signals-group" className="group">
                            <div className="bg-white hover:bg-gray-50 rounded-xl p-8 flex items-center justify-between transition-all h-full">
                                <h4 className="text-black font-bold text-xl">VIP Signals<br />Group</h4>
                            </div>
                        </Link>

                        {/* Row 2 */}
                        <Link href="/resource_category/robot" className="group">
                            <div className="bg-[#4F46E5] hover:bg-[#4338ca] rounded-xl p-8 flex items-center justify-between transition-all h-full">
                                <h4 className="text-white font-bold text-xl">
                                    Free Robots,<br />Indicators &<br />Videos
                                </h4>
                                <div className="bg-white/20 rounded-full p-2">
                                    <span className="text-white text-xl">→</span>
                                </div>
                            </div>
                        </Link>

                        <a href="https://t.me/mrpfxuniversity" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="bg-white hover:bg-gray-50 rounded-xl p-8 flex items-center justify-between transition-all h-full">
                                <h4 className="text-black font-bold text-xl">
                                    Join Free<br />Signals Group
                                </h4>
                            </div>
                        </a>

                        <a href="https://mrpfx.com/rent-vps-hosting/" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="bg-white hover:bg-gray-50 rounded-xl p-8 flex items-center justify-between transition-all h-full">
                                <h4 className="text-black font-bold text-xl">Rent VPS<br />Hosting</h4>
                            </div>
                        </a>

                        {/* Full width broker link */}
                        <a
                            href="https://one.exnessonelink.com/a/0z72b5esoc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group md:col-span-1"
                        >
                            <div className="bg-[#06B6D4] hover:bg-[#0891b2] rounded-xl p-8 flex items-center justify-between transition-all h-full">
                                <h4 className="text-white font-bold text-xl uppercase">USE<br />RECOMMENDED<br />BROKER</h4>
                                <div className="bg-white/20 rounded-full p-2">
                                    <span className="text-white text-xl">→</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* VIP Mentorship Course Section - Desktop */}
            <section className="hidden md:block py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                                VIP Mentorship Course<br />Beginner to Mastery
                            </h2>
                            <Image
                                src="/assets/home/Vector-3.png"
                                alt=""
                                width={262}
                                height={10}
                            />
                            <div className="pt-4">
                                <Button
                                    href="/mentorship-course"
                                    variant="outline"
                                    className="border-[#312E81] text-[#312E81] hover:bg-[#312E81] hover:text-white"
                                >
                                    View Course
                                </Button>
                            </div>
                        </div>

                        {/* Right Content - MacBook + Stats */}
                        <div className="relative">
                            <Image
                                src="/assets/home/Device-Macbook-Pro.png"
                                alt="VIP Mentorship Course"
                                width={553}
                                height={349}
                                className="w-full h-auto"
                            />
                            {/* Stats overlay */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg">
                                <div className="bg-[#434355] rounded-xl p-6 grid grid-cols-3 gap-4 text-center shadow-2xl">
                                    <div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">1500+</div>
                                        <div className="text-gray-300 text-sm">Student Registered</div>
                                    </div>
                                    <div className="border-l border-gray-500">
                                        <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
                                        <div className="text-gray-300 text-sm">Course completion rate</div>
                                    </div>
                                    <div className="border-l border-gray-500">
                                        <div className="text-2xl md:text-3xl font-bold text-white">99%</div>
                                        <div className="text-gray-300 text-sm">User retention rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VIP Mentorship Course Section - Mobile */}
            <section className="md:hidden py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <Image
                        src="/assets/home/Device-Macbook-Pro.png"
                        alt="VIP Mentorship Course"
                        width={553}
                        height={349}
                        className="w-full h-auto mb-12"
                    />

                    {/* Stats grid */}
                    <div className="bg-[#434355] rounded-xl p-6 grid grid-cols-3 gap-2 text-center mb-8 shadow-xl mx-4 -mt-16 relative z-10">
                        <div>
                            <div className="text-xl font-bold text-white">1500+</div>
                            <div className="text-gray-300 text-[10px]">Students Registered</div>
                        </div>
                        <div className="border-l border-gray-500">
                            <div className="text-xl font-bold text-white">100%</div>
                            <div className="text-gray-300 text-[10px]">Completion rate</div>
                        </div>
                        <div className="border-l border-gray-500">
                            <div className="text-xl font-bold text-white">99%</div>
                            <div className="text-gray-300 text-[10px]">Retention rate</div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-black mb-4">
                        VIP Mentorship Course<br />Beginner to Mastery
                    </h2>
                    <Image
                        src="/assets/home/Vector-3.png"
                        alt=""
                        width={200}
                        height={10}
                        className="mx-auto mb-6"
                    />
                    <Button
                        href="/mentorship-course"
                        variant="outline"
                        className="border-[#312E81] text-[#312E81] hover:bg-[#312E81] hover:text-white"
                    >
                        View Course
                    </Button>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-[#10B981] text-sm font-bold uppercase tracking-wide mb-2">Testimonials</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Student Says</h3>
                        <Image
                            src="/assets/home/Group-103.png"
                            alt=""
                            width={300}
                            height={23}
                            className="mx-auto"
                        />
                    </div>

                    {/* Desktop Testimonials Grid */}
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Testimonial 1 */}
                        <div className="bg-white rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Image
                                    src="/assets/home/testi.png"
                                    alt="Jane T."
                                    width={60}
                                    height={60}
                                    className="rounded-full"
                                />
                            </div>
                            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                                With Mr P fx academy, its not about the capital, its about the strategy, thank you Mr P.
                            </p>
                            <div>
                                <p className="text-black font-bold">Jane T.</p>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-[60px] h-[60px] bg-black rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                    C
                                </div>
                            </div>
                            <div className="mb-6">
                                <h5 className="font-bold text-black mb-2">Mr Perfect</h5>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    Thank yu so much for the educational video<br />
                                    I hope to be able to trade like yu...<br />
                                    Keep up the good work...<br />
                                    Hope to be in your next VIP group
                                </p>
                            </div>
                            <div>
                                <p className="text-black font-bold">Curtis R.</p>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Image
                                    src="/assets/home/image-10.png"
                                    alt="Anont D."
                                    width={60}
                                    height={60}
                                    className="rounded-full"
                                />
                            </div>
                            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                                The say practice makes perfect, But i think watching your educative videos makes me perfect, I really appreciate you sir @mr possible
                            </p>
                            <div>
                                <p className="text-black font-bold">Anont D.</p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Testimonials - Single Card */}
                    <div className="md:hidden">
                        <div className="bg-white rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/assets/home/testi.png"
                                    alt="Jane T"
                                    width={60}
                                    height={60}
                                    className="rounded-full"
                                />
                                <span className="text-white font-semibold">Jane T</span>
                            </div>
                            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                                With Mr P fx academy, its not about the capital, its about the strategy, thank you Mr P.
                            </p>
                            <p className="text-black font-bold">Jane T.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Our Community Section */}
            <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Image */}
                        <div className="flex justify-center">
                            <Image
                                src="/assets/home/Image-7.png"
                                alt="Join Our Community"
                                width={603}
                                height={623}
                                className="rounded-2xl max-w-full h-auto"
                            />
                        </div>

                        {/* Right - Content */}
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                Join Our Community
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                We share common trends and strategies for improving signals and resources.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <Button
                                    href="https://t.me/mrpfxuniversity"
                                    variant="outline-white"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Join Free
                                </Button>
                                <Button href="/product/vip-membership-group">
                                    Join VIP
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trading Strategy / YouTube Section */}
            <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Trading <span className="text-red-600">Strategy</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Explore our <span className="text-red-600">Youtube Channel</span><br />
                            Get yourself equipped into the world of Trading
                        </p>
                    </div>

                    {/* YouTube Videos Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <a
                            href="https://www.youtube.com/watch?v=yPJSje5NzYg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <div className="relative overflow-hidden rounded-xl">
                                <Image
                                    src="https://i.ytimg.com/vi/yPJSje5NzYg/sddefault.jpg"
                                    alt="My Trading Focus Moving Forward (2026)"
                                    width={480}
                                    height={360}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-2xl ml-1">▶</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-medium mt-3">My Trading Focus Moving Forward (2026)</h4>
                        </a>

                        <a
                            href="https://www.youtube.com/watch?v=jpVgMjM0hWE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <div className="relative overflow-hidden rounded-xl">
                                <Image
                                    src="https://i.ytimg.com/vi/jpVgMjM0hWE/sddefault.jpg"
                                    alt="A Real Day in the Life of a 28-Year-Old Day Trader"
                                    width={480}
                                    height={360}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-2xl ml-1">▶</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-medium mt-3">A Real Day in the Life of a 28-Year-Old Day Trader in Cape Town</h4>
                        </a>

                        <a
                            href="https://www.youtube.com/watch?v=4XdpTQdOl0c"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <div className="relative overflow-hidden rounded-xl">
                                <Image
                                    src="https://i.ytimg.com/vi/4XdpTQdOl0c/sddefault.jpg"
                                    alt="The Crazy 5 Minutes Strategy"
                                    width={480}
                                    height={360}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-2xl ml-1">▶</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-medium mt-3">The Crazy 5 Minutes Strategy That Made Me Over $10K</h4>
                        </a>
                    </div>

                    <div className="text-center">
                        <Button
                            href="https://www.youtube.com/@MRPFXUniversity"
                            variant="danger"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View More
                        </Button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <NewsletterSection />
        </div>
    );
};

export default HomePage;
