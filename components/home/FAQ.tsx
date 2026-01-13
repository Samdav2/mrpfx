'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: 'Is this suitable for beginners?',
        answer: 'Yes, our mentorship program is designed to take you from a complete beginner to an advanced trader.',
    },
    {
        question: 'How do I access the VIP signals?',
        answer: 'You can join our VIP signals group by subscribing to one of our plans.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept credit cards, PayPal, and cryptocurrency.',
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-800 rounded-lg bg-gray-900 overflow-hidden">
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-lg font-medium text-white">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-yellow-500" />
                                ) : (
                                    <ChevronDown className="text-gray-500" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-4 text-gray-400">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
