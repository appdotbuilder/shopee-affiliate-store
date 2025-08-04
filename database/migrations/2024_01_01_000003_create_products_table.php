<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->text('description')->nullable()->comment('Product description');
            $table->decimal('price', 12, 2)->comment('Product price in IDR');
            $table->decimal('original_price', 12, 2)->nullable()->comment('Original price before discount');
            $table->string('image_url')->comment('Product image URL');
            $table->decimal('rating', 2, 1)->default(0)->comment('Product rating (0-5)');
            $table->integer('review_count')->default(0)->comment('Number of reviews');
            $table->string('category')->comment('Product category');
            $table->string('shopee_url')->comment('Shopee affiliate URL');
            $table->string('shopee_product_id')->comment('Shopee product ID');
            $table->boolean('is_active')->default(true)->comment('Product status');
            $table->json('tags')->nullable()->comment('Product tags');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('category');
            $table->index('price');
            $table->index('rating');
            $table->index('is_active');
            $table->index(['is_active', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};