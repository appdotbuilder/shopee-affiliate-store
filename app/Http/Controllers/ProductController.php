<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request)
    {
        $query = Product::active();

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Search by name
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort products
        $sortBy = $request->get('sort', 'created_at');
        $sortOrder = $request->get('order', 'desc');
        
        if (in_array($sortBy, ['name', 'price', 'rating', 'created_at'])) {
            $query->orderBy($sortBy, $sortOrder);
        }

        $products = $query->paginate(12)->appends($request->query());
        
        // Append formatted attributes to each product
        $products->getCollection()->each(function ($product) {
            $product->append(['formatted_price', 'formatted_original_price', 'discount_percentage']);
        });
        
        // Get unique categories for filter
        $categories = Product::active()
            ->select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'category' => $request->category,
                'search' => $request->search,
                'sort' => $sortBy,
                'order' => $sortOrder,
            ],
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        if (!$product->is_active) {
            abort(404);
        }

        // Get related products from same category
        $relatedProducts = Product::active()
            ->where('category', $product->category)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get()
            ->each(function ($relatedProduct) {
                $relatedProduct->append(['formatted_price', 'formatted_original_price', 'discount_percentage']);
            });
        
        // Append formatted attributes to main product
        $product->append(['formatted_price', 'formatted_original_price', 'discount_percentage']);

        return Inertia::render('products/show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}