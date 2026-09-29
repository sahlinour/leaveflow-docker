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
        Schema::create('company_banks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('company_id')->constrained('companies')->cascadeOnDelete();
            $table->foreignUuid('bank_id')->constrained('banks')->cascadeOnDelete();
            $table->string('numero_compte', 100);
            $table->string('nom_beneficiaire', 150);
            $table->string('numero_compte_beneficiaire', 100);
            $table->string('ville', 100);
            $table->string('motif', 255)->default('Virement ordinaire');
            $table->string('template_path')->nullable();

            $table->unique(['company_id', 'bank_id']);
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_banks');
    }
};
