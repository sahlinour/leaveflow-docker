<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bank_documents', function (Blueprint $table) {
            $table->string('reference', 150)
                ->after('id');

            $table->unique('reference');
        });
    }

    public function down(): void
    {
        Schema::table('bank_documents', function (Blueprint $table) {
            $table->dropUnique('bank_documents_reference_unique');
            $table->dropColumn('reference');
        });
    }
};