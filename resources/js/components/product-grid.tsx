import React from 'react';
import { ProductCard } from './product-card';

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
    products: Product[];
    title?: string;
    className?: string;
}

export function ProductGrid({ products, title, className = '' }: Props) {
    if (!products || products.length === 0) {
        return (
            <div className={`text-center py-12 ${className}`}>
                <div className="text-gray-500 text-lg">Tidak ada produk yang ditemukan</div>
            </div>
        );
    }

    return (
        <div className={className}>
            {title && (
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}