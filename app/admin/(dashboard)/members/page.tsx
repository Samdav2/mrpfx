import MemberList from '@/components/admin/members/MemberList';
import { Download } from 'lucide-react';

export default function MembersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Member Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage membership levels and platform access</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1F2937] border border-gray-800 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#374151] transition-colors">
                        <Download className="w-4 h-4" />
                        Export Members
                    </button>
                </div>
            </div>

            <MemberList />
        </div>
    );
}
