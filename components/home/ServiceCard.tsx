
import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
    title: string;
    imageSrc: string;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export default function ServiceCard({ title, imageSrc, href, onClick, className }: ServiceCardProps) {
    const CardContent = (
        <div className={classNames("group relative flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-2 duration-300", className)}>
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-white">
                {imageSrc.startsWith('/') ? (
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <span className="text-sm">Image Coming Soon</span>
                    </div>
                )}

            </div>
            <h3 className="mt-4 text-center text-lg font-bold text-black group-hover:text-indigo-900 transition-colors">
                {title}
            </h3>
        </div>
    );

    if (onClick) {
        return (
            <button onClick={onClick} className="block w-full text-left outline-none">
                {CardContent}
            </button>
        );
    }

    return (
        <Link href={href || "#"} className="block w-full">
            {CardContent}
        </Link>
    );
}

function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}
