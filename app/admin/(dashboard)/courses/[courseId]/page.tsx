'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    adminLearnPressService,
    LPCourse,
    LPCurriculum,
    LPSection,
    LPItem,
    adminTermService,
    LPLearner,
    LPCourseStats
} from '@/lib/admin-api';
import TermSelector from '@/components/admin/TermSelector';
import {
    ArrowLeft,
    Save,
    Layers,
    FileText,
    Plus,
    Trash2,
    Edit2,
    GripVertical,
    ChevronDown,
    ChevronRight,
    CheckCircle,
    Users,
    Activity,
    Eye,
    ClipboardList
} from 'lucide-react';
import { AlertModal, ConfirmModal, InputModal, ItemEditorModal, SuccessModal } from '@/components/admin/Modals';
import RichTextEditor from '@/components/admin/RichTextEditor';
import DurationPicker from '@/components/admin/DurationPicker';

export default function EditCoursePage() {
    const params = useParams();
    const router = useRouter();
    const courseId = Number(params.courseId);

    const [activeTab, setActiveTab] = useState<'general' | 'curriculum' | 'learners' | 'stats'>('general');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Course Data
    const [course, setCourse] = useState<LPCourse | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        price: 0,
        status: 'draft',
        duration: '',
        level: '',
    });

    // Terms State
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [initialTermIds, setInitialTermIds] = useState<number[]>([]);

    const [curriculum, setCurriculum] = useState<LPCurriculum | null>(null);
    const [expandedSections, setExpandedSections] = useState<number[]>([]);

    // Learners & Stats Data
    const [learners, setLearners] = useState<LPLearner[]>([]);
    const [stats, setStats] = useState<LPCourseStats | null>(null);
    const [loadingStats, setLoadingStats] = useState(false);
    const [loadingLearners, setLoadingLearners] = useState(false);

    // Modal States
    const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '', type: 'info' });
    const [inputState, setInputState] = useState<{
        isOpen: boolean;
        title: string;
        label: string;
        placeholder: string;
        onConfirm: (val: string) => void;
    }>({
        isOpen: false,
        title: '',
        label: '',
        placeholder: '',
        onConfirm: () => { }
    });
    const [confirmState, setConfirmState] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        isDestructive: boolean;
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        isDestructive: false
    });

    useEffect(() => {
        if (!courseId) return;

        const fetchData = async () => {
            try {
                // Fetch Course Info
                const courseData = await adminLearnPressService.getCourse(courseId);
                setCourse(courseData);
                setFormData({
                    title: courseData.title,
                    slug: courseData.slug || '',
                    content: courseData.content,
                    price: courseData.metadata?.price || 0,
                    status: courseData.status,
                    duration: courseData.metadata?.duration || '',
                    level: courseData.metadata?.level || ''
                });

                // Fetch Terms (Courses are WP posts)
                try {
                    const postFull = await adminTermService.getPostWithTerms(courseId);
                    const catIds = postFull.categories?.map(c => c.term_id) || [];
                    const tagIds = postFull.tags?.map(t => t.term_id) || [];
                    setSelectedCategories(catIds);
                    setSelectedTags(tagIds);
                    setInitialTermIds([...catIds, ...tagIds]);
                } catch (err) {
                    console.error("Failed to fetch course terms", err);
                }

                // Fetch Curriculum
                const curriculumData = await adminLearnPressService.getCurriculum(courseId);
                setCurriculum(curriculumData);
                if (curriculumData && curriculumData.sections) {
                    setExpandedSections(curriculumData.sections.map((s: LPSection) => s.id));
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to load course data", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [courseId]);

    useEffect(() => {
        if (!courseId || activeTab !== 'learners') return;

        const fetchLearners = async () => {
            setLoadingLearners(true);
            try {
                const data = await adminLearnPressService.getCourseLearners(courseId);
                setLearners(data);
            } catch (error) {
                console.error("Failed to fetch learners", error);
            } finally {
                setLoadingLearners(false);
            }
        };
        fetchLearners();
    }, [courseId, activeTab]);

    useEffect(() => {
        if (!courseId || activeTab !== 'stats') return;

        const fetchStats = async () => {
            setLoadingStats(true);
            try {
                const data = await adminLearnPressService.getCourseStats(courseId);
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, [courseId, activeTab]);

    const handleSaveGeneral = async () => {
        setSaving(true);
        try {
            await adminLearnPressService.updateCourse(courseId, {
                title: formData.title,
                slug: formData.slug || undefined,
                content: formData.content,
                price: Number(formData.price),
                status: formData.status,
                duration: formData.duration,
                level: formData.level
            });

            // Update Terms
            const currentTermIds = [...selectedCategories, ...selectedTags];
            const termsToAdd = currentTermIds.filter(id => !initialTermIds.includes(id));
            const termsToRemove = initialTermIds.filter(id => !currentTermIds.includes(id));

            if (termsToAdd.length > 0) {
                await adminTermService.assignTerms(courseId, termsToAdd);
            }
            if (termsToRemove.length > 0) {
                await adminTermService.removeTerms(courseId, termsToRemove);
            }

            setInitialTermIds(currentTermIds);
            setShowSuccessModal(true);
        } catch (error) {
            console.error(error);
            setAlertState({ isOpen: true, title: 'Error', message: 'Failed to update course.', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    // --- Curriculum Handlers with Modals ---

    const toggleSection = (sectionId: number) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleAddSection = () => {
        setInputState({
            isOpen: true,
            title: 'Add New Section',
            label: 'Section Title',
            placeholder: 'e.g. Introduction',
            onConfirm: async (title) => {
                try {
                    const newSection = await adminLearnPressService.createSection(courseId, { title });
                    setCurriculum(prev => prev ? { ...prev, sections: [...prev.sections, newSection] } : null);
                    setExpandedSections(prev => [...prev, newSection.id]);
                } catch (error) {
                    console.error("Failed to create section", error);
                    setAlertState({ isOpen: true, title: 'Error', message: 'Failed to create section', type: 'error' });
                }
            }
        });
    };

    const handleDeleteSection = (sectionId: number) => {
        setConfirmState({
            isOpen: true,
            title: 'Delete Section',
            message: 'Are you sure you want to delete this section and all its items? This action cannot be undone.',
            isDestructive: true,
            onConfirm: async () => {
                try {
                    await adminLearnPressService.deleteSection(sectionId);
                    setCurriculum(prev => prev ? { ...prev, sections: prev.sections.filter(s => s.id !== sectionId) } : null);
                } catch (error) {
                    console.error("Failed to delete section", error);
                    setAlertState({ isOpen: true, title: 'Error', message: 'Failed to delete section', type: 'error' });
                }
            }
        });
    };

    // --- Item Editor State ---
    const [itemEditorState, setItemEditorState] = useState<{
        isOpen: boolean;
        sectionId: number | null;
        itemId: number | null; // null represents "Create New"
        type: 'lp_lesson' | 'lp_quiz';
        initialData?: any;
    }>({
        isOpen: false,
        sectionId: null,
        itemId: null,
        type: 'lp_lesson'
    });

    const handleOpenItemEditor = (sectionId: number, type: 'lp_lesson' | 'lp_quiz', itemId: number | null = null, existingData: any = null) => {
        setItemEditorState({
            isOpen: true,
            sectionId,
            itemId,
            type,
            initialData: existingData
        });
    };

    const handleSaveItem = async (data: any) => {
        if (!itemEditorState.sectionId) return;

        try {
            if (itemEditorState.itemId) {
                // Update existing item
                await adminLearnPressService.updateItem(itemEditorState.itemId, data);
                setCurriculum(prev => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        sections: prev.sections.map(section => {
                            if (section.id === itemEditorState.sectionId) {
                                return {
                                    ...section,
                                    items: (section.items || []).map(item =>
                                        item.id === itemEditorState.itemId ? { ...item, ...data } : item
                                    )
                                };
                            }
                            return section;
                        })
                    };
                });
            } else {
                // Create new item
                const newItem = await adminLearnPressService.createItem(itemEditorState.sectionId, {
                    ...data,
                    type: itemEditorState.type
                });

                setCurriculum(prev => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        sections: prev.sections.map(section => {
                            if (section.id === itemEditorState.sectionId) {
                                return {
                                    ...section,
                                    items: [...(section.items || []), newItem]
                                };
                            }
                            return section;
                        })
                    };
                });
            }
        } catch (error) {
            console.error("Failed to save item", error);
            setAlertState({ isOpen: true, title: 'Error', message: 'Failed to save item', type: 'error' });
        }
    };

    const handleDeleteItem = (sectionId: number, itemId: number) => {
        setConfirmState({
            isOpen: true,
            title: 'Delete Item',
            message: 'Are you sure you want to delete this item?',
            isDestructive: true,
            onConfirm: async () => {
                try {
                    await adminLearnPressService.deleteItem(itemId);
                    setCurriculum(prev => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            sections: prev.sections.map(section => {
                                if (section.id === sectionId) {
                                    return {
                                        ...section,
                                        items: (section.items || []).filter(item => item.id !== itemId)
                                    };
                                }
                                return section;
                            })
                        };
                    });
                } catch (error) {
                    console.error("Failed to delete item", error);
                    setAlertState({ isOpen: true, title: 'Error', message: 'Failed to delete item', type: 'error' });
                }
            }
        });
    };


    if (loading) return <div className="p-8 text-center text-gray-400">Loading course editor...</div>;

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/courses" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Edit Course</h1>
                        <p className="text-gray-400 text-sm mt-0.5">{course?.title}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/admin/courses/${courseId}/submissions`}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-medium transition-colors border border-gray-800"
                    >
                        <ClipboardList className="w-4 h-4" />
                        <span>View Submissions</span>
                    </Link>
                    <button
                        onClick={handleSaveGeneral}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-gray-800">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === 'general' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
                >
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        General Information
                    </div>
                    {activeTab === 'general' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === 'curriculum' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
                >
                    <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Curriculum
                    </div>
                    {activeTab === 'curriculum' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('learners')}
                    className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === 'learners' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
                >
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Learners
                    </div>
                    {activeTab === 'learners' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('stats')}
                    className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === 'stats' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
                >
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Stats
                    </div>
                    {activeTab === 'stats' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-t-full"></div>}
                </button>
            </div>

            {/* Content */}
            {activeTab === 'general' && (
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Course Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="min-h-[350px]">
                            <RichTextEditor
                                label="Description"
                                value={formData.content}
                                onChange={(val) => setFormData({ ...formData, content: val })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Price ($)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent"
                            />
                        </div>
                        <DurationPicker
                            label="Duration"
                            value={formData.duration}
                            onChange={(val) => setFormData({ ...formData, duration: val })}
                        />
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Level</label>
                            <select
                                className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent"
                                value={formData.level}
                                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                            >
                                <option value="">Select Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TermSelector
                            taxonomy="category"
                            label="Course Categories"
                            selectedIds={selectedCategories}
                            onChange={setSelectedCategories}
                        />
                        <TermSelector
                            taxonomy="post_tag"
                            label="Course Tags"
                            selectedIds={selectedTags}
                            onChange={setSelectedTags}
                        />
                    </div>
                </div>
            )}

            {activeTab === 'curriculum' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-white">Course Curriculum</h2>
                        <button
                            onClick={handleAddSection}
                            className="flex items-center gap-2 px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg text-sm transition-colors border border-gray-700"
                        >
                            <Plus className="w-4 h-4" />
                            Add Section
                        </button>
                    </div>

                    <div className="space-y-4">
                        {curriculum?.sections.map((section) => (
                            <div key={section.id} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                                <div
                                    className="p-4 bg-[#1F2937]/50 flex items-center justify-between cursor-pointer hover:bg-[#1F2937] transition-colors"
                                    onClick={() => toggleSection(section.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-gray-500">
                                            <GripVertical className="w-5 h-5" />
                                        </div>
                                        {expandedSections.includes(section.id) ? (
                                            <ChevronDown className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4 text-gray-500" />
                                        )}
                                        <h3 className="text-white font-medium select-none">{section.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteSection(section.id); }}
                                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {expandedSections.includes(section.id) && (
                                    <div className="p-4 space-y-3 bg-[#111827]">
                                        {section.items && section.items.length > 0 ? (
                                            <div className="space-y-2">
                                                {section.items.map((item) => (
                                                    <div key={item.id} className="flex items-center justify-between p-3 bg-[#1F2937]/30 rounded-lg border border-gray-800/50 hover:border-gray-700 transition-colors ml-8">
                                                        <div className="flex items-center gap-3">
                                                            {item.type === 'lp_lesson' ? (
                                                                <FileText className="w-4 h-4 text-blue-500" />
                                                            ) : (
                                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                            )}
                                                            <span className="text-sm text-gray-300">{item.title}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleOpenItemEditor(section.id, item.type as any, item.id, item)}
                                                                className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded transition-colors"
                                                            >
                                                                <Edit2 className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteItem(section.id, item.id)}
                                                                className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center text-sm text-gray-500 py-4 ml-8 border-l-2 border-gray-800 pl-4 bg-[#1F2937]/10 rounded-r-lg">
                                                No items in this section.
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3 ml-8 pt-2">
                                            <button
                                                onClick={() => handleOpenItemEditor(section.id, 'lp_lesson')}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded text-xs font-medium border border-blue-500/20 transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                                Add Lesson
                                            </button>
                                            <button
                                                onClick={() => handleOpenItemEditor(section.id, 'lp_quiz')}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded text-xs font-medium border border-green-500/20 transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                                Add Quiz
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {(!curriculum?.sections || curriculum.sections.length === 0) && (
                        <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-xl">
                            <Layers className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                            <h3 className="text-gray-400 font-medium">No sections yet</h3>
                            <p className="text-gray-600 text-sm mt-1">Start by adding a new section to your course.</p>
                            <button
                                onClick={handleAddSection}
                                className="mt-4 px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg text-sm transition-colors"
                            >
                                Create First Section
                            </button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'learners' && (
                <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                        <h3 className="text-white font-semibold">Course Learners</h3>
                        <span className="text-xs text-purple-400">Total: {learners.length}</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                                    <th className="p-4 font-medium">Student</th>
                                    <th className="p-4 font-medium">Enrollment Date</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Graduation</th>
                                    <th className="p-4 font-medium">Progress</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {loadingLearners ? (
                                    <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading learners...</td></tr>
                                ) : learners.length === 0 ? (
                                    <tr><td colSpan={6} className="p-8 text-center text-gray-500">No students enrolled yet.</td></tr>
                                ) : (
                                    learners.map((learner) => (
                                        <tr key={learner.user_id} className="border-b border-gray-800 hover:bg-[#1F2937]/30 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                                                        {learner.display_name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{learner.display_name}</p>
                                                        <p className="text-xs text-gray-500">{learner.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-400">{new Date(learner.enrollment_date).toLocaleDateString()}</td>
                                            <td className="p-4 uppercase text-xs font-semibold">{learner.status}</td>
                                            <td className="p-4 uppercase text-xs font-semibold">{learner.graduation}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-green-500" style={{ width: `${learner.progress_percent}%` }}></div>
                                                    </div>
                                                    <span className="text-xs text-gray-400">{learner.progress_percent}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <Link href={`/admin/users/${learner.user_id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors inline-block">
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
            )}

            {activeTab === 'stats' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {loadingStats ? (
                        <div className="text-center py-12 text-gray-500">Loading course statistics...</div>
                    ) : stats ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl">
                                    <p className="text-gray-400 text-sm">Total Students</p>
                                    <h4 className="text-2xl font-bold text-white mt-1">{stats.total_students}</h4>
                                </div>
                                <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl">
                                    <p className="text-gray-400 text-sm">Completed</p>
                                    <h4 className="text-2xl font-bold text-green-500 mt-1">{stats.completed_students}</h4>
                                </div>
                                <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl">
                                    <p className="text-gray-400 text-sm">Passing Rate</p>
                                    <h4 className="text-2xl font-bold text-blue-500 mt-1">{stats.passing_rate}%</h4>
                                </div>
                                <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl">
                                    <p className="text-gray-400 text-sm">Avg. Quiz Score</p>
                                    <h4 className="text-2xl font-bold text-purple-500 mt-1">{stats.average_quiz_score}%</h4>
                                </div>
                            </div>

                            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-purple-500" />
                                    Course Engagement
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Student Completion Progress</span>
                                            <span className="text-white">{(stats.completed_students / stats.total_students * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500" style={{ width: `${stats.completed_students / stats.total_students * 100}%` }}></div>
                                        </div>
                                    </div>
                                    {/* More detailed stats could go here */}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                            No statistics available for this course yet.
                        </div>
                    )}
                </div>
            )}

            {/* Modals */}
            <AlertModal
                isOpen={alertState.isOpen}
                onClose={() => setAlertState({ ...alertState, isOpen: false })}
                title={alertState.title}
                message={alertState.message}
                type={alertState.type as any}
            />
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                message="Course updated successfully!"
                confirmText="Continue Editing"
                onConfirm={() => setShowSuccessModal(false)}
                secondaryText="Back to Courses"
                onSecondary={() => router.push('/admin/courses')}
            />
            <InputModal
                isOpen={inputState.isOpen}
                onClose={() => setInputState({ ...inputState, isOpen: false })}
                onConfirm={inputState.onConfirm}
                title={inputState.title}
                label={inputState.label}
                placeholder={inputState.placeholder}
            />
            <ItemEditorModal
                isOpen={itemEditorState.isOpen}
                onClose={() => setItemEditorState(prev => ({ ...prev, isOpen: false }))}
                onSave={handleSaveItem}
                title={itemEditorState.itemId ? 'Edit Item' : 'New Item'}
                itemType={itemEditorState.type}
                initialData={itemEditorState.initialData}
            />
            <ConfirmModal
                isOpen={confirmState.isOpen}
                onClose={() => setConfirmState({ ...confirmState, isOpen: false })}
                onConfirm={confirmState.onConfirm}
                title={confirmState.title}
                message={confirmState.message}
                isDestructive={confirmState.isDestructive}
            />
        </div>
    );
}
