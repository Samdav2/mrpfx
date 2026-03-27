'use client';

import { Edit2, Trash2, Calendar, FileText } from 'lucide-react';
import { TraderPerformance } from '@/services/trader.service';

interface PerformanceListProps {
    performances: TraderPerformance[];
    loading: boolean;
    onEdit: (perf: TraderPerformance) => void;
    onDelete: (id: string | number) => void;
}

export default function PerformanceList({ performances, loading, onEdit, onDelete }: PerformanceListProps) {
    return (
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-gray-800 bg-[#1F2937]/30">
                <h3 className="text-white font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    Monthly Records
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                            <th className="p-4 font-medium">Month</th>
                            <th className="p-4 font-medium">Win Rate</th>
                            <th className="p-4 font-medium">ROI</th>
                            <th className="p-4 font-medium">Max Drawdown</th>
                            <th className="p-4 font-medium">Total Trades</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                                        <span>Loading performance data...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : performances.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">No performance records found.</td>
                            </tr>
                        ) : (
                            performances.map((perf) => (
                                <tr key={perf.performance_id} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors group">
                                    <td className="p-4 font-medium text-white">{perf.month}</td>
                                    <td className="p-4 text-gray-300">{perf.winRate}</td>
                                    <td className="p-4">
                                        <span className="text-green-400 font-bold">{perf.monthlyRoi}</span>
                                    </td>
                                    <td className="p-4 text-red-400">{perf.maxDrawdown}</td>
                                    <td className="p-4 text-gray-300">{perf.totalTrades}</td>
                                    <td className="p-4 text-right align-middle">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(perf)}
                                                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                                title="Edit Record"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(perf.performance_id)}
                                                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                                title="Delete Record"
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
        </div>
    );
}
