<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Fashion Pria',
            'Fashion Wanita', 
            'Elektronik',
            'Handphone & Aksesoris',
            'Komputer & Laptop',
            'Perawatan & Kecantikan',
            'Rumah & Hidup',
            'Makanan & Minuman',
            'Olahraga & Outdoor',
            'Otomotif',
        ];

        $productNames = [
            'Kaos Polos Premium',
            'Sepatu Sneakers Casual',
            'Tas Ransel Anti Air',
            'Jam Tangan Digital',
            'Headphone Bluetooth',
            'Mouse Gaming RGB',
            'Keyboard Mechanical',
            'Powerbank 10000mAh',
            'Casing HP Anti Crack',
            'Charger Fast Charging',
            'Skincare Set Lengkap',
            'Parfum EDT 100ml',
            'Masker Wajah Korea',
            'Lipstik Matte Tahan Lama',
            'Serum Vitamin C',
            'Bantal Memory Foam',
            'Lampu LED Smart',
            'Dispenser Air Galon',
            'Rak Buku Minimalis',
            'Karpet Bulu Halus',
        ];

        $originalPrice = $this->faker->numberBetween(50000, 500000);
        $price = $this->faker->numberBetween(30000, $originalPrice);
        
        return [
            'name' => $this->faker->randomElement($productNames) . ' ' . $this->faker->word(),
            'description' => $this->faker->paragraph(3),
            'price' => $price,
            'original_price' => $originalPrice > $price ? $originalPrice : null,
            'image_url' => 'https://via.placeholder.com/300x300/FF6B35/FFFFFF?text=Product',
            'rating' => $this->faker->randomFloat(1, 3.0, 5.0),
            'review_count' => $this->faker->numberBetween(10, 5000),
            'category' => $this->faker->randomElement($categories),
            'shopee_url' => 'https://shopee.co.id/product/' . $this->faker->numberBetween(100000000, 999999999) . '/' . $this->faker->numberBetween(1000000000, 9999999999),
            'shopee_product_id' => $this->faker->numberBetween(1000000000, 9999999999),
            'is_active' => true,
            'tags' => $this->faker->randomElements(['trending', 'bestseller', 'new', 'discount', 'free-shipping'], random_int(1, 3)),
        ];
    }
}