"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import NewsletterSection from '@/components/shared/NewsletterSection';

const SupportPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add form submission logic here
    };

    return (
        <div className="bg-white text-black font-sans">
            <div className="flex flex-col md:flex-row min-h-[701px]">
                {/* Left Column - Welcome Section */}
                <div
                    className="w-full md:w-[37.131%] relative flex flex-col justify-center p-[50px] rounded-br-[20px] md:rounded-br-[20px] rounded-bl-[20px] md:rounded-bl-none overflow-hidden"
                    style={{
                        backgroundImage: "url('/assets/support/5545.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Gradient Overlay */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            background: 'linear-gradient(294deg, #02010100 0%, #000000 100%)'
                        }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 text-white">
                        <h2 className="text-[40px] leading-[40px] font-heading font-light mb-5 tracking-[-0.8px]">
                            Welcome to<br />
                            Mr P FX<br />
                            Support
                        </h2>
                        <div className="text-[16px] font-light leading-relaxed font-heading">
                            <p>
                                We&apos;re here to help you with any questions or issues you may have.
                                Please fill out the form, and our team will get back to you as soon as possible.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Contact Form */}
                <div className="w-full md:w-[62.869%] flex items-start py-[40px] px-[40px] md:pt-[5%] md:px-[10%]">
                    <div className="w-full max-w-[600px]">
                        <form onSubmit={handleSubmit} className="space-y-5 font-heading">
                            <div className="flex flex-col">
                                <label htmlFor="fullName" className="mb-2 font-semibold text-sm text-gray-900">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    style={{
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        maxWidth: '360px',
                                        backgroundColor: 'white',
                                        outline: 'none'
                                    }}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-2 font-semibold text-sm text-gray-900">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        maxWidth: '360px',
                                        backgroundColor: 'white',
                                        outline: 'none'
                                    }}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="message" className="mb-2 font-semibold text-sm text-gray-900">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        width: '100%',
                                        backgroundColor: 'white',
                                        outline: 'none',
                                        resize: 'none'
                                    }}
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#3F3F9F',
                                        color: 'white',
                                        fontWeight: '600',
                                        padding: '10px 24px',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <NewsletterSection />
        </div>
    );
};

export default SupportPage;
