<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample products
        Product::factory(50)->create();

        // Create some featured products with specific data
        Product::create([
            'name' => 'iPhone 15 Pro Max 256GB',
            'description' => 'iPhone terbaru dengan teknologi A17 Pro chip, kamera 48MP dengan zoom 5x, dan layar Super Retina XDR 6.7 inch.',
            'price' => 18999000,
            'original_price' => 19999000,
            'image_url' => 'https://via.placeholder.com/300x300/1D4ED8/FFFFFF?text=iPhone',
            'rating' => 4.8,
            'review_count' => 2547,
            'category' => 'Handphone & Aksesoris',
            'shopee_url' => 'https://shopee.co.id/iPhone-15-Pro-Max',
            'shopee_product_id' => '1234567890',
            'is_active' => true,
            'tags' => ['trending', 'bestseller', 'premium'],
        ]);

        Product::create([
            'name' => 'MacBook Air M2 13 inch',
            'description' => 'Laptop Apple terbaru dengan chip M2, layar Liquid Retina 13.6 inch, dan daya tahan baterai hingga 18 jam.',
            'price' => 16999000,
            'original_price' => 17999000,
            'image_url' => 'https://via.placeholder.com/300x300/6B7280/FFFFFF?text=MacBook',
            'rating' => 4.9,
            'review_count' => 1823,
            'category' => 'Komputer & Laptop',
            'shopee_url' => 'https://shopee.co.id/MacBook-Air-M2',
            'shopee_product_id' => '1234567891',
            'is_active' => true,
            'tags' => ['new', 'premium', 'bestseller'],
        ]);

        Product::create([
            'name' => 'Samsung Galaxy S24 Ultra',
            'description' => 'Smartphone flagship Samsung dengan S Pen, kamera 200MP, dan AI terdepan untuk produktivitas maksimal.',
            'price' => 17999000,
            'original_price' => 18999000,
            'image_url' => 'https://via.placeholder.com/300x300/7C3AED/FFFFFF?text=Galaxy',
            'rating' => 4.7,
            'review_count' => 3241,
            'category' => 'Handphone & Aksesoris',
            'shopee_url' => 'https://shopee.co.id/Samsung-Galaxy-S24-Ultra',
            'shopee_product_id' => '1234567892',
            'is_active' => true,
            'tags' => ['trending', 'new', 'premium'],
        ]);
    }
}