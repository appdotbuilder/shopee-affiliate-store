import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ProductGrid } from '@/components/product-grid';
import { CategoryGrid } from '@/components/category-grid';

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

interface Category {
    category: string;
    product_count: number;
}

interface Props {
    featuredProducts: Product[];
    newProducts: Product[];
    categories: Category[];
    discountProducts: Product[];
    totalProducts: number;
    [key: string]: unknown;
}

export default function Welcome({ 
    featuredProducts, 
    newProducts, 
    categories, 
    discountProducts, 
    totalProducts 
}: Props) {
    const seoData = {
        title: "🛒 ShopeeLink - Toko Afiliasi Shopee Terpercaya",
        description: "Temukan ribuan produk berkualitas dengan harga terbaik melalui platform afiliasi Shopee kami. Dapatkan cashback dan penawaran eksklusif setiap pembelian!",
        url: typeof window !== 'undefined' ? window.location.href : '',
        image: '/logo.svg',
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": `${seoData.url}#website`,
                "url": seoData.url,
                "name": "ShopeeLink",
                "description": seoData.description,
                "publisher": {
                    "@id": `${seoData.url}#organization`
                },
                "potentialAction": [
                    {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": `${seoData.url}products?search={search_term_string}`
                        },
                        "query-input": "required name=search_term_string"
                    }
                ]
            },
            {
                "@type": "Organization",
                "@id": `${seoData.url}#organization`,
                "name": "ShopeeLink",
                "url": seoData.url,
                "logo": {
                    "@type": "ImageObject",
                    "inLanguage": "id-ID",
                    "url": `${seoData.url}${seoData.image}`,
                    "contentUrl": `${seoData.url}${seoData.image}`,
                    "width": 512,
                    "height": 512,
                    "caption": "ShopeeLink"
                },
                "image": {
                    "@id": `${seoData.url}${seoData.image}`
                },
                "sameAs": [
                    "https://shopee.co.id"
                ]
            }
        ]
    };

    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content="shopee, afiliasi, toko online, belanja online, cashback, diskon, produk murah" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={seoData.url} />
                <meta property="og:title" content={seoData.title} />
                <meta property="og:description" content={seoData.description} />
                <meta property="og:image" content={`${seoData.url}${seoData.image}`} />
                <meta property="og:locale" content="id_ID" />
                <meta property="og:site_name" content="ShopeeLink" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={seoData.url} />
                <meta property="twitter:title" content={seoData.title} />
                <meta property="twitter:description" content={seoData.description} />
                <meta property="twitter:image" content={`${seoData.url}${seoData.image}`} />

                {/* Additional SEO */}
                <meta name="robots" content="index, follow" />
                <meta name="author" content="ShopeeLink" />
                <link rel="canonical" href={seoData.url} />

                {/* JSON-LD Structured Data */}
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-50">
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
                                    className="text-gray-900 hover:text-orange-500 font-medium"
                                >
                                    Beranda
                                </Link>
                                <Link 
                                    href="/products" 
                                    className="text-gray-700 hover:text-orange-500"
                                >
                                    Semua Produk
                                </Link>
                                <Link 
                                    href="/products?sort=rating&order=desc" 
                                    className="text-gray-700 hover:text-orange-500"
                                >
                                    Terpopuler
                                </Link>
                                <Link 
                                    href="/products?sort=created_at&order=desc" 
                                    className="text-gray-700 hover:text-orange-500"
                                >
                                    Terbaru
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

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                🛒 ShopeeLink
                            </h1>
                            <p className="text-xl md:text-2xl mb-4 opacity-90">
                                Toko Afiliasi Shopee Terpercaya
                            </p>
                            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                                Temukan {totalProducts.toLocaleString('id-ID')}+ produk berkualitas dengan harga terbaik. 
                                Dapatkan cashback dan penawaran eksklusif setiap pembelian!
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/products"
                                    className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                                >
                                    🛍️ Mulai Belanja
                                </Link>
                                <Link
                                    href="/products?sort=rating&order=desc"
                                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors inline-flex items-center justify-center"
                                >
                                    ⭐ Produk Terpopuler
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Features */}
                    <section className="mb-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Harga Terbaik</h3>
                                <p className="text-gray-600">Bandingkan harga dan dapatkan penawaran terbaik dari Shopee</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🚚</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Pengiriman Cepat</h3>
                                <p className="text-gray-600">Gratis ongkir dan pengiriman cepat ke seluruh Indonesia</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎁</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Cashback & Bonus</h3>
                                <p className="text-gray-600">Dapatkan cashback dan voucher menarik setiap pembelian</p>
                            </div>
                        </div>
                    </section>

                    {/* Categories */}
                    <CategoryGrid categories={categories} className="mb-16" />

                    {/* Featured Products */}
                    {featuredProducts.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">🔥 Produk Unggulan</h2>
                                <Link
                                    href="/products?sort=rating&order=desc"
                                    className="text-orange-500 hover:text-orange-600 font-medium"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>
                            <ProductGrid products={featuredProducts} />
                        </section>
                    )}

                    {/* Discount Products */}
                    {discountProducts.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">💥 Diskon Besar-Besaran</h2>
                                <Link
                                    href="/products"
                                    className="text-orange-500 hover:text-orange-600 font-medium"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>
                            <ProductGrid products={discountProducts} />
                        </section>
                    )}

                    {/* New Products */}
                    {newProducts.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">✨ Produk Terbaru</h2>
                                <Link
                                    href="/products?sort=created_at&order=desc"
                                    className="text-orange-500 hover:text-orange-600 font-medium"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>
                            <ProductGrid products={newProducts} />
                        </section>
                    )}
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">S</span>
                                    </div>
                                    <span className="text-xl font-bold">ShopeeLink</span>
                                </div>
                                <p className="text-gray-400">
                                    Platform afiliasi Shopee terpercaya untuk belanja online yang aman dan menguntungkan.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-4">Produk</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="/products" className="hover:text-white">Semua Produk</Link></li>
                                    <li><Link href="/products?sort=rating&order=desc" className="hover:text-white">Terpopuler</Link></li>
                                    <li><Link href="/products?sort=created_at&order=desc" className="hover:text-white">Terbaru</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-4">Bantuan</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="#" className="hover:text-white">FAQ</a></li>
                                    <li><a href="#" className="hover:text-white">Cara Berbelanja</a></li>
                                    <li><a href="#" className="hover:text-white">Hubungi Kami</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-4">Akun</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="/login" className="hover:text-white">Masuk</Link></li>
                                    <li><Link href="/register" className="hover:text-white">Daftar</Link></li>
                                    <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 ShopeeLink. Semua hak dilindungi. Platform afiliasi resmi Shopee.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}