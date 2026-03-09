'use client';

import { useRouter } from 'next/navigation';
import { Star, Download, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { cartService } from '@/lib/cart';

interface BookCardProps {
    id: number;
    title: string;
    subtitle?: string;
    description: string;
    price?: string;
    isFree?: boolean;
    rating?: number;
    buyUrl?: string;
    downloadUrl?: string;
    imageSrc?: string;
}

const BookCard = ({
    id,
    title,
    subtitle = "The Complete Guide",
    description,
    price = "$39",
    isFree = false,
    rating = 5,
    buyUrl = "#",
    downloadUrl = "#",
    imageSrc
}: BookCardProps) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        try {
            await cartService.addToCart(id, 1);
            router.push('/checkout');
        } catch (error) {
            console.error("Failed to add to cart:", error);
            const fallbackUrl = isFree ? downloadUrl : buyUrl;
            if (fallbackUrl && fallbackUrl !== "#") {
                window.location.href = fallbackUrl;
            }
        }
    };
    return (
        <div className="bg-[#1e293b]/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 flex flex-col h-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] group hover:border-white/20 transition-all duration-500 max-w-[400px] mx-auto w-full">
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden bg-[#0f172a]">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black/60 flex items-center justify-center p-8">
                        <div className="text-center">
                            <h3 className="text-white text-2xl font-black uppercase tracking-tighter leading-none mb-2">{title}</h3>
                            <p className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest">{subtitle}</p>
                        </div>
                    </div>
                )}

                {/* Free Badge */}
                <div className="absolute top-3 left-3 z-30">
                    <span className="bg-[#10b981] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-[0_2px_10px_rgba(16,185,129,0.4)] uppercase tracking-wider">
                        FREE
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 md:p-8 flex flex-col flex-grow bg-white/[0.03] border-t border-white/5">
                <p className="text-gray-300 text-xs md:text-sm italic font-medium mb-6 md:mb-8 leading-relaxed text-center min-h-[40px]">
                    {description}
                </p>

                <div className="mt-auto flex flex-col items-center gap-3">
                    {isFree ? (
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-gradient-to-b from-[#14532d] to-[#064e3b] hover:from-[#166534] hover:to-[#14532d] text-white font-black py-2.5 md:py-3.5 px-4 md:px-6 rounded border border-emerald-500/20 active:scale-95 transition-all duration-300 shadow-[0_4px_0_rgb(6,78,59)] hover:shadow-[0_6px_0_rgb(6,78,59)] hover:-translate-y-0.5 block text-center uppercase tracking-tighter text-lg md:text-xl"
                        >
                            Free Download
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-gradient-to-b from-[#2d3a54] to-[#1e293b] hover:from-[#374151] hover:to-[#1f2937] text-white font-black py-2.5 md:py-3.5 px-4 md:px-6 rounded border border-white/10 active:scale-95 transition-all duration-300 shadow-[0_4px_0_rgb(15,23,42)] hover:shadow-[0_6px_0_rgb(15,23,42)] hover:-translate-y-0.5 block text-center uppercase tracking-tighter text-xl md:text-2xl"
                            >
                                BUY NOW
                            </button>
                            <span className="text-gray-400 font-black text-xs md:text-sm tracking-widest mt-1">
                                {price}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
