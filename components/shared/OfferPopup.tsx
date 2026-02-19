'use client';

import React from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';

interface PopupItem {
    label: string;
    href: string;
    color: 'purple' | 'blue';
    isExternal?: boolean;
}

interface OfferPopupProps {
    isOpen: boolean;
    onClose: () => void;
    items: PopupItem[];
}

const OfferPopup: React.FC<OfferPopupProps> = ({ isOpen, onClose, items }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="relative bg-white rounded-2xl p-6 w-full max-w-4xl shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 text-blue-600" />
                </button>

                <div className="flex flex-wrap gap-4 justify-center py-8">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            target={item.isExternal ? "_blank" : undefined}
                            rel={item.isExternal ? "noopener noreferrer" : undefined}
                            className={`flex items-center justify-between px-6 py-8 rounded-lg text-white font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] ${item.color === 'purple' ? 'bg-[#4338ca]' : 'bg-[#0ea5e9]'
                                }`}
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                            onClick={onClose}
                        >
                            <span className="text-left pr-4">{item.label}</span>
                            <div className="bg-white/20 rounded-full p-1">
                                <ArrowRight className="w-6 h-6" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OfferPopup;
