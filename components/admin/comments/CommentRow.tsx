'use client';

import React, { useState } from 'react';
import { WPCommentRead, WPCommentUpdate } from '@/lib/types';
import { adminCommentService } from '@/lib/admin-api';
import {
    MessageSquare,
    User,
    Mail,
    Globe,
    Calendar,
    CheckCircle,
    XCircle,
    Trash2,
    AlertCircle,
    Edit2,
    Star,
    ShieldCheck
} from 'lucide-react';
import { format } from 'date-fns';

interface CommentRowProps {
    comment: WPCommentRead;
    onUpdate: (updatedComment: WPCommentRead) => void;
    onDelete: (commentId: number) => void;
    onPermanentDelete: (commentId: number) => void;
}

const CommentRow: React.FC<CommentRowProps> = ({ comment, onUpdate, onDelete, onPermanentDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.comment_content);
    const [isSaving, setIsSaving] = useState(false);

    const handleStatusUpdate = async (newStatus: string) => {
        try {
            const updated = await adminCommentService.update(comment.comment_ID, {
                comment_approved: newStatus
            });
            onUpdate(updated);
        } catch (error) {
            console.error('Failed to update comment status', error);
        }
    };

    const handleSaveEdit = async () => {
        setIsSaving(true);
        try {
            const updated = await adminCommentService.update(comment.comment_ID, {
                comment_content: editContent
            });
            onUpdate(updated);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update comment content', error);
        } finally {
            setIsSaving(false);
        }
    };

    const isReview = comment.comment_type === 'review';
    const rating = comment.meta?.find(m => m.meta_key === 'rating')?.meta_value;
    const verified = comment.meta?.find(m => m.meta_key === 'verified')?.meta_value === '1';

    return (
        <tr className="group border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors">
            {/* Author Column */}
            <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-white truncate">{comment.comment_author || 'Anonymous'}</p>
                        <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {comment.comment_author_email}
                        </p>
                        <p className="text-xs text-blue-400 truncate mt-1">{comment.comment_author_IP}</p>
                    </div>
                </div>
            </td>

            {/* Content Column */}
            <td className="px-6 py-4">
                <div className="space-y-2">
                    {isReview && rating && (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${i < parseInt(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                                    />
                                ))}
                            </div>
                            {verified && (
                                <span className="flex items-center gap-1 text-[10px] bg-green-900/30 text-green-400 px-1.5 py-0.5 rounded border border-green-800/50">
                                    <ShieldCheck className="w-3 h-3" /> Verified
                                </span>
                            )}
                        </div>
                    )}

                    {isEditing ? (
                        <div className="space-y-2">
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full bg-[#0B0E14] text-white text-sm rounded-lg p-2 border border-gray-700 focus:ring-1 focus:ring-blue-500 outline-none min-h-[100px]"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSaveEdit}
                                    disabled={isSaving}
                                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-3 py-1 bg-gray-700 text-white text-xs rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
                            {comment.comment_content}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {format(new Date(comment.comment_date), 'MMM d, yyyy h:mm a')}
                        </span>
                        {comment.post_title && (
                            <span className="flex items-center gap-1">
                                In response to: <span className="text-blue-400 font-medium">"{comment.post_title}"</span>
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-blue-400 hover:text-blue-300 text-[11px] font-medium"
                            >
                                Edit
                            </button>
                        )}

                        {comment.comment_approved === 'trash' ? (
                            <>
                                <button
                                    onClick={() => handleStatusUpdate('0')}
                                    className="text-green-400 hover:text-green-300 text-[11px] font-medium"
                                >
                                    Restore
                                </button>
                                <button
                                    onClick={() => onPermanentDelete(comment.comment_ID)}
                                    className="text-red-500 hover:text-red-400 text-[11px] font-bold"
                                >
                                    Delete Permanently
                                </button>
                            </>
                        ) : (
                            <>
                                {comment.comment_approved !== '1' && (
                                    <button
                                        onClick={() => handleStatusUpdate('1')}
                                        className="text-green-400 hover:text-green-300 text-[11px] font-medium"
                                    >
                                        Approve
                                    </button>
                                )}
                                {comment.comment_approved === '1' && (
                                    <button
                                        onClick={() => handleStatusUpdate('0')}
                                        className="text-yellow-400 hover:text-yellow-300 text-[11px] font-medium"
                                    >
                                        Unapprove
                                    </button>
                                )}
                                {comment.comment_approved !== 'spam' && (
                                    <button
                                        onClick={() => handleStatusUpdate('spam')}
                                        className="text-orange-400 hover:text-orange-300 text-[11px] font-medium"
                                    >
                                        Spam
                                    </button>
                                )}
                                <button
                                    onClick={() => onDelete(comment.comment_ID)}
                                    className="text-red-400 hover:text-red-300 text-[11px] font-medium"
                                >
                                    Trash
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </td>

            {/* Status Column */}
            <td className="px-6 py-4">
                {comment.comment_approved === '1' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-900/20 text-green-400 border border-green-800/30">
                        <CheckCircle className="w-3.5 h-3.5" /> Approved
                    </span>
                )}
                {comment.comment_approved === '0' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-900/20 text-yellow-400 border border-yellow-800/30">
                        <AlertCircle className="w-3.5 h-3.5" /> Pending
                    </span>
                )}
                {comment.comment_approved === 'spam' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-900/20 text-orange-400 border border-orange-800/30">
                        <AlertCircle className="w-3.5 h-3.5" /> Spam
                    </span>
                )}
                {comment.comment_approved === 'trash' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-900/20 text-red-400 border border-red-800/30">
                        <Trash2 className="w-3.5 h-3.5" /> Trash
                    </span>
                )}
            </td>
        </tr>
    );
};

export default CommentRow;
