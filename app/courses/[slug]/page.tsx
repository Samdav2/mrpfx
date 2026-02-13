'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    BookOpen,
    Users,
    Clock,
    ChevronDown,
    ChevronRight,
    Play,
    FileQuestion,
    CheckCircle2,
    Loader2,
    ArrowLeft,
    Trophy,
    GraduationCap,
    Lock
} from 'lucide-react';
import { learnpressService } from '@/lib/learnpress';
import type { LPCourse, LPCurriculum, LPMyProgress } from '@/lib/types';

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [course, setCourse] = useState<LPCourse | null>(null);
    const [curriculum, setCurriculum] = useState<LPCurriculum | null>(null);
    const [progress, setProgress] = useState<LPMyProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [enrolling, setEnrolling] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

    const fetchCourse = useCallback(async () => {
        setLoading(true);
        try {
            const c = await learnpressService.getCourseBySlug(slug);
            setCourse(c);

            // Fetch curriculum
            try {
                const cur = await learnpressService.getCurriculum(c.id);
                setCurriculum(cur);
                // Expand first section by default
                if (cur.sections.length > 0) {
                    setExpandedSections(new Set([cur.sections[0].id]));
                }
            } catch { /* curriculum may not exist */ }

            // Check enrollment and progress
            try {
                const isEnr = await learnpressService.isEnrolled(c.id);
                setEnrolled(isEnr);
                if (isEnr) {
                    const prog = await learnpressService.getMyProgress(c.id);
                    setProgress(prog);
                }
            } catch { /* not enrolled or not authenticated */ }
        } catch {
            router.push('/courses');
        } finally {
            setLoading(false);
        }
    }, [slug, router]);

    useEffect(() => { fetchCourse(); }, [fetchCourse]);

    const handleEnroll = async () => {
        if (!course) return;
        setEnrolling(true);
        try {
            await learnpressService.enrollCourse(course.id);
            setEnrolled(true);
            // Fetch progress after enrollment
            try {
                const prog = await learnpressService.getMyProgress(course.id);
                setProgress(prog);
            } catch { /* fresh enrollment, no progress yet */ }
        } catch (err: any) {
            alert(err?.response?.data?.detail || 'Please login to enroll');
        } finally {
            setEnrolling(false);
        }
    };

    const toggleSection = (sectionId: number) => {
        setExpandedSections(prev => {
            const next = new Set(prev);
            if (next.has(sectionId)) next.delete(sectionId);
            else next.add(sectionId);
            return next;
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        );
    }

    if (!course) return null;

    const totalItems = curriculum?.sections.reduce((acc, s) => acc + s.items.length, 0) || 0;
    const lessonCount = curriculum?.sections.reduce((acc, s) => acc + s.items.filter(i => i.type === 'lp_lesson').length, 0) || 0;
    const quizCount = curriculum?.sections.reduce((acc, s) => acc + s.items.filter(i => i.type === 'lp_quiz').length, 0) || 0;

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back */}
                <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to courses
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ─── Main Content ─── */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                                {course.title}
                            </h1>
                            <div className="flex flex-wrap gap-3 mt-4">
                                {course.metadata?.level && (
                                    <span className="text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 font-medium">
                                        {course.metadata.level}
                                    </span>
                                )}
                                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 font-medium flex items-center gap-1">
                                    <Users className="w-3 h-3" /> {course.metadata?.students || 0} students
                                </span>
                                {course.metadata?.duration && (
                                    <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 font-medium flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {course.metadata.duration}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                            <h2 className="text-lg font-bold text-white mb-4">About this course</h2>
                            <div
                                className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: course.content || '<p>No description available.</p>' }}
                            />
                        </div>

                        {/* ─── Curriculum ─── */}
                        {curriculum && curriculum.sections.length > 0 && (
                            <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                                <div className="p-5 border-b border-white/[0.06]">
                                    <h2 className="text-lg font-bold text-white">Course Curriculum</h2>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {curriculum.sections.length} sections • {lessonCount} lessons • {quizCount} quizzes
                                    </p>
                                </div>

                                <div className="divide-y divide-white/[0.04]">
                                    {curriculum.sections.map(section => {
                                        const isExpanded = expandedSections.has(section.id);
                                        return (
                                            <div key={section.id}>
                                                <button
                                                    onClick={() => toggleSection(section.id)}
                                                    className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors text-left"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                                            <BookOpen className="w-4 h-4 text-purple-400" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                                                            <p className="text-[11px] text-gray-500">{section.items.length} items</p>
                                                        </div>
                                                    </div>
                                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                                </button>

                                                {isExpanded && (
                                                    <div className="bg-[#0d1117]/50 border-t border-white/[0.04]">
                                                        {section.items.map(item => {
                                                            const isLesson = item.type === 'lp_lesson';
                                                            const itemUrl = enrolled
                                                                ? `/courses/${slug}/${isLesson ? 'lesson' : 'quiz'}/${item.id}`
                                                                : '#';
                                                            return (
                                                                <Link
                                                                    key={item.id}
                                                                    href={itemUrl}
                                                                    onClick={e => { if (!enrolled) e.preventDefault(); }}
                                                                    className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${enrolled ? 'hover:bg-white/[0.03] cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                                                                >
                                                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isLesson ? 'bg-cyan-500/10' : 'bg-amber-500/10'}`}>
                                                                        {!enrolled ? (
                                                                            <Lock className="w-3.5 h-3.5 text-gray-500" />
                                                                        ) : isLesson ? (
                                                                            <Play className="w-3.5 h-3.5 text-cyan-400" />
                                                                        ) : (
                                                                            <FileQuestion className="w-3.5 h-3.5 text-amber-400" />
                                                                        )}
                                                                    </div>
                                                                    <span className="text-gray-300 flex-1">{item.title}</span>
                                                                    <span className="text-[10px] text-gray-600 uppercase font-medium">
                                                                        {isLesson ? 'Lesson' : 'Quiz'}
                                                                    </span>
                                                                    {enrolled && <ChevronRight className="w-4 h-4 text-gray-600" />}
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ─── Sidebar ─── */}
                    <div className="space-y-6">
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 sticky top-8">
                            {/* Price */}
                            <div className="text-center mb-5">
                                <span className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    {course.metadata?.price ? `$${course.metadata.price}` : 'Free'}
                                </span>
                            </div>

                            {/* Progress (if enrolled) */}
                            {enrolled && progress && (
                                <div className="mb-5">
                                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                        <span>Progress</span>
                                        <span className="text-white font-semibold">{Math.round(progress.progress_percent)}%</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-500"
                                            style={{ width: `${progress.progress_percent}%` }}
                                        />
                                    </div>
                                    {progress.graduation === 'passed' && (
                                        <div className="flex items-center gap-2 mt-3 text-emerald-400 text-sm">
                                            <Trophy className="w-4 h-4" /> Course completed!
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Enroll / Continue Button */}
                            {enrolled ? (
                                <Link
                                    href={curriculum?.sections[0]?.items[0]
                                        ? `/courses/${slug}/${curriculum.sections[0].items[0].type === 'lp_lesson' ? 'lesson' : 'quiz'}/${curriculum.sections[0].items[0].id}`
                                        : '#'}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                                >
                                    <Play className="w-4 h-4" /> Continue Learning
                                </Link>
                            ) : (
                                <button
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50"
                                >
                                    {enrolling ? <Loader2 className="w-4 h-4 animate-spin" /> : <GraduationCap className="w-4 h-4" />}
                                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                </button>
                            )}

                            {/* Course Info */}
                            <div className="space-y-3 mt-6 pt-5 border-t border-white/[0.06]">
                                {[
                                    { label: 'Duration', value: course.metadata?.duration || 'Self-paced' },
                                    { label: 'Level', value: course.metadata?.level || 'All Levels' },
                                    { label: 'Students', value: `${course.metadata?.students || 0}` },
                                    { label: 'Instructor', value: course.metadata?.instructor_name || 'Instructor' },
                                    { label: 'Content', value: `${totalItems} items` },
                                ].map((info, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span className="text-gray-500">{info.label}</span>
                                        <span className="text-white font-medium">{info.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
