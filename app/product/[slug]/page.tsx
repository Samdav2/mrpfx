import SingleProductPage, { Product, RelatedProduct } from '@/components/product/SingleProductPage';

// Sample product data - in production this would come from an API or database
const products: Record<string, Product> = {
    'mentorship-course-100-september-1st-11th-2025': {
        id: 'mentorship-100',
        slug: 'mentorship-course-100-september-1st-11th-2025',
        title: 'Mentorship Course 100 September 1ST – 11TH 2025',
        description: `
            <p>Mentorship course 100 will be September (1st – 11th 2025)</p>
            <p>Mr P will be teaching <strong>LIVE HIMSELF One On One</strong> accompanied with practical mastery on taking trades live. (You will also get the record of classes after each class in the private group incase you miss any session)</p>
            <p><strong>Only a Maximum of 100 Traders can attend this master training.</strong></p>
            <p>Cost of registration is <strong>$399 per seat</strong></p>
            <p>That payment will place you automatically in the VIP Group 12 Months Subscription, Should grant you access to Live trading sessions directly with Mr P One – On – One and access To dynamic VIP Robot and Indicator.</p>
        `,
        originalPrice: 3700,
        salePrice: 399,
        image: '/assets/home/Device-Macbook-Pro.png',
        courseOutlineUrl: 'https://mrpfx.com/wp-content/uploads/2025/07/Mentorship-course-100-with-Mr-P-SEPT.-1ST-11TH.pdf',
        dateInfo: 'September 1st – 11th 2025',
        deadline: 'August 30th 2025',
        features: [
            'VIP Group 12 Months Subscription',
            'Live trading sessions with Mr P One-On-One',
            'Access to Dynamic VIP Robot',
            'Access to VIP Indicator',
            'Class recordings for all sessions'
        ],
        selarUrl: 'https://selar.com/mentorshipcourse100',
        whopUrl: 'https://whop.com/mr-p-fx/mr-p-fx-mentorship-course-f3/'
    }
};

// Sample related products
const relatedProducts: RelatedProduct[] = [
    {
        id: 'alisa-g-robot',
        slug: 'alisa-g-auto-robot',
        title: 'Alisa G Auto Robot (FOR PHONE OR PC) Over 99% extreme accuracy',
        originalPrice: 600,
        salePrice: 499.99,
        image: '/assets/home/120032.jpg'
    },
    {
        id: 'astro-x-robot',
        slug: 'astro-x-auto-robot-vip',
        title: 'Astro X Auto Robot VIP (FOR PHONE OR PC)',
        originalPrice: 500,
        salePrice: 399,
        image: '/assets/home/2149250208.jpg'
    },
    {
        id: 'volatility-75-robot',
        slug: 'volatility-75-cristal-beast-auto-robot',
        title: 'Volatility 75 Cristal Beast Auto Robot',
        originalPrice: 150,
        salePrice: 99.99,
        image: '/assets/home/Group-116.png'
    }
];

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;

    // Find the product by slug
    const product = products[slug];

    // If product not found, show a fallback
    if (!product) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                fontFamily: '"DM Sans", Sans-serif'
            }}>
                <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Product Not Found</h1>
                <p style={{ color: '#666' }}>The product you&apos;re looking for doesn&apos;t exist.</p>
            </div>
        );
    }

    return <SingleProductPage product={product} relatedProducts={relatedProducts} />;
}

// Generate static params for known products
export function generateStaticParams() {
    return Object.keys(products).map((slug) => ({
        slug,
    }));
}
