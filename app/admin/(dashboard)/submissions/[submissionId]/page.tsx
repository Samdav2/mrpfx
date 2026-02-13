'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminLearnPressService, LPQuizSubmissionRead } from '@/lib/admin-api';
import { ArrowLeft, CheckCircle, XCircle, Clock, Info, User, BookOpen, BarChart } from 'lucide-react';

export default function SubmissionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const submissionId = Number(params.submissionId);

    const [loading, setLoading] = useState(true);
    const [submission, setSubmission] = useState<LPQuizSubmissionRead | null>(null);

    useEffect(() => {
        if (!submissionId) return;
        const fetchSubmission = async () => {
            try {
                const data = await adminLearnPressService.getSubmission(submissionId);
                setSubmission(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch submission", error);
                setLoading(false);
            }
        };
        fetchSubmission();
    }, [submissionId]);

    if (loading) return <div className="p-8 text-center text-gray-400">Loading submission details...</div>;
    if (!submission) return <div className="p-8 text-center text-red-400">Submission not found.</div>;

    const resultPercent = (submission.result.user_mark / submission.result.mark * 100).toFixed(1);
    const isPassed = parseFloat(resultPercent) >= parseFloat(submission.result.passing_grade);

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Submission Detail</h1>
                        <p className="text-gray-400 text-sm mt-0.5">Attempt ID: #{submission.id}</p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-lg font-bold text-sm border ${isPassed ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                    {isPassed ? 'PASSED' : 'FAILED'} ({resultPercent}%)
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-500" />
                        Student Information
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Name</span>
                            <span className="text-white text-sm font-medium">{submission.user_display_name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Username</span>
                            <span className="text-white text-sm font-medium">{submission.user_name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Status</span>
                            <span className="text-white text-sm font-medium capitalize">{submission.status}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <BarChart className="w-4 h-4 text-blue-500" />
                        Results Summary
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Final Score</span>
                            <span className="text-white text-sm font-medium">{submission.result.user_mark} / {submission.result.mark}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Questions</span>
                            <span className="text-white text-sm font-medium">
                                {submission.result.question_correct} Correct, {submission.result.question_wrong} Wrong
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Time Spent</span>
                            <span className="text-white text-sm font-medium">{submission.result.time_spend}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions/Answers Section */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-800 bg-[#1F2937]/30">
                    <h3 className="text-white font-semibold">Question Details</h3>
                </div>
                <div className="divide-y divide-gray-800">
                    {submission.answers?.map((ans, idx) => (
                        <div key={ans.question_id} className="p-6 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="text-xs font-mono text-gray-500 uppercase">Question {idx + 1}</span>
                                    <h4 className="text-white font-medium">{ans.question_title}</h4>
                                </div>
                                <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold ${ans.correct ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                    {ans.correct ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                    {ans.correct ? 'CORRECT' : 'INCORRECT'}
                                </div>
                            </div>

                            <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                                <p className="text-xs text-gray-500 uppercase mb-1">Student's Answer</p>
                                <p className="text-gray-300 text-sm break-words">{String(ans.answer_value)}</p>
                            </div>
                        </div>
                    ))}
                    {(!submission.answers || submission.answers.length === 0) && (
                        <div className="p-8 text-center text-gray-500 italic">
                            No specific answer data available for this attempt.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
