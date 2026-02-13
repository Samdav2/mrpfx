'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Search,
    RefreshCcw,
    Calendar,
    User,
    Mail,
    FileText,
    Filter,
    ArrowUpDown
} from 'lucide-react';
import { adminFormService } from '@/lib/admin-api';
import { WPFormEntry } from '@/lib/types';

export default function FormEntriesPage() {
    const params = useParams();
    const router = useRouter();
    const formId = parseInt(params.formId as string);

    const [searchTerm, setSearchTerm] = useState('');
    const [entries, setEntries] = useState<WPFormEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (formId) {
            fetchEntries();
        }
    }, [formId]);

    const fetchEntries = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await adminFormService.getEntries(formId);
            if (Array.isArray(data)) {
                setEntries(data);
            }
        } catch (err: any) {
            console.error("Failed to fetch entries", err);
            setError('Failed to load form entries. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filteredEntries = entries.filter(entry =>
        entry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Form Entries</h1>
                        <p className="text-gray-500 text-sm">Viewing submissions for form ID: {formId}</p>
                    </div>
                </div>
                <button
                    onClick={fetchEntries}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                </button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#111827] border border-gray-800 p-4 rounded-xl">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search entries..."
                        className="w-full bg-[#0B0F1A] border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-[#0B0F1A] border border-gray-800 text-gray-400 hover:text-white rounded-lg text-sm transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm">
                    {error}
                </div>
            )}

            {/* Entries List */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                                <th className="p-4 font-medium">ID</th>
                                <th className="p-4 font-medium flex items-center gap-2 cursor-pointer hover:text-white">
                                    Date <ArrowUpDown className="w-3 h-3" />
                                </th>
                                <th className="p-4 font-medium">Title</th>
                                <th className="p-4 font-medium">Message/Data</th>
                                <th className="p-4 font-medium">Types</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">Loading entries...</td>
                                </tr>
                            ) : filteredEntries.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        No entries found for this form.
                                    </td>
                                </tr>
                            ) : (
                                filteredEntries.map((entry) => (
                                    <tr key={entry.id} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors group">
                                        <td className="p-4 text-gray-500 font-mono text-xs">{entry.id}</td>
                                        <td className="p-4 text-gray-400 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-purple-500" />
                                                {formatDate(entry.created_at)}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-white font-medium">{entry.title}</span>
                                        </td>
                                        <td className="p-4 text-gray-400 max-w-md">
                                            <div className="flex items-start gap-2">
                                                <FileText className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                                                <span className="line-clamp-2">{entry.message}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {entry.types.split(',').map((type, i) => (
                                                    <span key={i} className="bg-gray-800 px-2 py-0.5 rounded text-[10px] uppercase text-gray-400 border border-gray-700">
                                                        {type.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
