import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PassFundedAccountsPage() {
    return (
        <div className="min-h-screen bg-[#e6e9f5] font-sans font-dm-sans relative overflow-hidden flex flex-col items-center pt-[120px] pb-24">

            {/* Simulated Blurred City Background using fixed gradients */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Base color is a light blueish-grey, add some purple/orange radial glows to simulate city lights at sunset */}
                <div className="absolute top-0 w-full h-full bg-gradient-to-b from-[#e8eaf6] to-[#d6d9ea] opacity-80" />
                <div className="absolute top-[20%] left-[10%] w-[600px] h-[400px] bg-purple-300/30 blur-[100px] mix-blend-multiply rounded-full" />
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[300px] bg-indigo-300/30 blur-[120px] mix-blend-multiply rounded-full" />
                <div className="absolute top-[50%] left-[40%] w-[800px] h-[200px] bg-orange-200/20 blur-[80px] mix-blend-overlay rounded-full" />

                {/* To get more of that "skyline with warm lights" feel */}
                <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-white/40 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

                {/* Header Section */}
                <h1 className="text-4xl md:text-[48px] font-bold text-[#2A2A72] mb-6 font-palanquin-dark tracking-tight leading-tight">
                    Pass Funded Accounts
                </h1>

                <p className="text-[17px] md:text-[18px] text-[#4b5563] max-w-[800px] leading-relaxed mb-12">
                    With a direct partnership with <span className="font-semibold text-[#2563EB]">PROPFIRMSOL.COM</span>, you can now pass your prop firm challenges and get fully funded within a few days. PropSol also grants you full access to their automated system after account is passed.
                </p>

                <div className="w-full flex justify-center mb-16 px-4">
                    <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-16">
                        {/* Guaranteed Pass Section */}
                        <div className="w-full flex flex-col items-center">
                            <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden mb-16 border border-gray-200">
                                {/* Guaranteed Pass Column */}
                                <div className="flex-1 flex flex-col bg-white">
                                    <div className="text-center py-4 bg-[#f8fafc] font-bold text-[#2A2A72] text-xl border-b border-gray-100">
                                        Guaranteed Pass
                                    </div>

                                    <div className="p-4 md:p-6 flex flex-col gap-6">
                                        {/* Card 1: 2-Step Challenge (Step 1 Pass Only) */}
                                        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col relative">
                                            <div className="bg-[#2e377f] p-5 text-left relative">
                                                <div className="flex items-center space-x-3 mb-1">
                                                    <h3 className="text-white text-lg font-bold">Guaranteed Pass</h3>
                                                    <span className="bg-[#5c6bc0] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wide">Most Popular</span>
                                                </div>
                                                <h4 className="text-white text-[20px] font-bold mb-2 tracking-tight">2-Step Challenge <span className="font-normal text-sm opacity-90 ml-1">Step 1 Pass Only</span></h4>
                                                <p className="text-[#c5cbf1] text-[13px] font-medium opacity-90">Full refund if we don't pass your evaluation</p>
                                            </div>
                                            <div className="p-5 text-left flex flex-col flex-1 bg-gray-50/50">
                                                <div className="flex justify-between items-baseline mb-2 pb-1 border-b border-gray-200">
                                                    <span className="text-[#64748b] font-bold text-xs uppercase tracking-wider">Account</span>
                                                    <span className="text-[#64748b] font-bold text-xs uppercase tracking-wider">Pricing</span>
                                                </div>
                                                <ul className="space-y-3 mb-6 flex-1">
                                                    {[
                                                        { label: '$50k Account', price: '$800' },
                                                        { label: '$100k Account', price: '$1200' },
                                                        { label: '$200k Account', price: '$1700' },
                                                        { label: '$500k Account', price: '$2500' }
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <span className="text-[#334155] text-[14px] font-medium">{item.label}</span>
                                                            </div>
                                                            <span className="text-[#1a1a1a] font-bold text-[15px]">{item.price}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="mb-6">
                                                    <p className="text-[#1e293b] font-semibold text-sm mb-3">Benefits</p>
                                                    <ul className="space-y-2">
                                                        <li className="flex items-start">
                                                            <Check className="h-4 w-4 text-[#3f51b5] mr-2 mt-0.5 flex-shrink-0" />
                                                            <span className="text-[#334155] text-[13px] font-medium leading-tight">Pass prop firm evaluation for you</span>
                                                        </li>
                                                        <li className="flex items-start">
                                                            <Check className="h-4 w-4 text-[#3f51b5] mr-2 mt-0.5 flex-shrink-0" />
                                                            <span className="text-[#334155] text-[13px] font-medium leading-tight">Full refund if evaluation fails</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <Link href="/pass-funded-accounts/checkout?plan=Guaranteed&type=2-Step%20Challenge%20(Step%201%20Pass%20Only)" className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-auto shadow-sm text-center block text-[15px]">
                                                    Select Step 1 Pass
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Card 2: 2-Step Challenge Full */}
                                        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col relative">
                                            <div className="bg-[#2e377f] p-5 text-left">
                                                <h4 className="text-white text-[20px] font-bold mb-2 tracking-tight">2-Step Challenge</h4>
                                                <p className="text-[#c5cbf1] text-[13px] font-medium opacity-90">Full (Step 1 + Step 2)</p>
                                            </div>
                                            <div className="p-5 text-left flex flex-col flex-1 bg-gray-50/50">
                                                <ul className="space-y-3 mb-6 border-b border-gray-200 pb-4">
                                                    {[
                                                        { label: '$50k Account', price: '$1100' },
                                                        { label: '$100k Account', price: '$1600' },
                                                        { label: '$200k Account', price: '$2200' },
                                                        { label: '$500k Account', price: '$3200' }
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <Check className="h-4 w-4 text-[#3f51b5] mr-2 flex-shrink-0" />
                                                                <span className="text-[#334155] text-[14px] font-medium">{item.label}</span>
                                                            </div>
                                                            <span className="text-[#1a1a1a] font-bold text-[15px]">{item.price}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <Link href="/pass-funded-accounts/checkout?plan=Guaranteed&type=2-Step%20Challenge%20(Full)" className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-auto shadow-sm text-center block text-[15px]">
                                                    Select Guaranteed Full Pass
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider Line on Desktop */}
                                <div className="hidden md:block w-px bg-gray-200"></div>

                                {/* Standard Pass Column */}
                                <div className="flex-1 flex flex-col bg-[#f0f4f8]">
                                    <div className="text-center py-4 bg-[#e2e8f0]/80 font-medium text-[#4b5563] text-xl border-b border-gray-200">
                                        Standard Pass
                                    </div>

                                    <div className="p-4 md:p-6 flex flex-col gap-6">
                                        {/* Card 1: 2-Step Challenge (Step 1 Pass Only) Standard Form */}
                                        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col relative">
                                            <div className="bg-[#2e377f] p-5 text-left relative">
                                                <h3 className="text-white text-lg font-bold mb-1">Standard Pass</h3>
                                                <h4 className="text-white text-[20px] font-bold mb-2 tracking-tight">2-Step Challenge <span className="font-normal text-sm opacity-90 ml-1">Full (Step 1 + Step 2)</span></h4>
                                                <p className="text-[#c5cbf1] text-[13px] font-medium opacity-90">Professional evaluation passing service</p>
                                            </div>
                                            <div className="p-5 text-left flex flex-col flex-1 bg-gray-50/50">
                                                <div className="flex justify-between items-baseline mb-2 pb-1 border-b border-gray-200">
                                                    <span className="text-[#64748b] font-bold text-xs uppercase tracking-wider">Account</span>
                                                    <span className="text-[#64748b] font-bold text-xs uppercase tracking-wider">Pricing</span>
                                                </div>
                                                <ul className="space-y-3 mb-6 flex-1">
                                                    {[
                                                        { label: '$50k Account', price: '$650' },
                                                        { label: '$100k Account', price: '$850' },
                                                        { label: '$200k Account', price: '$1290' },
                                                        { label: '$500k Account', price: '$1790' }
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <span className="text-[#334155] text-[14px] font-medium">{item.label}</span>
                                                            </div>
                                                            <span className="text-[#1a1a1a] font-bold text-[15px]">{item.price}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="mb-6">
                                                    <p className="text-[#1e293b] font-semibold text-sm mb-3">Benefits</p>
                                                    <ul className="space-y-2">
                                                        <li className="flex items-start">
                                                            <Check className="h-4 w-4 text-[#3f51b5] mr-2 mt-0.5 flex-shrink-0" />
                                                            <span className="text-[#334155] text-[13px] font-medium leading-tight">You may continue Step 2 yourself</span>
                                                        </li>
                                                        <li className="flex items-start">
                                                            <Check className="h-4 w-4 text-[#3f51b5] mr-2 mt-0.5 flex-shrink-0" />
                                                            <span className="text-[#334155] text-[13px] font-medium leading-tight">Or upgrade later to full completion</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <Link href="/pass-funded-accounts/checkout?plan=Standard&type=2-Step%20Challenge%20(Full)" className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-auto shadow-sm text-center block text-[15px]">
                                                    Select Full Challenge
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Card 2: 1-Step Challenge */}
                                        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col relative">
                                            <div className="bg-[#2e377f] p-5 text-left">
                                                <h4 className="text-white text-[20px] font-bold mb-2 tracking-tight">1-Step Challenge</h4>
                                                <p className="text-[#c5cbf1] text-[13px] font-medium opacity-90">Full</p>
                                            </div>
                                            <div className="p-5 text-left flex flex-col flex-1 bg-gray-50/50">
                                                <ul className="space-y-3 mb-6 border-b border-gray-200 pb-4">
                                                    {[
                                                        { label: '$50k Account', price: '$1400' },
                                                        { label: '$100k Account', price: '$1900' },
                                                        { label: '$200k Account', price: '$2600' },
                                                        { label: '$500k Account', price: '$3800' }
                                                    ].map((item, i) => (
                                                        <li key={i} className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <Check className="h-4 w-4 text-[#3f51b5] mr-2 flex-shrink-0" />
                                                                <span className="text-[#334155] text-[14px] font-medium">{item.label}</span>
                                                            </div>
                                                            <span className="text-[#1a1a1a] font-bold text-[15px]">{item.price}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <Link href="/pass-funded-accounts/checkout?plan=Standard&type=1-Step%20Challenge%20(Full)" className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-auto shadow-sm text-center block text-[15px]">
                                                    Select 1-Step Completion
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Disclaimer */}
                <div className="w-full max-w-4xl mx-auto mt-8 text-left px-4">
                    <p className="text-sm text-[#475569] font-medium">
                        <span className="font-bold text-[#1e293b]">Disclaimer:</span> All account passing process is solely handled by <span className="font-bold italic text-[#2A2A72]">PROPFIRMSOL.COM</span>.
                        <br />
                        Mr P Fx will receive a commission for every account passed.
                    </p>
                </div>

            </div>
        </div>
    );
}
