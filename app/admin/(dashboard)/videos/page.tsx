'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Plus,
    Youtube,
    Settings,
    ArrowUpDown,
    ExternalLink,
    Play,
    Video
} from 'lucide-react';
import { adminDynamicService, DynamicVideo } from '@/lib/admin-api';

export default function VideosPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [videos, setVideos] = useState<DynamicVideo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const data = await adminDynamicService.getVideos(50); // Fetch more for administration
            if (Array.isArray(data)) {
                setVideos(data);
            }
        } catch (error) {
            console.error("Failed to fetch videos", error);
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white">Trading Videos</h1>
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search videos..."
                            className="bg-gray-900/50 text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/videos/add"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-purple-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Video</span>
                    </Link>
                </div>
            </div>

            {/* Videos Grid */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-semibold">YouTube Content</h3>
                    <span className="text-xs text-purple-400">Total: {videos.length}</span>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-video bg-gray-800 rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : filteredVideos.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <Video className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No videos found. Link your first YouTube video!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredVideos.map((video) => (
                            <div key={video.id} className="group relative bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all">
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <Link
                                            href={`/admin/videos/${video.id}`}
                                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all"
                                            title="Edit Video"
                                        >
                                            <Settings className="w-5 h-5" />
                                        </Link>
                                        <Link
                                            href={`https://youtube.com/watch?v=${video.id}`}
                                            target="_blank"
                                            className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl shadow-purple-900/40"
                                        >
                                            <Play className="w-5 h-5 fill-current" />
                                        </Link>
                                    </div>
                                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 rounded text-[10px] text-white font-bold flex items-center gap-1">
                                        <Youtube className="w-3 h-3 text-red-500" />
                                        YouTube
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="text-white font-medium text-sm line-clamp-2 min-h-[40px] leading-relaxed">
                                        {video.title}
                                    </h4>
                                    <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-between">
                                        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-tighter">ID: {video.id}</span>
                                        <Link
                                            href={`https://youtube.com/watch?v=${video.id}`}
                                            target="_blank"
                                            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                                        >
                                            Watch <ExternalLink className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
