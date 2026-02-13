import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

const BACKEND_URL = process.env.BACKEND_URL || 'https://mrpfx-backend.onrender.com';

export default async function GenericPage({ params }: PageProps) {
    const { slug } = await params;

    // Sanitize slug: lowercase, spaces to dashes, remove special chars
    const cleanSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    let page: any;

    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/wordpress/pages/${cleanSlug}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            notFound();
        }

        page = await res.json();
    } catch {
        notFound();
    }

    if (!page) {
        notFound();
    }

    const imageUrl = page.featured_image?.url || null;

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            {/* Background glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-600/[0.03] blur-[120px]" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Image */}
                {imageUrl && (
                    <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden mb-8">
                        <img src={imageUrl} alt={page.post_title || ''} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
                    </div>
                )}

                {/* Article */}
                <article>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 leading-tight">
                        {page.post_title}
                    </h1>

                    {/* Content */}
                    <div
                        className="wp-content"
                        dangerouslySetInnerHTML={{ __html: page.post_content || '' }}
                    />
                </article>
            </div>
        </div>
    );
}
