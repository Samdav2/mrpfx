'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    BookOpen,
    ArrowUpDown,
    RefreshCcw,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { adminLearnPressService, LPCourse } from '@/lib/admin-api';
import { ConfirmModal } from '@/components/admin/Modals';

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState<LPCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('any');
    const limit = 10;

    // Modal State
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, courseId: number | null }>({ isOpen: false, courseId: null });

    useEffect(() => {
        fetchCourses();
    }, [page, statusFilter]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const offset = (page - 1) * limit;
            const data = await adminLearnPressService.getCourses(statusFilter, limit, offset);
            if (Array.isArray(data)) {
                setCourses(data);
            } else if ((data as any).data && Array.isArray((data as any).data)) {
                setCourses((data as any).data);
            }
        } catch (error) {
            console.error("Failed to fetch courses", error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        setDeleteModal({ isOpen: true, courseId: id });
    };

    const confirmDelete = async () => {
        if (!deleteModal.courseId) return;
        const course = courses.find(c => c.id === deleteModal.courseId);
        const isCurrentlyTrashed = course?.status === 'trash';

        try {
            await adminLearnPressService.deleteCourse(deleteModal.courseId, isCurrentlyTrashed);
            setCourses(courses.filter(c => c.id !== deleteModal.courseId));
            setDeleteModal({ isOpen: false, courseId: null });
        } catch (error) {
            console.error("Failed to delete course", error);
        }
    };

    const handleRestore = async (id: number) => {
        try {
            await adminLearnPressService.updateCourse(id, { status: 'publish' });
            fetchCourses();
        } catch (error) {
            console.error("Failed to restore course", error);
        }
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white">Courses</h1>
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="bg-[#111827] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        className="bg-[#111827] text-white text-sm rounded-lg px-3 py-2 border border-gray-800 focus:outline-none focus:border-purple-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="any">All Status</option>
                        <option value="publish">Published</option>
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="trash">Trash</option>
                    </select>
                    <Link
                        href="/admin/courses/add"
                        className="flex items-center gap-2 px-4 py-2 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Course</span>
                    </Link>
                </div>
            </div>

            {/* Courses Table */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h3 className="text-white font-semibold">All Courses</h3>
                    <span className="text-xs text-purple-400">Total: {courses.length}</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                                <th className="p-4 w-10">
                                    <input type="checkbox" className="rounded bg-gray-700 border-gray-600 accent-purple-600" />
                                </th>
                                <th className="p-4 font-medium flex items-center gap-2 cursor-pointer hover:text-white">
                                    Title <ArrowUpDown className="w-3 h-3" />
                                </th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Students</th>
                                <th className="p-4 font-medium">Created</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">Loading courses...</td>
                                </tr>
                            ) : filteredCourses.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        No courses found. Click "Add New Course" to create one.
                                    </td>
                                </tr>
                            ) : (
                                filteredCourses.map((course) => (
                                    <tr key={course.id} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors group">
                                        <td className="p-4">
                                            <input type="checkbox" className="rounded bg-gray-700 border-gray-600 accent-purple-600" />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                                                    <BookOpen className="w-5 h-5" />
                                                </div>
                                                <span className="text-white font-medium">{course.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400 font-medium">${course.metadata?.price || 0}</td>
                                        <td className="p-4 text-gray-400">{course.metadata?.students || 0}</td>
                                        <td className="p-4 text-gray-400">{course.date_created ? new Date(course.date_created).toLocaleDateString() : '-'}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border ${course.status === 'publish'
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                : course.status === 'trash'
                                                    ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${course.status === 'publish' ? 'bg-green-500' : course.status === 'trash' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                                                {course.status ? course.status.charAt(0).toUpperCase() + course.status.slice(1) : 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity">
                                                <Link href={`/admin/courses/${course.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                {course.status === 'trash' && (
                                                    <button
                                                        onClick={() => handleRestore(course.id)}
                                                        className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded transition-colors"
                                                        title="Restore"
                                                    >
                                                        <RefreshCcw className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteClick(course.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                                    title={course.status === 'trash' ? "Delete Permanently" : "Move to Trash"}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-800 text-sm text-gray-400">
                    <div>Showing {filteredCourses.length} results</div>
                    <div className="flex items-center gap-2">
                        <span>Rows per page: {limit}</span>
                        <div className="flex gap-1 ml-4">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                className="p-1 hover:bg-gray-700 rounded"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, courseId: null })}
                onConfirm={confirmDelete}
                title={deleteModal.courseId && courses.find(c => c.id === deleteModal.courseId)?.status === 'trash' ? "Delete Permanently" : "Move to Trash"}
                message={deleteModal.courseId && courses.find(c => c.id === deleteModal.courseId)?.status === 'trash'
                    ? "Are you sure you want to permanently delete this course? This action is irreversible."
                    : "Are you sure you want to move this course to trash? You can restore it later."}
                isDestructive={true}
            />
        </div>
    );
}
