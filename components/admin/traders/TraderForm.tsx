'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Trash2, ArrowLeft } from 'lucide-react';
import { TraderCreate, TraderUpdate, Trader } from '@/services/trader.service';

interface TraderFormProps {
    initialData?: Trader;
    onSubmit: (data: TraderCreate | TraderUpdate) => Promise<void>;
    onDelete?: () => void;
    isEditing?: boolean;
}

export default function TraderForm({ initialData, onSubmit, onDelete, isEditing = false }: TraderFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        trader_id: initialData?.trader_id || '',
        name: initialData?.name || '',
        type: initialData?.type || 'Aggressive',
        strategy: initialData?.strategy || '',
        description: initialData?.description || '',
        profitFactor: initialData?.profitFactor || '',
        avgTradeDuration: initialData?.avgTradeDuration || '',
        bestTrade: initialData?.bestTrade || '',
        worstTrade: initialData?.worstTrade || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Transform to snake_case for backend submission
            const submissionData = {
                trader_id: formData.trader_id,
                name: formData.name,
                type: formData.type,
                strategy: formData.strategy,
                description: formData.description,
                profit_factor: formData.profitFactor,
                avg_trade_duration: formData.avgTradeDuration,
                best_trade: formData.bestTrade,
                worst_trade: formData.worstTrade,
            };
            await onSubmit(submissionData as any);
        } catch (error) {
            console.error('Submit failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Trader ID (Unique)</label>
                        <input
                            type="text"
                            name="trader_id"
                            required
                            disabled={isEditing}
                            className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            value={formData.trader_id}
                            onChange={handleChange}
                            placeholder="e.g. managerC"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Display Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-purple-500"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Elite Trader C"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Trader Type</label>
                        <select
                            name="type"
                            className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-purple-500 cursor-pointer"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="Aggressive">Aggressive</option>
                            <option value="Conservative">Conservative</option>
                            <option value="Balanced">Balanced</option>
                            <option value="Institutional">Institutional</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Strategy</label>
                        <input
                            type="text"
                            name="strategy"
                            required
                            className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-purple-500"
                            value={formData.strategy}
                            onChange={handleChange}
                            placeholder="e.g. High-frequency scalping"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Profit Factor</label>
                        <input
                            type="text"
                            name="profitFactor"
                            required
                            className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-purple-500"
                            value={formData.profitFactor}
                            onChange={handleChange}
                            placeholder="e.g. 2.14"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Avg Trade Duration</label>
                        <input
                            type="text"
                            name="avgTradeDuration"
                            required
                            className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-purple-500"
                            value={formData.avgTradeDuration}
                            onChange={handleChange}
                            placeholder="e.g. 4.2 Days"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Best Trade</label>
                        <input
                            type="text"
                            name="bestTrade"
                            required
                            className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-purple-500"
                            value={formData.bestTrade}
                            onChange={handleChange}
                            placeholder="e.g. +$1,450"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Worst Trade</label>
                        <input
                            type="text"
                            name="worstTrade"
                            required
                            className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-purple-500"
                            value={formData.worstTrade}
                            onChange={handleChange}
                            placeholder="e.g. -$320"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-400">Description</label>
                        <textarea
                            name="description"
                            className="w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-purple-500 min-h-[100px]"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Optional detailed description..."
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-6 py-2.5 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="flex items-center gap-3">
                    {onDelete && isEditing && (
                        <button
                            type="button"
                            onClick={onDelete}
                            className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-lg transition-all font-medium"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Trader
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all font-medium shadow-lg shadow-purple-600/20 disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isEditing ? 'Update Trader' : 'Create Trader'}
                    </button>
                </div>
            </div>
        </form>
    );
}
