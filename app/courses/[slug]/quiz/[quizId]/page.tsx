'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Loader2,
    FileQuestion,
    ChevronRight,
    Trophy,
    AlertCircle,
    Send
} from 'lucide-react';
import { learnpressService } from '@/lib/learnpress';
import type { LPCourse, LPQuiz, LPQuizResult, LPQuizSubmission } from '@/lib/types';

type QuizState = 'loading' | 'taking' | 'submitting' | 'results';

export default function QuizPage() {
    const params = useParams();
    const slug = params.slug as string;
    const quizId = parseInt(params.quizId as string, 10);

    const [course, setCourse] = useState<LPCourse | null>(null);
    const [quiz, setQuiz] = useState<LPQuiz | null>(null);
    const [state, setState] = useState<QuizState>('loading');
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [results, setResults] = useState<LPQuizResult | null>(null);
    const [currentQ, setCurrentQ] = useState(0);

    const fetchQuiz = useCallback(async () => {
        setState('loading');
        try {
            const c = await learnpressService.getCourseBySlug(slug);
            setCourse(c);
            const q = await learnpressService.getQuiz(quizId);
            setQuiz(q);

            // Check for existing results
            try {
                const res = await learnpressService.getQuizResults(quizId);
                if (res && res.length > 0) {
                    setResults(res[0]);
                    setState('results');
                    return;
                }
            } catch { /* no previous results */ }

            setState('taking');
        } catch (err) {
            console.error('Failed to load quiz', err);
        }
    }, [slug, quizId]);

    useEffect(() => { fetchQuiz(); }, [fetchQuiz]);

    const handleSelectAnswer = (questionId: number, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async () => {
        if (!course || !quiz) return;
        const questions = quiz.questions || [];
        const answerList: LPQuizSubmission[] = questions.map(q => ({
            question_id: q.id,
            answer_value: answers[q.id] || '',
        }));

        setState('submitting');
        try {
            await learnpressService.submitQuiz(quizId, course.id, answerList);
            try {
                const res = await learnpressService.getQuizResults(quizId);
                if (res && res.length > 0) {
                    setResults(res[0]);
                }
            } catch { /* results may not be detailed */ }
            setState('results');
        } catch (err: any) {
            alert(err?.response?.data?.detail || 'Failed to submit quiz');
            setState('taking');
        }
    };

    if (state === 'loading') {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        );
    }

    if (!quiz) return null;

    const questions = quiz.questions || [];
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;
    const allAnswered = totalQuestions > 0 && answeredCount === totalQuestions;
    const currentQuestion = questions[currentQ];

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-600/[0.03] blur-[120px]" />
            </div>

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href={`/courses/${slug}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to {course?.title || 'course'}
                </Link>

                {/* ─── QUIZ HEADER ─── */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden mb-6">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <FileQuestion className="w-5 h-5 text-amber-400" />
                            </div>
                            <span className="text-xs text-gray-500 uppercase font-medium tracking-wider">Quiz</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{quiz.title}</h1>
                        <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400">
                            <span>{totalQuestions} questions</span>
                            {quiz.passing_grade && <span>• Pass: {quiz.passing_grade}%</span>}
                            {quiz.duration && <span>• Duration: {quiz.duration}</span>}
                        </div>
                    </div>

                    {/* Progress bar */}
                    {state === 'taking' && totalQuestions > 0 && (
                        <div className="px-6 pb-4">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                                <span>Question {currentQ + 1} of {totalQuestions}</span>
                                <span>{answeredCount} answered</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* ─── NO QUESTIONS ─── */}
                {state === 'taking' && totalQuestions === 0 && (
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-12 text-center">
                        <AlertCircle className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                        <p className="text-white font-semibold">No questions available</p>
                        <p className="text-gray-500 text-sm mt-1">This quiz doesn&apos;t have any questions yet.</p>
                        <Link href={`/courses/${slug}`} className="inline-flex items-center gap-2 mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to course
                        </Link>
                    </div>
                )}

                {/* ─── TAKING QUIZ ─── */}
                {state === 'taking' && currentQuestion && (
                    <div className="space-y-6">
                        {/* Current Question */}
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                            <p className="text-xs text-gray-500 uppercase font-medium mb-2">Question {currentQ + 1}</p>
                            <h2 className="text-lg font-bold text-white mb-5">{currentQuestion.title}</h2>

                            <div className="space-y-3">
                                {currentQuestion.options.map((opt, oi) => {
                                    const isSelected = answers[currentQuestion.id] === opt.value;
                                    return (
                                        <button
                                            key={oi}
                                            onClick={() => handleSelectAnswer(currentQuestion.id, opt.value)}
                                            className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left text-sm transition-all ${isSelected
                                                ? 'bg-purple-500/10 border-purple-500/30 text-white'
                                                : 'bg-white/[0.02] border-white/[0.06] text-gray-300 hover:bg-white/[0.04] hover:border-white/[0.1]'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? 'border-purple-400 bg-purple-500' : 'border-gray-600'
                                                }`}>
                                                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <span>{opt.title}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                                disabled={currentQ === 0}
                                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl text-sm font-medium transition-all disabled:opacity-30"
                            >
                                Previous
                            </button>

                            <div className="flex gap-1.5">
                                {questions.map((q, i) => (
                                    <button
                                        key={q.id}
                                        onClick={() => setCurrentQ(i)}
                                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${i === currentQ
                                            ? 'bg-purple-600 text-white'
                                            : answers[q.id]
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'bg-white/5 text-gray-500 hover:bg-white/10'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            {currentQ < totalQuestions - 1 ? (
                                <button
                                    onClick={() => setCurrentQ(currentQ + 1)}
                                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl text-sm font-medium transition-all"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!allAnswered}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/20 disabled:opacity-40"
                                >
                                    <Send className="w-4 h-4" /> Submit
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* ─── SUBMITTING ─── */}
                {state === 'submitting' && (
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-12 text-center">
                        <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto mb-4" />
                        <p className="text-white font-semibold">Grading your answers...</p>
                        <p className="text-gray-500 text-sm mt-1">This may take a moment</p>
                    </div>
                )}

                {/* ─── RESULTS ─── */}
                {state === 'results' && (
                    <div className="space-y-6">
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 text-center">
                            {results?.results?.passed ? (
                                <>
                                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/30">
                                        <Trophy className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-white">Congratulations!</h2>
                                    <p className="text-emerald-400 font-semibold mt-1">You passed the quiz!</p>
                                </>
                            ) : results ? (
                                <>
                                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-red-500/30">
                                        <XCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-white">Not quite there</h2>
                                    <p className="text-red-400 font-semibold mt-1">You did not pass this time</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-white">Quiz Submitted</h2>
                                    <p className="text-gray-400 mt-1">Your answers have been recorded</p>
                                </>
                            )}

                            {results?.results && (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                                    {[
                                        { label: 'Score', value: `${Math.round(results.results.user_score)}%`, accent: results.results.passed ? 'text-emerald-400' : 'text-red-400' },
                                        { label: 'Your Mark', value: `${results.results.user_mark}`, accent: 'text-white' },
                                        { label: 'Questions', value: `${results.results.question_count}`, accent: 'text-white' },
                                        { label: 'Passing Grade', value: `${results.results.passing_grade}%`, accent: 'text-gray-300' },
                                    ].map((s, i) => (
                                        <div key={i} className="bg-white/[0.03] rounded-xl p-4">
                                            <p className="text-[11px] text-gray-500 uppercase font-medium">{s.label}</p>
                                            <p className={`text-2xl font-bold mt-1 ${s.accent}`}>{s.value}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center justify-center gap-4 mt-8">
                                <Link
                                    href={`/courses/${slug}`}
                                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl text-sm font-medium transition-all"
                                >
                                    Back to course
                                </Link>
                                {results?.results && !results.results.passed && (
                                    <button
                                        onClick={() => {
                                            setAnswers({});
                                            setCurrentQ(0);
                                            setResults(null);
                                            setState('taking');
                                        }}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/20"
                                    >
                                        Retry Quiz <ChevronRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
