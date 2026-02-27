'use client';

import { useState } from 'react';
import Hero from './Hero';
import AccessSection from './AccessSection';
import Services from './Services';
import TradingTools from './TradingTools';
import MentorshipPreview from './MentorshipPreview';
import Testimonials from './Testimonials';
import Community from './Community';
import TradingStrategy from './TradingStrategy';
import NewsletterSection from '../shared/NewsletterSection';
import OfferPopup from '../shared/OfferPopup';

export default function HomePage() {
    const [showMentorshipPopup, setShowMentorshipPopup] = useState(false);
    const [showVipPopup, setShowVipPopup] = useState(false);
    const [showFreePopup, setShowFreePopup] = useState(false);

    const mentorshipItems = [
        { label: "Standard Mentorship", href: "/mentorship-course", color: "purple" as const },
        { label: "One - On - One Class With Mr P", href: "https://wa.me/2349076804442", color: "purple" as const, isExternal: true },
        { label: "MC100", href: "/mentorship-course", color: "blue" as const }
    ];

    const vipItems = [
        { label: "VIP Bots", href: "/all-vip-resources", color: "blue" as const },
        { label: "VIP Indicator", href: "/all-vip-resources", color: "purple" as const },
        { label: "All VIP Resources", href: "/all-vip-resources", color: "purple" as const }
    ];

    const freeItems = [
        { label: "Free Bots", href: "/free-signals-group", color: "blue" as const },
        { label: "Free Indicators", href: "/free-signals-group", color: "purple" as const },
        { label: "Free Mentorship videos", href: "/videos", color: "purple" as const },
        { label: "All Free Resources", href: "/free-signals-group", color: "purple" as const }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <AccessSection />
            <Services
                onMentorshipClick={() => setShowMentorshipPopup(true)}
                onVipClick={() => setShowVipPopup(true)}
                onFreeClick={() => setShowFreePopup(true)}
            />
            <TradingTools
                onMentorshipClick={() => setShowMentorshipPopup(true)}
                onVipClick={() => setShowVipPopup(true)}
                onFreeClick={() => setShowFreePopup(true)}
            />
            <MentorshipPreview />
            <Testimonials />
            <Community />
            <TradingStrategy />
            <NewsletterSection />

            <OfferPopup
                isOpen={showMentorshipPopup}
                onClose={() => setShowMentorshipPopup(false)}
                items={mentorshipItems}
            />
            <OfferPopup
                isOpen={showVipPopup}
                onClose={() => setShowVipPopup(false)}
                items={vipItems}
            />
            <OfferPopup
                isOpen={showFreePopup}
                onClose={() => setShowFreePopup(false)}
                items={freeItems}
            />
        </main>
    );
}
