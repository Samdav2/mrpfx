'use client';

import Image from 'next/image';
import Link from 'next/link';
import NewsletterSection from '@/components/shared/NewsletterSection';

// VIP Products data
const vipProducts = [
    {
        id: 1,
        title: 'Mentorship Course 100 September 1ST - 11TH 2025',
        image: '/assets/vip_resources/mentorship-course.png',
        link: '/product/mentorship-course-100'
    },
    {
        id: 2,
        title: 'RENT VPS HOSTING',
        subtitle: 'VPS For Forex - Run Your Trading on Cloud',
        image: '/assets/vip_resources/vps-hosting.png',
        link: '/product/vps-hosting'
    },
    {
        id: 3,
        title: 'VIP MEMBERSHIP GROUP',
        image: '/assets/vip_resources/vip-membership.png',
        link: '/product/vip-membership'
    },
    {
        id: 4,
        title: 'The 21 ultimate chart patterns',
        author: 'Victory Omoike',
        description: 'The 21 Ultimate Chart Patterns -Mr P Fx (For accurate trades and sniper entries)',
        image: '/assets/vip_resources/chart-patterns.png',
        link: '/product/21-chart-patterns'
    },
    {
        id: 5,
        title: 'Alisa G Auto Robot (FOR PHONE OR PC) Over 99% extreme accuracy',
        image: '/assets/vip_resources/alisa-g-robot.png',
        link: '/product/alisa-g-robot'
    },
    {
        id: 6,
        title: 'CHAPPIE G ROBOT (FOR STEP INDEX ONLY)',
        image: '/assets/vip_resources/chappie-g-robot.png',
        link: '/product/chappie-g-robot'
    },
    {
        id: 7,
        title: 'Invasion 360 All in One Indicator',
        description: '(Volatility 75, Boom and Crash, Step Index, Nasdaq, Gold, EURUSD, GBPUSD)',
        image: '/assets/vip_resources/invasion-360.png',
        link: '/product/invasion-360'
    },
    {
        id: 8,
        title: 'MEGATRON X ROBOT',
        description: 'Boom and Crash Cracked - Over 99% accuracy',
        image: '/assets/vip_resources/megatron-x.png',
        link: '/product/megatron-x-robot'
    }
];

const AllVIPResourcesPage = () => {
    return (
        <div className="font-[family-name:var(--font-dm-sans)] bg-[#f5f5f5] min-h-screen">
            {/* Hero Section - Light Gray Background */}
            <section className="bg-[#e8e8e8] py-16 md:py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Left Content */}
                        <div className="w-full md:w-1/2 space-y-5">
                            {/* "VIP" Badge - Red/Salmon color */}
                            <div
                                className="inline-block rounded-[10px] px-[18px] py-[12px]"
                                style={{ backgroundColor: 'rgba(255, 99, 99, 0.3)' }}
                            >
                                <span
                                    className="font-[family-name:var(--font-nova-flat)] font-semibold leading-[1.1em]"
                                    style={{ color: '#E53935', fontSize: '32px' }}
                                >
                                    VIP
                                </span>
                            </div>

                            {/* Title */}
                            <h1
                                className="font-[family-name:var(--font-dm-sans)] leading-[1.1em] text-black"
                                style={{ fontSize: '51px', fontWeight: 900, letterSpacing: '0px' }}
                            >
                                All VIP Resources
                            </h1>

                            {/* Description */}
                            <p
                                className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-black"
                                style={{ fontSize: '17px', maxWidth: '80%' }}
                            >
                                Want to take your trading to the next level with VIP trading materials? Gain access to VIP tools to unlock new trading levels.
                            </p>
                        </div>

                        {/* Right Content - Hero Image with Button */}
                        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
                            <div className="relative">
                                <Image
                                    src="/assets/vip_resources/hero-image.png"
                                    alt="AI Stock Trading Bots"
                                    width={600}
                                    height={450}
                                    className="w-full h-auto object-contain max-w-[600px]"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid Section */}
            <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {vipProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
                            >
                                {/* Product Image */}
                                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                        <span className="text-gray-400 text-sm">Image</span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    {product.subtitle && (
                                        <p className="text-xs text-gray-500 mb-1">{product.subtitle}</p>
                                    )}
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {product.title}
                                    </h3>
                                    {product.author && (
                                        <p className="text-xs text-gray-600 mb-1">By {product.author}</p>
                                    )}
                                    {product.description && (
                                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}

                                    {/* Read More Button */}
                                    <Link
                                        href={product.link}
                                        className="inline-block text-white text-sm font-medium px-6 py-2 rounded transition-colors"
                                        style={{ backgroundColor: '#1a73e8' }}
                                    >
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-white py-8 md:py-12">
                <NewsletterSection />
            </section>
        </div>
    );
};

export default AllVIPResourcesPage;
