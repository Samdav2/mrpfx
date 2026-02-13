'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    GraduationCap,
    Trophy,
    ArrowRight,
    Loader2,
    RefreshCcw,
    ChevronRight,
    Clock,
    Play
} from 'lucide-react';
import { learnpressService } from '@/lib/learnpress';
import type { LPUserItem, LPCourse, LPMyProgress } from '@/lib/types';

interface CourseCard {
    enrollment: LPUserItem;
    course: LPCourse | null;
    progress: LPMyProgress | null;
}

export default function MyCoursesPage() {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState<CourseCard[]>([]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const enrollments = await learnpressService.getMyCourses();
            // Fetch course details and progress in parallel for each enrollment
            const enriched = await Promise.all(
                enrollments.map(async (enrollment) => {
                    const courseId = enrollment.item_id || enrollment.ref_id;
                    let course: LPCourse | null = null;
                    let progress: LPMyProgress | null = null;
                    try {
                        course = await learnpressService.getCourse(courseId);
                    } catch { /* course might not exist */ }
                    try {
                        progress = await learnpressService.getMyProgress(courseId);
                    } catch { /* no progress yet */ }
                    return { enrollment, course, progress };
                })
            );
            setCards(enriched);
        } catch (err) {
            console.error('Failed to load courses', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const inProgress = cards.filter(c => c.progress?.graduation === 'in-progress' || (!c.progress?.graduation && c.enrollment.status === 'enrolled'));
    const completed = cards.filter(c => c.progress?.graduation === 'passed' || c.enrollment.graduation === 'passed' || c.enrollment.status === 'completed');

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-600/[0.04] blur-[120px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">My Courses</h1>
                        <p className="text-gray-400 text-sm mt-1">Track your learning progress and continue where you left off.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 transition-all disabled:opacity-50"
                        >
                            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                        </button>
                        <Link
                            href="/courses"
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
                        >
                            <BookOpen className="w-4 h-4" /> Browse Courses
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    </div>
                ) : cards.length === 0 ? (
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 mx-auto bg-gray-800/50 rounded-2xl flex items-center justify-center mb-4">
                            <GraduationCap className="w-8 h-8 text-gray-600" />
                        </div>
                        <h2 className="text-xl font-bold text-white">No courses yet</h2>
                        <p className="text-gray-400 text-sm mt-2">Start your learning journey by enrolling in a course.</p>
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/20"
                        >
                            Browse courses <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* In Progress Section */}
                        {inProgress.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                        <Play className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <h2 className="text-lg font-bold text-white">In Progress</h2>
                                    <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full font-medium">{inProgress.length}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {inProgress.map(({ enrollment, course, progress }) => (
                                        <Link
                                            key={enrollment.user_item_id || enrollment.item_id}
                                            href={`/courses/${course?.slug || enrollment.item_id}`}
                                            className="group bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
                                            <div className="p-5 space-y-4">
                                                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                                                    {course?.title || `Course #${enrollment.item_id}`}
                                                </h3>

                                                {/* Progress bar */}
                                                <div>
                                                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                                                        <span>Progress</span>
                                                        <span className="text-white font-semibold">{Math.round(progress?.progress_percent || 0)}%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                                                            style={{ width: `${progress?.progress_percent || 0}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-2">
                                                    <span className="text-[11px] text-gray-500 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {enrollment.start_time ? new Date(enrollment.start_time).toLocaleDateString() : 'Recently'}
                                                    </span>
                                                    <span className="text-xs text-purple-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                                        Continue <ChevronRight className="w-3.5 h-3.5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Completed Section */}
                        {completed.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                                        <Trophy className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <h2 className="text-lg font-bold text-white">Completed</h2>
                                    <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full font-medium">{completed.length}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {completed.map(({ enrollment, course, progress }) => (
                                        <Link
                                            key={enrollment.user_item_id || enrollment.item_id}
                                            href={`/courses/${course?.slug || enrollment.item_id}`}
                                            className="group bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-green-400" />
                                            <div className="p-5 space-y-3">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                                                        {course?.title || `Course #${enrollment.item_id}`}
                                                    </h3>
                                                    <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold bg-emerald-500/15 text-emerald-400">
                                                        Completed
                                                    </span>
                                                    {progress && (
                                                        <span className="text-[11px] text-gray-500">
                                                            {Math.round(progress.progress_percent)}% score
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {enrollment.end_time ? new Date(enrollment.end_time).toLocaleDateString() : 'Recently'}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
