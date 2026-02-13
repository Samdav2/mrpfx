'use client';

import { useState } from 'react';
import { marketingService } from '@/lib/marketing';

const NewsletterSection = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const response = await marketingService.subscribe({
                email,
                name: firstName
            });

            if (response.success) {
                setStatus('success');
                setMessage(response.message || 'Subscription successful!');
                setFirstName('');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(response.message || 'Subscription failed. Please try again.');
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.response?.data?.message || 'An error occurred. Please try again later.');
        }
    };

    return (
        <div
            className="w-full relative overflow-hidden mx-auto"
            style={{
                backgroundImage: "url('/assets/support/newsletter-bg.png')",
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundColor: '#4a4ab8',
                borderRadius: '20px',
                maxWidth: '1140px',
                margin: '40px auto',
                padding: '0 20px'
            }}
        >
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center py-8 md:py-0">
                <h2
                    className="text-white font-bold text-center mb-6"
                    style={{
                        fontSize: 'clamp(22px, 5vw, 30px)',
                        lineHeight: '1.2em',
                        fontFamily: '"DM Sans", sans-serif',
                        letterSpacing: '0px',
                        padding: '30px 0 0 0',
                        color: '#ffffff'
                    }}
                >
                    Subscribe to our newsletter for massive market updates and trading signals
                </h2>

                {status === 'success' ? (
                    <div className="py-10 text-center">
                        <div className="text-white text-xl font-bold mb-2">🎉 Thank you for subscribing!</div>
                        <div className="text-white/80">{message}</div>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-4 text-white underline text-sm"
                        >
                            Subscribe another email
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Desktop Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="hidden md:flex flex-row items-center justify-center gap-2.5"
                            style={{
                                width: '89.16%',
                                maxWidth: '89.16%',
                                padding: '20px 0 50px 0'
                            }}
                        >
                            <div style={{ width: '30%', paddingLeft: '5px', paddingRight: '5px' }}>
                                <input
                                    type="text"
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    disabled={status === 'loading'}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid white',
                                        borderRadius: '4px',
                                        padding: '12px 16px',
                                        color: 'white',
                                        fontSize: '15px',
                                        fontFamily: '"DM Sans", sans-serif',
                                        width: '100%',
                                        outline: 'none',
                                        minHeight: '47px',
                                        opacity: status === 'loading' ? 0.7 : 1
                                    }}
                                    className="placeholder:text-white/80"
                                />
                            </div>
                            <div style={{ width: '40%', paddingLeft: '5px', paddingRight: '5px' }}>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={status === 'loading'}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid white',
                                        borderRadius: '4px',
                                        padding: '12px 16px',
                                        color: 'white',
                                        fontSize: '15px',
                                        fontFamily: '"DM Sans", sans-serif',
                                        width: '100%',
                                        outline: 'none',
                                        minHeight: '47px',
                                        opacity: status === 'loading' ? 0.7 : 1
                                    }}
                                    className="placeholder:text-white/80"
                                />
                            </div>
                            <div style={{ width: '25%', paddingLeft: '5px', paddingRight: '5px' }}>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    style={{
                                        backgroundColor: '#000000',
                                        color: 'white',
                                        fontWeight: '700',
                                        padding: '15px 30px',
                                        borderRadius: '10px',
                                        fontSize: '16px',
                                        fontFamily: '"DM Sans", sans-serif',
                                        border: 'none',
                                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                        whiteSpace: 'nowrap',
                                        width: '100%',
                                        minHeight: '47px',
                                        opacity: status === 'loading' ? 0.7 : 1
                                    }}
                                >
                                    {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
                                </button>
                            </div>
                        </form>

                        {/* Mobile Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex md:hidden flex-col items-center justify-center gap-4 w-full px-4"
                            style={{
                                padding: '20px 0 40px 0'
                            }}
                        >
                            <input
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                disabled={status === 'loading'}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: '1px solid white',
                                    borderRadius: '8px',
                                    padding: '14px 16px',
                                    color: 'white',
                                    fontSize: '15px',
                                    fontFamily: '"DM Sans", sans-serif',
                                    width: '100%',
                                    outline: 'none',
                                    minHeight: '50px',
                                    opacity: status === 'loading' ? 0.7 : 1
                                }}
                                className="placeholder:text-white/80"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={status === 'loading'}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: '1px solid white',
                                    borderRadius: '8px',
                                    padding: '14px 16px',
                                    color: 'white',
                                    fontSize: '15px',
                                    fontFamily: '"DM Sans", sans-serif',
                                    width: '100%',
                                    outline: 'none',
                                    minHeight: '50px',
                                    opacity: status === 'loading' ? 0.7 : 1
                                }}
                                className="placeholder:text-white/80"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                style={{
                                    backgroundColor: '#000000',
                                    color: 'white',
                                    fontWeight: '700',
                                    padding: '15px 30px',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    fontFamily: '"DM Sans", sans-serif',
                                    border: 'none',
                                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                    whiteSpace: 'nowrap',
                                    width: 'auto',
                                    minHeight: '50px',
                                    opacity: status === 'loading' ? 0.7 : 1
                                }}
                            >
                                {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
                            </button>
                        </form>

                        {status === 'error' && (
                            <div className="text-red-300 text-sm mb-4 px-4 text-center bg-red-900/20 py-2 rounded">
                                {message}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default NewsletterSection;
