'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('crypto');

    return (
        <div className="min-h-screen bg-white font-[family-name:var(--font-dm-sans)]">
            {/* Hero Section */}
            <section className="relative bg-[#0066cc] pt-20 pb-32 overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide uppercase">
                        Checkout
                    </h1>
                    <div className="w-16 h-1 bg-[#2ecc71] mx-auto"></div>
                </div>

                {/* Wave Pattern */}
                <div className="absolute bottom-0 left-0 w-full leading-none">
                    <Image
                        src="/assets/images/Waves.png"
                        alt="Wave Pattern"
                        width={1920}
                        height={200}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                {/* Notification Bar */}
                <div className="bg-[#d4edda] border-t-4 border-[#28a745] p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-[#155724]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#28a745]">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">
                            &quot;VIP Mentorship / Tutorials&quot; Has Been Added To Your Cart.
                        </span>
                    </div>
                    <button className="bg-[#e2e6ea] hover:bg-[#dae0e5] text-black px-6 py-2 rounded text-sm font-medium transition-colors border border-gray-300">
                        View Cart
                    </button>
                </div>

                {/* Your Order Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Order</h2>

                    <div className="border border-gray-200 rounded-md overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-[#0066cc] text-white grid grid-cols-12 px-6 py-3 text-sm font-medium">
                            <div className="col-span-8 md:col-span-6">Product</div>
                            <div className="col-span-2 md:col-span-3 text-center">Quantity</div>
                            <div className="col-span-2 md:col-span-3 text-right">Price</div>
                        </div>

                        {/* Product Row */}
                        <div className="bg-white grid grid-cols-12 px-6 py-4 items-center border-b border-gray-100">
                            <div className="col-span-8 md:col-span-6 flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                    <Image
                                        src="/assets/vip_resources/hero-image.png"
                                        alt="VIP Mentorship"
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-gray-700 font-medium text-sm md:text-base">
                                    VIP Mentorship / Tutorials
                                </span>
                            </div>
                            <div className="col-span-2 md:col-span-3 text-center text-gray-600">
                                1
                            </div>
                            <div className="col-span-2 md:col-span-3 text-right text-gray-800 font-medium">
                                $499.99
                            </div>
                        </div>

                        {/* Footer Row */}
                        <div className="bg-[#0066cc] text-white px-6 py-3 flex items-center justify-between">
                            <Link href="/shop" className="text-sm hover:underline flex items-center gap-1">
                                ← Continue Shopping
                            </Link>

                            <div className="bg-white text-gray-800 rounded px-6 py-3 min-w-[250px]">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium">Subtotal</span>
                                    <span className="font-bold">$499.99</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Total</span>
                                    <span className="font-bold">$499.99 USD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login Prompt */}
                <div className="bg-[#2ecc71] p-4 rounded-sm mb-10 flex items-center gap-2 text-sm md:text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-900">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">Returning Customer? <Link href="/login" className="text-white font-bold hover:underline ml-1">Click Here To Login</Link></span>
                </div>

                {/* Billing & Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Billing Details */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Billing Details</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-700">
                                    First name <span className="text-red-500">*</span>
                                </label>
                                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-700">
                                    Last name <span className="text-red-500">*</span>
                                </label>
                                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="space-y-1 mb-4">
                            <label className="text-sm font-bold text-gray-700">
                                Email address <span className="text-red-500">*</span>
                            </label>
                            <input type="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Additional Information</h3>
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">
                                Order notes (optional)
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Notes about your order, e.g. special notes for delivery."
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 resize-none"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-[#e2e2e2] p-8 rounded-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Methods</h3>

                    <div className="space-y-4">
                        {/* Crypto Option */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <input
                                    type="radio"
                                    id="crypto"
                                    name="payment"
                                    checked={paymentMethod === 'crypto'}
                                    onChange={() => setPaymentMethod('crypto')}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="crypto" className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
                                    Pay with Crypto
                                    <span className="bg-[#111] text-white text-xs px-2 py-1 rounded font-bold tracking-wider">NOWPayments</span>
                                </label>
                            </div>

                            {paymentMethod === 'crypto' && (
                                <div className="bg-[#2b87f9] text-white p-4 rounded-sm text-sm ml-7 relative">
                                    <div className="absolute top-[-6px] left-4 w-3 h-3 bg-[#2b87f9] transform rotate-45"></div>
                                    Pay with Crypto
                                </div>
                            )}
                        </div>

                        {/* Bank Transfer Option */}
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                id="bank"
                                name="payment"
                                checked={paymentMethod === 'bank'}
                                onChange={() => setPaymentMethod('bank')}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="bank" className="text-gray-700 font-medium cursor-pointer">
                                Bank Transfer (For Nigerians only)
                            </label>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end border-t border-gray-300 pt-6">
                        <button className="bg-[#2b87f9] hover:bg-[#1a73e8] text-white font-medium py-3 px-8 rounded text-sm transition-colors">
                            Place Order
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;
