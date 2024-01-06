<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email', 191)->collation('utf8mb4_unicode_ci');
            $table->string('token', 191)->collation('utf8mb4_unicode_ci');
            $table->timestamp('created_at')->nullable();
            $table->primary(['email', 'token']);
        });
    }
    


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('password_reset_tokens');
    }
};
