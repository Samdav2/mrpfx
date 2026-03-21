'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPromoBannerSettings, PromoBannerSettings } from '@/app/actions/promo-banner-settings';

export default function PromoBanner() {
    const [settings, setSettings] = useState<PromoBannerSettings | null>(null);

    useEffect(() => {
        getPromoBannerSettings().then(data => {
            if (data?.active) {
                setSettings(data);
            }
        });
    }, []);

    if (!settings) return null;

    const content = (
        <div className={`w-full ${settings.backgroundColor || 'bg-[#5B2EFF]'} text-white text-center py-2.5 px-4 text-xs sm:text-sm font-semibold font-dm-sans tracking-wide shadow-sm flex items-center justify-center`}>
            {settings.text}
        </div>
    );

    if (settings.link) {
        return (
            <Link href={settings.link} className="block w-full hover:opacity-90 transition-opacity">
                {content}
            </Link>
        );
    }

    return content;
}
