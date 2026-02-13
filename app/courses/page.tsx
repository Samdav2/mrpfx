'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    Users,
    Clock,
    BarChart2,
    ArrowRight,
    Search,
    Loader2,
    GraduationCap
} from 'lucide-react';
import { learnpressService } from '@/lib/learnpress';
import type { LPCourse } from '@/lib/types';

export default function CoursesListingPage() {
    const [courses, setCourses] = useState<LPCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const data = await learnpressService.getCourses(0, 50);
                setCourses(data.filter(c => c.status === 'publish'));
            } catch (err) {
                console.error('Failed to load courses', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filtered = courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
    );

    const levelColor: Record<string, string> = {
        beginner: 'bg-emerald-500/15 text-emerald-400',
        intermediate: 'bg-amber-500/15 text-amber-400',
        advanced: 'bg-red-500/15 text-red-400',
    };

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/[0.04] blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Explore Courses</h1>
                    <p className="text-gray-400 mt-2">Master new skills with our expert-led courses</p>
                </div>

                {/* Search */}
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search courses..."
                            className="w-full bg-[#111827]/80 backdrop-blur border border-white/[0.08] rounded-xl pl-12 pr-4 py-3 text-white text-sm placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all"
                        />
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400 text-lg font-medium">No courses found</p>
                        <p className="text-gray-500 text-sm mt-1">Try adjusting your search</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(course => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.slug}`}
                                className="group relative overflow-hidden bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10"
                            >
                                {/* Gradient accent */}
                                <div className="h-1.5 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500" />

                                <div className="p-6 space-y-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                                            {course.title}
                                        </h3>
                                    </div>

                                    {course.excerpt && (
                                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                            {course.excerpt.replace(/<[^>]*>/g, '')}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {course.metadata?.level && (
                                            <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold ${levelColor[course.metadata.level.toLowerCase()] || 'bg-gray-500/15 text-gray-400'}`}>
                                                {course.metadata.level}
                                            </span>
                                        )}
                                        {course.metadata?.duration && (
                                            <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold bg-blue-500/15 text-blue-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {course.metadata.duration}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>{course.metadata?.students || 0} students</span>
                                        </div>
                                        <span className="text-lg font-bold text-purple-400">
                                            {course.metadata?.price ? `$${course.metadata.price}` : 'Free'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-xs text-purple-400 group-hover:gap-2.5 transition-all font-medium">
                                        View course <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
