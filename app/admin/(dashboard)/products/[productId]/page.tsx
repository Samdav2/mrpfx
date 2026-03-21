'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Package, Trash2, Image, ExternalLink, Plus, ChevronDown, ChevronUp, Send, User, X } from 'lucide-react';
import { productsService, WCProductRead } from '@/lib/products';
import { adminProductService, WPMediaItem, adminTermService } from '@/lib/admin-api';
import type { WCProductVariationRead, WCProductVariationCreate, WCProductVariationUpdate } from '@/lib/types';
import { SuccessModal, ConfirmModal, ErrorModal } from '@/components/admin/Modals';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import { getMediaUrl } from '@/lib/utils';
import TermSelector from '@/components/admin/TermSelector';

interface VariationRow {
    _key: string;
    id: number | null; // null = new, number = existing
    attributeName: string;
    attributeOption: string;
    regular_price: string;
    sale_price: string;
    sku: string;
    stock_quantity: string;
    status: string;
    dirty: boolean;
}

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = Number(params.productId);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
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
        signal_link: '',
        telegram_link: '',
        vip_group: '',
    });

    // Addons State
    const [addons, setAddons] = useState<{ name: string; type: string; required: boolean }[]>([]);

    // Terms State
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [initialTermIds, setInitialTermIds] = useState<number[]>([]);

    // Variations State
    const [variations, setVariations] = useState<VariationRow[]>([]);
    const [expandedVariation, setExpandedVariation] = useState<string | null>(null);
    const [deletedVariationIds, setDeletedVariationIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const [product, imageDetails, productFull] = await Promise.all([
                    productsService.getProduct(productId),
                    adminProductService.getProductImages(productId),
                    adminProductService.getProductFull(productId)
                ]);

                setFormData({
                    name: product.name || '',
                    slug: product.slug || '',
                    type: (product.type as any) || 'simple',
                    price: product.regular_price || product.price || '',
                    sale_price: product.sale_price || '',
                    short_description: product.short_description || '',
                    description: product.description || '',
                    sku: product.sku || '',
                    stock_quantity: product.stock_quantity?.toString() || '',
                    status: product.status || 'draft',
                    virtual: product.virtual || false,
                    downloadable: product.downloadable || false,
                    seller_payment_link: product.seller_payment_link || '',
                    whop_payment_link: product.whop_payment_link || '',
                    signal_link: product.signal_link || '',
                    telegram_link: product.telegram_link || '',
                    vip_group: product.vip_group || '',
                });

                // Set addons
                if (product.addons) {
                    setAddons(product.addons.map((a: any) => ({
                        name: a.name || '',
                        type: a.type || 'text',
                        required: !!a.required
                    })));
                }

                // Set terms
                const catIds = productFull.categories?.map(c => c.term_id) || [];
                const tagIds = productFull.tags?.map(t => t.term_id) || [];
                setSelectedCategories(catIds);
                setSelectedTags(tagIds);
                setInitialTermIds([...catIds, ...tagIds]);

                // Load variations from full product
                if (productFull.variations && productFull.variations.length > 0) {
                    const variationRows: VariationRow[] = productFull.variations.map((v: WCProductVariationRead) => ({
                        _key: `existing-${v.id}`,
                        id: v.id,
                        attributeName: v.attributes?.[0]?.name || '',
                        attributeOption: v.attributes?.[0]?.option || '',
                        regular_price: v.regular_price || v.price || '',
                        sale_price: v.sale_price || '',
                        sku: v.sku || '',
                        stock_quantity: v.stock_quantity?.toString() || '',
                        status: v.status || 'publish',
                        dirty: false,
                    }));
                    setVariations(variationRows);
                }

                // Load images from dedicated endpoint
                if (imageDetails.featured_image) {
                    setFeaturedImage({
                        id: imageDetails.featured_image.id,
                        url: imageDetails.featured_image.url,
                        source_url: imageDetails.featured_image.url,
                        title: { rendered: imageDetails.featured_image.title },
                        mime_type: imageDetails.featured_image.mime_type
                    } as any);
                }

                if (imageDetails.gallery_images && Array.isArray(imageDetails.gallery_images)) {
                    setGalleryImages(imageDetails.gallery_images.map((img: any) => ({
                        id: img.id,
                        url: img.url,
                        source_url: img.url,
                        title: { rendered: img.title || '' },
                        mime_type: img.mime_type || 'image/jpeg'
                    })));
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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

    // Variation handlers
    const addVariation = () => {
        const draft: VariationRow = {
            _key: Math.random().toString(36).slice(2),
            id: null,
            attributeName: '',
            attributeOption: '',
            regular_price: '',
            sale_price: '',
            sku: '',
            stock_quantity: '',
            status: 'publish',
            dirty: true,
        };
        setVariations([...variations, draft]);
        setExpandedVariation(draft._key);
    };

    const updateVariationField = (key: string, field: keyof VariationRow, value: string) => {
        setVariations(prev => prev.map(v => v._key === key ? { ...v, [field]: value, dirty: true } : v));
    };

    const removeVariation = (key: string) => {
        const v = variations.find(x => x._key === key);
        if (v?.id) {
            setDeletedVariationIds(prev => [...prev, v.id!]);
        }
        setVariations(prev => prev.filter(x => x._key !== key));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        setSaving(true);
        try {
            await productsService.updateProduct(productId, {
                name: formData.name,
                slug: formData.slug || undefined,
                type: formData.type,
                price: formData.price ? parseFloat(formData.price) : undefined,
                sale_price: formData.sale_price ? String(formData.sale_price) : undefined,
                description: formData.description || undefined,
                short_description: formData.short_description || undefined,
                sku: formData.sku || undefined,
                stock_quantity: formData.stock_quantity ? parseInt(formData.stock_quantity) : undefined,
                status: formData.status,
                virtual: formData.virtual,
                downloadable: formData.downloadable,
                whop_payment_link: formData.whop_payment_link || undefined,
                seller_payment_link: formData.seller_payment_link || undefined, // Updated submission logic
                signal_link: formData.signal_link || undefined,
                telegram_link: formData.telegram_link || undefined,
                vip_group: formData.vip_group || undefined,
                addons: addons.map((a, i) => ({
                    name: a.name,
                    type: a.type,
                    required: a.required,
                    description: '',
                    position: i,
                    options: []
                })),
            });

            // Update Featured Image & Gallery using dedicated endpoints
            if (featuredImage) {
                await adminProductService.updateFeaturedImage(productId, featuredImage.id);
            }

            // Always update gallery to match current state (Replace logic)
            await adminProductService.updateGallery(productId, galleryImages.map(img => img.id));

            // Update Terms
            const currentTermIds = [...selectedCategories, ...selectedTags];
            const termsToAdd = currentTermIds.filter(id => !initialTermIds.includes(id));
            const termsToRemove = initialTermIds.filter(id => !currentTermIds.includes(id));

            if (termsToAdd.length > 0) {
                await adminProductService.assignTerms(productId, termsToAdd);
            }
            if (termsToRemove.length > 0) {
                await adminProductService.removeTerms(productId, termsToRemove);
            }

            setInitialTermIds(currentTermIds);

            // Handle Variations
            // 1. Delete removed variations
            for (const vid of deletedVariationIds) {
                try {
                    await adminProductService.deleteVariation(productId, vid);
                } catch (e) {
                    console.warn('Failed to delete variation', vid, e);
                }
            }
            setDeletedVariationIds([]);

            // 2. Create new / Update existing variations
            for (const v of variations) {
                if (!v.attributeName || !v.attributeOption) continue;
                const data = {
                    regular_price: v.regular_price || undefined,
                    sale_price: v.sale_price || undefined,
                    sku: v.sku || undefined,
                    stock_quantity: v.stock_quantity ? parseInt(v.stock_quantity) : undefined,
                    status: v.status || 'publish',
                    attributes: [{ name: v.attributeName.toLowerCase(), option: v.attributeOption.toLowerCase().replace(/\s+/g, '-') }],
                };

                if (v.id) {
                    // Existing variation — update if dirty
                    if (v.dirty) {
                        await adminProductService.updateVariation(productId, v.id, data);
                    }
                } else {
                    // New variation — create
                    await adminProductService.createVariation(productId, data as WCProductVariationCreate);
                }
            }

            // Mark all variations as clean
            setVariations(prev => prev.map(v => ({ ...v, dirty: false })));

            setSuccessModal(true);
        } catch (error) {
            console.error('Failed to update product:', error);
            setErrorModal({ isOpen: true, message: 'Failed to update product. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await productsService.deleteProduct(productId);
            router.push('/admin/products');
        } catch (error) {
            console.error('Failed to delete product:', error);
            setErrorModal({ isOpen: true, message: 'Failed to delete product. Please try again.' });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-400">Loading product...</div>
            </div>
        );
    }

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
                        <h1 className="text-2xl font-bold text-white">Edit Product</h1>
                        <p className="text-sm text-gray-400 mt-1">Update product details</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/product/${(formData.slug || formData.name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 rounded-lg text-sm font-medium transition-colors border border-cyan-500/20"
                    >
                        <ExternalLink className="w-4 h-4" />
                        View
                    </Link>
                    <button
                        onClick={() => setDeleteModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-lg text-sm font-medium transition-colors border border-red-500/20"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving || !formData.name.trim()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
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

                    {/* Pricing — show for non-variable products */}
                    {formData.type !== 'variable' && (
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
                    )}

                    {/* Variations — show for variable products */}
                    {formData.type === 'variable' && (
                        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Variations</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{variations.length} variation{variations.length !== 1 ? 's' : ''}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={addVariation}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg text-xs font-medium transition-colors border border-orange-500/20"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Variation
                                </button>
                            </div>

                            {variations.length === 0 ? (
                                <div className="text-center py-8">
                                    <Package className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-500 text-sm">No variations yet.</p>
                                    <p className="text-gray-600 text-xs mt-1">Click &quot;Add Variation&quot; to create product options.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {variations.map((v, idx) => (
                                        <div key={v._key} className={`border rounded-lg overflow-hidden ${v.dirty ? 'border-orange-500/30' : 'border-gray-700'}`}>
                                            {/* Variation header */}
                                            <div
                                                className="flex items-center justify-between px-4 py-3 bg-[#1F2937]/50 cursor-pointer hover:bg-[#1F2937] transition-colors"
                                                onClick={() => setExpandedVariation(expandedVariation === v._key ? null : v._key)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-gray-500 font-mono">#{idx + 1}</span>
                                                    {v.id && <span className="text-[10px] text-gray-600 font-mono">ID: {v.id}</span>}
                                                    <span className="text-sm text-white font-medium">
                                                        {v.attributeName && v.attributeOption
                                                            ? `${v.attributeName}: ${v.attributeOption}`
                                                            : 'New Variation'}
                                                    </span>
                                                    {v.regular_price && (
                                                        <span className="text-xs text-green-400 font-medium">${v.regular_price}</span>
                                                    )}
                                                    {v.sale_price && (
                                                        <span className="text-xs text-yellow-400 font-medium">(Sale: ${v.sale_price})</span>
                                                    )}
                                                    {v.dirty && <span className="text-[10px] text-orange-400 font-medium ml-1">Modified</span>}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); removeVariation(v._key); }}
                                                        className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    {expandedVariation === v._key
                                                        ? <ChevronUp className="w-4 h-4 text-gray-500" />
                                                        : <ChevronDown className="w-4 h-4 text-gray-500" />
                                                    }
                                                </div>
                                            </div>

                                            {/* Variation body */}
                                            {expandedVariation === v._key && (
                                                <div className="p-4 space-y-4 border-t border-gray-700">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-medium text-gray-400">Attribute Name *</label>
                                                            <input
                                                                type="text"
                                                                className="w-full bg-[#0D1117] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-orange-500 border border-gray-700 placeholder-gray-600"
                                                                placeholder="e.g. Duration"
                                                                value={v.attributeName}
                                                                onChange={(e) => updateVariationField(v._key, 'attributeName', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-medium text-gray-400">Option Value *</label>
                                                            <input
                                                                type="text"
                                                                className="w-full bg-[#0D1117] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-orange-500 border border-gray-700 placeholder-gray-600"
                                                                placeholder="e.g. 1 Month"
                                                                value={v.attributeOption}
                                                                onChange={(e) => updateVariationField(v._key, 'attributeOption', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-medium text-gray-400">Regular Price ($)</label>
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                min="0"
                                                                className="w-full bg-[#0D1117] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-orange-500 border border-gray-700 placeholder-gray-600"
                                                                placeholder="0.00"
                                                                value={v.regular_price}
                                                                onChange={(e) => updateVariationField(v._key, 'regular_price', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-medium text-gray-400">Sale Price ($)</label>
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                min="0"
                                                                className="w-full bg-[#0D1117] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-orange-500 border border-gray-700 placeholder-gray-600"
                                                                placeholder="0.00"
                                                                value={v.sale_price}
                                                                onChange={(e) => updateVariationField(v._key, 'sale_price', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-medium text-gray-400">SKU</label>
                                                            <input
                                                                type="text"
                                                                className="w-full bg-[#0D1117] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-orange-500 border border-gray-700 placeholder-gray-600"
                                                                placeholder="Optional SKU"
                                                                value={v.sku}
                                                                onChange={(e) => updateVariationField(v._key, 'sku', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-medium text-gray-400">Stock Qty</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                className="w-full bg-[#0D1117] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-orange-500 border border-gray-700 placeholder-gray-600"
                                                                placeholder="∞"
                                                                value={v.stock_quantity}
                                                                onChange={(e) => updateVariationField(v._key, 'stock_quantity', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-medium text-gray-400">Status</label>
                                                            <select
                                                                className="w-full bg-[#0D1117] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-orange-500 border border-gray-700"
                                                                value={v.status}
                                                                onChange={(e) => updateVariationField(v._key, 'status', e.target.value)}
                                                            >
                                                                <option value="publish">Publish</option>
                                                                <option value="draft">Draft</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-xs text-gray-500 mt-2">
                                💡 Each variation represents a selectable option. Modified variations are highlighted with an orange border.
                            </p>
                        </div>
                    )}

                    {/* Product Access Links — only shown for virtual/downloadable products */}
                    {(formData.virtual || formData.downloadable) && (
                        <div className="bg-[#111827] border border-blue-500/20 rounded-xl p-6 space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center ring-1 ring-blue-500/20">
                                    <Send className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Product Access Links</h3>
                                    <p className="text-xs text-gray-500">Shown to the customer after their order is completed</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Telegram Invite Link</label>
                                    <input
                                        type="url"
                                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 border border-transparent placeholder-gray-600"
                                        placeholder="https://t.me/joinchat/..."
                                        value={formData.telegram_link}
                                        onChange={(e) => handleChange('telegram_link', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Signal Access Link</label>
                                    <input
                                        type="url"
                                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 border border-transparent placeholder-gray-600"
                                        placeholder="https://signal.group/..."
                                        value={formData.signal_link}
                                        onChange={(e) => handleChange('signal_link', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-400">VIP Group Name / Info</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 border border-transparent placeholder-gray-600"
                                        placeholder="e.g. Diamond VIP Signal Group"
                                        value={formData.vip_group}
                                        onChange={(e) => handleChange('vip_group', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment Links — always visible */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                <ExternalLink className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Payment Links</h3>
                                <p className="text-xs text-gray-500">External checkout links for this product</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Seller Payment Link (Selar)</label>
                                <input
                                    type="url"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="https://selar.co/..."
                                    value={formData.seller_payment_link}
                                    onChange={(e) => handleChange('seller_payment_link', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Whop Checkout Link</label>
                                <input
                                    type="url"
                                    className="w-full bg-[#1F2937] text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 border border-transparent placeholder-gray-600"
                                    placeholder="https://whop.com/checkout/..."
                                    value={formData.whop_payment_link}
                                    onChange={(e) => handleChange('whop_payment_link', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Custom Input Fields (Addons) */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-pink-500/20 text-pink-500 flex items-center justify-center">
                                    <User className="w-5 h-5" />
                                </div>
                                <h3 className="text-white font-semibold">Custom Input Fields (Addons)</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setAddons([...addons, { name: 'Telegram Username', type: 'text', required: true }])}
                                className="flex items-center gap-1 text-xs text-pink-500 hover:text-pink-400 font-medium"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Add Field
                            </button>
                        </div>

                        {addons.length === 0 ? (
                            <div className="text-center py-6 border border-dashed border-gray-800 rounded-lg">
                                <p className="text-gray-500 text-xs text-center px-4 italic">No custom fields defined. Use this to collect extra info like Telegram usernames during checkout.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {addons.map((addon, idx) => (
                                    <div key={idx} className="flex flex-wrap md:flex-nowrap items-center gap-3 p-3 bg-[#1F2937]/30 rounded-lg border border-gray-800">
                                        <div className="flex-1 min-w-[150px]">
                                            <input
                                                type="text"
                                                className="w-full bg-[#0D1117] text-white text-xs rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-pink-500 border border-gray-700"
                                                placeholder="Field Label (e.g. Telegram Username)"
                                                value={addon.name}
                                                onChange={(e) => {
                                                    const newAddons = [...addons];
                                                    newAddons[idx].name = e.target.value;
                                                    setAddons(newAddons);
                                                }}
                                            />
                                        </div>
                                        <div className="w-full md:w-32">
                                            <select
                                                className="w-full bg-[#0D1117] text-white text-xs rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-pink-500 border border-gray-700"
                                                value={addon.type}
                                                onChange={(e) => {
                                                    const newAddons = [...addons];
                                                    newAddons[idx].type = e.target.value;
                                                    setAddons(newAddons);
                                                }}
                                            >
                                                <option value="text">Text Entry</option>
                                                <option value="email">Email</option>
                                                <option value="textarea">Multi-line</option>
                                            </select>
                                        </div>
                                        <label className="flex items-center gap-2 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                className="rounded bg-gray-700 border-gray-600 accent-pink-600 w-3.5 h-3.5"
                                                checked={addon.required}
                                                onChange={(e) => {
                                                    const newAddons = [...addons];
                                                    newAddons[idx].required = e.target.checked;
                                                    setAddons(newAddons);
                                                }}
                                            />
                                            <span className="text-xs text-gray-400">Required</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setAddons(addons.filter((_, i) => i !== idx))}
                                            className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <p className="text-xs text-gray-500">Manage custom checkout requirements for this product.</p>
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

                    {/* Product Gallery */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                            <h3 className="text-white font-semibold">Product Gallery</h3>
                            <button
                                type="button"
                                onClick={() => openMediaModal('gallery')}
                                className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded hover:bg-purple-700 transition"
                            >
                                Add Images
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {galleryImages.map((img) => (
                                <div key={img.id} className="relative group aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                                    <img src={getMediaUrl((img as any).url || img.source_url)} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveGalleryImage(img.id)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            {galleryImages.length === 0 && (
                                <div className="col-span-full text-center py-8 text-gray-500 text-sm">
                                    No images in gallery.
                                </div>
                            )}
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

            {/* Success Modal */}
            <SuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                title="Product Updated"
                message="Your changes have been saved successfully."
                confirmText="Continue Editing"
                onConfirm={() => setSuccessModal(false)}
                secondaryText="Back to Products"
                onSecondary={() => router.push('/admin/products')}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                confirmText="Delete"
                isDestructive
            />

            <MediaPickerModal
                isOpen={showMediaModal}
                onClose={() => setShowMediaModal(false)}
                onSelect={handleMediaSelect}
                title={mediaModalMode === 'featured' ? 'Select Featured Image' : 'Add to Gallery'}
            />

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                message={errorModal.message}
            />
        </div>
    );
}
