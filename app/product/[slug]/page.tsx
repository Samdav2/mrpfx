'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { productsService } from '@/lib/products';
import type { WCProductFullRead, WCProductRead } from '@/lib/types';
import { Loader2, Package } from 'lucide-react';
import Link from 'next/link';
import SingleProductPage from '@/components/product/SingleProductPage';

export default function ProductPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [product, setProduct] = useState<WCProductFullRead | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<WCProductRead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        if (!slug) return;

        setLoading(true);
        setError(false);
        try {
            // Sanitize slug
            const cleanSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

            let found: any = await productsService.getProductBySlug(cleanSlug);

            if (found) {
                // If it's a variable product, we need the full payload for the selector
                if (found.type === 'variable') {
                    found = await productsService.getProductFull(found.id);
                }
                setProduct(found);

                // Fetch related products (first few from the listing)
                try {
                    const all = await productsService.getProducts(0, 5);
                    const related = all.filter(p => p.id !== found.id).slice(0, 4);
                    setRelatedProducts(related);
                } catch (relErr) {
                    console.error('Failed to load related products:', relErr);
                }
            } else {
                setError(true);
            }
        } catch (err) {
            console.error('Product Page Error:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center text-center px-4">
                <div>
                    <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h2 className="text-xl font-bold text-white">Product not found</h2>
                    <p className="text-gray-400 text-sm mt-2">The product you are looking for might have been moved or deleted.</p>
                    <Link href="/shop" className="text-purple-400 hover:text-purple-300 text-sm mt-5 inline-block font-medium">
                        ← Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return <SingleProductPage product={product} relatedProducts={relatedProducts} />;
}
