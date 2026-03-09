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
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#f0fdf4] to-white">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#1e293b] backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-lg">
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
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#106b52] to-[#147b62] hover:from-[#147b62] hover:to-[#188c72] text-white font-bold py-3.5 px-6 rounded-lg shadow-[0_4px_12px_rgba(16,107,82,0.25)] hover:shadow-[0_6px_15px_rgba(16,107,82,0.35)] transition-all duration-300 active:scale-95 text-lg"
                    >
                        <Download className="w-5 h-5 stroke-[2.5]" />
                        Free Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FreeIndicatorCard;
