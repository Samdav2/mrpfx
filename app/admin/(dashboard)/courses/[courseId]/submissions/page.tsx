'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { adminLearnPressService, LPQuizSubmissionRead, LPCourse, LPItem } from '@/lib/admin-api';
import { ArrowLeft, Search, Eye, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function CourseSubmissionsPage() {
    const params = useParams();
    const courseId = Number(params.courseId);

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState<LPCourse | null>(null);
    const [submissions, setSubmissions] = useState<LPQuizSubmissionRead[]>([]);
    const [quizzes, setQuizzes] = useState<LPItem[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<number | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const courseData = await adminLearnPressService.getCourse(courseId);
                setCourse(courseData);

                const curriculum = await adminLearnPressService.getCurriculum(courseId);
                const quizItems = curriculum.sections.flatMap(s => s.items).filter(i => i.type === 'lp_quiz');
                setQuizzes(quizItems);

                // For simplicity, we'll fetch all submissions for all quizzes sequentially or in parallel
                // The API GET /api/v1/admin/lp/quizzes/{id}/submissions is per quiz.
                const allSubmissionsPromises = quizItems.map(q =>
                    adminLearnPressService.getQuizSubmissions(q.id)
                );
                const results = await Promise.all(allSubmissionsPromises);
                setSubmissions(results.flat().sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime()));

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch initial data", error);
                setLoading(false);
            }
        };
        fetchInitialData();
    }, [courseId]);

    const filteredSubmissions = submissions.filter(s => {
        const matchesQuiz = selectedQuiz === 'all' || s.quiz_id === Number(selectedQuiz);
        const matchesSearch = s.user_display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.user_name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesQuiz && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href={`/admin/courses/${courseId}`} className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Quiz Submissions</h1>
                    <p className="text-gray-400 text-sm mt-0.5">{course?.title}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search student..."
                        className="w-full bg-[#111827] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                        className="w-full bg-[#111827] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500 appearance-none"
                        value={selectedQuiz}
                        onChange={(e) => setSelectedQuiz(e.target.value as any)}
                    >
                        <option value="all">All Quizzes</option>
                        {quizzes.map(q => (
                            <option key={q.id} value={q.id}>{q.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                                <th className="p-4 font-medium">Student</th>
                                <th className="p-4 font-medium">Quiz</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Score</th>
                                <th className="p-4 font-medium">Result</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {loading ? (
                                <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading submissions...</td></tr>
                            ) : filteredSubmissions.length === 0 ? (
                                <tr><td colSpan={6} className="p-8 text-center text-gray-500">No submissions found.</td></tr>
                            ) : (
                                filteredSubmissions.map((s) => (
                                    <tr key={s.id} className="border-b border-gray-800 hover:bg-[#1F2937]/30 transition-colors">
                                        <td className="p-4">
                                            <div>
                                                <p className="text-white font-medium">{s.user_display_name}</p>
                                                <p className="text-xs text-gray-500">{s.user_name}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400">{quizzes.find(q => q.id === s.quiz_id)?.title || 'Unknown Quiz'}</td>
                                        <td className="p-4 text-gray-400">{new Date(s.start_time).toLocaleString()}</td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">{s.result.user_mark} / {s.result.mark}</span>
                                                <span className="text-xs text-gray-500">({(s.result.user_mark / s.result.mark * 100).toFixed(1)}%)</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${s.status === 'completed'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-yellow-500/10 text-yellow-500'
                                                }`}>
                                                {s.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                {s.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link href={`/admin/submissions/${s.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors inline-block">
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
