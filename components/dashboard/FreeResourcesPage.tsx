'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FreeResourcesPage = () => {
    // Mock data for the resources grid
    const resources = [
        {
            id: 1,
            title: 'Mr P Fx Pro Manger Indicator',
            description: 'This is a completely free trading system, Please watch the setup and rules that applies to the indicator, in order to utilize and maximize the',
            thumbnail: 'https://i.ytimg.com/vi/placeholder1/hqdefault.jpg', // Replace with actual image URL or placeholder
            date: 'March 18, 2025',
            comments: 'No Comments',
            downloadLink: '#'
        },
        {
            id: 2,
            title: 'Mr P Fx Magnitude 25 Strategy Indicator',
            description: 'This is a completely free trading system, Please watch the setup and rules that applies to the indicator, in order to utilize and maximize the',
            thumbnail: 'https://i.ytimg.com/vi/placeholder2/hqdefault.jpg',
            date: 'July 11, 2024',
            comments: 'No Comments',
            downloadLink: '#'
        },
        {
            id: 3,
            title: 'Mr P Fx Magnetic 33 Strategy Indicator',
            description: 'This is a completely free trading system, Please watch the setup and rules that applies to the indicator, in order to utilize and maximize the',
            thumbnail: 'https://i.ytimg.com/vi/placeholder3/hqdefault.jpg',
            date: 'June 3, 2024',
            comments: 'No Comments',
            downloadLink: '#'
        },
        {
            id: 4,
            title: 'Can\'t be stopped',
            description: '',
            thumbnail: 'https://i.ytimg.com/vi/placeholder4/hqdefault.jpg',
            date: '',
            comments: '',
            downloadLink: '#'
        },
        {
            id: 5,
            title: '00% ??',
            description: '',
            thumbnail: 'https://i.ytimg.com/vi/placeholder5/hqdefault.jpg',
            date: '',
            comments: '',
            downloadLink: '#'
        },
        {
            id: 6,
            title: '99.99% ACCURACY',
            description: '',
            thumbnail: 'https://i.ytimg.com/vi/placeholder6/hqdefault.jpg',
            date: '',
            comments: '',
            downloadLink: '#'
        }
    ];

    return (
        <div className="min-h-screen bg-white font-[family-name:var(--font-dm-sans)]">
            {/* Header Section */}
            <div className="relative bg-[#0066FF] pt-32 pb-48 overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        FREE RESOURCES / MATERIALS
                    </h1>
                    <div className="w-32 h-1.5 bg-[#00FF99] mx-auto mb-8"></div>
                </div>

                {/* Wave Shape */}
                <div className="absolute bottom-0 left-0 w-full leading-none">
                    <svg className="block w-full h-32 md:h-48" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                {/* Background Wave Overlay (lighter blue) */}
                <div className="absolute bottom-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Notice Text */}
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <h2 className="text-[#2A3596] text-xl md:text-2xl font-bold uppercase leading-relaxed mb-8">
                        PLEASE NOTE THAT ALL FILES ARE IN ZIP FORMAT. PLEASE EXTRACT THE ORIGINAL FILES USING 'WINRAR' OR ANY OTHER 'ZIP EXTRACTOR' BEFORE INSTALLATION.
                    </h2>

                    <p className="text-[#2A3596] text-sm font-bold italic mb-2">
                        Please use the search bar to search out the robot/indicator/seminar video that you want, if not visible on the front page here.
                    </p>
                    <p className="text-[#2A3596] text-sm font-bold italic">
                        Names are thesame as written on youtube video explanations.
                    </p>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resources.map((resource) => (
                        <div key={resource.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-gray-200">
                                {/* Placeholder for Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <span className="text-lg font-bold">Video Thumbnail</span>
                                </div>
                                {/* If you have actual images, use Next.js Image component here */}
                                {/* <Image src={resource.thumbnail} alt={resource.title} layout="fill" objectFit="cover" /> */}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-[#2A3596] text-lg font-bold mb-4 line-clamp-2 min-h-[3.5rem]">
                                    {resource.title}
                                </h3>

                                <p className="text-gray-600 text-xs mb-4 line-clamp-4 flex-grow">
                                    {resource.description || "This is a completely free trading system, Please watch the setup and rules that applies to the indicator, in order to utilize and maximize the"}
                                </p>

                                <div className="mt-auto">
                                    <Link href={resource.downloadLink} className="text-[#2A3596] text-xs font-bold uppercase underline hover:text-blue-800">
                                        DOWNLOAD
                                    </Link>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-[#2A3596]">
                                <span>{resource.date || "July 11, 2024"}</span>
                                <span>{resource.comments || "No Comments"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Chat Widget */}
            <div className="fixed bottom-6 right-6 z-50">
                <button className="bg-[#0000AA] text-white p-4 rounded-full shadow-lg hover:bg-blue-900 transition-colors relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                        1
                    </span>
                </button>
            </div>
        </div>
    );
};

export default FreeResourcesPage;
