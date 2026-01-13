import { ShieldCheck, TrendingUp, Users } from 'lucide-react';

const reasons = [
    {
        title: 'Proven Strategy',
        description: 'Our strategies are backtested and proven to work in various market conditions.',
        icon: TrendingUp,
    },
    {
        title: 'Expert Mentorship',
        description: 'Learn directly from experienced traders who have mastered the markets.',
        icon: Users,
    },
    {
        title: 'Secure & Reliable',
        description: 'We prioritize your security and provide reliable signals and tools.',
        icon: ShieldCheck,
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Us</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover what sets us apart from other trading communities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <div key={index} className="text-center p-6">
                            <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-yellow-500">
                                <reason.icon size={32} className="text-yellow-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{reason.title}</h3>
                            <p className="text-gray-400">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
