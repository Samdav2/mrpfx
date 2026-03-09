'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { cartService } from '@/lib/cart';

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
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#f0f9ff] to-white">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#1e293b] backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                    <h3 className="text-white text-base font-bold tracking-tight">{name}</h3>
                    <div className="mt-1 inline-block bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-400/30">
                        {platforms} Compatible
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Features List */}
                <ul className="space-y-3 mb-6">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700 font-medium italic">
                            <div className="bg-green-100 p-0.5 rounded-full">
                                <Check className="w-3.5 h-3.5 text-green-600 stroke-[3]" />
                            </div>
                            {feature}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <div className="flex justify-between items-center mb-5">
                        <span className="text-3xl font-black text-[#1e293b]">
                            ${price}
                        </span>
                        <button
                            onClick={handleAddToCart}
                            className="bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000] text-[#1e293b] font-bold py-2.5 px-6 rounded-lg shadow-[0_4px_12px_rgba(255,215,0,0.25)] hover:shadow-[0_6px_15px_rgba(255,215,0,0.35)] transition-all duration-300 active:scale-95 text-sm"
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
