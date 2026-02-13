'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NewsletterSection from '@/components/shared/NewsletterSection';
import { productsService } from '@/lib/products';
import type { WCProductRead } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const AllVIPResourcesPage = () => {
    const [products, setProducts] = useState<WCProductRead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Fetch all paid products (min_price: 0.01)
                const data = await productsService.getProducts(0, 50, 'publish', undefined, undefined, undefined, 0.01);
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch VIP products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="font-[family-name:var(--font-dm-sans)] bg-[#f5f5f5] min-h-screen">
            {/* Hero Section - Light Gray Background */}
            <section className="bg-[#e8e8e8] py-16 md:py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Left Content */}
                        <div className="w-full md:w-1/2 space-y-5">
                            {/* "VIP" Badge - Red/Salmon color */}
                            <div
                                className="inline-block rounded-[10px] px-[18px] py-[12px]"
                                style={{ backgroundColor: 'rgba(255, 99, 99, 0.3)' }}
                            >
                                <span
                                    className="font-[family-name:var(--font-nova-flat)] font-semibold leading-[1.1em]"
                                    style={{ color: '#E53935', fontSize: '32px' }}
                                >
                                    VIP
                                </span>
                            </div>

                            {/* Title */}
                            <h1
                                className="font-[family-name:var(--font-dm-sans)] leading-[1.1em] text-black"
                                style={{ fontSize: '51px', fontWeight: 900, letterSpacing: '0px' }}
                            >
                                All VIP Resources
                            </h1>

                            {/* Description */}
                            <p
                                className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-black"
                                style={{ fontSize: '17px', maxWidth: '80%' }}
                            >
                                Want to take your trading to the next level with VIP trading materials? Gain access to VIP tools to unlock new trading levels.
                            </p>
                        </div>

                        {/* Right Content - Hero Image with Button */}
                        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
                            <div className="relative">
                                <Image
                                    src="/assets/vip_resources/hero-image.png"
                                    alt="AI Stock Trading Bots"
                                    width={600}
                                    height={450}
                                    className="w-full h-auto object-contain max-w-[600px]"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid Section */}
            <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <Loader2 className="w-12 h-12 text-[#1a73e8] animate-spin" />
                            <p className="text-gray-500 font-medium italic">Loading premium resources...</p>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full group"
                                >
                                    {/* Product Image */}
                                    <Link href={`/product/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        {product.featured_image ? (
                                            <img
                                                src={product.featured_image.url}
                                                alt={product.featured_image.alt_text || product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : product.gallery_images && product.gallery_images.length > 0 ? (
                                            <img
                                                src={product.gallery_images[0].url}
                                                alt={product.gallery_images[0].alt_text || product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                                <span className="text-gray-400 text-sm">No Image</span>
                                            </div>
                                        )}
                                        {/* Price Badge Overlay */}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                                            <span className="text-[#1a73e8] font-bold text-sm">
                                                ${product.price}
                                            </span>
                                        </div>
                                    </Link>

                                    {/* Product Info */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#1a73e8] transition-colors">
                                            {product.name}
                                        </h3>

                                        <div className="text-sm text-gray-500 mb-4 line-clamp-3 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: product.short_description || '' }}
                                        />

                                        <div className="mt-auto">
                                            <Link
                                                href={`/product/${product.slug}`}
                                                className="inline-block w-full text-center text-white text-sm font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
                                                style={{ backgroundColor: '#1a73e8' }}
                                            >
                                                Learn more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg italic">No premium resources found.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-white py-8 md:py-12">
                <NewsletterSection />
            </section>
        </div>
    );
};

export default AllVIPResourcesPage;
