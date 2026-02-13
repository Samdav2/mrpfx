'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    ShoppingCart,
    CreditCard,
    MapPin,
    Loader2,
    CheckCircle2,
    ArrowLeft,
    ShoppingBag,
    AlertCircle,
    ExternalLink
} from 'lucide-react';
import { cartService } from '@/lib/cart';
import { checkoutService } from '@/lib/checkout';
import { cryptoPaymentsService } from '@/lib/crypto-payments';
import { productsService } from '@/lib/products';
import CryptoPaymentModal from '@/components/checkout/CryptoPaymentModal';
import type { WCCart, WCAddress, CryptoPaymentRead } from '@/lib/types';

export const dynamic = 'force-dynamic';

function CheckoutPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [cart, setCart] = useState<WCCart | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('crypto');

    const [billing, setBilling] = useState<WCAddress>({
        first_name: '',
        last_name: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: 'NG',
        email: '',
        phone: '',
    });

    const [customerNote, setCustomerNote] = useState('');

    const [showCryptoModal, setShowCryptoModal] = useState(false);
    const [pendingOrderId, setPendingOrderId] = useState<string>('');
    const [showExternalModal, setShowExternalModal] = useState(false);
    const [externalRedirectUrl, setExternalRedirectUrl] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await cartService.getCart();
                setCart(data);

                // Auto-select method from URL if present
                const method = searchParams.get('method');
                if (method && ['whop', 'seller', 'crypto', 'bank'].includes(method)) {
                    setPaymentMethod(method);
                }
            } catch (err) {
                console.error('Failed to load cart', err);
            } finally {
                setLoading(false);
            }
        })();
    }, [searchParams]);

    const handleBillingChange = (field: keyof WCAddress, value: string) => {
        setBilling(prev => ({ ...prev, [field]: value }));
    };

    const handlePlaceOrder = async () => {
        if (!billing.first_name || !billing.last_name || !billing.email) {
            setError('Please fill in all required fields.');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            const request = checkoutService.buildCheckoutRequest(
                billing,
                paymentMethod,
                {
                    customerNote: customerNote || undefined,
                    paymentMethodTitle: paymentMethod === 'whop' ? 'Whop Checkout' :
                        paymentMethod === 'seller' ? 'Seller Payment' :
                            paymentMethod === 'crypto' ? 'Pay with Crypto' : 'Bank Transfer'
                }
            );
            const response = await checkoutService.checkout(request);

            console.log('Checkout response:', response);
            console.log('Payment method:', paymentMethod);

            // Handle crypto payment method - show modal for user to select currency
            if (paymentMethod === 'crypto') {
                setPendingOrderId(response.order_id.toString());
                setShowCryptoModal(true);
                setSubmitting(false); // keep on page to show modal
                return;
            }

            // Determine external redirect URL for non-crypto methods. Instead of
            // redirecting immediately, show a confirmation modal so user can opt-in
            // to be redirected (useful for Whop / Seller / Bank external flows).
            let chosenExternalUrl: string | null = null;
            if (paymentMethod === 'whop') {
                chosenExternalUrl = response.payment_url || response.redirect_url || null;
                if (!chosenExternalUrl && cart) {
                    try {
                        const firstProduct = cart.items[0];
                        if (firstProduct) {
                            const fullProduct = await productsService.getProductFull(firstProduct.product_id);
                            if (fullProduct.whop_payment_link) {
                                chosenExternalUrl = fullProduct.whop_payment_link;
                                console.log('Using whop_payment_link from product:', chosenExternalUrl);
                            }
                        }
                    } catch (err) {
                        console.error('Failed to fetch whop payment link:', err);
                    }
                }
            }

            if (paymentMethod === 'seller') {
                chosenExternalUrl = response.redirect_url || response.payment_url || null;
                if (!chosenExternalUrl && cart) {
                    try {
                        const firstProduct = cart.items[0];
                        if (firstProduct) {
                            const fullProduct = await productsService.getProductFull(firstProduct.product_id);
                            if (fullProduct.seller_payment_link) {
                                chosenExternalUrl = fullProduct.seller_payment_link;
                                console.log('Using seller_payment_link from product:', chosenExternalUrl);
                            }
                        }
                    } catch (err) {
                        console.error('Failed to fetch seller payment link:', err);
                    }
                }
            }

            if (paymentMethod === 'bank') {
                chosenExternalUrl = response.redirect_url || response.payment_url || null;
            }

            // Generic fallback: if backend returned a redirect/payment url and
            // we haven't yet handled it, use it as an external URL to prompt the user.
            if (!chosenExternalUrl) {
                chosenExternalUrl = response.redirect_url || response.payment_url || null;
            }

            if (chosenExternalUrl) {
                // Show the external confirmation modal. User will click to proceed
                // which will perform the redirect. Keep order id so Cancel can go
                // to the order details page.
                setPendingOrderId(response.order_id?.toString() || '');
                setExternalRedirectUrl(chosenExternalUrl);
                setShowExternalModal(true);
                setSubmitting(false);
                return;
            }

            // If no redirect available, go to order details page
            console.log('No redirect URLs found, going to orders page');
            router.push(`/my-orders/${response.order_id}`);
        } catch (err: any) {
            const detail = err?.response?.data?.detail;
            let errorMsg = 'An error occurred during checkout. Please try again.';
            if (typeof detail === 'string') {
                errorMsg = detail;
            } else if (Array.isArray(detail)) {
                errorMsg = detail.map((e: any) => e.msg || String(e)).join(', ');
            }
            setError(errorMsg);
            setSubmitting(false);
        }
    };

    const formatPrice = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        );
    }

    const isEmpty = !cart || cart.items.length === 0;

    if (isEmpty) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center px-4">
                <div className="text-center">
                    <ShoppingBag className="w-14 h-14 text-gray-600 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 text-sm mb-6">Add items to your cart before checkout.</p>
                    <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold">
                        Browse Shop
                    </Link>
                </div>
            </div>
        );
    }

    const billingFields: { key: keyof WCAddress; label: string; type?: string; required?: boolean; half?: boolean }[] = [
        { key: 'first_name', label: 'First Name', required: true, half: true },
        { key: 'last_name', label: 'Last Name', required: true, half: true },
        { key: 'email', label: 'Email', type: 'email', required: true },
        { key: 'phone', label: 'Phone', type: 'tel' },
        { key: 'address_1', label: 'Street Address', required: true },
        { key: 'address_2', label: 'Apartment, suite, etc.' },
        { key: 'city', label: 'City', required: true, half: true },
        { key: 'state', label: 'State', required: true, half: true },
        { key: 'postcode', label: 'Postal Code', half: true },
    ];

    const countries = [
        { code: 'NG', name: 'Nigeria' },
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'CA', name: 'Canada' },
        { code: 'GH', name: 'Ghana' },
        { code: 'KE', name: 'Kenya' },
        { code: 'ZA', name: 'South Africa' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'AU', name: 'Australia' },
        { code: 'IN', name: 'India' },
        { code: 'AE', name: 'United Arab Emirates' },
        { code: 'SG', name: 'Singapore' },
        { code: 'BR', name: 'Brazil' },
        { code: 'JP', name: 'Japan' },
        { code: 'CN', name: 'China' },
        { code: 'EG', name: 'Egypt' },
        { code: 'TZ', name: 'Tanzania' },
        { code: 'UG', name: 'Uganda' },
        { code: 'CM', name: 'Cameroon' },
    ];

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-600/[0.03] blur-[120px]" />
            </div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Cart
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Payment</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Billing & Payment */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Billing Details */}
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                            <h3 className="text-white font-semibold text-sm flex items-center gap-2 mb-5">
                                <MapPin className="w-4 h-4 text-purple-400" /> Billing Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {billingFields.map(field => (
                                    <div key={field.key} className={field.half ? '' : 'sm:col-span-2'}>
                                        <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                                            {field.label} {field.required && <span className="text-red-400">*</span>}
                                        </label>
                                        <input
                                            type={field.type || 'text'}
                                            value={(billing[field.key] as string) || ''}
                                            onChange={e => handleBillingChange(field.key, e.target.value)}
                                            className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/30 transition-colors"
                                        />
                                    </div>
                                ))}

                                {/* Country Dropdown */}
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                                        Country <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={billing.country || 'NG'}
                                        onChange={e => handleBillingChange('country', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/30 transition-colors appearance-none"
                                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236b7280\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                                    >
                                        {countries.map(c => (
                                            <option key={c.code} value={c.code} className="bg-[#111827] text-white">
                                                {c.name} ({c.code})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Customer Note */}
                            <div className="mt-4">
                                <label className="block text-xs text-gray-500 mb-1.5 font-medium">Order Notes (optional)</label>
                                <textarea
                                    rows={3}
                                    value={customerNote}
                                    onChange={e => setCustomerNote(e.target.value)}
                                    placeholder="Notes about your order..."
                                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/30 transition-colors resize-none"
                                />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                            <h3 className="text-white font-semibold text-sm flex items-center gap-2 mb-5">
                                <CreditCard className="w-4 h-4 text-amber-400" /> Payment Method
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { id: 'whop', label: 'Whop Checkout', icon: ExternalLink, badge: 'Direct', badgeColor: 'bg-orange-500/20 text-orange-400' },
                                    { id: 'seller', label: 'Seller Payment', icon: ExternalLink, badge: 'External', badgeColor: 'bg-cyan-500/20 text-cyan-400' },
                                    { id: 'crypto', label: 'Pay with Crypto', icon: CreditCard, badge: 'NOWPayments', badgeColor: 'bg-purple-500/20 text-purple-400' },
                                    { id: 'bank', label: 'Bank Transfer', icon: CreditCard, badge: 'Nigerians Only', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
                                ].map(method => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${paymentMethod === method.id
                                            ? 'bg-purple-500/10 border-purple-500/30'
                                            : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === method.id ? 'border-purple-400 bg-purple-500' : 'border-gray-600'
                                            }`}>
                                            {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <method.icon className={`w-4 h-4 ${paymentMethod === method.id ? 'text-white' : 'text-gray-500'}`} />
                                        <span className="text-white text-sm font-medium">{method.label}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${method.badgeColor}`}>
                                            {method.badge}
                                        </span>
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div>
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 sticky top-8">
                            <h3 className="text-white font-semibold text-sm flex items-center gap-2 mb-5">
                                <ShoppingCart className="w-4 h-4 text-emerald-400" /> Order Summary
                            </h3>

                            {/* Items */}
                            <div className="space-y-3 mb-4">
                                {cart!.items.map(item => (
                                    <div key={item.product_id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <span className="text-gray-300 truncate">{item.product_name}</span>
                                            <span className="text-gray-600 shrink-0">×{item.quantity}</span>
                                        </div>
                                        <span className="text-white font-medium ml-3">{formatPrice(item.line_total)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/[0.06] pt-3 space-y-2">
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white">{formatPrice(cart!.subtotal)}</span>
                                </div>
                                {cart!.discount_total > 0 && (
                                    <div className="flex justify-between text-sm text-emerald-400">
                                        <span>Discount</span>
                                        <span>-{formatPrice(cart!.discount_total)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm border-t border-white/[0.06] pt-2">
                                    <span className="text-white font-semibold">Total</span>
                                    <span className="text-xl font-bold text-white">{formatPrice(cart!.total)}</span>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                    <p className="text-red-400 text-xs">{error}</p>
                                </div>
                            )}

                            {/* Place Order */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={submitting}
                                className="w-full flex items-center justify-center gap-2 mt-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
                            >
                                {submitting ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                                ) : (
                                    <><CheckCircle2 className="w-4 h-4" /> Place Order</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Crypto Payment Modal */}
            {showCryptoModal && (
                <CryptoPaymentModal
                    orderAmount={cart!.total}
                    orderId={pendingOrderId}
                    onClose={() => setShowCryptoModal(false)}
                    onSuccess={() => {
                        setShowCryptoModal(false);
                        router.push('/my-orders');
                    }}
                />
            )}

            {/* External Payment Confirmation Modal (Whop / Seller / Bank) */}
            {showExternalModal && externalRedirectUrl && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0a0e17]/80 backdrop-blur-md" onClick={() => setShowExternalModal(false)} />

                    <div className="relative w-full max-w-md bg-[#111827] border border-white/[0.08] rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-white mb-3">Continue to external payment</h3>
                        <p className="text-sm text-gray-300 mb-4">Your order has been created. Click the button below to continue to the external payment page.</p>

                        <div className="mb-4 text-sm">
                            <div className="text-xs text-gray-400">Payment link</div>
                            <div className="mt-1 break-words text-sm text-white">{externalRedirectUrl}</div>
                        </div>

                        <div className="flex items-center gap-3 justify-end">
                            <button
                                onClick={() => {
                                    // If user cancels, go to their order details page
                                    setShowExternalModal(false);
                                    if (pendingOrderId) router.push(`/my-orders/${pendingOrderId}`);
                                }}
                                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-gray-300 hover:bg-white/5"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Proceed to external payment (same-tab redirect)
                                    window.location.href = externalRedirectUrl!;
                                }}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a0e17] flex items-center justify-center"><Loader2 className="w-8 h-8 text-purple-400 animate-spin" /></div>}>
            <CheckoutPageContent />
        </Suspense>
    );
}
