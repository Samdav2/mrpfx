import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
    onMentorshipClick?: () => void;
}

export default function Hero({ onMentorshipClick }: HeroProps) {
    return (
        <section className="bg-white py-6 lg:py-20 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8 flex flex-col-reverse min-[375px]:flex-row items-center justify-between gap-8 min-[375px]:gap-1 lg:gap-12 w-full">
                {/* Left Content */}
                <div className="w-full min-[375px]:w-[66%] lg:w-[50%] text-left space-y-4 min-[375px]:space-y-3 lg:space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-[28px] min-[375px]:text-[21px] md:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight">
                            Learn. Trade. Grow.
                        </h1>
                        <div className="relative w-32 min-[375px]:w-24 md:w-48 h-3">
                            <Image
                                src="/assets/images/Vector-3.png"
                                alt="line"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 min-[375px]:space-y-2 lg:space-y-4">
                        <p className="text-gray-800 text-[14px] min-[375px]:text-[10px] md:text-base lg:text-xl leading-relaxed">
                            Mr P Fx gives traders the <span className="font-bold text-black">education, signals, and trading tools</span> needed to identify high-probability setups, pass prop firm challenges, and scale trading accounts with structured risk management.
                        </p>
                        <p className="text-black font-bold text-[15px] min-[375px]:text-[12px] md:text-lg lg:text-xl">
                            No Wasted PIPS.
                        </p>
                    </div>

                    <div className="flex flex-col min-[375px]:flex-row gap-3 min-[375px]:gap-1 lg:gap-4 justify-start pt-2 lg:pt-4">
                        <button
                            onClick={onMentorshipClick}
                            className="px-6 py-3 min-[375px]:px-1 min-[375px]:py-2 lg:px-8 lg:py-4 bg-[#312E81] text-white font-bold rounded-lg hover:bg-indigo-900 transition-colors text-[14px] min-[375px]:text-[9px] min-[400px]:text-[10px] md:text-sm lg:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 text-center whitespace-nowrap"
                        >
                            Enroll For Mentorship
                        </button>
                        <Link
                            href="https://one.exnesstrack.net/a/0z72b5esoc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 min-[375px]:px-1 min-[375px]:py-2 lg:px-8 lg:py-4 bg-white text-black font-bold border-2 border-gray-200 rounded-lg hover:border-indigo-800 hover:bg-gray-50 transition-colors text-[14px] min-[375px]:text-[9px] min-[400px]:text-[10px] md:text-sm lg:text-lg text-center whitespace-nowrap"
                        >
                            Recommended Broker
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="w-full min-[375px]:w-[34%] lg:w-[50%] relative mx-auto min-[375px]:mx-0">
                    <div className="relative aspect-[4/3] w-full max-w-[320px] min-[375px]:max-w-none mx-auto">
                        <Image
                            src="/images/home/hero.jpg"
                            alt="Mr P Fx Founder Omoike Victory with Blue Lamborghini"
                            fill
                            className="object-cover rounded-xl lg:rounded-3xl shadow-lg lg:shadow-2xl"
                            priority
                            sizes="(max-width: 374px) 100vw, (max-width: 700px) 34vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
