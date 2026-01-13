import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-dark-bg overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://mrpfx.com/wp-content/uploads/2021/07/mrpfx-home-bg-scaled.jpg')" }}
                ></div>
            </div>

            <div className="container mx-auto px-4 z-20 text-center">
                <h1 className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 leading-tight drop-shadow-lg">
                    Master Forex Trading Through <br />
                    <span className="text-gold">Precision, Strategy</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
                    Join thousands of successful traders who have transformed their trading journey with our expert mentorship and signals.
                </p>
                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                    <Link
                        href="#"
                        className="px-8 py-4 bg-gold text-black font-bold rounded hover:bg-gold-hover transition-colors text-lg uppercase tracking-wide"
                    >
                        Enroll For Mentorship
                    </Link>
                    <Link
                        href="#"
                        className="px-8 py-4 border-2 border-gold text-black font-bold rounded hover:bg-gold hover:text-black transition-colors text-lg uppercase tracking-wide"
                    >
                        Recommended Broker
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
