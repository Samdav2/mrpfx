'use client';

import { useState, useEffect } from 'react';
import { adminService, EmailTemplate, AdminUser } from '@/lib/admin';
import { Send, Users, FileText, Type, AlignLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function EmailMarketingPage() {
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [users, setUsers] = useState<AdminUser[]>([]);

    const [targetOption, setTargetOption] = useState<'all' | 'specific'>('all');
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [templateId, setTemplateId] = useState<string>('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialFetch, setInitialFetch] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [tp, usr] = await Promise.all([
                    adminService.getTemplates(),
                    adminService.getUsers(1, 100) // Fetch first 100 users for specific selection
                ]);
                setTemplates(tp);
                setUsers(usr);
            } catch (err) {
                console.error('Failed to load initial data:', err);
                toast.error('Failed to load templates or users.');
            } finally {
                setInitialFetch(false);
            }
        };
        loadData();
    }, []);

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tId = e.target.value;
        setTemplateId(tId);
        const t = templates.find(temp => temp.id === tId);
        if (t && !subject) {
            setSubject(t.subject);
        }
        // We no longer set the message from the template body to keep the editor clean
    };

    const handleUserToggle = (id: number) => {
        setSelectedUserIds(prev =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (targetOption === 'specific' && selectedUserIds.length === 0) {
            toast.error('Please select at least one user.');
            return;
        }

        if (!subject || !message) {
            toast.error('Subject and message are required.');
            return;
        }

        setLoading(true);
        try {
            await adminService.sendEmail({
                targetOption,
                userIds: selectedUserIds,
                templateId,
                subject,
                message
            });
            toast.success('Email campaign successfully initiated!');
            // Reset form if needed
        } catch (error) {
            console.error('Email send failed:', error);
            toast.error('Failed to send email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (initialFetch) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-6 pb-20">
            <div>
                <h1 className="text-2xl font-bold text-white">Email Marketing</h1>
                <p className="text-gray-400 text-sm mt-1">Create and send email campaigns to your users.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6">

                {/* Target Audience */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        Target Audience
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="targetOption"
                                checked={targetOption === 'all'}
                                onChange={() => setTargetOption('all')}
                                className="text-purple-500 focus:ring-purple-500 bg-[#1F2937] border-gray-700"
                            />
                            <span className="text-gray-300">All Users</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="targetOption"
                                checked={targetOption === 'specific'}
                                onChange={() => setTargetOption('specific')}
                                className="text-purple-500 focus:ring-purple-500 bg-[#1F2937] border-gray-700"
                            />
                            <span className="text-gray-300">Specific Users</span>
                        </label>
                    </div>

                    {targetOption === 'specific' && (
                        <div className="mt-3 max-h-48 overflow-y-auto bg-[#1F2937] border border-gray-700 rounded-lg p-3 custom-scrollbar">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {users.map(u => (
                                    <label key={u.ID} className="flex items-center gap-2 cursor-pointer text-sm text-gray-300 hover:text-white">
                                        <input
                                            type="checkbox"
                                            checked={selectedUserIds.includes(u.ID)}
                                            onChange={() => handleUserToggle(u.ID)}
                                            className="rounded text-purple-500 focus:ring-purple-500 bg-[#111827] border-gray-600"
                                        />
                                        <span className="truncate">{u.user_email || u.user_login}</span>
                                    </label>
                                ))}
                                {users.length === 0 && <span className="text-gray-500 text-sm">No users found.</span>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Template Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-400" />
                        Email Template
                    </label>
                    <select
                        value={templateId}
                        onChange={handleTemplateChange}
                        className="w-full bg-[#1F2937] border border-gray-700 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500"
                    >
                        <option value="">-- No Template (Custom Message) --</option>
                        {templates.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </div>

                {/* Subject Line */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                        <Type className="w-4 h-4 text-purple-400" />
                        Subject Line
                    </label>
                    <input
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        placeholder="e.g. Special Offer Just For You"
                        required
                        className="w-full bg-[#1F2937] border border-gray-700 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500"
                    />
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                        <AlignLeft className="w-4 h-4 text-purple-400" />
                        Email Message
                    </label>
                    <div className="bg-white rounded-lg overflow-hidden [&_.ql-editor]:min-h-[250px] [&_.ql-editor]:text-gray-900 border border-gray-300">
                        <ReactQuill
                            theme="snow"
                            value={message}
                            onChange={setMessage}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <p className="text-xs text-gray-500">
                            <span className="text-purple-400 font-mono">{"{{ username }}"}</span> - User's name
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="text-purple-400 font-mono">{"{{ login_id }}"}</span> - Account Login ID
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="text-purple-400 font-mono">{"{{ platform }}"}</span> - Trading Platform
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="text-purple-400 font-mono">{"{{ user_email }}"}</span> - User's Email
                        </p>
                    </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-gray-800 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                        Send Campaign
                    </button>
                </div>

            </form>
        </div>
    );
}
