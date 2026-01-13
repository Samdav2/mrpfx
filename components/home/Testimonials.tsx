const testimonials = [
    {
        name: 'John Doe',
        role: 'Student',
        content: 'The mentorship program completely changed my trading. I am now consistently profitable.',
    },
    {
        name: 'Jane Smith',
        role: 'VIP Member',
        content: 'The signals are incredibly accurate. I have grown my account by 50% in just two months.',
    },
    {
        name: 'Mike Johnson',
        role: 'Trader',
        content: 'Best investment I have made for my trading career. Highly recommended!',
    },
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Students Say</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Hear from our community of successful traders.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
                                <div>
                                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                                    <p className="text-yellow-500 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 italic">"{testimonial.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
