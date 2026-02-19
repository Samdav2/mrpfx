
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="bg-white py-12 lg:py-20 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-50">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
                    <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight">
                        Master forex trading through <br className="hidden lg:block" />
                        precision, strategy
                        <span className="block h-1.5 w-32 bg-green-500 mt-4 mx-auto lg:mx-0 rounded-full"></span>
                    </h1>
                    <p className="text-gray-500 text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Mr P Fx is a fast-growing platform/community established after several years of diligent study of charts behaviors, movements, formations and algorithms in general. Mr P Fx was founded by Omoike Victory popularly known as Mr P on the 8th of April 2021.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <Link
                            href="/mentorship-course"
                            className="px-8 py-4 bg-[#312E81] text-white font-bold rounded-lg hover:bg-indigo-900 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                        >
                            Enroll For Mentorship
                        </Link>
                        <Link
                            href="https://one.exnesstrack.net/a/0z72b5esoc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white text-black font-bold border-2 border-gray-200 rounded-lg hover:border-indigo-800 hover:bg-gray-50 transition-colors text-lg"
                        >
                            Recommended Broker
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex-1 relative w-full">
                    <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-none">
                        <Image
                            src="/images/home/hero.jpg"
                            alt="Mr P Fx Founder Omoike Victory with Blue Lamborghini"
                            fill
                            className="object-cover rounded-3xl shadow-2xl"
                            priority
                            sizes="(max-width: 700px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
