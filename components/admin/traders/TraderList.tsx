'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    TrendingUp,
    BarChart2,
    Users,
    MoreVertical,
    ArrowUpDown
} from 'lucide-react';
import { Trader } from '@/services/trader.service';

interface TraderListProps {
    traders: Trader[];
    loading: boolean;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onDelete: (id: string) => void;
}

export default function TraderList({
    traders,
    loading,
    searchTerm,
    onSearchChange,
    onDelete
}: TraderListProps) {
    const filteredTraders = Array.isArray(traders) ? traders.filter(trader =>
        trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trader.trader_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trader.strategy.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-800 gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        All Traders
                    </h3>
                    <div className="relative flex-1 md:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search traders..."
                            className="bg-[#0B0E14] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500 w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                </div>
                <Link
                    href="/admin/traders/add"
                    className="flex items-center gap-2 px-4 py-2 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20 w-full md:w-auto justify-center"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Trader</span>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                            <th className="p-4 font-medium">Trader</th>
                            <th className="p-4 font-medium">Strategy</th>
                            <th className="p-4 font-medium">Profit Factor</th>
                            <th className="p-4 font-medium">Avg duration</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                                        <span>Loading traders...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredTraders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">No traders found.</td>
                            </tr>
                        ) : (
                            filteredTraders.map((trader) => (
                                <tr key={trader.trader_id} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                                <TrendingUp className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{trader.name}</p>
                                                <p className="text-gray-500 text-xs">ID: {trader.trader_id} • {trader.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-300">
                                        <div className="max-w-xs truncate" title={trader.strategy}>
                                            {trader.strategy}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs border border-green-500/20 font-medium">
                                            {trader.profitFactor}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-300">{trader.avgTradeDuration}</td>
                                    <td className="p-4 text-right align-middle">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/traders/${trader.trader_id}`}
                                                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                                title="Manage Performance"
                                            >
                                                <BarChart2 className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/traders/edit/${trader.trader_id}`}
                                                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                                title="Edit Trader"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => onDelete(trader.trader_id)}
                                                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                                title="Delete Trader"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-[#1F2937]/30 border-t border-gray-800 text-xs text-gray-500 text-center">
                Total Traders: {filteredTraders.length}
            </div>
        </div>
    );
}
