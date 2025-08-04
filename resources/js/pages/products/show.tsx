import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ProductGrid } from '@/components/product-grid';

interface Product {
    id: number;
    name: string;
    description?: string;
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

interface Props {
    product: Product;
    relatedProducts: Product[];
    [key: string]: unknown;
}

export default function ProductShow({ product, relatedProducts }: Props) {
    const handleShopeeClick = () => {
        window.open(product.shopee_url, '_blank', 'noopener,noreferrer');
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
        }
        
        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-400 text-xl">☆</span>);
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="text-gray-300 text-xl">☆</span>);
        }
        
        return stars;
    };

    const seoData = {
        title: `${product.name} - ShopeeLink | ${product.formatted_price}`,
        description: product.description || `Beli ${product.name} dengan harga ${product.formatted_price} di Shopee. Rating ${product.rating}/5 dari ${product.review_count.toLocaleString('id-ID')} ulasan. Kategori ${product.category}.`,
        url: typeof window !== 'undefined' ? window.location.href : '',
        image: product.image_url,
    };

    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description || `${product.name} - ${product.category}`,
        "image": product.image_url,
        "category": product.category,
        "brand": {
            "@type": "Brand",
            "name": "Shopee"
        },
        "offers": {
            "@type": "Offer",
            "url": product.shopee_url,
            "priceCurrency": "IDR",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Shopee"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.review_count,
            "bestRating": 5,
            "worstRating": 1
        }
    };

    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta name="keywords" content={`${product.name}, ${product.category}, shopee, beli online, ${product.formatted_price}`} />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="product" />
                <meta property="og:url" content={seoData.url} />
                <meta property="og:title" content={seoData.title} />
                <meta property="og:description" content={seoData.description} />
                <meta property="og:image" content={seoData.image} />
                <meta property="product:price:amount" content={product.price.toString()} />
                <meta property="product:price:currency" content="IDR" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={seoData.url} />
                <meta property="twitter:title" content={seoData.title} />
                <meta property="twitter:description" content={seoData.description} />
                <meta property="twitter:image" content={seoData.image} />

                <link rel="canonical" href={seoData.url} />

                {/* JSON-LD Product Schema */}
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
                />
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
                                    className="text-gray-700 hover:text-orange-500"
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
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm">
                        <div className="flex items-center space-x-2 text-gray-500">
                            <Link href="/" className="hover:text-orange-500">Beranda</Link>
                            <span>›</span>
                            <Link href="/products" className="hover:text-orange-500">Produk</Link>
                            <span>›</span>
                            <Link 
                                href={`/products?category=${encodeURIComponent(product.category)}`}
                                className="hover:text-orange-500"
                            >
                                {product.category}
                            </Link>
                            <span>›</span>
                            <span className="text-gray-900">{product.name}</span>
                        </div>
                    </nav>

                    {/* Product Detail */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                            {/* Product Image */}
                            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                {/* Category */}
                                <div>
                                    <Link
                                        href={`/products?category=${encodeURIComponent(product.category)}`}
                                        className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                                    >
                                        {product.category}
                                    </Link>
                                </div>

                                {/* Product Name */}
                                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                                {/* Rating */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center">
                                        {renderStars(product.rating)}
                                    </div>
                                    <span className="text-lg font-semibold text-gray-900">
                                        {product.rating}
                                    </span>
                                    <span className="text-gray-600">
                                        ({product.review_count.toLocaleString('id-ID')} ulasan)
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl font-bold text-orange-600">
                                            {product.formatted_price}
                                        </span>
                                        {product.formatted_original_price && (
                                            <span className="text-lg text-gray-500 line-through">
                                                {product.formatted_original_price}
                                            </span>
                                        )}
                                        {product.discount_percentage && (
                                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                -{product.discount_percentage}%
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Tags */}
                                {product.tags && product.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    tag === 'trending' ? 'bg-orange-100 text-orange-800' :
                                                    tag === 'bestseller' ? 'bg-green-100 text-green-800' :
                                                    tag === 'new' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Description */}
                                {product.description && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Deskripsi Produk</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>
                                )}

                                {/* Action Button */}
                                <div className="pt-4">
                                    <button
                                        onClick={handleShopeeClick}
                                        className="w-full bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-3"
                                    >
                                        🛒 Beli Sekarang di Shopee
                                    </button>
                                    <p className="text-sm text-gray-500 mt-2 text-center">
                                        Anda akan diarahkan ke halaman produk di Shopee
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <span className="text-green-500">✓</span>
                                        <span>Garansi resmi dari Shopee</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <span className="text-green-500">✓</span>
                                        <span>Gratis ongkir untuk pembelian tertentu</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <span className="text-green-500">✓</span>
                                        <span>Bisa COD (Cash On Delivery)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <span className="text-green-500">✓</span>
                                        <span>Tersedia cashback dan voucher</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    🔗 Produk Terkait dari {product.category}
                                </h2>
                                <Link
                                    href={`/products?category=${encodeURIComponent(product.category)}`}
                                    className="text-orange-500 hover:text-orange-600 font-medium"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>
                            <ProductGrid products={relatedProducts} />
                        </section>
                    )}
                </main>
            </div>
        </>
    );
}