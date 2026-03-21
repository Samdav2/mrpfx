import React from 'react';
import { getMentorship100Settings } from '@/app/actions/mentorship-100-settings';
import MentorshipCourse100Content from '@/components/mentorship/MentorshipCourse100Content';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default async function MentorshipCourse100Page() {
    const settings = await getMentorship100Settings();
    let isLocked = false;
    let unlockDate = null;

    if (settings?.registrationOpenDate) {
        const target = new Date(settings.registrationOpenDate).getTime();
        const now = new Date().getTime();
        if (target > now) {
            isLocked = true;
            unlockDate = new Date(settings.registrationOpenDate).toLocaleString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    if (isLocked) {
        return (
            <div className="min-h-screen bg-[#110905] text-[#EBEBEB] font-montserrat flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-repeat"
                    style={{
                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")',
                        backgroundSize: '200px'
                    }}
                />
                <div className="relative z-10 flex flex-col items-center">
                    <Lock className="w-16 h-16 text-[#D4AF37] mb-6" />
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Registration Closed</h1>
                    <p className="text-xl text-gray-400 mb-8 max-w-lg">
                        The Mentorship Course 100 registration is currently closed. The next registration window will open on <strong className="text-white">{unlockDate}</strong>.
                    </p>
                    <Link href="/">
                        <button className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B68C36] hover:from-[#F8CD5C] hover:to-[#D4AF37] text-[#110905] font-bold rounded shadow-lg transition-all uppercase tracking-wider">
                            Return Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#110905] text-[#EBEBEB] font-montserrat relative overflow-hidden">
            {/* Dark Texture Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-repeat"
                style={{
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")',
                    backgroundSize: '200px'
                }}
            />
            {/* Additional Dark Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#110905]/50 to-[#110905] pointer-events-none" />

            {/* Main Content Container (Client Component) */}
            <MentorshipCourse100Content productSlug={settings?.productSlug || 'mentorship-100'} />
        </div>
    );
}
