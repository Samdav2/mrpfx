
import Image from 'next/image';
import Link from 'next/link';

export default function TradingStrategy() {
    // Placeholder data for videos - in a real app these would be dynamic or from a CMS
    const videos = [
        {
            id: "rDP4rU1q6pE",
            thumbnail: "https://img.youtube.com/vi/rDP4rU1q6pE/hqdefault.jpg",
            title: "I Let Advanced AI Trade Forex for Me - The Results Shocked Me",
            duration: "New",
            link: "https://www.youtube.com/watch?v=rDP4rU1q6pE"
        },
        {
            id: "EaHlWeK5fJo",
            thumbnail: "https://img.youtube.com/vi/EaHlWeK5fJo/hqdefault.jpg",
            title: "The Only Forex Price Action Strategy You Need (Exact Entry + SL + TP)",
            duration: "5 days ago",
            link: "https://www.youtube.com/watch?v=EaHlWeK5fJo"
        },
        {
            id: "dHWrJ08JIFw",
            thumbnail: "https://img.youtube.com/vi/dHWrJ08JIFw/hqdefault.jpg",
            title: "How I Passed 10 Prop Firm Challenges in 5 Weeks - Strategy, Rules & Proof",
            duration: "7 days ago",
            link: "https://www.youtube.com/watch?v=dHWrJ08JIFw"
        }
    ];
    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">Trading Strategy</h2>
                    <p className="text-gray-600 text-lg">
                        Explore our <span className="text-red-600 font-semibold">Youtube Channel</span> Get yourself equipped into the world of Trading
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {videos.map((video, index) => (
                        <Link
                            href={video.link}
                            key={index}
                            target="_blank"
                            className="group relative aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow block"
                        >
                            {/* In a real implementation, you'd likely want distinct thumbnails for each */}
                            {/* For now, using object-cover with a center crop might mimic different videos if the source image has multiple */}
                            <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Duration Badge */}
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {video.duration}
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center pl-1 shadow-lg transform group-hover:scale-110 transition-transform">
                                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent"></div>
                                </div>
                            </div>

                            {/* Title Overlay Gradient */}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-4 left-4 right-12 z-10">
                                <p className="text-white font-semibold text-sm line-clamp-2 drop-shadow-md">{video.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="https://www.youtube.com/@MrPFx"
                        target="_blank"
                        className="inline-block px-10 py-3 bg-[#FF0033] text-white font-bold rounded hover:bg-red-700 transition-colors uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
                    >
                        View More
                    </Link>
                </div>
            </div>
        </section>
    );
}
