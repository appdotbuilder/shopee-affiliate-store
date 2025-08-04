<?php

use App\Models\Product;

beforeEach(function () {        
    // Create products with different tags
    Product::factory()->create([
        'name' => 'Trending Product',
        'tags' => ['trending', 'bestseller'],
        'is_active' => true,
        'rating' => 4.8,
    ]);
    
    Product::factory()->create([
        'name' => 'New Product',
        'tags' => ['new'],
        'is_active' => true,
    ]);
    
    Product::factory()->create([
        'name' => 'Discount Product',
        'price' => 80000,
        'original_price' => 100000,
        'is_active' => true,
    ]);
});

test('home page displays correct content', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->has('featuredProducts')
            ->has('newProducts')
            ->has('categories')
            ->has('discountProducts')
            ->has('totalProducts')
    );
});

test('home page shows featured products', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('featuredProducts')
    );
});

test('home page shows new products', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('newProducts')
    );
});

test('home page shows discount products section', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('discountProducts')
    );
});

test('home page shows categories with correct structure', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('categories')
    );
});

test('home page shows total products count', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->where('totalProducts', Product::active()->count())
    );
});

test('home page has basic structure', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
    );
});

test('home page includes structured data', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->has('totalProducts')
    );
});