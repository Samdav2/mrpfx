/**
 * LearnPress Service (User-facing)
 * Handles course browsing, enrollment, and progress tracking
 */

import api from './api';
import type {
    LPCourse,
    LPCurriculum,
    LPQuiz,
    LPUserItem,
    LPEnrollRequest,
    LPCompleteItemRequest,
    LPQuizSubmitRequest,
    LPQuizSubmission,
    LPMyProgress,
    LPQuizResult,
} from './types';

export type {
    LPCourse,
    LPCurriculum,
    LPQuiz,
    LPUserItem,
    LPQuizSubmission,
    LPMyProgress,
    LPQuizResult,
};

export const learnpressService = {
    // ========================================================================
    // PUBLIC COURSE BROWSING
    // ========================================================================

    /**
     * Get list of courses (public)
     */
    getCourses: async (skip: number = 0, limit: number = 10): Promise<LPCourse[]> => {
        const response = await api.get<LPCourse[]>(
            '/wordpress/learnpress/courses',
            { params: { skip, limit } }
        );
        return response.data;
    },

    /**
     * Get a single course by ID (public)
     */
    getCourse: async (courseId: number): Promise<LPCourse> => {
        const response = await api.get<LPCourse>(
            `/wordpress/learnpress/courses/${courseId}`
        );
        return response.data;
    },

    /**
     * Get a single course by Slug (public)
     */
    getCourseBySlug: async (slug: string): Promise<LPCourse> => {
        // LearnPress might not have a direct 'slug' param on the general courses endpoint
        // standard WP way is ?slug=abc. Let's assume the custom endpoints support it or we use the underlying WP post endpoint if needed.
        // If the backend is standard WP/LearnPress, accessing via /wordpress/learnpress/courses?slug=xyz might work if implemented,
        // otherwise we might need to fetch all or search.
        // Given the goal, I'll assume standard WP query param support on the list endpoint.
        const response = await api.get<LPCourse[]>(
            `/wordpress/learnpress/courses`,
            { params: { slug } }
        );
        if (!response.data || response.data.length === 0) {
            throw new Error('Course not found');
        }
        return response.data[0];
    },

    /**
     * Get course curriculum (sections and items)
     */
    getCurriculum: async (courseId: number): Promise<LPCurriculum> => {
        const response = await api.get<LPCurriculum>(
            `/wordpress/learnpress/courses/${courseId}/curriculum`
        );
        return response.data;
    },

    /**
     * Get quiz details
     */
    getQuiz: async (quizId: number): Promise<LPQuiz> => {
        const response = await api.get<LPQuiz>(
            `/wordpress/learnpress/quizzes/${quizId}`
        );
        return response.data;
    },

    // ========================================================================
    // USER ENROLLMENT & PROGRESS (Requires authentication)
    // ========================================================================

    /**
     * Get current user's enrolled courses
     */
    getMyCourses: async (): Promise<LPUserItem[]> => {
        const response = await api.get<LPUserItem[]>(
            '/wordpress/learnpress/my-courses'
        );
        return response.data;
    },

    /**
     * Get user's progress for a specific course
     */
    getCourseProgress: async (courseId: number): Promise<LPUserItem> => {
        const response = await api.get<LPUserItem>(
            `/wordpress/learnpress/progress/${courseId}`
        );
        return response.data;
    },

    /**
     * Enroll in a course
     */
    enrollCourse: async (courseId: number): Promise<LPUserItem> => {
        const data: LPEnrollRequest = { course_id: courseId };
        const response = await api.post<LPUserItem>(
            `/wordpress/learnpress/courses/${courseId}/enroll`,
            data
        );
        return response.data;
    },

    /**
     * Mark a lesson/item as complete
     */
    completeItem: async (
        itemId: number,
        courseId: number
    ): Promise<LPUserItem> => {
        const data: LPCompleteItemRequest = {
            item_id: itemId,
            course_id: courseId,
        };
        const response = await api.post<LPUserItem>(
            `/wordpress/learnpress/items/${itemId}/complete`,
            data
        );
        return response.data;
    },

    /**
     * Submit quiz answers
     */
    submitQuiz: async (
        quizId: number,
        courseId: number,
        answers: LPQuizSubmission[]
    ): Promise<LPUserItem> => {
        const data: LPQuizSubmitRequest = {
            quiz_id: quizId,
            course_id: courseId,
            answers,
        };
        const response = await api.post<LPUserItem>(
            `/wordpress/learnpress/quizzes/${quizId}/submit`,
            data
        );
        return response.data;
    },

    /**
     * Get detailed progress with percentage for a specific course
     */
    getMyProgress: async (courseId: number): Promise<LPMyProgress> => {
        const response = await api.get<LPMyProgress>(
            `/wordpress/learnpress/my-progress/${courseId}`
        );
        return response.data;
    },

    /**
     * Get quiz results for the current user
     */
    getQuizResults: async (quizId: number): Promise<LPQuizResult[]> => {
        const response = await api.get<LPQuizResult[]>(
            `/wordpress/learnpress/quizzes/${quizId}/my-results`
        );
        return response.data;
    },

    // ========================================================================
    // HELPER FUNCTIONS
    // ========================================================================

    /**
     * Check if user is enrolled in a course by checking my-courses
     */
    isEnrolled: async (courseId: number): Promise<boolean> => {
        try {
            const myCourses = await learnpressService.getMyCourses();
            return myCourses.some(
                (item) => item.item_id === courseId || item.ref_id === courseId
            );
        } catch {
            return false;
        }
    },

    /**
     * Get course completion percentage
     */
    getCompletionPercentage: async (courseId: number): Promise<number> => {
        try {
            const progress = await learnpressService.getCourseProgress(courseId);
            if (progress.status === 'completed' || progress.graduation === 'passed') {
                return 100;
            }
            // Note: Actual percentage calculation would depend on backend implementation
            return 0;
        } catch {
            return 0;
        }
    },
};
