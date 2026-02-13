'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Package,
    RefreshCcw,
    ExternalLink
} from 'lucide-react';
import { adminProductService as productsService, WCProductRead } from '@/lib/admin-api';
import { ConfirmModal } from '@/components/admin/Modals';

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<WCProductRead[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('any');
    const limit = 50;

    // Modal State
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, productId: number | null }>({ isOpen: false, productId: null });

    useEffect(() => {
        fetchProducts();
    }, [page, statusFilter]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const skip = (page - 1) * limit;
            const status = statusFilter;
            const data = await productsService.getAll(status, limit, skip);
            if (Array.isArray(data)) {
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        setDeleteModal({ isOpen: true, productId: id });
    };

    const confirmDelete = async () => {
        if (!deleteModal.productId) return;
        const product = products.find(p => p.id === deleteModal.productId);
        const isCurrentlyTrashed = product?.status === 'trash';

        try {
            await productsService.delete(deleteModal.productId, isCurrentlyTrashed);
            setProducts(products.filter(p => p.id !== deleteModal.productId));
            setDeleteModal({ isOpen: false, productId: null });
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    const handleRestore = async (id: number) => {
        try {
            await productsService.update(id, { status: 'publish' });
            fetchProducts();
        } catch (error) {
            console.error("Failed to restore product", error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white">Products</h1>
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="bg-[#111827] text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-purple-500 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        className="bg-[#111827] text-white text-sm rounded-lg px-3 py-2 border border-gray-800 focus:outline-none focus:border-purple-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="any">All Status</option>
                        <option value="publish">Published</option>
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="trash">Trash</option>
                    </select>
                    <Link
                        href="/admin/products/add"
                        className="flex items-center gap-2 px-4 py-2 bg-[#d946ef] hover:bg-[#c026d3] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Product</span>
                    </Link>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h3 className="text-white font-semibold">All Products</h3>
                    <span className="text-xs text-purple-400">Total: {products.length}</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase bg-[#1F2937]/50">
                                <th className="p-4 w-10">
                                    <input type="checkbox" className="rounded bg-gray-700 border-gray-600 accent-purple-600" />
                                </th>
                                <th className="p-4 font-medium flex items-center gap-2 cursor-pointer hover:text-white">
                                    Product Name <ArrowUpDown className="w-3 h-3" />
                                </th>
                                <th className="p-4 font-medium">SKU</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Stock</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">Loading products...</td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        No products found. Click "Add Product" to create one.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors group">
                                        <td className="p-4">
                                            <input type="checkbox" className="rounded bg-gray-700 border-gray-600 accent-purple-600" />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-500 flex items-center justify-center">
                                                    <Package className="w-5 h-5" />
                                                </div>
                                                <span className="text-white font-medium">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400">{product.sku || '-'}</td>
                                        <td className="p-4 text-gray-400 font-medium">
                                            {product.sale_price ? (
                                                <span>
                                                    <span className="line-through text-gray-600">${product.regular_price}</span>
                                                    <span className="text-green-400 ml-2">${product.sale_price}</span>
                                                </span>
                                            ) : (
                                                `$${product.price || '0.00'}`
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-400">
                                            {product.stock_status === 'instock' ? (
                                                <span className="text-green-500">{product.stock_quantity || '∞'}</span>
                                            ) : (
                                                <span className="text-red-500">Out of stock</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border ${product.status === 'publish'
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                : product.status === 'trash'
                                                    ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'publish' ? 'bg-green-500' : product.status === 'trash' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                                                {product.status === 'publish' ? 'Active' : (product.status ? product.status.charAt(0).toUpperCase() + product.status.slice(1) : 'Unknown')}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/product/${(product.slug || product.name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || product.id}`}
                                                    target="_blank"
                                                    className="p-1.5 text-gray-400 hover:text-cyan-400 hover:bg-gray-700 rounded transition-colors"
                                                    title="View"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <Link href={`/admin/products/${product.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                {product.status === 'trash' && (
                                                    <button
                                                        onClick={() => handleRestore(product.id)}
                                                        className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded transition-colors"
                                                        title="Restore"
                                                    >
                                                        <RefreshCcw className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteClick(product.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                                    title={product.status === 'trash' ? "Delete Permanently" : "Move to Trash"}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-800 text-sm text-gray-400">
                    <div>Showing {filteredProducts.length} results</div>
                    <div className="flex items-center gap-2">
                        <span>Rows per page: {limit}</span>
                        <div className="flex gap-1 ml-4">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                className="p-1 hover:bg-gray-700 rounded"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, productId: null })}
                onConfirm={confirmDelete}
                title={deleteModal.productId && products.find(p => p.id === deleteModal.productId)?.status === 'trash' ? "Delete Permanently" : "Move to Trash"}
                message={deleteModal.productId && products.find(p => p.id === deleteModal.productId)?.status === 'trash'
                    ? "Are you sure you want to permanently delete this product? This action is irreversible."
                    : "Are you sure you want to move this product to trash? You can restore it later."}
                isDestructive={true}
            />
        </div>
    );
}
