<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured products.
     */
    public function index()
    {
        // Get featured products (trending and bestseller)
        $featuredProducts = Product::active()
            ->where(function ($query) {
                $query->whereJsonContains('tags', 'trending')
                      ->orWhereJsonContains('tags', 'bestseller');
            })
            ->orderBy('rating', 'desc')
            ->limit(8)
            ->get()
            ->each(function ($product) {
                $product->append(['formatted_price', 'formatted_original_price', 'discount_percentage']);
            });

        // Get new products
        $newProducts = Product::active()
            ->whereJsonContains('tags', 'new')
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->each(function ($product) {
                $product->append(['formatted_price', 'formatted_original_price', 'discount_percentage']);
            });

        // Get categories with product count
        $categories = Product::active()
            ->selectRaw('category, COUNT(*) as product_count')
            ->groupBy('category')
            ->orderBy('product_count', 'desc')
            ->limit(8)
            ->get();

        // Get products with highest discount
        $discountProducts = Product::active()
            ->whereNotNull('original_price')
            ->whereRaw('CAST(original_price AS DECIMAL) > CAST(price AS DECIMAL)')
            ->orderByRaw('((CAST(original_price AS DECIMAL) - CAST(price AS DECIMAL)) / CAST(original_price AS DECIMAL)) DESC')
            ->limit(6)
            ->get()
            ->each(function ($product) {
                $product->append(['formatted_price', 'formatted_original_price', 'discount_percentage']);
            });

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
            'newProducts' => $newProducts,
            'categories' => $categories,
            'discountProducts' => $discountProducts,
            'totalProducts' => Product::active()->count(),
        ]);
    }
}