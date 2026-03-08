'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';

interface RobotCardProps {
    name: string;
    price: string;
    description: string;
    features: string[];
    imageSrc: string;
    productUrl?: string;
}

const RobotCard = ({ name, price, description, features, imageSrc, productUrl = "#" }: RobotCardProps) => {
    return (
        <div className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col h-full group hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500">
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#eef2ff] to-white">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full">
                    <span className="text-white text-xs font-bold tracking-widest uppercase">{name}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#1e293b] leading-tight group-hover:text-blue-600 transition-colors">
                        {name}
                    </h3>
                    <span className="text-2xl font-black text-[#1e293b]">
                        ${price}
                    </span>
                </div>

                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                            <div className="bg-green-100 p-0.5 rounded-full">
                                <Check className="w-3.5 h-3.5 text-green-600 stroke-[3]" />
                            </div>
                            {feature}
                        </li>
                    ))}
                </ul>

                {/* Button Section */}
                <div className="mt-auto">
                    <a
                        href={productUrl}
                        className="block w-full text-center bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000] text-[#1e293b] font-bold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(255,215,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,215,0,0.4)] transition-all duration-300 active:scale-95"
                    >
                        Get Access
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RobotCard;
