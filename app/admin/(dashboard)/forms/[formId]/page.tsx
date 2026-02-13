'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Save, Layout, FileJson, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { adminFormService } from '@/lib/admin-api';
import FormBuilder from '@/components/admin/FormBuilder';

export default function EditFormPage() {
    const router = useRouter();
    const params = useParams();
    const formId = parseInt(params.formId as string);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'builder' | 'json'>('builder');

    useEffect(() => {
        if (formId) {
            fetchForm();
        }
    }, [formId]);

    const fetchForm = async () => {
        setLoading(true);
        try {
            const data = await adminFormService.getById(formId);
            setTitle(data.title || '');
            setContent(data.content || '{"fields": []}');
        } catch (err: any) {
            setError(err.message || 'Failed to fetch form');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            // Validate JSON
            try {
                JSON.parse(content);
            } catch (e) {
                throw new Error("Invalid JSON content. Please check your syntax.");
            }

            await adminFormService.update(formId, {
                title,
                content
            });

            router.push('/admin/forms');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Failed to update form');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/forms"
                        className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Edit Form</h1>
                        <p className="text-gray-500 text-sm">Editing form definition ID: {formId}</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving || !title}
                    className="flex items-center gap-2 px-6 py-2 bg-[#d946ef] hover:bg-[#c026d3] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/20"
                >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {/* General Info */}
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-white font-semibold">
                            <Layout className="w-5 h-5 text-purple-500" />
                            <h2>General Information</h2>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Form Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Main Newsletter Form"
                            className="w-full bg-[#0B0F1A] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            required
                        />
                    </div>
                </div>

                {/* Form Editor Tabs */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 p-1 bg-[#111827] border border-gray-800 rounded-lg w-fit">
                        <button
                            onClick={() => setActiveTab('builder')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'builder' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Visual Builder
                        </button>
                        <button
                            onClick={() => setActiveTab('json')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'json' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            JSON Source
                        </button>
                    </div>

                    {activeTab === 'builder' ? (
                        <FormBuilder
                            initialContent={content}
                            onChange={(json) => setContent(json)}
                        />
                    ) : (
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                            <div className="flex items-center gap-2 text-white font-semibold mb-4">
                                <FileJson className="w-5 h-5 text-purple-500" />
                                <h2>Form Configuration (JSON)</h2>
                            </div>

                            <div className="relative">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={15}
                                    className="w-full bg-[#0B0F1A] border border-gray-800 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
