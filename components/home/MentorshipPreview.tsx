
import Image from 'next/image';
import Link from 'next/link';

export default function MentorshipPreview() {
    return (
        <section className="bg-white py-16 lg:py-24 overflow-hidden mt-20">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content (Text/Button) - bottom on mobile, left on desktop */}
                    <div className="flex-1 space-y-8 text-center lg:text-left w-full mt-12 lg:mt-0">
                        <div className="relative inline-block">
                            <h2 className="text-3xl lg:text-5xl font-bold text-black leading-tight">
                                VIP Mentorship Course<br />
                                Beginner to Mastery
                            </h2>
                            {/* Green underline styling */}
                            <div className="absolute -bottom-2 left-0 w-full h-2 bg-green-500 rounded-full transform -rotate-1 origin-left"></div>
                        </div>

                        <div className="pt-4 pb-8 lg:pb-0">
                            <Link
                                href="/mentorship-course"
                                className="px-12 py-4 border-2 border-indigo-900 text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors text-lg inline-block"
                            >
                                View Course
                            </Link>
                        </div>
                    </div>

                    {/* Right Content (Laptop/Stats) - top on mobile, right on desktop */}
                    <div className="flex-1 relative w-full flex flex-col items-center lg:block">
                        {/* Laptop Image */}
                        <div className="relative aspect-[20/12] w-full max-w-2xl z-10">
                            <Image
                                src="/images/home/mentorship-stats.png"
                                alt="VIP Mentorship Course Preview on Laptop"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>

                        {/* Stats Card */}
                        <div className="relative mt-8 lg:mt-0 lg:absolute lg:-bottom-16 lg:-left-12 z-20 w-full max-w-md lg:max-w-none lg:w-full bg-[#363B48] rounded-2xl p-6 lg:p-8 shadow-2xl flex justify-between items-center text-white">
                            <div className="text-center flex-1 border-r border-gray-600 last:border-r-0 px-2">
                                <h3 className="text-xl lg:text-3xl font-bold">1500+</h3>
                                <p className="text-[10px] lg:text-sm text-gray-300 mt-1 uppercase tracking-wider font-medium">Students Registered</p>
                            </div>
                            <div className="text-center flex-1 border-r border-gray-600 last:border-r-0 px-2">
                                <h3 className="text-xl lg:text-3xl font-bold">100%</h3>
                                <p className="text-[10px] lg:text-sm text-gray-300 mt-1 uppercase tracking-wider font-medium">Completion rate</p>
                            </div>
                            <div className="text-center flex-1 px-2">
                                <h3 className="text-xl lg:text-3xl font-bold">99%</h3>
                                <p className="text-[10px] lg:text-sm text-gray-300 mt-1 uppercase tracking-wider font-medium">Retention rate</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
