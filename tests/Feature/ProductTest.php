<?php

use App\Models\Product;
use App\Models\User;

beforeEach(function () {
    // Create some test products
    Product::factory()->create([
        'name' => 'Test Product 1',
        'category' => 'Electronics',
        'is_active' => true,
        'tags' => ['trending'],
    ]);
    
    Product::factory()->create([
        'name' => 'Test Product 2',
        'category' => 'Fashion',
        'is_active' => true,
        'tags' => ['new'],
    ]);
    
    Product::factory()->create([
        'name' => 'Inactive Product',
        'category' => 'Electronics',
        'is_active' => false,
    ]);
});

test('home page loads successfully', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->has('featuredProducts')
            ->has('categories')
            ->has('totalProducts')
    );
});

test('products index loads successfully', function () {
    $response = $this->get('/products');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('products/index')
            ->has('products')
            ->has('categories')
            ->has('filters')
    );
});

test('products can be filtered by category', function () {
    $response = $this->get('/products?category=Electronics');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->where('filters.category', 'Electronics')
    );
});

test('products can be searched', function () {
    $response = $this->get('/products?search=Test Product 1');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->where('filters.search', 'Test Product 1')
    );
});

test('products can be sorted', function () {
    $response = $this->get('/products?sort=name&order=asc');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->where('filters.sort', 'name')
            ->where('filters.order', 'asc')
    );
});

test('product detail loads successfully', function () {
    $product = Product::where('is_active', true)->first();
    
    $response = $this->get("/products/{$product->id}");

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('products/show')
            ->where('product.id', $product->id)
            ->has('relatedProducts')
    );
});

test('inactive product returns 404', function () {
    $product = Product::where('is_active', false)->first();
    
    $response = $this->get("/products/{$product->id}");

    $response->assertStatus(404);
});

test('product model has correct attributes', function () {
    $product = Product::factory()->create([
        'price' => 100000,
        'original_price' => 150000,
        'rating' => 4.5,
        'review_count' => 100,
    ]);

    expect($product->formatted_price)->toBe('Rp 100.000');
    expect($product->formatted_original_price)->toBe('Rp 150.000');
    expect($product->discount_percentage)->toBe(33);
});

test('product scope active works', function () {
    $activeProducts = Product::active()->count();
    $totalActiveProducts = Product::where('is_active', true)->count();
    
    expect($activeProducts)->toBe($totalActiveProducts);
});

test('home page shows featured products', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('featuredProducts')
            ->has('newProducts')
            ->has('discountProducts')
    );
});

test('product detail shows correct seo tags', function () {
    $product = Product::where('is_active', true)->first();
    
    $response = $this->get("/products/{$product->id}");

    $response->assertStatus(200);
    $response->assertSee($product->name, false);
});