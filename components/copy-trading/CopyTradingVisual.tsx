import React from 'react';
import { Check, User, ArrowUpRight, TrendingUp, Settings, Plus, Info } from 'lucide-react';

export default function CopyTradingVisual() {
    return (
        <div className="relative w-full max-w-[400px] h-[650px] mx-auto z-10 font-sans mt-8 md:mt-0">
            {/* The Main Phone Container */}
            <div className="absolute inset-x-0 bottom-0 top-0 bg-[#E8EDF5] rounded-[3rem] p-2 shadow-2xl border-[1px] border-white/50 transform -rotate-2 origin-bottom-right">
                <div className="bg-[#121B36] w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-inner flex flex-col">

                    {/* Phone Notch */}
                    <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
                        <div className="w-32 h-full bg-[#E8EDF5] rounded-b-2xl relative">
                            {/* Speaker */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>
                    </div>

                    {/* App Header Area */}
                    <div className="pt-16 pb-6 px-6 relative z-10 text-white flex-shrink-0">
                        {/* Grid Background Effect */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}></div>

                        <div className="relative">
                            <h2 className="text-3xl font-bold mb-1 font-inter">Trade Copied</h2>
                            <div className="flex items-center text-sm text-gray-400 font-medium">
                                <ArrowUpRight className="h-4 w-4 mr-1 text-[#4ADE80]" />
                                Markets and Trends
                            </div>
                        </div>

                        {/* Top Right Green Checkmark Toast */}
                        <div className="absolute top-12 right-6 bg-[#4ADE80] rounded-xl w-14 h-14 flex items-center justify-center shadow-lg shadow-green-500/20 transform rotate-3">
                            <Check className="h-8 w-8 text-white font-bold" strokeWidth={3} />
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div className="flex-grow bg-[#1A264A] rounded-t-3xl border-t border-[#2A3B6A] relative overflow-hidden flex flex-col justify-between">
                        {/* Faint Grid Lines for Chart */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }}></div>

                        <div className="px-5 pt-6 relative z-10">
                            <div className="text-gray-400 text-sm mb-2">Market Buy Order</div>

                            {/* Stock Display */}
                            <div className="flex justify-between items-center bg-[#253259] rounded-xl p-3 border border-[#3A4B7A]">
                                <div className="flex items-center">
                                    <div className="bg-red-500 text-white text-[10px] font-bold px-1 rounded mr-2">T</div>
                                    <div>
                                        <div className="font-bold text-white leading-tight">TSLA <span className="text-gray-400 text-xs font-normal"> (Tesla Inc.)</span></div>
                                        <div className="text-gray-300 text-sm">$ 9 bit</div>
                                    </div>
                                </div>
                                <div className="bg-[#1A264A] text-white px-3 py-1.5 rounded-lg text-sm border border-[#3A4B7A] flex items-center">
                                    <TrendingUp className="h-3 w-3 mr-1 text-gray-400" />
                                    65,000 <span className="text-gray-500 text-xs ml-1">Volume</span>
                                </div>
                            </div>
                        </div>

                        {/* Abstract Candlesticks Container */}
                        <div className="h-48 relative px-4 w-full flex items-end justify-between z-10 mb-4 px-6 pt-10">
                            {/* Trend Line */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
                                <path d="M0,150 Q50,140 100,100 T200,80 T300,40 T400,20" fill="none" stroke="#4ADE80" strokeWidth="2" strokeOpacity="0.5" />
                                <path d="M0,180 Q50,160 100,120 T200,100 T300,60 T400,40" fill="none" stroke="#F87171" strokeWidth="1" strokeOpacity="0.3" />
                            </svg>

                            {/* Candles */}
                            {[
                                { h: 30, color: 'bg-green-500', mb: 10 },
                                { h: 50, color: 'bg-red-500', mb: 20 },
                                { h: 40, color: 'bg-green-500', mb: 15 },
                                { h: 70, color: 'bg-red-500', mb: 40 },
                                { h: 60, color: 'bg-green-500', mb: 35 },
                                { h: 90, color: 'bg-green-500', mb: 50 },
                                { h: 45, color: 'bg-red-500', mb: 70 },
                                { h: 80, color: 'bg-green-500', mb: 60 },
                                { h: 100, color: 'bg-green-500', mb: 85 },
                                { h: 70, color: 'bg-red-500', mb: 110 },
                                { h: 120, color: 'bg-green-500', mb: 105 },
                                { h: 140, color: 'bg-green-500', mb: 130 },
                            ].map((candle, i) => (
                                <div key={i} className="flex flex-col items-center justify-end relative" style={{ height: '100%', paddingBottom: `${candle.mb}px` }}>
                                    <div className="w-[1px] h-full bg-gray-500 absolute bottom-0 opacity-30" style={{ height: `${candle.h + candle.mb + 20}px` }}></div>
                                    <div className={`w-2.5 rounded-sm relative z-10 ${candle.color}`} style={{ height: `${candle.h}px` }}></div>
                                </div>
                            ))}
                        </div>

                        {/* App Bottom UI */}
                        <div className="bg-[#121B36] rounded-t-3xl pt-5 pb-8 px-6 relative z-30">
                            {/* App Nav Icons */}
                            <div className="flex justify-between mb-6">
                                <div className="flex flex-col items-center text-[#4ADE80]">
                                    <div className="bg-[#1A264A] p-3 rounded-xl mb-1 border border-[#2A3B6A]">
                                        <TrendingUp className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px]">Quick Trade</span>
                                </div>
                                <div className="flex flex-col items-center text-gray-400">
                                    <div className="p-3 rounded-xl mb-1 hover:bg-[#1A264A]">
                                        <Settings className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px]">View Orders</span>
                                </div>
                                <div className="flex flex-col items-center text-gray-400">
                                    <div className="p-3 rounded-xl mb-1 hover:bg-[#1A264A]">
                                        <Info className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px]">Performance</span>
                                </div>
                            </div>

                            <div className="text-white font-medium mb-3">Market Positions</div>
                            <button className="w-full bg-[#10B981] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-900/20 tracking-wide">
                                CLOSE POSITIONS
                            </button>

                            <div className="flex justify-between items-center mt-5 text-gray-400 text-xs border-t border-[#2A3B6A] pt-4">
                                <span className="font-medium text-gray-300">Close Trade</span>
                                <span className="font-bold text-white text-base">10K</span>
                                <div className="text-right">
                                    <div>SL: 180.20</div>
                                    <div>Vol: 10K</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Left Floating "Ready to Copy" Box */}
            <div className="absolute top-[40%] text-center -left-16 bg-white/60 backdrop-blur-xl border border-white p-4 rounded-2xl shadow-xl z-20 transform -rotate-3 transition hover:scale-105">
                <div className="text-[#333333] font-dm-sans font-medium text-sm mb-3 px-2">Ready to Copy</div>
                <div className="bg-[#3B82F6] w-16 h-16 rounded-[1.2rem] mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <div className="bg-white rounded-lg p-1.5 transform rotate-3 relative">
                        <div className="w-6 h-6 border-2 border-[#3B82F6] rounded flex items-center justify-center pb-0.5">
                            <Plus className="h-4 w-4 text-[#3B82F6] font-bold" strokeWidth={3} />
                        </div>
                        <div className="absolute -top-1.5 -right-1.5 bg-[#3B82F6] text-white rounded-full p-0.5 border border-white">
                            <TrendingUp className="h-2 w-2" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Floating User Stats Box */}
            <div className="absolute bottom-24 -right-12 bg-white rounded-2xl p-5 shadow-2xl border border-gray-100 z-30 transform rotate-2 w-64 transition hover:scale-105">
                <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-2 mr-3 text-[#3B82F6]">
                        <User className="h-4 w-4" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 leading-none mb-1">User: Name</div>
                    </div>
                </div>

                {/* Micro Chart Graphic */}
                <div className="h-6 w-full flex items-center mb-4 border border-gray-100 rounded overflow-hidden">
                    <div className="w-1/3 h-full border-r border-gray-100 bg-gray-50 flex items-center pl-2">
                        <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
                            <path d="M0,0 L8,8 L16,4 L24,10" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>
                    <div className="w-2/3 h-full flex items-center justify-around px-2 relative">
                        <div className="w-2 h-2 rounded-sm bg-red-400 rotate-45 transform"></div>
                        <div className="w-2 h-2 rounded-sm bg-red-400 rotate-45 transform"></div>
                        <div className="w-6 h-1 rounded-sm bg-green-400 absolute right-2 flex items-center justify-end">
                            <div className="w-0 h-0 border-t-4 border-b-4 border-l-[6px] border-transparent border-l-green-500 translate-x-1"></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Copier Profit:</span>
                        <span className="text-green-500 font-bold">+15.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Risk Score:</span>
                        <span className="font-bold text-gray-800">3/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Followers:</span>
                        <span className="font-bold text-gray-800">128</span>
                    </div>
                </div>
            </div>

            {/* Background elements to mimic image background arrows */}
            <div className="absolute top-[30%] -right-16 z-0 hidden md:block">
                <div className="w-8 h-8 opacity-20 transform -rotate-45">
                    <div className="w-4 h-4 border-b-[3px] border-r-[3px] border-blue-900 bg-blue-500"></div>
                </div>
            </div>

            <div className="absolute top-[60%] -right-24 z-0 hidden md:block opacity-40">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                    <path d="M0,12 L20,12" stroke="#4B5563" strokeWidth="4" strokeDasharray="6 6" />
                    <path d="M18,4 L28,12 L18,20" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}
