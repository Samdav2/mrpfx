'use client';

import { useState, useEffect } from 'react';
import {
    Link as LinkIcon,
    Plus,
    Trash2,
    Edit2,
    ExternalLink,
    Search,
    X
} from 'lucide-react';
import { adminLinkService, WPLink } from '@/lib/admin-api';

export function LinkManager() {
    const [links, setLinks] = useState<WPLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<WPLink | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        description: '',
        visible: 'Y',
        target: ''
    });

    const fetchLinks = async () => {
        try {
            setLoading(true);
            const data = await adminLinkService.getAll();
            setLinks(data);
        } catch (error) {
            console.error('Failed to fetch links:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleCreateClick = () => {
        setEditingLink(null);
        setFormData({
            name: '',
            url: '',
            description: '',
            visible: 'Y',
            target: ''
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (link: WPLink) => {
        setEditingLink(link);
        setFormData({
            name: link.link_name,
            url: link.link_url,
            description: link.link_description || '',
            visible: link.link_visible,
            target: link.link_target || ''
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id: number) => {
        if (!confirm('Are you sure you want to delete this link?')) return;
        try {
            await adminLinkService.delete(id);
            await fetchLinks();
        } catch (error) {
            console.error('Failed to delete link:', error);
            alert('Failed to delete link');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingLink) {
                await adminLinkService.update(editingLink.link_id, formData);
            } else {
                await adminLinkService.create(formData);
            }
            setIsModalOpen(false);
            fetchLinks();
        } catch (error) {
            console.error('Failed to save link:', error);
            alert('Failed to save link');
        }
    };

    return (
        <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <LinkIcon className="h-6 w-6 text-purple-500" />
                        Platform Links
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Manage external resources and quick-access bookmarks</p>
                </div>
                <button
                    onClick={handleCreateClick}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                    <Plus className="h-4 w-4" />
                    New Link
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#1F2937]/30 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="px-6 py-4">Link Name</th>
                            <th className="px-6 py-4">Destination URL</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Options</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50 text-gray-300">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                                        <span>Syncing links...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : links.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No platform links found.</td>
                            </tr>
                        ) : (
                            links.map((link) => (
                                <tr key={link.link_id} className="hover:bg-[#1F2937]/30 transition-colors">
                                    <td className="px-6 py-4 font-bold text-white uppercase">{link.link_name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 max-w-xs">
                                            <a href={link.link_url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline truncate">
                                                {link.link_url}
                                            </a>
                                            <ExternalLink className="h-3 w-3 text-gray-600 flex-shrink-0" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${link.link_visible === 'Y' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                                            {link.link_visible === 'Y' ? 'Live' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-gray-500">
                                            <button
                                                onClick={() => handleEditClick(link)}
                                                className="p-1.5 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                                title="Edit Link"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(link.link_id)}
                                                className="p-1.5 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Delete Link"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#111827] border border-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">
                                {editingLink ? 'Edit Platform Link' : 'Register New Link'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Display Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#1F2937] text-white rounded-lg border border-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="e.g. Documentation"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Destination URL</label>
                                <input
                                    type="url"
                                    required
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full bg-[#1F2937] text-white rounded-lg border border-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description (Optional)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-[#1F2937] text-white rounded-lg border border-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                                    rows={3}
                                    placeholder="Brief explanation of this link..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Visibility</label>
                                    <select
                                        value={formData.visible}
                                        onChange={(e) => setFormData({ ...formData, visible: e.target.value })}
                                        className="w-full bg-[#1F2937] text-white rounded-lg border border-gray-800 px-4 py-2.5 text-sm focus:outline-none"
                                    >
                                        <option value="Y">Live</option>
                                        <option value="N">Hidden</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Target</label>
                                    <select
                                        value={formData.target}
                                        onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                                        className="w-full bg-[#1F2937] text-white rounded-lg border border-gray-800 px-4 py-2.5 text-sm focus:outline-none"
                                    >
                                        <option value="">Same Tab</option>
                                        <option value="_blank">New Tab</option>
                                        <option value="_top">Top</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-sm font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-900/20"
                                >
                                    {editingLink ? 'Update Entry' : 'Register Link'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
