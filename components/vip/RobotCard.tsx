'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { cartService } from '@/lib/cart';

interface RobotCardProps {
    id: number;
    name: string;
    price: string;
    description: string;
    features: string[];
    imageSrc: string;
    productUrl?: string; // Optional for backward compatibility, but we use id now
}

const RobotCard = ({ id, name, price, description, features, imageSrc, productUrl = "#" }: RobotCardProps) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        try {
            await cartService.addToCart(id, 1);
            router.push('/checkout');
        } catch (error) {
            console.error("Failed to add to cart:", error);
            // Fallback to product URL if cart fails
            if (productUrl && productUrl !== "#") {
                window.location.href = productUrl;
            }
        }
    };
    return (
        <div className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col h-full group hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500">
            {/* Image Section */}
            <div className="relative aspect-[1/1] sm:aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#eef2ff] to-white">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    className="object-contain p-2 md:p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/80 backdrop-blur-md px-2 md:px-4 py-1 md:py-1.5 rounded-full hidden md:block">
                    <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase truncate max-w-[100px] block">{name}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 md:p-6 flex flex-col flex-grow">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-1 mb-2">
                    <h3 className="text-sm md:text-xl font-bold text-[#1e293b] leading-tight group-hover:text-blue-600 transition-colors uppercase truncate w-full">
                        {name}
                    </h3>
                    <span className="text-base md:text-2xl font-black text-[#1e293b]">
                        ${price}
                    </span>
                </div>

                <p className="text-gray-500 text-[10px] md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-none">
                    {description}
                </p>

                {/* Features List */}
                <ul className="space-y-1.5 md:space-y-3 mb-4 md:mb-8">
                    {features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm text-gray-700 font-medium truncate">
                            <div className="bg-green-100 p-0.5 rounded-full shrink-0">
                                <Check className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-green-600 stroke-[3]" />
                            </div>
                            {feature}
                        </li>
                    ))}
                </ul>

                {/* Button Section */}
                <div className="mt-auto">
                    <button
                        onClick={handleAddToCart}
                        className="block w-full text-center bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000] text-[#1e293b] font-bold py-2 md:py-3.5 rounded-lg md:rounded-xl shadow-md transition-all duration-300 active:scale-95 text-xs md:text-base"
                    >
                        Get Access
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RobotCard;
