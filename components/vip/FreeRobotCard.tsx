'use client';

import Image from 'next/image';
import { Check, Download } from 'lucide-react';

interface FreeRobotCardProps {
    name: string;
    description?: string;
    features: string[];
    imageSrc: string;
    downloadUrl?: string;
    category?: string;
}

const FreeRobotCard = ({ name, description = "", features, imageSrc, downloadUrl = "#", category = "Automated" }: FreeRobotCardProps) => {
    return (
        <div className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col h-full group hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500">
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#f0fdf9] to-white">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#1e293b] backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-lg">
                    <h3 className="text-white text-base font-bold tracking-tight">{name}</h3>
                    <div className="mt-1 inline-block bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-400/30">
                        {category} Bot
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Features List */}
                <ul className="space-y-3 mb-6 flex-grow">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700 font-medium italic">
                            <div className="bg-emerald-100 p-0.5 rounded-full mt-0.5">
                                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            </div>
                            <span className="leading-tight">{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <a
                        href={downloadUrl}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-bold py-3.5 px-6 rounded-lg shadow-[0_4px_12px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_15px_rgba(16,185,129,0.35)] transition-all duration-300 active:scale-95 text-lg"
                    >
                        <Download className="w-5 h-5 stroke-[2.5]" />
                        Free Download
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FreeRobotCard;
