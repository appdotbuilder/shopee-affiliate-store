import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ProductGrid } from '@/components/product-grid';

interface Product {
    id: number;
    name: string;
    price: number;
    original_price?: number;
    image_url: string;
    rating: number;
    review_count: number;
    category: string;
    shopee_url: string;
    tags?: string[];
    formatted_price: string;
    formatted_original_price?: string;
    discount_percentage?: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Filters {
    category?: string;
    search?: string;
    sort: string;
    order: string;
}

interface Props {
    products: PaginatedProducts;
    categories: string[];
    filters: Filters;
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/products', { 
            ...filters, 
            search: searchTerm || undefined 
        }, { 
            preserveState: true, 
            preserveScroll: true 
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters };
        if (value) {
            newFilters[key as keyof Filters] = value;
        } else {
            delete newFilters[key as keyof Filters];
        }
        
        router.get('/products', newFilters, { 
            preserveState: true, 
            preserveScroll: true 
        });
    };

    const handleSortChange = (sort: string, order: string) => {
        router.get('/products', { 
            ...filters, 
            sort, 
            order 
        }, { 
            preserveState: true, 
            preserveScroll: true 
        });
    };

    const seoData = {
        title: `🛍️ Semua Produk - ShopeeLink | ${products.total.toLocaleString('id-ID')} Produk Berkualitas`,
        description: `Jelajahi ${products.total.toLocaleString('id-ID')} produk berkualitas dengan harga terbaik. Filter berdasarkan kategori, rating, dan harga untuk menemukan produk yang Anda inginkan.`,
        url: typeof window !== 'undefined' ? window.location.href : '',
    };

    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content="produk shopee, belanja online, toko online, produk murah, kategori produk" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={seoData.url} />
                <meta property="og:title" content={seoData.title} />
                <meta property="og:description" content={seoData.description} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content={seoData.url} />
                <meta property="twitter:title" content={seoData.title} />
                <meta property="twitter:description" content={seoData.description} />

                <link rel="canonical" href={seoData.url} />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">S</span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">ShopeeLink</span>
                                </Link>
                            </div>
                            
                            <nav className="hidden md:flex items-center space-x-8">
                                <Link 
                                    href="/" 
                                    className="text-gray-700 hover:text-orange-500"
                                >
                                    Beranda
                                </Link>
                                <Link 
                                    href="/products" 
                                    className="text-gray-900 hover:text-orange-500 font-medium"
                                >
                                    Semua Produk
                                </Link>
                            </nav>

                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-orange-500"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    Daftar
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            🛍️ Semua Produk
                        </h1>
                        <p className="text-gray-600">
                            Menampilkan {products.total.toLocaleString('id-ID')} produk berkualitas
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div>
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
                                    >
                                        🔍
                                    </button>
                                </form>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <select
                                    value={filters.category || ''}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">Semua Kategori</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort Options */}
                            <div>
                                <select
                                    value={`${filters.sort}-${filters.order}`}
                                    onChange={(e) => {
                                        const [sort, order] = e.target.value.split('-');
                                        handleSortChange(sort, order);
                                    }}
                                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="created_at-desc">Terbaru</option>
                                    <option value="rating-desc">Rating Tertinggi</option>
                                    <option value="price-asc">Harga Terendah</option>
                                    <option value="price-desc">Harga Tertinggi</option>
                                    <option value="name-asc">Nama A-Z</option>
                                </select>
                            </div>

                            {/* Clear Filters */}
                            <div>
                                <Link
                                    href="/products"
                                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center block"
                                >
                                    Reset Filter
                                </Link>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(filters.category || filters.search) && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {filters.category && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                                        Kategori: {filters.category}
                                        <button
                                            onClick={() => handleFilterChange('category', '')}
                                            className="ml-2 text-orange-600 hover:text-orange-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {filters.search && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                        Pencarian: "{filters.search}"
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                handleFilterChange('search', '');
                                            }}
                                            className="ml-2 text-blue-600 hover:text-blue-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Products Grid */}
                    <ProductGrid products={products.data} />

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <div className="flex justify-center mt-8">
                            <nav className="flex items-center space-x-2">
                                {products.links.map((link, index) => {
                                    if (!link.url) {
                                        return (
                                            <span
                                                key={index}
                                                className="px-3 py-2 text-gray-400 cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 rounded-lg transition-colors ${
                                                link.active
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-300'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </nav>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}