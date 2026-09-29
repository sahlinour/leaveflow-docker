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
        Schema::create('bank_documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('company_bank_id')->constrained('company_banks')->cascadeOnDelete();
            $table->foreignUuid('created_by')->constrained('users')->cascadeOnDelete();
            $table->decimal('montant', 15, 2);
            $table->text('montant_en_lettres');
            $table->date('date_virement');
            $table->date('date_document');
            $table->string('document_path');
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_documents');
    }
};
