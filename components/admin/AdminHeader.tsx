'use client';

import { Bell, Search } from 'lucide-react';

const AdminHeader = () => {
    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4 w-96">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-gray-800">Admin User</span>
                        <span className="text-xs text-gray-500">Administrator</span>
                    </div>
                    <div className="w-10 h-10 bg-[#1a237e] rounded-full flex items-center justify-center text-white font-bold">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
