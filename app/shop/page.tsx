'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Search,
    ShoppingCart,
    Star,
    Tag,
    Loader2,
    Package,
    Check
} from 'lucide-react';
import { productsService } from '@/lib/products';
import { cartService } from '@/lib/cart';
import type { WCProductRead } from '@/lib/types';

export default function ShopPage() {
    const [products, setProducts] = useState<WCProductRead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // 1. New State for the Cart Count
    const [cartCount, setCartCount] = useState(0);

    const [addingToCart, setAddingToCart] = useState<number | null>(null);
    const [addedToCart, setAddedToCart] = useState<Set<number>>(new Set());

    useEffect(() => {
        (async () => {
            try {
                // Load products
                const productData = await productsService.getProducts(0, 50);
                setProducts(productData);

                // 2. Load initial cart count (assuming cartService has a method to get items)
                // If cartService.getCart() isn't available, you might need to adapt this line
                const cartData = await cartService.getCart();
                if (cartData && cartData.items) {
                     // Sum up the quantity of all items
                    const count = cartData.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
                    setCartCount(count);
                }
            } catch (err) {
                console.error('Failed to load data', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleAddToCart = async (productId: number) => {
        setAddingToCart(productId);
        try {
            await cartService.addToCart(productId, 1);

            // 3. Increment the cart count locally for instant feedback
            setCartCount(prev => prev + 1);

            setAddedToCart(prev => new Set([...prev, productId]));
            setTimeout(() => setAddedToCart(prev => {
                const next = new Set(prev);
                next.delete(productId);
                return next;
            }), 2000);
        } catch (err) {
            console.error('Failed to add to cart', err);
        } finally {
            setAddingToCart(null);
        }
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const formatPrice = (price?: string | null) => {
        if (!price) return 'Free';
        const num = parseFloat(price);
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600/[0.03] blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/[0.03] blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Package className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">WooCommerce</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Shop</h1>
                        <p className="text-gray-400 mt-2">Browse our products</p>
                    </div>

                    {/* 4. The New Cart Icon with Badge */}
                    <Link
                        href="/cart"
                        className="relative group p-3 bg-[#111827] border border-white/[0.1] rounded-xl hover:bg-gray-800 transition-all hover:border-purple-500/50"
                    >
                        <ShoppingCart className="w-6 h-6 text-gray-300 group-hover:text-purple-400 transition-colors" />

                        {/* Only show badge if count > 0 */}
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-[#0a0e17] animate-in zoom-in duration-300">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[#111827]/80 border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/30 transition-colors"
                        />
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    </div>
                )}

                {/* Empty */}
                {!loading && filtered.length === 0 && (
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-12 text-center">
                        <Package className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                        <p className="text-white font-semibold">No products found</p>
                        <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && filtered.length > 0 && (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filtered.map(product => {
                            const hasDiscount = product.sale_price && product.regular_price &&
                                parseFloat(product.sale_price) < parseFloat(product.regular_price);
                            const imageUrl = product.featured_image?.url ||
                                (product.images && product.images.length > 0 ? product.images[0].src : null);

                            return (
                                <div
                                    key={product.id}
                                    className="group bg-[#111827]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 flex flex-col"
                                >
                                    {/* Image */}
                                    <Link href={`/product/${product.slug}`} className="relative aspect-square bg-gray-900/50 overflow-hidden">
                                        {imageUrl ? (
                                            <img src={imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Package className="w-12 h-12 text-gray-700" />
                                            </div>
                                        )}
                                        {hasDiscount && (
                                            <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                Sale
                                            </span>
                                        )}
                                        {product.stock_status === 'outofstock' && (
                                            <span className="absolute top-3 right-3 bg-gray-800/90 text-gray-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                Sold Out
                                            </span>
                                        )}
                                    </Link>

                                    {/* Content */}
                                    <div className="p-4 flex flex-col flex-1">
                                        <Link href={`/product/${product.slug}`} className="text-white font-semibold text-sm hover:text-purple-400 transition-colors line-clamp-2 mb-2">
                                            {product.name}
                                        </Link>

                                        {/* Rating */}
                                        {product.average_rating && parseFloat(product.average_rating) > 0 && (
                                            <div className="flex items-center gap-1 mb-2">
                                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                <span className="text-xs text-gray-400">{product.average_rating}</span>
                                                {product.rating_count ? (
                                                    <span className="text-xs text-gray-600">({product.rating_count})</span>
                                                ) : null}
                                            </div>
                                        )}

                                        {/* Price */}
                                        <div className="flex items-center gap-2 mt-auto mb-3">
                                            {hasDiscount && (
                                                <span className="text-xs text-gray-500 line-through">
                                                    {formatPrice(product.regular_price)}
                                                </span>
                                            )}
                                            <span className="text-lg font-bold text-white flex items-center gap-1">
                                                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                                                {formatPrice(product.price)}
                                            </span>
                                        </div>

                                        {/* Add to Cart */}
                                        <button
                                            onClick={() => handleAddToCart(product.id)}
                                            disabled={addingToCart === product.id || product.stock_status === 'outofstock'}
                                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            {addingToCart === product.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : addedToCart.has(product.id) ? (
                                                <><Check className="w-4 h-4" /> Added</>
                                            ) : (
                                                <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
