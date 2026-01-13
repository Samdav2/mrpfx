'use client';

import '../../app/product-page.css';
import Link from 'next/link';
import Image from 'next/image';

// Types for product data
export interface Product {
    id: string;
    slug: string;
    title: string;
    description: string;
    originalPrice: number;
    salePrice: number;
    image: string;
    courseOutlineUrl?: string;
    dateInfo?: string;
    deadline?: string;
    features?: string[];
    selarUrl?: string;
    whopUrl?: string;
}

export interface RelatedProduct {
    id: string;
    slug: string;
    title: string;
    originalPrice: number;
    salePrice: number;
    image: string;
}

interface SingleProductPageProps {
    product: Product;
    relatedProducts?: RelatedProduct[];
}

// Icons
const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Helper function to calculate discount percentage
const calculateDiscount = (original: number, sale: number): number => {
    return Math.round(((original - sale) / original) * 100);
};

// Format currency
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
};

const SingleProductPage: React.FC<SingleProductPageProps> = ({ product, relatedProducts = [] }) => {
    const discount = calculateDiscount(product.originalPrice, product.salePrice);

    return (
        <div className="product-page">
            <div className="product-container">
                {/* Main Product Section */}
                <div className="product-main">
                    {/* Product Gallery */}
                    <div className="product-gallery" style={{ position: 'relative' }}>
                        {discount > 0 && (
                            <span className="product-badge">Sale!</span>
                        )}
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={600}
                            height={600}
                            style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' }}
                            priority
                        />
                    </div>

                    {/* Product Details */}
                    <div className="product-details">
                        <h1 className="product-title">{product.title}</h1>

                        {/* Price */}
                        <div className="product-price-wrapper">
                            {product.originalPrice > product.salePrice && (
                                <span className="product-price-original">
                                    {formatCurrency(product.originalPrice)}
                                </span>
                            )}
                            <span className="product-price-current">
                                {formatCurrency(product.salePrice)}
                            </span>
                            {discount > 0 && (
                                <span className="product-discount-badge">
                                    {discount}% OFF
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }} />

                        {/* Course Info */}
                        {(product.dateInfo || product.deadline || product.features) && (
                            <div className="product-info-list">
                                {product.dateInfo && (
                                    <div className="product-info-item">
                                        <CalendarIcon />
                                        <span><strong>Date:</strong> {product.dateInfo}</span>
                                    </div>
                                )}
                                {product.deadline && (
                                    <div className="product-info-item">
                                        <ClockIcon />
                                        <span><strong>Registration Deadline:</strong> {product.deadline}</span>
                                    </div>
                                )}
                                {product.features?.map((feature, index) => (
                                    <div className="product-info-item" key={index}>
                                        <CheckIcon />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Course Outline Link */}
                        {product.courseOutlineUrl && (
                            <a
                                href={product.courseOutlineUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="course-outline-link"
                            >
                                Click Here To See FULL Course Outline
                                <ExternalLinkIcon />
                            </a>
                        )}

                        {/* Add to Cart Button */}
                        <button className="add-to-cart-btn" onClick={() => alert('Added to cart!')}>
                            <CartIcon />
                            Add to Cart
                        </button>

                        {/* Alternative Payment Options */}
                        {(product.selarUrl || product.whopUrl) && (
                            <div className="alternative-payment">
                                <p className="alternative-payment-title">
                                    If the first option fails, please try the alternative gateway
                                </p>
                                <div className="alternative-payment-buttons">
                                    {product.selarUrl && (
                                        <a href={product.selarUrl} target="_blank" rel="noopener noreferrer" className="alt-payment-btn">
                                            Pay With Selar
                                        </a>
                                    )}
                                    {product.whopUrl && (
                                        <a href={product.whopUrl} target="_blank" rel="noopener noreferrer" className="alt-payment-btn">
                                            Pay With Whop
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="related-products-section">
                        <h2 className="related-products-title">Related Products</h2>
                        <div className="related-products-grid">
                            {relatedProducts.map((relatedProduct) => {
                                const relatedDiscount = calculateDiscount(relatedProduct.originalPrice, relatedProduct.salePrice);
                                return (
                                    <Link
                                        href={`/product/${relatedProduct.slug}`}
                                        key={relatedProduct.id}
                                        className="related-product-card"
                                    >
                                        <div className="related-product-image-wrapper">
                                            {relatedDiscount > 0 && (
                                                <span className="related-product-sale-badge">Sale!</span>
                                            )}
                                            <Image
                                                src={relatedProduct.image}
                                                alt={relatedProduct.title}
                                                width={300}
                                                height={300}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="related-product-content">
                                            <h3 className="related-product-title">{relatedProduct.title}</h3>
                                            <div className="related-product-price">
                                                {relatedProduct.originalPrice > relatedProduct.salePrice && (
                                                    <span className="related-product-price-original">
                                                        {formatCurrency(relatedProduct.originalPrice)}
                                                    </span>
                                                )}
                                                <span className="related-product-price-current">
                                                    {formatCurrency(relatedProduct.salePrice)}
                                                </span>
                                            </div>
                                            <button className="related-product-add-btn">
                                                Add to cart
                                            </button>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default SingleProductPage;
