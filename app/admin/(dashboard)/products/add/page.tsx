'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Package, Image, Trash2, ExternalLink } from 'lucide-react';
import { productsService } from '@/lib/products';
import { adminProductService, WPMediaItem, adminTermService } from '@/lib/admin-api';
import { generateSlug, getMediaUrl } from '@/lib/utils';
import { SuccessModal, ErrorModal } from '@/components/admin/Modals';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import TermSelector from '@/components/admin/TermSelector';

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState<{ isOpen: boolean, message: string }>({ isOpen: false, message: '' });

    // Media State
    const [featuredImage, setFeaturedImage] = useState<WPMediaItem | null>(null);
    const [galleryImages, setGalleryImages] = useState<WPMediaItem[]>([]);
    const [showMediaModal, setShowMediaModal] = useState(false);
    const [mediaModalMode, setMediaModalMode] = useState<'featured' | 'gallery'>('featured');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        type: 'simple' as 'simple' | 'variable' | 'grouped' | 'external',
        price: '',
        sale_price: '',
        short_description: '',
        description: '',
        sku: '',
        stock_quantity: '',
        status: 'draft',
        virtual: false,
        downloadable: false,
        seller_payment_link: '',
        whop_payment_link: '',
    });

    // Terms State
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => {
            const updates: any = { [field]: value };
            if (field === 'name') {
                updates.slug = generateSlug(value);
            }
            return { ...prev, ...updates };
        });
    };

    const openMediaModal = (mode: 'featured' | 'gallery') => {
        setMediaModalMode(mode);
        setShowMediaModal(true);
    };

    const handleMediaSelect = (media: WPMediaItem) => {
        if (mediaModalMode === 'featured') {
            setFeaturedImage(media);
        } else {
            if (!galleryImages.find(img => img.id === media.id)) {
                setGalleryImages([...galleryImages, media]);
            }
        }
        setShowMediaModal(false);
    };

    const handleRemoveGalleryImage = (id: number) => {
        setGalleryImages(galleryImages.filter(img => img.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        setLoading(true);
        try {
            const product = await productsService.createProduct({
                name: formData.name,
                slug: formData.slug || undefined,
                type: formData.type,
                price: formData.price ? parseFloat(formData.price) : undefined,
                sale_price: formData.sale_price ? parseFloat(formData.sale_price) : undefined,
                description: formData.description || undefined,
                short_description: formData.short_description || undefined,
                sku: formData.sku || undefined,
                stock_quantity: formData.stock_quantity ? parseInt(formData.stock_quantity) : undefined,
                status: formData.status,
                virtual: formData.virtual,
                downloadable: formData.downloadable,
                seller_payment_link: formData.seller_payment_link || undefined,
                whop_payment_link: formData.whop_payment_link || undefined,
            });

            // Update Featured Image
            if (featuredImage) {
                await adminProductService.updateFeaturedImage(product.id, featuredImage.id);
            }

            // Update Gallery
            if (galleryImages.length > 0) {
                await adminProductService.updateGallery(product.id, galleryImages.map(img => img.id));
            }

            // Assign Terms
            const termIds = [...selectedCategories, ...selectedTags];
            if (termIds.length > 0) {
                await adminTermService.assignTerms(product.id, termIds);
            }

            setSuccessModal(true);
        } catch (error) {
            console.error('Failed to create product:', error);
            setErrorModal({ isOpen: true, message: 'Failed to create product. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/products"
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Add New Product</h1>
                        <p className="text-sm text-gray-400 mt-1">Create a new WooCommerce product</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.name.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save className="w-4 h-4" />
                    {loading ? 'Creating...' : 'Create Product'}
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-500 flex items-center justify-center">
                                <Package className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-semibold">Product Information</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Product Name *</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="Enter product name"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Slug</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="product-slug-url"
                                    value={formData.slug}
                                    onChange={(e) => handleChange('slug', e.target.value)}
                                />
                                <p className="text-xs text-gray-500">The "slug" is the URL-friendly version of the name.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Short Description</label>
                                <textarea
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600 resize-none"
                                    placeholder="Brief product description"
                                    rows={2}
                                    value={formData.short_description}
                                    onChange={(e) => handleChange('short_description', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <RichTextEditor
                                    label="Full Description"
                                    value={formData.description}
                                    onChange={(val) => handleChange('description', val)}
                                    placeholder="Detailed product description..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-white font-semibold pb-4 border-b border-gray-800">Pricing</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Regular Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Sale Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="0.00"
                                    value={formData.sale_price}
                                    onChange={(e) => handleChange('sale_price', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* External Payment Links */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-500 flex items-center justify-center">
                                <ExternalLink className="w-5 h-5" />
                            </div>
                            <h3 className="text-white font-semibold">External Payment Links</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Seller Payment Link</label>
                                <input
                                    type="url"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="https://seller.example.com/pay/..."
                                    value={formData.seller_payment_link}
                                    onChange={(e) => handleChange('seller_payment_link', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Whop Checkout Link</label>
                                <input
                                    type="url"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="https://whop.example.com/checkout/..."
                                    value={formData.whop_payment_link}
                                    onChange={(e) => handleChange('whop_payment_link', e.target.value)}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">Enable alternative checkout options for this product by providing direct payment URLs.</p>
                    </div>

                    {/* Inventory */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-white font-semibold pb-4 border-b border-gray-800">Inventory</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">SKU</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="Stock Keeping Unit"
                                    value={formData.sku}
                                    onChange={(e) => handleChange('sku', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Stock Quantity</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="0"
                                    value={formData.stock_quantity}
                                    onChange={(e) => handleChange('stock_quantity', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-white font-semibold pb-4 border-b border-gray-800">Publish</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Status</label>
                            <select
                                className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent"
                                value={formData.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                            >
                                <option value="draft">Draft</option>
                                <option value="publish">Publish</option>
                                <option value="pending">Pending Review</option>
                            </select>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-white font-semibold pb-4 border-b border-gray-800">Featured Image</h3>
                        {featuredImage ? (
                            <div className="relative group mt-2">
                                <img
                                    src={getMediaUrl((featuredImage as any).url || featuredImage.source_url)}
                                    alt="Featured"
                                    className="w-full h-auto rounded-lg border border-gray-700"
                                    referrerPolicy="no-referrer"
                                />
                                <button
                                    type="button"
                                    onClick={() => setFeaturedImage(null)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => openMediaModal('featured')}
                                className="w-full aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 hover:text-purple-500 text-gray-500 transition-colors"
                            >
                                <Image className="w-8 h-8 mb-2" />
                                <span className="text-sm">Set featured image</span>
                            </button>
                        )}
                    </div>

                    {/* Product Gallery */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                            <h3 className="text-white font-semibold">Product Gallery</h3>
                            <button
                                type="button"
                                onClick={() => openMediaModal('gallery')}
                                className="text-xs text-purple-500 hover:text-purple-400 font-medium"
                            >
                                Add Images
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {galleryImages.map((img) => (
                                <div key={img.id} className="relative group aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                                    <img
                                        src={getMediaUrl((img as any).url || img.source_url)}
                                        alt="Gallery"
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveGalleryImage(img.id)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => openMediaModal('gallery')}
                                className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 hover:text-purple-500 text-gray-500 transition-colors"
                            >
                                <Image className="w-6 h-6 mb-1" />
                                <span className="text-[10px]">Add Image</span>
                            </button>
                        </div>
                    </div>

                    {/* Product Type */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-white font-semibold pb-4 border-b border-gray-800">Product Type</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Type</label>
                            <select
                                className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent"
                                value={formData.type}
                                onChange={(e) => handleChange('type', e.target.value)}
                            >
                                <option value="simple">Simple Product</option>
                                <option value="variable">Variable Product</option>
                                <option value="grouped">Grouped Product</option>
                                <option value="external">External/Affiliate Product</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    className="rounded bg-gray-700 border-gray-600 accent-purple-600 w-4 h-4"
                                    checked={formData.virtual}
                                    onChange={(e) => handleChange('virtual', e.target.checked)}
                                />
                                <span className="text-sm text-gray-300">Virtual Product</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    className="rounded bg-gray-700 border-gray-600 accent-purple-600 w-4 h-4"
                                    checked={formData.downloadable}
                                    onChange={(e) => handleChange('downloadable', e.target.checked)}
                                />
                                <span className="text-sm text-gray-300">Downloadable</span>
                            </label>
                        </div>
                    </div>

                    {/* Categories */}
                    <TermSelector
                        taxonomy="product_cat"
                        label="Categories"
                        selectedIds={selectedCategories}
                        onChange={setSelectedCategories}
                    />

                    {/* Tags */}
                    <TermSelector
                        taxonomy="product_tag"
                        label="Tags"
                        selectedIds={selectedTags}
                        onChange={setSelectedTags}
                    />
                </div>
            </form>

            <MediaPickerModal
                isOpen={showMediaModal}
                onClose={() => setShowMediaModal(false)}
                onSelect={handleMediaSelect}
                title={mediaModalMode === 'featured' ? 'Select Featured Image' : 'Add to Gallery'}
            />

            {/* Success Modal */}
            <SuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                title="Product Created"
                message="Your product has been created successfully."
                confirmText="Continue Editing"
                onConfirm={() => setSuccessModal(false)}
                secondaryText="Back to Products"
                onSecondary={() => router.push('/admin/products')}
            />

            {/* Error Modal */}
            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                message={errorModal.message}
            />
        </div>
    );
}
