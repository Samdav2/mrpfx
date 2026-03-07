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
                    <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-16 md:gap-24">

                        {/* Guaranteed Pass Section */}
                        <div className="w-full flex flex-col items-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A72] mb-2 font-palanquin-dark tracking-tight">Guaranteed Pass</h2>
                            <p className="text-sm md:text-base text-[#4b5563] mb-10 font-medium">Full refund if we don't pass your evaluation</p>

                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative max-w-5xl mx-auto">
                                {/* Card 1: 2-Step Challenge (Step 1 Pass Only) */}
                                <div className="bg-[#e8ebfb] rounded-xl overflow-hidden flex flex-col shadow-sm">
                                    <div className="p-6 md:p-8 text-left flex flex-col flex-1">
                                        <h4 className="text-[#2e377f] text-xl font-bold tracking-tight mb-1">2-Step Challenge</h4>
                                        <p className="text-[#5c6bc0] text-[15px] font-medium mb-4">Step 1 Pass Only</p>
                                        <p className="text-[#4b5563] text-[13px] leading-relaxed mb-8">Best for traders who want help clearing the first stage. We handle Step 1 only. After passing, control is returned to you.</p>

                                        <div className="flex justify-between items-baseline mb-4 pb-2 border-b border-gray-300/50">
                                            <span className="text-[#64748b] font-bold text-[11px] uppercase tracking-wider">Account</span>
                                            <span className="text-[#64748b] font-bold text-[11px] uppercase tracking-wider">Pricing</span>
                                        </div>
                                        <ul className="space-y-3 mb-10">
                                            {[
                                                { label: '$50k Account', price: '$800' },
                                                { label: '$100k Account', price: '$1200' },
                                                { label: '$200k Account', price: '$1700' },
                                                { label: '$500k Account', price: '$2500' }
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center justify-between">
                                                    <span className="text-[#334155] text-[15px] font-medium">{item.label}</span>
                                                    <span className="bg-[#5c6bc0] text-white font-bold text-sm px-2.5 py-1 rounded shadow-sm">{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* <div className="mb-10 mt-auto">
                                            <p className="text-[#1e293b] font-semibold text-[15px] mb-4">Benefits</p>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-2.5">
                                                    <Check className="h-4 w-4 text-[#5c6bc0] mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#4b5563] text-[13px] font-medium leading-tight">You may continue Step 2 yourself</span>
                                                </li>
                                                <li className="flex items-start gap-2.5">
                                                    <Check className="h-4 w-4 text-[#5c6bc0] mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#4b5563] text-[13px] font-medium leading-tight">Or upgrade later to full completion</span>
                                                </li>
                                            </ul>
                                        </div> */}

                                        <Link href="/pass-funded-accounts/checkout?plan=Guaranteed&type=2-Step%20Challenge%20(Step%201%20Pass%20Only)" className="w-full bg-[#5c6bc0] hover:bg-[#4f5baf] text-white font-semibold py-3.5 rounded-lg transition-colors duration-200 shadow-md text-center block text-[15px]">
                                            Select Step 1 Pass
                                        </Link>
                                    </div>
                                </div>

                                {/* Card 2: 2-Step Challenge Full */}
                                <div className="bg-[#2a2b53] rounded-xl overflow-hidden flex flex-col shadow-xl transform md:-translate-y-4 relative border-[1.5px] border-[#5c6bc0]">
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-[#5c6bc0] text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-b-lg flex items-center gap-1.5 z-10 w-max">
                                        MOST CHOSEN <span className="text-sm">👍</span>
                                    </div>
                                    <div className="p-6 md:p-8 pt-12 text-left flex flex-col flex-1">
                                        <h4 className="text-white text-xl font-bold tracking-tight mb-1">2-Step Challenge</h4>
                                        <p className="text-[#a5b4fc] text-[15px] font-medium mb-4">Full (Step 1 + Step 2)</p>
                                        <p className="text-[#cbd5e1] text-[13px] leading-relaxed mb-8">Best for traders who want the entire challenge completed. We complete both Step 1 and Step 2, then return the passed account to you.</p>

                                        <div className="flex justify-between items-baseline mb-4 pb-2 border-b border-white/10">
                                            <span className="text-[#94a3b8] font-bold text-[11px] uppercase tracking-wider">Account</span>
                                            <span className="text-[#94a3b8] font-bold text-[11px] uppercase tracking-wider">Pricing</span>
                                        </div>
                                        <ul className="space-y-3 mb-10">
                                            {[
                                                { label: '$50k Account', price: '$1100' },
                                                { label: '$100k Account', price: '$1600' },
                                                { label: '$200k Account', price: '$2200' },
                                                { label: '$500k Account', price: '$3200' }
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center justify-between">
                                                    <span className="text-[#e2e8f0] text-[15px] font-medium">{item.label}</span>
                                                    <span className="bg-white text-[#2a2b53] font-bold text-sm px-2.5 py-1 rounded shadow-sm">{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* <div className="mb-10 mt-auto">
                                            <p className="text-white font-semibold text-[15px] mb-4">Benefits</p>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-2.5">
                                                    <Check className="h-4 w-4 text-[#a5b4fc] mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#cbd5e1] text-[13px] font-medium leading-tight">Optional access to the PropSol Trading System for funded trading support</span>
                                                </li>
                                            </ul>
                                        </div> */}

                                        <Link href="/pass-funded-accounts/checkout?plan=Guaranteed&type=2-Step%20Challenge%20(Full)" className="w-full bg-[#5c6bc0] hover:bg-[#4f5baf] text-white font-semibold py-3.5 rounded-lg transition-colors duration-200 shadow-md text-center block text-[15px]">
                                            Select Full 2-Step Completion
                                        </Link>
                                    </div>
                                </div>

                                {/* Card 3: 1-Step Challenge Full */}
                                <div className="bg-[#e8ebfb] rounded-xl overflow-hidden flex flex-col shadow-sm">
                                    <div className="p-6 md:p-8 text-left flex flex-col flex-1">
                                        <h4 className="text-[#2e377f] text-xl font-bold tracking-tight mb-1">1-Step Challenge</h4>
                                        <p className="text-[#5c6bc0] text-[15px] font-medium mb-4">Full</p>
                                        <p className="text-[#4b5563] text-[13px] leading-relaxed mb-8">Best for firms with single-phase challenges. We complete the entire 1-Step challenge in one structured phase.</p>

                                        <div className="flex justify-between items-baseline mb-4 pb-2 border-b border-gray-300/50">
                                            <span className="text-[#64748b] font-bold text-[11px] uppercase tracking-wider">Account</span>
                                            <span className="text-[#64748b] font-bold text-[11px] uppercase tracking-wider">Pricing</span>
                                        </div>
                                        <ul className="space-y-3 mb-10">
                                            {[
                                                { label: '$50k Account', price: '$1400' },
                                                { label: '$100k Account', price: '$1900' },
                                                { label: '$200k Account', price: '$2600' },
                                                { label: '$500k Account', price: '$3800' }
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center justify-between">
                                                    <span className="text-[#334155] text-[15px] font-medium">{item.label}</span>
                                                    <span className="bg-[#5c6bc0] text-white font-bold text-sm px-2.5 py-1 rounded shadow-sm">{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* <div className="mb-10 mt-auto">
                                            <p className="text-[#1e293b] font-semibold text-[15px] mb-4">Benefits</p>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-2.5">
                                                    <Check className="h-4 w-4 text-[#5c6bc0] mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#4b5563] text-[13px] font-medium leading-tight">Funded account returned to you</span>
                                                </li>
                                                <li className="flex items-start gap-2.5">
                                                    <Check className="h-4 w-4 text-[#5c6bc0] mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#4b5563] text-[13px] font-medium leading-tight">Optional access to the PropSol Trading System</span>
                                                </li>
                                            </ul>
                                        </div> */}

                                        <Link href="/pass-funded-accounts/checkout?plan=Guaranteed&type=1-Step%20Challenge%20(Full)" className="w-full bg-[#5c6bc0] hover:bg-[#4f5baf] text-white font-semibold py-3.5 rounded-lg transition-colors duration-200 shadow-md text-center block text-[15px]">
                                            Select 1-Step Completion
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Standard Pass Section */}
                        <div className="w-full flex flex-col items-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A72] mb-2 font-palanquin-dark tracking-tight">Standard Pass</h2>
                            <p className="text-sm md:text-base text-[#4b5563] mb-10 font-medium">Professional evaluation passing service - No Refund Guarantee</p>

                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative max-w-5xl mx-auto">
                                {/* Card 1: 2-Step Challenge (Step 1 Pass Only) */}
                                <div className="bg-[#e8ebfb] rounded-xl overflow-hidden flex flex-col shadow-sm">
                                    <div className="p-6 md:p-8 text-left flex flex-col flex-1">
                                        <h4 className="text-[#2e377f] text-xl font-bold tracking-tight mb-1">2-Step Challenge</h4>
                                        <p className="text-[#5c6bc0] text-[15px] font-medium mb-4">Step 1 Pass Only</p>
                                        <p className="text-[#4b5563] text-[13px] leading-relaxed mb-8">Best for traders who want help clearing the first stage. We handle Step 1 only. After passing, control is returned to you.</p>

                                        <div className="flex justify-between items-baseline mb-4 pb-2 border-b border-gray-300/50">
                                            <span className="text-[#64748b] font-bold text-[11px] uppercase tracking-wider">Account</span>
                                            <span className="text-[#64748b] font-bold text-[11px] uppercase tracking-wider">Pricing</span>
                                        </div>
                                        <ul className="space-y-3 mb-10">
                                            {[
                                                { label: '$50k Account', price: '$490' },
                                                { label: '$100k Account', price: '$690' },
                                                { label: '$200k Account', price: '$990' },
                                                { label: '$300k Account', price: '$1390' }
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center justify-between">
                                                    <span className="text-[#334155] text-[15px] font-medium">{item.label}</span>
                                                    <span className="bg-[#5c6bc0] text-white font-bold text-sm px-2.5 py-1 rounded shadow-sm">{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* <div className="mb-10 mt-auto">
                                            <p className="text-[#1e293b] font-semibold text-[15px] mb-4">Benefits</p>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-2.5">
                                                    <Check className="h-4 w-4 text-[#5c6bc0] mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#4b5563] text-[13px] font-medium leading-tight">You may continue Step 2 yourself</span>
                                                </li>
                                                <li className="flex items-start gap-2.5">
                                                    <Check className="h-4 w-4 text-[#5c6bc0] mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#4b5563] text-[13px] font-medium leading-tight">Or upgrade later to full completion</span>
                                                </li>
                                            </ul>
                                        </div> */}

                                        <Link href="/pass-funded-accounts/checkout?plan=Standard&type=2-Step%20Challenge%20(Step%201%20Pass%20Only)" className="w-full bg-[#5c6bc0] hover:bg-[#4f5baf] text-white font-semibold py-3.5 rounded-lg transition-colors duration-200 shadow-md text-center block text-[15px]">
                                            Select Step 1 Pass
                                        </Link>
                                    </div>
                                </div>

                                {/* Card 2: 2-Step Challenge Full */}
                                <div className="bg-[#2a2b53] rounded-xl overflow-hidden flex flex-col shadow-xl transform md:-translate-y-4 relative border-[1.5px] border-[#5c6bc0]">
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-[#5c6bc0] text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-b-lg flex items-center gap-1.5 z-10 w-max">
                                        MOST CHOSEN <span className="text-sm">👍</span>
                                    </div>
                                    <div className="p-6 md:p-8 pt-12 text-left flex flex-col flex-1">
                                        <h4 className="text-white text-xl font-bold tracking-tight mb-1">2-Step Challenge</h4>
                                        <p className="text-[#a5b4fc] text-[15px] font-medium mb-4">Full (Step 1 + Step 2)</p>
                                        <p className="text-[#cbd5e1] text-[13px] leading-relaxed mb-8">Best for traders who want the entire challenge completed. We complete both Step 1 and Step 2, then return the passed account to you.</p>

                                        <div className="flex justify-between items-baseline mb-4 pb-2 border-b border-white/10">
                                            <span className="text-[#94a3b8] font-bold text-[11px] uppercase tracking-wider">Account</span>
                                            <span className="text-[#94a3b8] font-bold text-[11px] uppercase tracking-wider">Pricing</span>
                                        </div>
                                        <ul className="space-y-3 mb-10">
                                            {[
                                                { label: '$50k Account', price: '$650' },
                                                { label: '$100k Account', price: '$850' },
                                                { label: '$200k Account', price: '$1290' },
                                                { label: '$500k Account', price: '$1790' }
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center justify-between">
                                                    <span className="text-[#e2e8f0] text-[15px] font-medium">{item.label}</span>
                                                    <span className="bg-white text-[#2a2b53] font-bold text-sm px-2.5 py-1 rounded shadow-sm">{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* <div className="mb-10 mt-auto">
                                            <p className="text-white font-semibold text-[15px] mb-4">Benefits</p>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-2.5">
                                                    <Check className="h-4 w-4 text-[#a5b4fc] mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#cbd5e1] text-[13px] font-medium leading-tight">Optional access to the PropSol Trading System for funded trading support</span>
                                                </li>
                                            </ul>
                                        </div> */}

                                        <Link href="/pass-funded-accounts/checkout?plan=Standard&type=2-Step%20Challenge%20(Full)" className="w-full bg-[#5c6bc0] hover:bg-[#4f5baf] text-white font-semibold py-3.5 rounded-lg transition-colors duration-200 shadow-md text-center block text-[15px]">
                                            Select Full 2-Step Completion
                                        </Link>
                                    </div>
                                </div>

                                {/* Card 3: 1-Step Challenge Full */}
                                <div className="bg-[#e8ebfb] rounded-xl overflow-hidden flex flex-col shadow-sm">
                                    <div className="p-6 md:p-8 text-left flex flex-col flex-1">
                                        <h4 className="text-[#2e377f] text-xl font-bold tracking-tight mb-1">1-Step Challenge</h4>
                                        <p className="text-[#5c6bc0] text-[15px] font-medium mb-4">Full</p>
                                        <p className="text-[#4b5563] text-[13px] leading-relaxed mb-8">Best for firms with single-phase challenges. We complete the entire 1-Step challenge in one structured phase.</p>

                                        <div className="flex justify-between items-baseline mb-4 pb-2 border-b border-gray-300/50">
                                            <span className="text-[#64748b] font-bold text-[11px] uppercase tracking-wider">Account</span>
                                            <span className="text-[#64748b] font-bold text-[11px] uppercase tracking-wider">Pricing</span>
                                        </div>
                                        <ul className="space-y-3 mb-10">
                                            {[
                                                { label: '$50k Account', price: '$1400' },
                                                { label: '$100k Account', price: '$1900' },
                                                { label: '$200k Account', price: '$2600' },
                                                { label: '$500k Account', price: '$3800' }
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center justify-between">
                                                    <span className="text-[#334155] text-[15px] font-medium">{item.label}</span>
                                                    <span className="bg-[#5c6bc0] text-white font-bold text-sm px-2.5 py-1 rounded shadow-sm">{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* <div className="mb-10 mt-auto">
                                            <p className="text-[#1e293b] font-semibold text-[15px] mb-4">Benefits</p>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-2.5">
                                                    <Check className="h-4 w-4 text-[#5c6bc0] mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#4b5563] text-[13px] font-medium leading-tight">Funded account returned to you</span>
                                                </li>
                                                <li className="flex items-start gap-2.5">
                                                    <Check className="h-4 w-4 text-[#5c6bc0] mt-0.5 flex-shrink-0" />
                                                    <span className="text-[#4b5563] text-[13px] font-medium leading-tight">Optional access to the PropSol Trading System</span>
                                                </li>
                                            </ul>
                                        </div> */}

                                        <Link href="/pass-funded-accounts/checkout?plan=Standard&type=1-Step%20Challenge%20(Full)" className="w-full bg-[#5c6bc0] hover:bg-[#4f5baf] text-white font-semibold py-3.5 rounded-lg transition-colors duration-200 shadow-md text-center block text-[15px]">
                                            Select 1-Step Completion
                                        </Link>
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
