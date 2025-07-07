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
        Schema::create('tech_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category')->unique();
            $table->text('description')->nullable();
            $table->string('icon')->nullable(); // Optional: store icon component/class name
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('technologies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tech_category_id')->constrained('tech_categories')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technologies');
        Schema::dropIfExists('tech_categories');
    }
};
