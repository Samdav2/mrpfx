'use client';

import { useState, useEffect } from 'react';
import { Plus, X, Check, Loader2, Tag, Folder, Search } from 'lucide-react';
import { adminTermService, WPTerm } from '@/lib/admin-api';

interface TermSelectorProps {
    taxonomy: 'category' | 'post_tag' | 'product_cat' | 'product_tag';
    selectedIds: number[];
    onChange: (ids: number[]) => void;
    label: string;
}

export default function TermSelector({ taxonomy, selectedIds, onChange, label }: TermSelectorProps) {
    const [allTerms, setAllTerms] = useState<WPTerm[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTermName, setNewTermName] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                let terms: WPTerm[] = [];
                if (taxonomy === 'category' || taxonomy === 'product_cat') {
                    terms = await adminTermService.getCategories();
                } else {
                    terms = await adminTermService.getTags();
                }
                setAllTerms(terms);
            } catch (error) {
                console.error(`Failed to fetch ${taxonomy}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchTerms();
    }, [taxonomy]);

    const handleToggle = (id: number) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter(i => i !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    const handleCreateTerm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTermName.trim()) return;

        setCreating(true);
        try {
            let newTerm: WPTerm;
            if (taxonomy === 'category' || taxonomy === 'product_cat') {
                newTerm = await adminTermService.createCategory({ name: newTermName });
            } else {
                newTerm = await adminTermService.createTag({ name: newTermName });
            }

            setAllTerms(prev => [newTerm, ...prev]);
            onChange([...selectedIds, newTerm.term_id]);
            setNewTermName('');
            setShowAddForm(false);
        } catch (error) {
            console.error('Failed to create term:', error);
            alert(`Failed to create ${taxonomy}.`);
        } finally {
            setCreating(false);
        }
    };

    const filteredTerms = allTerms.filter(term =>
        term.name.toLowerCase().includes(search.toLowerCase())
    );

    const isTag = taxonomy === 'post_tag' || taxonomy === 'product_tag';

    return (
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                    {isTag ? <Tag className="w-4 h-4 text-purple-500" /> : <Folder className="w-4 h-4 text-purple-500" />}
                    <h3 className="text-white font-semibold text-sm">{label}</h3>
                </div>
                <button
                    type="button"
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="text-xs text-purple-500 hover:text-purple-400 font-medium flex items-center gap-1"
                >
                    <Plus className="w-3 h-3" />
                    New
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleCreateTerm} className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    <input
                        type="text"
                        autoFocus
                        placeholder={`Enter ${taxonomy.replace('_', ' ')} name...`}
                        className="w-full bg-[#1F2937] text-white text-xs rounded-lg px-3 py-2 outline-none border border-gray-700 focus:border-purple-500"
                        value={newTermName}
                        onChange={(e) => setNewTermName(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="text-[10px] text-gray-400 hover:text-white px-2 py-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={creating || !newTermName.trim()}
                            className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-medium px-3 py-1 rounded-md disabled:opacity-50"
                        >
                            {creating ? 'Adding...' : 'Add'}
                        </button>
                    </div>
                </form>
            )}

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input
                    type="text"
                    placeholder={`Search ${label.toLowerCase()}...`}
                    className="w-full bg-[#1F2937] text-white text-xs rounded-lg pl-9 pr-3 py-2 outline-none border border-transparent focus:border-gray-700"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                {loading ? (
                    <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                    </div>
                ) : filteredTerms.length > 0 ? (
                    filteredTerms.map(term => (
                        <label
                            key={term.term_id}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${selectedIds.includes(term.term_id)
                                    ? 'bg-purple-500/10 text-purple-400'
                                    : 'hover:bg-gray-800 text-gray-400'
                                }`}
                        >
                            <span className="text-xs">{term.name}</span>
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={selectedIds.includes(term.term_id)}
                                    onChange={() => handleToggle(term.term_id)}
                                />
                                <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${selectedIds.includes(term.term_id)
                                        ? 'bg-purple-500 border-purple-500'
                                        : 'border-gray-700 bg-gray-900 group-hover:border-gray-600'
                                    }`}>
                                    {selectedIds.includes(term.term_id) && <Check className="w-2.5 h-2.5 text-white" />}
                                </div>
                            </div>
                        </label>
                    ))
                ) : (
                    <div className="py-4 text-center text-xs text-gray-500">
                        No {label.toLowerCase()} found.
                    </div>
                )}
            </div>

            {selectedIds.length > 0 && (
                <div className="pt-3 border-t border-gray-800">
                    <div className="flex flex-wrap gap-1.5">
                        {selectedIds.map(id => {
                            const term = allTerms.find(t => t.term_id === id);
                            if (!term) return null;
                            return (
                                <span
                                    key={id}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-[10px] border border-gray-700"
                                >
                                    {term.name}
                                    <button onClick={() => handleToggle(id)} className="hover:text-red-400">
                                        <X className="w-2.5 h-2.5" />
                                    </button>
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
