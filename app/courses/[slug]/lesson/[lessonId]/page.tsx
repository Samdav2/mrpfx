'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    CheckCircle2,
    Loader2,
    BookOpen,
    ChevronRight,
    Play
} from 'lucide-react';
import { learnpressService } from '@/lib/learnpress';
import type { LPCourse, LPCurriculum } from '@/lib/types';

export default function LessonPage() {
    const params = useParams();
    const slug = params.slug as string;
    const lessonId = parseInt(params.lessonId as string, 10);

    const [course, setCourse] = useState<LPCourse | null>(null);
    const [curriculum, setCurriculum] = useState<LPCurriculum | null>(null);
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonContent, setLessonContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [completing, setCompleting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [nextItem, setNextItem] = useState<{ id: number; type: string } | null>(null);

    const fetchLesson = useCallback(async () => {
        setLoading(true);
        try {
            const c = await learnpressService.getCourseBySlug(slug);
            setCourse(c);

            const cur = await learnpressService.getCurriculum(c.id);
            setCurriculum(cur);

            // Find the lesson in the curriculum
            let found = false;
            const allItems: { id: number; type: string; title: string }[] = [];
            for (const section of cur.sections) {
                for (const item of section.items) {
                    allItems.push({ id: item.id, type: item.type, title: item.title });
                    if (item.id === lessonId) {
                        setLessonTitle(item.title);
                        found = true;
                    }
                }
            }

            // Find the next item after the current lesson
            const currentIndex = allItems.findIndex(i => i.id === lessonId);
            if (currentIndex >= 0 && currentIndex < allItems.length - 1) {
                setNextItem(allItems[currentIndex + 1]);
            }

            if (!found) {
                setLessonTitle('Lesson');
            }

            // Try to fetch the lesson content (it may be in the curriculum items or via a direct endpoint)
            // LearnPress items may have content embedded or need a separate fetch
            const matchedItem = allItems.find(i => i.id === lessonId);
            if (matchedItem) {
                setLessonContent(`<div class="text-gray-300"><p>This is the content for <strong>${matchedItem.title}</strong>.</p><p>Complete this lesson to continue to the next item in the course curriculum.</p></div>`);
            }
        } catch (err) {
            console.error('Failed to load lesson', err);
        } finally {
            setLoading(false);
        }
    }, [slug, lessonId]);

    useEffect(() => { fetchLesson(); }, [fetchLesson]);

    const handleComplete = async () => {
        if (!course) return;
        setCompleting(true);
        try {
            await learnpressService.completeItem(lessonId, course.id);
            setCompleted(true);
        } catch (err: any) {
            alert(err?.response?.data?.detail || 'Failed to complete lesson. Please try again.');
        } finally {
            setCompleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-600/[0.03] blur-[120px]" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Nav */}
                <Link href={`/courses/${slug}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to {course?.title || 'course'}
                </Link>

                {/* Lesson Card */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-cyan-400" />
                            </div>
                            <span className="text-xs text-gray-500 uppercase font-medium tracking-wider">Lesson</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{lessonTitle}</h1>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div
                            className="prose prose-invert prose-sm max-w-none leading-relaxed min-h-[200px]"
                            dangerouslySetInnerHTML={{ __html: lessonContent }}
                        />
                    </div>

                    {/* Actions */}
                    <div className="p-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center gap-4">
                        {completed ? (
                            <div className="flex items-center gap-3 text-emerald-400 font-semibold">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Lesson completed!</span>
                            </div>
                        ) : (
                            <button
                                onClick={handleComplete}
                                disabled={completing}
                                className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                            >
                                {completing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                {completing ? 'Completing...' : 'Mark as Complete'}
                            </button>
                        )}

                        {completed && nextItem && (
                            <Link
                                href={`/courses/${slug}/${nextItem.type === 'lp_lesson' ? 'lesson' : 'quiz'}/${nextItem.id}`}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/20"
                            >
                                Next: {nextItem.type === 'lp_lesson' ? 'Lesson' : 'Quiz'} <ChevronRight className="w-4 h-4" />
                            </Link>
                        )}

                        {completed && !nextItem && (
                            <Link
                                href={`/courses/${slug}`}
                                className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl text-sm font-medium transition-all"
                            >
                                Back to course overview
                            </Link>
                        )}
                    </div>
                </div>

                {/* Sidebar: Other items in course */}
                {curriculum && (
                    <div className="mt-8 bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/[0.06]">
                            <h3 className="text-sm font-bold text-white">Course Content</h3>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {curriculum.sections.map(section => (
                                <div key={section.id}>
                                    <div className="px-4 py-2 text-xs text-gray-500 uppercase font-medium bg-white/[0.02]">
                                        {section.title}
                                    </div>
                                    {section.items.map(item => {
                                        const isCurrent = item.id === lessonId;
                                        const isLesson = item.type === 'lp_lesson';
                                        return (
                                            <Link
                                                key={item.id}
                                                href={`/courses/${slug}/${isLesson ? 'lesson' : 'quiz'}/${item.id}`}
                                                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${isCurrent ? 'bg-purple-500/10 text-purple-300' : 'text-gray-400 hover:bg-white/[0.02] hover:text-white'}`}
                                            >
                                                {isLesson ? <Play className="w-3.5 h-3.5 shrink-0" /> : <BookOpen className="w-3.5 h-3.5 shrink-0" />}
                                                <span className="truncate">{item.title}</span>
                                                {isCurrent && <span className="ml-auto text-[10px] bg-purple-500/20 px-2 py-0.5 rounded-full">Current</span>}
                                            </Link>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
