'use client';

import { X, CheckCircle2, AlertCircle, Info, Maximize2, Minimize2, Plus, Trash2, Pencil, Check } from 'lucide-react';
import { adminLearnPressService, LPQuestion } from '@/lib/admin-api';
import { useState, useEffect } from 'react';
import DurationPicker from './DurationPicker';
import RichTextEditor from './RichTextEditor';

// Define Option Interface locally if not in API
interface LPQuestionOption {
    title: string;
    value: string;
    is_true: boolean;
}

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const BaseModal = ({ isOpen, onClose, title, children }: BaseModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#111827] border border-gray-800 rounded-xl w-full max-w-md shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h3 className="text-white font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
    type?: 'success' | 'error' | 'info';
}

export const AlertModal = ({ isOpen, onClose, title = 'Notification', message, type = 'info' }: AlertModalProps) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-4">
                <p className="text-gray-300">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
}

export const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDestructive = false
}: ConfirmModalProps) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-6">
                <p className="text-gray-300">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors ${isDestructive
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-[#d946ef] hover:bg-[#c026d3]'
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

interface InputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (value: string) => void;
    title: string;
    label?: string;
    placeholder?: string;
    initialValue?: string;
}

export const InputModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    label,
    placeholder,
    initialValue = ''
}: InputModalProps) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (isOpen) setValue(initialValue);
    }, [isOpen, initialValue]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(value);
        onClose();
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    {label && <label className="text-sm font-medium text-gray-400">{label}</label>}
                    <input
                        type="text"
                        autoFocus
                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!value.trim()}
                        className="px-4 py-2 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Save
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};



export const SuccessModal = ({
    isOpen,
    onClose,
    title = 'Success',
    message,
    onConfirm,
    confirmText = 'Continue',
    onSecondary,
    secondaryText
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
    onConfirm?: () => void;
    confirmText?: string;
    onSecondary?: () => void;
    secondaryText?: string;
}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-[#111827] border border-green-500/20 rounded-2xl w-full max-w-sm shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>
                <div className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-green-500/20">
                        <CheckCircle2 className="w-8 h-8 text-green-500 animate-in zoom-in spin-in-12 duration-500" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
                    </div>
                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                if (onConfirm) onConfirm();
                                onClose();
                            }}
                            className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-green-500/20 active:scale-95"
                        >
                            {confirmText}
                        </button>
                        {onSecondary && secondaryText && (
                            <button
                                onClick={() => {
                                    onSecondary();
                                    onClose();
                                }}
                                className="w-full py-2.5 bg-[#1F2937] hover:bg-[#374151] text-gray-300 rounded-lg font-medium transition-all border border-gray-800 active:scale-95 text-sm"
                            >
                                {secondaryText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ErrorModal = ({
    isOpen,
    onClose,
    title = 'Error Occurred',
    message,
    onConfirm,
    confirmText = 'Dismiss'
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
    onConfirm?: () => void;
    confirmText?: string;
}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-[#111827] border border-red-500/20 rounded-2xl w-full max-w-sm shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-red-500/20">
                        <AlertCircle className="w-8 h-8 text-red-500 animate-in zoom-in spin-in-12 duration-500" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
                    </div>
                    <button
                        onClick={() => {
                            if (onConfirm) onConfirm();
                            onClose();
                        }}
                        className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-red-500/20 active:scale-95"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ItemEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { title: string, content: string, duration?: string, passing_grade?: number, preview?: boolean }) => void;
    title: string;
    itemType: 'lp_lesson' | 'lp_quiz';
    initialData?: {
        title: string;
        content: string;
        duration?: string;
        passing_grade?: number;
        preview?: boolean;
        id?: number; // Added for quiz editing
    };
}

export const ItemEditorModal = ({
    isOpen,
    onClose,
    onSave,
    title,
    itemType,
    initialData
}: ItemEditorModalProps) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [activeTab, setActiveTab] = useState<'details' | 'questions'>('details');
    const [questions, setQuestions] = useState<LPQuestion[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

    // Adding Question State
    const [newQuestionType, setNewQuestionType] = useState('true_or_false');
    const [newQuestionTitle, setNewQuestionTitle] = useState('');
    const [newQuestionContent, setNewQuestionContent] = useState('');

    // Editing Question State
    const [editingQuestion, setEditingQuestion] = useState<LPQuestion | null>(null);
    const [editQData, setEditQData] = useState<{ title: string; content: string; type: string; options: LPQuestionOption[] }>({
        title: '',
        content: '',
        type: 'true_or_false',
        options: []
    });

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        duration: '',
        passing_grade: 80,
        preview: false
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: initialData?.title || '',
                content: initialData?.content || '',
                duration: initialData?.duration || (itemType === 'lp_lesson' ? '15 mins' : '20 mins'),
                passing_grade: initialData?.passing_grade || 80,
                preview: initialData?.preview || false
            });
            setIsFullScreen(false);
            setActiveTab('details');
            setNewQuestionTitle('');
            setNewQuestionContent('');
            setEditingQuestion(null);

            // Fetch questions if it's a quiz and we have an ID
            if (itemType === 'lp_quiz' && (initialData as any)?.id) {
                fetchQuestions((initialData as any).id);
            } else {
                setQuestions([]);
            }
        }
    }, [isOpen, initialData, itemType]);

    const fetchQuestions = async (quizId: number) => {
        setIsLoadingQuestions(true);
        try {
            const quiz = await adminLearnPressService.getQuiz(quizId);
            if (quiz && quiz.questions) {
                setQuestions(quiz.questions);
            }
        } catch (error) {
            console.error("Failed to fetch questions", error);
        } finally {
            setIsLoadingQuestions(false);
        }
    };

    const handleAddQuestion = async () => {
        if (itemType !== 'lp_quiz' || !(initialData as any)?.id || !newQuestionTitle.trim()) return;

        try {
            const newQuestion = await adminLearnPressService.addQuestion((initialData as any).id, {
                title: newQuestionTitle,
                content: newQuestionContent,
                type: newQuestionType,
                options: newQuestionType === 'true_or_false'
                    ? [{ title: 'True', value: 'true', is_true: true }, { title: 'False', value: 'false', is_true: false }]
                    : [{ title: 'Option 1', value: 'opt1', is_true: true }, { title: 'Option 2', value: 'opt2', is_true: false }]
            });
            setQuestions(prev => [...prev, newQuestion]);
            setNewQuestionTitle('');
            setNewQuestionContent('');
        } catch (error) {
            console.error("Failed to add question", error);
        }
    };

    const handleDeleteQuestion = async (questionId: number) => {
        try {
            await adminLearnPressService.deleteQuestion(questionId);
            setQuestions(prev => prev.filter(q => q.id !== questionId));
            if (editingQuestion?.id === questionId) setEditingQuestion(null);
        } catch (error) {
            console.error("Failed to delete question", error);
        }
    };

    const startEditingQuestion = (question: LPQuestion) => {
        setEditingQuestion(question);

        let initialOptions = question.options || [];

        if (question.type === 'true_or_false') {
            // STRICT MODE: Ignore backend options structure. Only look for the 'true' flag.
            let isTrueCorrect = true; // Default

            // Try to find if 'True' is currently marked correct in the backend data
            if (initialOptions.length > 0) {
                const trueOption = initialOptions.find(o =>
                    (o.value === 'true' || o.title.toLowerCase() === 'true') && o.is_true
                );
                if (trueOption) {
                    isTrueCorrect = true;
                } else {
                    const falseOption = initialOptions.find(o =>
                        (o.value === 'false' || o.title.toLowerCase() === 'false') && o.is_true
                    );
                    if (falseOption) {
                        isTrueCorrect = false;
                    }
                }
            }

            // Hardcode valid structure
            initialOptions = [
                { title: 'True', value: 'True', is_true: isTrueCorrect },
                { title: 'False', value: 'False', is_true: !isTrueCorrect }
            ];
        } else {
            // Deduplicate options for other types
            const seen = new Set();
            initialOptions = initialOptions.filter(opt => {
                const key = `${opt.value}-${opt.title}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
        }

        setEditQData({
            title: question.title,
            content: question.content || '',
            type: question.type,
            options: initialOptions
        });
    };

    const handleSaveQuestion = async () => {
        if (!editingQuestion) return;
        try {
            // Prepare payload
            const payloadOptions = editQData.type === 'true_or_false'
                ? [
                    { title: 'True', value: 'true', is_true: !!editQData.options[0]?.is_true },
                    { title: 'False', value: 'false', is_true: !editQData.options[0]?.is_true }
                ]
                : editQData.options;

            const updated = await adminLearnPressService.updateQuestion(editingQuestion.id, {
                title: editQData.title,
                content: editQData.content,
                type: editQData.type,
                options: payloadOptions
            });
            setQuestions(prev => prev.map(q => q.id === updated.id ? updated : q));
            setEditingQuestion(null);
        } catch (error) {
            console.error("Failed to update question", error);
        }
    };

    const handleOptionChange = (index: number, field: keyof LPQuestionOption, value: any) => {
        const newOptions = [...editQData.options];
        newOptions[index] = { ...newOptions[index], [field]: value };

        // Sync Value with Option Text if Text changes
        if (field === 'title') {
            newOptions[index].value = value;
        }

        // If single choice and setting to true, set others to false
        if (field === 'is_true' && value === true && (editQData.type === 'true_or_false' || editQData.type === 'single_choice')) {
            newOptions.forEach((opt, i) => {
                if (i !== index) opt.is_true = false;
            });
        }
        setEditQData({ ...editQData, options: newOptions });
    };

    const addOption = () => {
        setEditQData({
            ...editQData,
            options: [...editQData.options, { title: 'New Option', value: `opt${Date.now()}`, is_true: false }]
        });
    };

    const removeOption = (index: number) => {
        setEditQData({
            ...editQData,
            options: editQData.options.filter((_, i) => i !== index)
        });
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`bg-[#111827] border border-gray-800 rounded-xl shadow-2xl scale-100 animate-in zoom-in-95 duration-200 flex flex-col transition-all ease-in-out ${isFullScreen ? 'w-[95vw] h-[90vh]' : 'w-full max-w-2xl max-h-[90vh]'
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800 shrink-0">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        {itemType === 'lp_lesson' ? '📝' : '❓'} {title}
                        {editingQuestion && <span className="text-gray-500 text-sm font-normal">/ Edit Question</span>}
                    </h3>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsFullScreen(!isFullScreen)}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors hidden sm:block"
                            title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                        >
                            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>
                        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Tabs / Back Button */}
                {itemType === 'lp_quiz' && !editingQuestion && (
                    <div className="flex items-center gap-1 p-2 bg-[#1F2937] border-b border-gray-800">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'details' ? 'bg-[#111827] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                        >
                            Details
                        </button>
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'questions' ? 'bg-[#111827] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                        >
                            Questions ({questions.length})
                        </button>
                    </div>
                )}
                {editingQuestion && (
                    <div className="flex items-center gap-1 p-2 bg-[#1F2937] border-b border-gray-800">
                        <button
                            onClick={() => setEditingQuestion(null)}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            ← Back to Questions
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1">
                    {activeTab === 'details' && !editingQuestion ? (
                        <form id="item-form" onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                            <div className="space-y-2 shrink-0">
                                <label className="text-sm font-medium text-gray-400">Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2 flex-1 flex flex-col min-h-[300px]">
                                <RichTextEditor
                                    label="Content"
                                    value={formData.content}
                                    onChange={(val) => handleChange('content', val)}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0 pt-4 border-t border-gray-800">
                                <div className="space-y-2 sm:col-span-1">
                                    <DurationPicker
                                        label="Duration"
                                        value={formData.duration}
                                        onChange={(val) => handleChange('duration', val)}
                                        className="w-full"
                                    />
                                </div>

                                {itemType === 'lp_quiz' ? (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Passing Grade (%)</label>
                                        <input
                                            type="number"
                                            className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                            value={formData.passing_grade}
                                            onChange={(e) => handleChange('passing_grade', Number(e.target.value))}
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-2 flex items-center h-full pt-6">
                                        <label className="flex items-center gap-2 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                className="rounded bg-gray-700 border-gray-600 accent-purple-600 w-4 h-4"
                                                checked={formData.preview}
                                                onChange={(e) => handleChange('preview', e.target.checked)}
                                            />
                                            <span className="text-sm font-medium text-gray-400">Previewable (Free Lesson)</span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </form>
                    ) : editingQuestion ? (
                        // EDIT QUESTION UI
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Question Title</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                        value={editQData.title}
                                        onChange={(e) => setEditQData({ ...editQData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <RichTextEditor
                                        label="Question Content"
                                        value={editQData.content}
                                        onChange={(val) => setEditQData({ ...editQData, content: val })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Question Type</label>
                                    <select
                                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                        value={editQData.type}
                                        onChange={(e) => {
                                            const newType = e.target.value;
                                            // Non-destructive type change: preserve options in state
                                            // but ensure we have at least 2 if switching to T/F
                                            if (newType === 'true_or_false' && editQData.options.length < 2) {
                                                const newOptions = [
                                                    { title: 'True', value: 'true', is_true: true },
                                                    { title: 'False', value: 'false', is_true: false },
                                                    ...editQData.options
                                                ];
                                                setEditQData({ ...editQData, type: newType, options: newOptions });
                                            } else {
                                                setEditQData({ ...editQData, type: newType });
                                            }
                                        }}
                                    >
                                        <option value="true_or_false">True/False</option>
                                        <option value="multi_choice">Multi Choice</option>
                                        <option value="single_choice">Single Choice</option>
                                    </select>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-400">Options</label>
                                        {editQData.type !== 'true_or_false' && (
                                            <button onClick={addOption} className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                                                <Plus className="w-3 h-3" /> Add Option
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        {(editQData.type === 'true_or_false' ? editQData.options.slice(0, 2) : editQData.options).map((opt, idx) => (
                                            <div key={idx} className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                                                <input
                                                    type={editQData.type === 'multi_choice' ? 'checkbox' : 'radio'}
                                                    name="correct_answer"
                                                    checked={opt.is_true}
                                                    onChange={(e) => handleOptionChange(idx, 'is_true', e.target.checked)}
                                                    className="w-4 h-4 accent-green-500 cursor-pointer"
                                                />

                                                {editQData.type === 'true_or_false' ? (
                                                    // ALWAYS show True/False regardless of stored title
                                                    <span className="flex-1 text-white text-sm px-2 py-1 font-medium select-none">
                                                        {idx === 0 ? 'True' : 'False'}
                                                    </span>
                                                ) : (
                                                    // Input for other types
                                                    <input
                                                        type="text"
                                                        className="flex-1 bg-transparent text-white text-sm outline-none border-b border-transparent focus:border-purple-500 px-2 py-1"
                                                        value={opt.title}
                                                        onChange={(e) => handleOptionChange(idx, 'title', e.target.value)}
                                                        placeholder="Option text"
                                                    />
                                                )}

                                                {editQData.type !== 'true_or_false' && (
                                                    <>
                                                        <input
                                                            type="text"
                                                            className="w-20 bg-transparent text-gray-400 text-xs outline-none border-b border-transparent focus:border-gray-600 px-2 py-1 text-right"
                                                            value={opt.value}
                                                            onChange={(e) => handleOptionChange(idx, 'value', e.target.value)}
                                                            placeholder="Value"
                                                        />
                                                        <button onClick={() => removeOption(idx)} className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Questions Tab Content */}
                            {/* Add Question Form */}
                            <div className="bg-[#111827] rounded-lg p-4 border border-gray-800 mb-6 space-y-4">
                                <h4 className="text-sm font-medium text-gray-400">Add New Question</h4>

                                <input
                                    type="text"
                                    placeholder="Question Title"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    value={newQuestionTitle}
                                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                                />

                                <RichTextEditor
                                    label="Question Content (Optional)"
                                    value={newQuestionContent}
                                    onChange={setNewQuestionContent}
                                    placeholder="Describe the question..."
                                />

                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <select
                                            className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-3 py-2.5 outline-none border border-transparent focus:ring-1 focus:ring-purple-500 appearance-none cursor-pointer"
                                            value={newQuestionType}
                                            onChange={(e) => setNewQuestionType(e.target.value)}
                                        >
                                            <option value="true_or_false">True/False</option>
                                            <option value="multi_choice">Multi Choice</option>
                                            <option value="single_choice">Single Choice</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={handleAddQuestion}
                                        disabled={!newQuestionTitle.trim()}
                                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Question
                                    </button>
                                </div>
                            </div>

                            {isLoadingQuestions ? (
                                <div className="text-center text-gray-500 py-10">Loading questions...</div>
                            ) : questions.length === 0 ? (
                                <div className="text-center text-gray-500 py-10 border-2 border-dashed border-gray-800 rounded-lg">
                                    No questions yet. Add one to get started.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {questions.map((q, index) => (
                                        <div key={q.id} className="p-4 bg-[#1F2937] rounded-lg border border-gray-800 flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <span className="text-gray-500 font-mono text-sm">#{index + 1}</span>
                                                <div>
                                                    <p className="text-white font-medium">{q.title}</p>
                                                    <p className="text-xs text-gray-400 uppercase mt-0.5">{q.type.replace(/_/g, ' ')}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => startEditingQuestion(q)}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteQuestion(q.id)}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800 flex justify-end gap-3 shrink-0 bg-[#111827] rounded-b-xl">
                    {editingQuestion ? (
                        <>
                            <button
                                type="button"
                                onClick={() => setEditingQuestion(null)}
                                className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                Cancel Edit
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveQuestion}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-green-500/20"
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            {activeTab === 'details' && (
                                <button
                                    type="submit"
                                    form="item-form"
                                    className="px-6 py-2 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20"
                                >
                                    Save Item
                                </button>
                            )}
                            {activeTab === 'questions' && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20"
                                >
                                    Done
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
