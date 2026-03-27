'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { cartService } from '@/lib/cart';
import { getMediaUrl } from '@/lib/utils';

interface IndicatorCardProps {
    id: number;
    name: string;
    price: string;
    description: string;
    features: string[];
    imageSrc: string;
    productUrl?: string;
    platforms?: string; // e.g. "MT4 / MT5"
}

const IndicatorCard = ({ id, name, price, description, features, imageSrc, productUrl = "#", platforms = "MT4 / MT5" }: IndicatorCardProps) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        try {
            await cartService.addToCart(id, 1);
            router.push('/checkout');
        } catch (error) {
            console.error("Failed to add to cart:", error);
            if (productUrl && productUrl !== "#") {
                window.location.href = productUrl;
            }
        }
    };
    return (
        <div className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col h-full group hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500">
            {/* Image Section */}
            <div className="relative aspect-square sm:aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#f0f9ff] to-white">
                <Image
                    src={getMediaUrl(imageSrc) || "/assets/indicators/chart-tablet.png"}
                    alt={name}
                    fill
                    className="object-contain p-4 md:p-6 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#1e293b]/90 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded-lg border border-white/10 hidden sm:block">
                    <h3 className="text-white text-xs md:text-base font-bold tracking-tight">{name}</h3>
                    <div className="mt-0.5 md:mt-1 inline-block bg-blue-500/20 text-blue-300 text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded border border-blue-400/30">
                        {platforms}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 md:p-6 flex flex-col flex-grow">
                <h4 className="text-xs md:text-lg font-black text-[#1e293b] mb-1 md:mb-2 uppercase truncate">{name}</h4>
                {/* Features List */}
                <ul className="space-y-1.5 md:space-y-3 mb-4 md:mb-6">
                    {features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm text-gray-700 font-medium italic truncate">
                            <div className="bg-green-100 p-0.5 rounded-full shrink-0">
                                <Check className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-green-600 stroke-[3]" />
                            </div>
                            {feature}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-0 sm:mb-5">
                        <span className="text-base md:text-3xl font-black text-[#1e293b]">
                            ${price}
                        </span>
                        <button
                            onClick={handleAddToCart}
                            className="w-full sm:w-auto bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000] text-[#1e293b] font-bold py-1.5 md:py-2.5 px-3 md:px-6 rounded-md md:rounded-lg shadow-md transition-all duration-300 active:scale-95 text-[10px] md:text-sm uppercase"
                        >
                            Get Access
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndicatorCard;
