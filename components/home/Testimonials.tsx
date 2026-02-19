
import Image from 'next/image';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Jane T.",
            content: "With Mr P fx academy, its not about the capital, its about the strategy, thank you Mr P.",
            avatar: (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                    {/* Mocking the logo/icon style */}
                    <span className="uppercase">MP</span>
                </div>
            ),
        },
        {
            name: "Curtis R.",
            content: "Mr Perfect\nThank yu so much for the educational video\nI hope to be able to trade like yu...\nKeep up the good work...\nHope to be in your next VIP group",
            avatar: (
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold">
                    C
                </div>
            ),
        },
        {
            name: "Anont D.",
            content: "The say practice makes perfect ,\nBut i think watching your educative videos makes me perfect ,\nI really appreciate you sir @mr possible",
            avatar: (
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for real photo */}
                    <span className="text-xs text-gray-400">Photo</span>
                </div>
            ),
        },
    ];

    return (
        <section className="bg-[#0b0f19] py-16 lg:py-24 relative overflow-hidden">
            {/* Background decoration - Wave lines pattern (Simplified CSS representation) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0b0f19]/0 to-transparent"></div>
                {/* You might use an SVG background image here for the exact wave lines if available,
              for now using a subtle gradient and suggesting the dark theme */}
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h3 className="text-green-500 font-medium tracking-widest text-xs uppercase mb-3">TESTIMONIALS</h3>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">What Our Student Says</h2>
                    <div className="w-24 h-1 bg-blue-900/50 mx-auto relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rotate-45 border-2 border-[#0b0f19]"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-xl flex flex-col h-full">
                            <div className="mb-6">
                                {testimonial.avatar}
                            </div>
                            <div className="flex-grow">
                                {testimonial.content.split('\n').map((line, i) => (
                                    <p key={i} className="text-gray-600 text-sm leading-relaxed mb-1">
                                        {line}
                                    </p>
                                ))}
                            </div>
                            <div className="mt-8 pt-4 border-t border-gray-100">
                                <p className="font-bold text-black">{testimonial.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
