import ServiceCard from './ServiceCard';

interface ServicesProps {
    onMentorshipClick: () => void;
    onVipClick: () => void;
    onFreeClick: () => void;
}

export default function Services({ onMentorshipClick, onVipClick, onFreeClick }: ServicesProps) {
    const services = [
        {
            title: "VIP Mentorship Courses",
            imageSrc: "/images/home/service-mentorship.png",
            onClick: onMentorshipClick,
        },
        {
            title: "VIP Signals Group",
            imageSrc: "/images/home/service-signals.png",
            href: "/vip-signals-group",
        },
        {
            title: "VIP bots, Indicators & All VIP Resources",
            imageSrc: "/images/home/service-resources.jpg",
            onClick: onVipClick,
        },
        {
            title: "Free Robots, Indicators & Videos",
            imageSrc: "/images/home/service-free.jpg",
            onClick: onFreeClick,
        },
    ];

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-gray-500 font-medium tracking-wide uppercase text-sm mb-3">Our Services</h2>
                    <h3 className="text-3xl lg:text-4xl font-bold text-black mb-6">What we have to offer</h3>
                    <div className="w-24 h-1 bg-blue-100 mx-auto relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-500 rotate-45 border-2 border-white"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            imageSrc={service.imageSrc}
                            href={service.href}
                            onClick={service.onClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
