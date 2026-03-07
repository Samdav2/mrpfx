"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function RiskCalculator() {
    const [instrument, setInstrument] = useState("EURUSD");
    const [equity, setEquity] = useState<string>("5000");
    const [riskPercent, setRiskPercent] = useState<string>("1");
    const [entryPrice, setEntryPrice] = useState<string>("");
    const [stopLossPips, setStopLossPips] = useState<string>("25");
    const [riskReward, setRiskReward] = useState("1:3");

    const isJpy = instrument.includes("JPY");
    const pipMultiplier = isJpy ? 0.01 : 0.0001;

    // Derived Calculation Values
    const eqNum = parseFloat(equity.replace(/,/g, "")) || 0;
    const riskNum = parseFloat(riskPercent) || 0;
    const slNum = parseFloat(stopLossPips) || 0;
    const entryNum = parseFloat(entryPrice) || 0;

    const riskAmount = eqNum * (riskNum / 100);

    // Standard pip value approximation (base quote USD)
    const pipValue = 10;
    let lotSize = 0;
    if (slNum > 0) {
        const riskPerLot = slNum * pipValue;
        lotSize = riskAmount / riskPerLot;
    }

    let slPrice = 0;
    let tpPrice = 0;
    let tpPips = 0;

    if (entryNum > 0 && slNum > 0) {
        slPrice = entryNum - slNum * pipMultiplier;

        const [riskRatio, rewardRatio] = riskReward.split(":").map(Number);
        const rrMult = (rewardRatio / riskRatio) || 3;
        tpPips = slNum * rrMult;

        tpPrice = entryNum + tpPips * pipMultiplier;
    }

    const formatPrice = (price: number) => {
        if (price === 0) return "0.00000";
        return price.toFixed(isJpy ? 3 : 5);
    };

    return (
        <div className="min-h-screen bg-[#f0f4f8] text-slate-800 py-12 px-4 font-sans flex flex-col items-center justify-start relative overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#e3ebf7] to-[#f0f4f8] -z-10"></div>

            <div className="w-full max-w-4xl pt-4">
                <div className="text-center mb-8">
                    <h1 className="text-[34px] md:text-5xl font-semibold text-[#29326b] mb-4">
                        Trade Risk Calculator
                    </h1>
                    <p className="text-[#596489] text-[17px] max-w-xl mx-auto leading-relaxed">
                        Calculate your position size, stop loss, and take profit<br /> based on your capital and risk tolerance.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row border border-gray-100/50">

                    {/* Left Side */}
                    <div className="w-full md:w-[60%] p-6 md:p-8">
                        <h2 className="text-center text-[19px] font-medium text-[#29326b] mb-8">Trade Risk Calculator</h2>

                        <div className="space-y-[12px]">
                            {/* Instrument */}
                            <div className="flex justify-between items-center px-1 py-1">
                                <label className="text-[15px] text-slate-700">Instrument</label>
                                <div className="relative">
                                    <select
                                        value={instrument}
                                        onChange={(e) => setInstrument(e.target.value)}
                                        className="appearance-none bg-transparent text-right font-medium text-slate-700 outline-none pr-4 focus:outline-none cursor-pointer"
                                    >
                                        <option value="XAGUSD">XAGUSD</option>
                                        <option value="US100">US100</option>
                                        <option value="US30">US30</option>
                                        <option value="USOIL">USOIL</option>
                                    </select>
                                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Account Equity */}
                            <div className="border border-gray-200 bg-white rounded flex justify-between items-center p-[8px] px-3">
                                <label className="text-[15px] text-slate-700">Account Equity</label>
                                <div className="relative">
                                    <span className="absolute left-0 top-1/2 -translate-y-[45%] text-slate-500 font-medium">$</span>
                                    <input
                                        type="text"
                                        value={equity}
                                        onChange={(e) => setEquity(e.target.value)}
                                        className="w-24 text-right font-medium text-slate-700 outline-none pl-4 bg-transparent"
                                    />
                                </div>
                            </div>

                            {/* Risk Per Trade */}
                            <div className="flex justify-between items-center px-1 py-1">
                                <label className="text-[15px] text-slate-700">Risk Per Trade (%)</label>
                                <div className="flex items-center space-x-1 border border-gray-200 bg-white rounded py-[4px] px-2 shadow-sm">
                                    <input
                                        type="text"
                                        value={riskPercent}
                                        onChange={(e) => setRiskPercent(e.target.value)}
                                        className="w-8 text-right font-medium text-slate-700 outline-none bg-transparent"
                                    />
                                    <span className="text-[15px] font-medium text-slate-400 pl-1">%</span>
                                </div>
                            </div>

                            {/* Entry Price */}
                            <div className="border border-gray-200 bg-white rounded flex justify-between items-center p-[8px] px-3">
                                <label className="text-[15px] text-slate-700">Entry Price</label>
                                <input
                                    type="text"
                                    value={entryPrice}
                                    onChange={(e) => setEntryPrice(e.target.value)}
                                    className="w-32 text-right font-medium text-slate-700 outline-none bg-transparent"
                                />
                            </div>

                            {/* Stop Loss (Pips) */}
                            <div className="flex justify-between items-center px-1 py-1">
                                <label className="text-[15px] text-slate-700">Stop Loss (Pips)</label>
                                <div className="relative border border-gray-200 bg-white rounded py-[4px] pl-2 pr-6 shadow-sm">
                                    <select
                                        value={stopLossPips}
                                        onChange={(e) => setStopLossPips(e.target.value)}
                                        className="appearance-none w-10 text-right font-medium text-slate-700 outline-none pr-1 bg-transparent cursor-pointer relative z-10"
                                    >
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="25">25</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c6cc0] pointer-events-none z-0" />
                                </div>
                            </div>

                            {/* Risk Reward Ratio */}
                            <div className="border border-gray-200 bg-white rounded flex justify-between items-center p-[8px] px-3 mb-2">
                                <label className="text-[15px] text-slate-700">Risk Reward Ratio</label>
                                <div className="relative">
                                    <select
                                        value={riskReward}
                                        onChange={(e) => setRiskReward(e.target.value)}
                                        className="appearance-none bg-transparent text-right font-medium text-slate-700 outline-none pr-5 cursor-pointer relative z-10"
                                    >
                                        <option value="1:1">1:1</option>
                                        <option value="1:2">1:2</option>
                                        <option value="1:3">1:3</option>
                                        <option value="1:4">1:4</option>
                                        <option value="1:5">1:5</option>
                                    </select>
                                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c6cc0] pointer-events-none z-0" />
                                </div>
                            </div>

                            {/* Calculate Button */}
                            <div className="pt-3 pb-2">
                                <button className="w-full bg-gradient-to-r from-[#5a64be] to-[#5059ad] hover:from-[#4b54a3] hover:to-[#424b94] text-white py-[14px] rounded-[6px] text-[15px] transition-all shadow-md active:scale-[0.99] font-medium tracking-wide">
                                    Calculate Trade Setup
                                </button>
                            </div>

                            {/* Example block aligned cleanly */}
                            <div className="border border-gray-100 rounded-[6px] bg-[#fcfcfd] p-5 mt-2 shadow-[0_1px_3px_0_rgba(0,0,0,0.01)]">
                                <p className="text-[15px] text-slate-700 mb-[12px] font-medium">Example:</p>
                                <div className="text-[14px] text-slate-600">
                                    <div className="mb-[10px] flex gap-2">
                                        Account Equity: <span className="font-semibold text-slate-800">${Number(equity || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-[8px]">
                                        <div>Risk: <span className="font-semibold text-slate-800">{riskPercent || 0}%</span></div>
                                        <div>Entry Price: <span className="font-semibold text-slate-800">{entryPrice || "1.08500"}</span></div>
                                        <div>Stop Loss: <span className="font-semibold text-slate-800">{entryPrice || "1.08500"}</span></div>
                                        <div>Stop Loss: <span className="font-semibold text-slate-800">{formatPrice(slPrice)} <span className="text-[13px] text-slate-400 font-normal">({stopLossPips || 0} pips)</span></span></div>
                                    </div>
                                    <div className="border-t border-gray-100 mt-4 pt-3 pb-1 flex gap-2">
                                        Lot Size: <span className="font-semibold text-slate-800">{lotSize > 0 ? lotSize.toFixed(2) : "0.20"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Results */}
                    <div className="w-full md:w-[40%] bg-[#f5f7fc] p-6 md:p-8 flex flex-col border-t md:border-t-0 md:border-l border-gray-100">
                        <h3 className="text-[#455073] font-medium text-[17px] mb-5">Results</h3>

                        {/* Cards container */}
                        <div className="space-y-[14px]">
                            <div className="bg-white rounded-[6px] p-[18px] shadow-sm border border-gray-50 flex flex-col justify-center min-h-[100px]">
                                <div className="text-[14px] text-slate-600 mb-2">Risk Amount:</div>
                                <div className="text-[26px] text-slate-800 mb-1 leading-none">${riskAmount.toFixed(0)}</div>
                                <div className="text-[11px] text-slate-400 mt-1">Risk Amount = Equity × Risk%</div>
                            </div>

                            <div className="bg-white rounded-[6px] p-[18px] shadow-sm border border-gray-50 flex flex-col justify-center min-h-[100px]">
                                <div className="text-[14px] text-slate-600 mb-2">Stop Loss</div>
                                <div className="text-[20px] text-slate-800 leading-none">
                                    {entryPrice ? formatPrice(slPrice) : "1.08250"} <span className="text-[14px] font-normal text-slate-400">({stopLossPips || "25"} pips)</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-[6px] p-[18px] shadow-sm border border-gray-50 flex flex-col justify-center min-h-[100px]">
                                <div className="text-[14px] text-[#4caf50] mb-2 font-medium">Take Profit</div>
                                <div className="text-[20px] text-slate-800 leading-none">
                                    {entryPrice ? formatPrice(tpPrice) : "1.09250"} <span className="text-[14px] font-normal text-slate-400">({tpPips || "75"} pips)</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-[6px] p-[18px] shadow-sm border border-gray-50 flex flex-col justify-center min-h-[100px]">
                                <div className="text-[14px] text-slate-600 mb-2">Recommended Lot Size</div>
                                <div className="text-[26px] text-slate-800 leading-none">{lotSize > 0 ? lotSize.toFixed(2) : "0.20"}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-[50px] mb-8">
                    <p className="text-[19px] text-[#29326b] font-medium tracking-wide">
                        Trade With Confidence. Trade With Clarity.
                    </p>
                </div>

            </div>
        </div>
    );
}
