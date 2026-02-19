'use client';

import Image from 'next/image';
import NewsletterSection from '@/components/shared/NewsletterSection';
import { Layers, ShieldCheck, Coins, Headphones, TrendingUp, LayoutDashboard } from 'lucide-react';

const RentVPSHostingPage = () => {
    const features = [
        {
            icon: <Layers className="w-8 h-8 text-white" />,
            title: "Low Fees",
            description: "Competitive trading fees to maximize your profits to all products."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-white" />,
            title: "ZERO Risk",
            description: "State-of-the-art security to protect your assets"
        },
        {
            icon: <Coins className="w-8 h-8 text-white" />,
            title: "Multiple Asset Classes",
            description: "Trade forex, stocks, crypto, and commodities all in one place."
        },
        {
            icon: <Headphones className="w-8 h-8 text-white" />,
            title: "24/7 Support",
            description: "Dedicated support team to assist you with any trading inquiries."
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-white" />,
            title: "Test New Strategies",
            description: "Practice trading strategies to see"
        },
        {
            icon: <LayoutDashboard className="w-8 h-8 text-white" />,
            title: "Intuitive User Interface",
            description: "Easy-to-use dashboard for traders of all experience levels."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-[#f3f4f6] relative overflow-hidden">
                <div className="max-w-[1140px] mx-auto px-5 pt-10 pb-10 md:pt-20 md:pb-20">
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">

                        {/* Left Column: Text Content */}
                        <div className="flex-1 flex flex-col items-start text-left z-10">

                            {/* Heading */}
                            <h1 className="text-black font-bold text-4xl md:text-5xl mb-4 font-['DM_Sans'] leading-tight">
                                Rent VPS Hosting
                            </h1>

                            {/* Description */}
                            <p className="text-gray-600 text-lg mb-8 max-w-md font-['DM_Sans'] leading-relaxed">
                                Your go-to platform for reliable, fast, and secure trading experiences
                            </p>

                            {/* CTA Button */}
                            <button
                                className="bg-[#4338ca] hover:bg-[#3730a3] text-white font-bold py-3 px-8 rounded text-sm tracking-wider transition-colors font-['DM_Sans']"
                            >
                                BUY NOW
                            </button>
                        </div>

                        {/* Right Column: Image */}
                        <div className="flex-1 w-full flex justify-center md:justify-end z-10">
                            <div className="relative w-full max-w-[600px] aspect-[16/10]">
                                <Image
                                    src="/assets/vps/hero.png"
                                    alt="VPS Hosting Request"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background gradient/shape effect could be added here if needed to match exact design */}
            </div>

            {/* Features Section */}
            <div className="py-20 max-w-[1140px] mx-auto px-5">
                <h2 className="text-center text-black font-bold text-3xl md:text-4xl mb-16 font-['DM_Sans']">
                    Why Choose Our Trading Platform?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="bg-[#1d4ed8] rounded-full p-4 mb-4 flex items-center justify-center w-16 h-16 shadow-lg shadow-blue-200">
                                {feature.icon}
                            </div>
                            <h3 className="text-black font-bold text-lg mb-3 font-['DM_Sans']">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm max-w-[250px] font-['DM_Sans'] leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="pb-20">
                <NewsletterSection />
            </div>
        </div>
    );
};

export default RentVPSHostingPage;
