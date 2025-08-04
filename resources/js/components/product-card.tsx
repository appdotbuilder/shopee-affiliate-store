import React from 'react';
import { Link } from '@inertiajs/react';

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

interface Props {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className = '' }: Props) {
    const handleShopeeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(product.shopee_url, '_blank', 'noopener,noreferrer');
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-400">★</span>);
        }
        
        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-400">☆</span>);
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
        }
        
        return stars;
    };

    return (
        <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                
                {/* Discount Badge */}
                {product.discount_percentage && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                        -{product.discount_percentage}%
                    </div>
                )}
                
                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {product.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className={`px-2 py-1 rounded-md text-xs font-medium ${
                                    tag === 'trending' ? 'bg-orange-500 text-white' :
                                    tag === 'bestseller' ? 'bg-green-500 text-white' :
                                    tag === 'new' ? 'bg-blue-500 text-white' :
                                    'bg-gray-500 text-white'
                                }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Category */}
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                
                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                    {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                        {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                        {product.rating} ({product.review_count.toLocaleString('id-ID')})
                    </span>
                </div>
                
                {/* Price */}
                <div className="mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-orange-600">
                            {product.formatted_price}
                        </span>
                        {product.formatted_original_price && (
                            <span className="text-sm text-gray-500 line-through">
                                {product.formatted_original_price}
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                    <Link
                        href={`/products/${product.id}`}
                        className="flex-1 px-3 py-2 border border-orange-500 text-orange-500 text-center rounded-md hover:bg-orange-50 transition-colors text-sm font-medium"
                    >
                        Detail
                    </Link>
                    <button
                        onClick={handleShopeeClick}
                        className="flex-1 px-3 py-2 bg-orange-500 text-white text-center rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
                    >
                        🛒 Lihat di Shopee
                    </button>
                </div>
            </div>
        </div>
    );
}