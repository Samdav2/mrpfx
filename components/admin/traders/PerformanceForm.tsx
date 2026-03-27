'use client';

import { useState } from 'react';
import { Save, X } from 'lucide-react';
import { TraderPerformanceCreate, TraderPerformanceUpdate, TraderPerformance } from '@/services/trader.service';

interface PerformanceFormProps {
    initialData?: TraderPerformance;
    onSubmit: (data: TraderPerformanceCreate | TraderPerformanceUpdate) => Promise<void>;
    onCancel: () => void;
    isEditing?: boolean;
}

export default function PerformanceForm({ initialData, onSubmit, onCancel, isEditing = false }: PerformanceFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        month: initialData?.month || '',
        winRate: initialData?.winRate || '',
        monthlyRoi: initialData?.monthlyRoi || '',
        maxDrawdown: initialData?.maxDrawdown || '',
        totalTrades: initialData?.totalTrades || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Transform to snake_case for backend submission
            const submissionData = {
                month: formData.month,
                win_rate: formData.winRate,
                monthly_roi: formData.monthlyRoi,
                max_drawdown: formData.maxDrawdown,
                total_trades: formData.totalTrades,
            };
            await onSubmit(submissionData as any);
        } catch (error) {
            console.error('Submit failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#1F2937]/50 border border-gray-800 rounded-xl p-6 space-y-4 shadow-xl">
            <h4 className="text-white font-medium text-lg border-b border-gray-800 pb-2 mb-4">
                {isEditing ? 'Edit Performance Record' : 'Add Monthly Performance'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Month & Year</label>
                    <input
                        type="text"
                        name="month"
                        required
                        className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-3 py-2 outline-none focus:border-purple-500 text-sm"
                        value={formData.month}
                        onChange={handleChange}
                        placeholder="e.g. March 2026"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Win Rate</label>
                    <input
                        type="text"
                        name="winRate"
                        required
                        className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-3 py-2 outline-none focus:border-purple-500 text-sm"
                        value={formData.winRate}
                        onChange={handleChange}
                        placeholder="e.g. 75%"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly ROI</label>
                    <input
                        type="text"
                        name="monthlyRoi"
                        required
                        className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-3 py-2 outline-none focus:border-purple-500 text-sm"
                        value={formData.monthlyRoi}
                        onChange={handleChange}
                        placeholder="e.g. 12%"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Max Drawdown</label>
                    <input
                        type="text"
                        name="maxDrawdown"
                        required
                        className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-3 py-2 outline-none focus:border-purple-500 text-sm"
                        value={formData.maxDrawdown}
                        onChange={handleChange}
                        placeholder="e.g. 5%"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Trades</label>
                    <input
                        type="text"
                        name="totalTrades"
                        required
                        className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-3 py-2 outline-none focus:border-purple-500 text-sm"
                        value={formData.totalTrades}
                        onChange={handleChange}
                        placeholder="e.g. 150"
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-sm font-medium"
                >
                    <X className="w-4 h-4" />
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all text-sm font-medium shadow-lg shadow-green-600/20 disabled:opacity-50"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {isEditing ? 'Update Record' : 'Save Record'}
                </button>
            </div>
        </form>
    );
}
