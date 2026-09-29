<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('caisse_details', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('caisse_id')
                ->constrained('caisses')
                ->cascadeOnDelete();

            $table->decimal('coupure', 10, 2);

            $table->unsignedInteger('quantite')
                ->default(0);

            
            $table->decimal('montant', 10, 2)
                ->default(0);

            $table->timestamps();
            $table->unique(
                ['caisse_id', 'coupure'],
                'caisse_details_caisse_coupure_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('caisse_details');
    }
};