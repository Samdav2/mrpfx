import React from 'react';
import Image from 'next/image';
import AccountManagementForm from '@/components/account-management/AccountManagementForm';
import { Database, ShieldCheck, XOctagon } from 'lucide-react';

export default function AccountManagementPage() {
    return (
        <div className="bg-[#f0f4ff] min-h-screen pt-[120px] pb-24 font-sans font-dm-sans overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute top-[200px] right-[10%] w-[800px] h-[800px] bg-blue-500/10 blur-[130px] rounded-full z-0 pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col pb-12">

                <div className="flex flex-col md:flex-row w-full justify-between relative min-h-auto md:min-h-[550px]">
                    {/* Left Content Area (Text) */}
                    <div className="w-full md:w-[60%] lg:w-[50%] text-[#1a1a1a] pr-0 md:pr-8 mb-8 md:mb-0 z-20 pt-4 md:pt-8 text-center md:text-left">
                        <h1 className="text-4xl md:text-[54px] font-bold leading-[1.1] font-palanquin-dark mb-2 md:mb-3 text-[#0A1128]">
                            Account Management
                        </h1>
                        <h2 className="text-[24px] md:text-[32px] text-[#2563EB] font-medium mb-6 md:mb-8 font-dm-sans tracking-tight">
                            by Verified Professionals
                        </h2>

                        <p className="text-[16px] md:text-[17px] text-gray-700 leading-relaxed mb-4 md:mb-6 font-medium max-w-[480px] mx-auto md:mx-0">
                            Have your trading account managed by experienced, performance-vetted traders while you focus on other priorities.
                        </p>
                        <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed mb-8 md:mb-10 max-w-[480px] mx-auto md:mx-0">
                            Each strategy follows strict risk controls and monitored execution.
                        </p>

                        {/* Features List */}
                        <ul className="space-y-3 md:space-y-4 text-left max-w-sm mx-auto md:mx-0">
                            {[
                                "Trades executed by vetted professionals",
                                "Risk-adjusted lot sizing based on your capital",
                                "Every trade includes SL & TP levels",
                                "Continuous monitoring and management"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center text-[#1e293b] font-medium text-[15px] md:text-[16px]">
                                    <svg className="h-[18px] w-[18px] text-[#1E3A8A] mr-3 md:mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Area (Image Wrapper) */}
                    <div className="w-full relative h-[300px] sm:h-[400px] md:h-[650px] md:w-[60%] lg:w-[70%] md:absolute md:right-[-15%] md:top-[-30px] z-0 mt-8 md:mt-0 overflow-hidden rounded-2xl md:rounded-none">
                        <Image
                            src="/account-management-hero.png"
                            alt="Professional Trading Desk"
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            priority
                            className="scale-[1.1] md:scale-[1.0]"
                        />
                    </div>
                </div>

                {/* Form Section (Floating Overlap) */}
                <div className="w-full max-w-xl mx-auto md:-mt-12 mt-[50px] relative z-30 flex justify-center">
                    <AccountManagementForm />
                </div>

                {/* Bottom Info Section */}
                <div className="w-full flex flex-col items-start md:items-center mt-[60px] relative z-30 max-w-4xl mx-auto space-y-6">
                    {/* Security Features */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-center text-[#334155] text-[15px] md:text-[16px] font-medium space-y-4 md:space-y-0 md:space-x-12 w-full">
                        <div className="flex items-center">
                            <ShieldCheck className="h-[22px] w-[22px] mr-3 text-[#1E3A8A] stroke-[2]" />
                            <span>Your funds remain in your broker account</span>
                        </div>
                        <div className="flex items-center">
                            <Database className="h-[22px] w-[22px] mr-3 text-[#1E3A8A] stroke-[2]" />
                            <span>No withdrawal access is granted</span>
                        </div>
                        <div className="flex items-center">
                            <XOctagon className="h-[22px] w-[22px] mr-3 text-[#1E3A8A] stroke-[2]" />
                            <span>You can stop the service anytime</span>
                        </div>
                    </div>
                </div>

                {/* Actions & Disclaimer */}
                <div className="w-full flex flex-col items-center mt-12 relative z-30">
                    <button className="px-10 py-[14px] bg-transparent border border-[#cbd5e1] text-[#1E3A8A] font-semibold rounded-full hover:bg-white hover:shadow-md hover:border-blue-300 transition-all font-dm-sans whitespace-nowrap">
                        See How Traders Are Selected
                    </button>

                    <p className="text-[11px] text-center text-[#64748b] mt-8 max-w-4xl leading-[1.8] px-4">
                        Trading involves risk. Account management is provided through partnerships with independent, performance-vetted traders. MR P FX does not manage accounts directly and only takes a commission for participating traders. We strongly advise reviewing each trader's performance history after proceeding.
                    </p>
                </div>

            </div>
        </div>
    );
}
