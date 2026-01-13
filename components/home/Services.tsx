import Link from 'next/link';
import { BookOpen, Signal, Bot, Gift } from 'lucide-react';

const services = [
    {
        title: 'Mentorship Courses',
        description: 'Comprehensive training from basics to advanced strategies.',
        icon: BookOpen,
        link: '#',
    },
    {
        title: 'VIP Signals Group',
        description: 'Real-time trade alerts with high accuracy.',
        icon: Signal,
        link: '#',
    },
    {
        title: 'VIP BOTS/INDICATORS',
        description: 'Automate your trading with our custom tools.',
        icon: Bot,
        link: '#',
    },
    {
        title: 'ALL FREE RESOURCES',
        description: 'Access free guides, webinars, and more.',
        icon: Gift,
        link: '#',
    },
];

const Services = () => {
    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We provide everything you need to succeed in the forex market.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-gray-900 p-8 rounded-lg border border-gray-800 hover:border-yellow-500 transition-colors group">
                            <div className="mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                                <service.icon size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                            <p className="text-gray-400 mb-6">{service.description}</p>
                            <Link
                                href={service.link}
                                className="text-yellow-500 font-medium hover:underline inline-flex items-center"
                            >
                                Learn More &rarr;
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
