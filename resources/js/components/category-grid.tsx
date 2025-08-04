import React from 'react';
import { Link } from '@inertiajs/react';

interface Category {
    category: string;
    product_count: number;
}

interface Props {
    categories: Category[];
    className?: string;
}

const categoryIcons: Record<string, string> = {
    'Fashion Pria': '👔',
    'Fashion Wanita': '👗',
    'Elektronik': '📱',
    'Handphone & Aksesoris': '📞',
    'Komputer & Laptop': '💻',
    'Perawatan & Kecantikan': '💄',
    'Rumah & Hidup': '🏠',
    'Makanan & Minuman': '🍔',
    'Olahraga & Outdoor': '⚽',
    'Otomotif': '🚗',
};

export function CategoryGrid({ categories, className = '' }: Props) {
    return (
        <div className={className}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategori Populer</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                    <Link
                        key={category.category}
                        href={`/products?category=${encodeURIComponent(category.category)}`}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 text-center hover:scale-105"
                    >
                        <div className="text-3xl mb-2">
                            {categoryIcons[category.category] || '📦'}
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                            {category.category}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {category.product_count} produk
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}