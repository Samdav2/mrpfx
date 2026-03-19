'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, Download } from 'lucide-react';
import { cartService } from '@/lib/cart';

interface FreeIndicatorCardProps {
    id: number;
    name: string;
    description?: string;
    features: string[];
    imageSrc: string;
    downloadUrl?: string;
    platforms?: string; // e.g. "MT4 / MT5"
}

const FreeIndicatorCard = ({ id, name, description = "", features, imageSrc, downloadUrl = "#", platforms = "MT4 / MT5" }: FreeIndicatorCardProps) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        try {
            await cartService.addToCart(id, 1);
            router.push('/checkout');
        } catch (error) {
            console.error("Failed to add to cart:", error);
            if (downloadUrl && downloadUrl !== "#") {
                window.location.href = downloadUrl;
            }
        }
    };
    return (
        <div className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col h-full group hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500">
            {/* Image Section */}
            <div className="relative aspect-square sm:aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#f0fdf4] to-white">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    className="object-contain p-4 md:p-6 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#1e293b]/90 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded-lg border border-white/10 shadow-lg hidden sm:block">
                    <h3 className="text-white text-xs md:text-base font-bold tracking-tight">{name}</h3>
                    <div className="mt-0.5 md:mt-1 inline-block bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-400/30">
                        {platforms}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 md:p-6 flex flex-col flex-grow">
                <h4 className="text-xs md:text-lg font-black text-[#1e293b] mb-1 md:mb-2 uppercase truncate">{name}</h4>
                {/* Features List */}
                <ul className="space-y-1.5 md:space-y-3 mb-4 md:mb-6 flex-grow">
                    {features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-start gap-1.5 md:gap-2 text-[10px] md:text-sm text-gray-700 font-medium italic truncate">
                            <div className="bg-green-100 p-0.5 rounded-full shrink-0">
                                <Check className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-green-600 stroke-[3]" />
                            </div>
                            <span className="leading-tight">{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center gap-1.5 md:gap-2 w-full bg-gradient-to-r from-[#106b52] to-[#147b62] hover:from-[#147b62] hover:to-[#188c72] text-white font-bold py-2 md:py-3.5 px-3 md:px-6 rounded-lg shadow-md transition-all duration-300 active:scale-95 text-[10px] md:text-lg uppercase"
                    >
                        <Download className="w-3 h-3 md:w-5 md:h-5 stroke-[2.5]" />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FreeIndicatorCard;
