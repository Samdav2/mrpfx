
import Image from 'next/image';
import Link from 'next/link';

export default function Community() {
    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Side: Faces Grid */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-none">
                        <div className="relative aspect-square w-full">
                            <Image
                                src="/images/home/community-faces.png"
                                alt="Community Members"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Side: content */}
                    <div className="flex-1 w-full pl-0 lg:pl-12">
                        <div className="relative mb-12 w-full max-w-xl">
                            {/* Banner Image Background */}
                            <div className="relative w-full aspect-[3/1] flex items-center pl-12 md:pl-6 pt-15">
                                <Image
                                    src="/images/home/community-telegram.png"
                                    alt="Join Our Community Banner"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                                <h2 className="relative z-10 text-2xl lg:text-4xl font-bold text-white leading-tight md:text-2xl">
                                    Join Our<br />
                                    Community
                                </h2>
                            </div>
                        </div>

                        <div className="max-w-md space-y-6">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We share common trends and strategies for improving signals and resources.
                            </p>

                            <div className="flex gap-4">
                                <Link
                                    href="/free-signals-group"
                                    className="px-8 py-3 bg-white border-2 border-[#312E81] text-[#312E81] font-bold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Join Free
                                </Link>
                                <Link
                                    href="/vip-signals-group"
                                    className="px-8 py-3 bg-[#0052CC] border-2 border-[#0052CC] text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Join VIP
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
