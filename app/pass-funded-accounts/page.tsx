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

                <h2 className="text-2xl md:text-[32px] font-bold text-[#2A2A72] mb-10 font-palanquin-dark tracking-wide">
                    Select A Package:
                </h2>

                {/* Tabs / Column Headers Layout */}
                <div className="w-full flex flex-row items-stretch justify-center mb-0 bg-transparent max-w-4xl mx-auto border-b-2 border-transparent shadow-sm rounded-t-xl overflow-hidden backdrop-blur-md">
                    <div className="flex-1 text-center py-4 bg-[#f8fafc] font-bold text-[#2A2A72] text-xl shadow-sm z-20 shadow-md">
                        Guaranteed Pass
                    </div>
                    <div className="flex-1 text-center py-4 bg-[#e2e8f0]/80 backdrop-blur-md font-medium text-[#4b5563] text-xl z-10">
                        Standard Pass
                    </div>
                </div>

                {/* Grid Layout for Cards */}
                <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/40 backdrop-blur-xl p-4 md:p-8 rounded-b-2xl shadow-xl border border-white/50">

                    {/* Left Column: Guaranteed Pass */}
                    <div className="flex flex-col space-y-6">
                        {/* Top Card: Guaranteed 2-Step */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
                            {/* Card Header */}
                            <div className="bg-[#2e377f] p-6 text-left relative">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-white text-xl font-bold font-dm-sans">Guaranteed Pass</h3>
                                    <span className="bg-[#5c6bc0] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wide">Most Popular</span>
                                </div>
                                <h4 className="text-white text-[22px] font-bold mb-3 tracking-tight">2-Step Challenge <span className="font-normal text-sm opacity-90 ml-1">Step 1 Pass Only</span></h4>
                                <p className="text-[#c5cbf1] text-[14px] font-medium opacity-90">Full refund if we don't pass your evaluation</p>
                            </div>
                            {/* Card Body */}
                            <div className="p-6 text-left flex flex-col flex-1">
                                <div className="flex justify-between items-baseline mb-6 border-b border-gray-100 pb-4">
                                    <span className="text-[#1e293b] font-semibold text-sm">Starting At</span>
                                    <span className="text-4xl font-bold text-[#1e293b]">$490</span>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex items-start">
                                        <Check className="h-5 w-5 text-[#3f51b5] mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-[#334155] text-[15px] font-medium">Pass prop firm evaluation for you</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="h-5 w-5 text-[#3f51b5] mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-[#334155] text-[15px] font-medium">Full refund if evaluation fails</span>
                                    </li>
                                </ul>

                                <Link href="/pass-funded-accounts/checkout?plan=Guaranteed&type=2-Step%20Challenge%20(Step%201%20Pass%20Only)&price=490" className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white font-medium py-3.5 rounded-lg transition-colors duration-200 mt-auto shadow-md text-center block">
                                    Select Step 1 Pass
                                </Link>
                            </div>
                        </div>

                        {/* Bottom Card: Guaranteed Full */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
                            {/* Card Header */}
                            <div className="bg-[#2e377f] p-6 text-left">
                                <h4 className="text-white text-[22px] font-bold mb-2 tracking-tight">2-Step Challenge</h4>
                                <p className="text-[#c5cbf1] text-[15px] font-medium opacity-90">Full (Step 1 + Step 2)</p>
                            </div>
                            {/* Card Body */}
                            <div className="p-6 text-left flex flex-col flex-1">
                                <ul className="space-y-4 mb-8 border-b border-gray-100 pb-4">
                                    {[
                                        { label: '$50k Account', price: '$1100' },
                                        { label: '$100k Account', price: '$1600' },
                                        { label: '$200k Account', price: '$2200' },
                                        { label: '$500k Account', price: '$2500' }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Check className="h-4 w-4 text-[#3f51b5] mr-3 flex-shrink-0" />
                                                <span className="text-[#334155] text-[15px] font-medium">{item.label}</span>
                                            </div>
                                            <span className="text-[#1a1a1a] font-bold text-[16px]">{item.price}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/pass-funded-accounts/checkout?plan=Guaranteed&type=2-Step%20Challenge%20(Full)" className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white font-medium py-3.5 rounded-lg transition-colors duration-200 mt-auto shadow-md text-center block">
                                    Select Guaranteed Full Pass
                                </Link>
                            </div>
                        </div>
                    </div>


                    {/* Right Column: Standard Pass */}
                    <div className="flex flex-col space-y-6">
                        {/* Top Card: Standard 2-Step */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
                            {/* Card Header */}
                            <div className="bg-[#2e377f] p-6 text-left">
                                <h3 className="text-white text-xl font-bold font-dm-sans mb-2">Standard Pass</h3>
                                <h4 className="text-white text-[22px] font-bold mb-3 tracking-tight">2-Step Challenge <span className="font-normal text-sm opacity-90 ml-1">Full (Step 1 + Step 2)</span></h4>
                                <p className="text-[#c5cbf1] text-[14px] font-medium opacity-90">Professional evaluation passing service</p>
                            </div>
                            {/* Card Body */}
                            <div className="p-6 text-left flex flex-col flex-1">
                                <div className="flex justify-between items-baseline mb-6 border-b border-gray-100 pb-4">
                                    <span className="text-[#1e293b] font-semibold text-sm">Starting At</span>
                                    <span className="text-4xl font-bold text-[#1e293b]">$390</span>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex items-start">
                                        <Check className="h-5 w-5 text-[#3f51b5] mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-[#334155] text-[15px] font-medium">You may continue Step 2 yourself</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="h-5 w-5 text-[#3f51b5] mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-[#334155] text-[15px] font-medium">Or upgrade later to full completion</span>
                                    </li>
                                </ul>

                                <Link href="/pass-funded-accounts/checkout?plan=Standard&type=2-Step%20Challenge%20(Full)&price=390" className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white font-medium py-3.5 rounded-lg transition-colors duration-200 mt-auto shadow-md text-center block">
                                    Select Standard Pass
                                </Link>
                            </div>
                        </div>

                        {/* Bottom Card: Standard Full */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
                            {/* Card Header */}
                            <div className="bg-[#2e377f] p-6 text-left">
                                <h4 className="text-white text-[22px] font-bold mb-2 tracking-tight">2-Step Challenge</h4>
                                <p className="text-[#c5cbf1] text-[15px] font-medium opacity-90">Full (Step 1 + Step 2)</p>
                            </div>
                            {/* Card Body */}
                            <div className="p-6 text-left flex flex-col flex-1">
                                <ul className="space-y-4 mb-8 border-b border-gray-100 pb-4">
                                    {[
                                        { label: '$50k Account', price: '$690' },
                                        { label: '$100k Account', price: '$890' },
                                        { label: '$200k Account', price: '$1,290' },
                                        { label: '$500k Account', price: '$1,790' }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Check className="h-4 w-4 text-[#3f51b5] mr-3 flex-shrink-0" />
                                                <span className="text-[#334155] text-[15px] font-medium">{item.label}</span>
                                            </div>
                                            <span className="text-[#1a1a1a] font-bold text-[16px]">{item.price}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/pass-funded-accounts/checkout?plan=Standard&type=Full%20Completion" className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white font-medium py-3.5 rounded-lg transition-colors duration-200 mt-auto shadow-md text-center block">
                                    Select Standard Completion
                                </Link>
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
