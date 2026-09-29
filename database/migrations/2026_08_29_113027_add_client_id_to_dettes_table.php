<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('dettes', function (Blueprint $table) {
            $table->foreignUuid('client_id')
                ->nullable()
                ->after('user_id')
                ->constrained('clients')
                ->restrictOnDelete();

            $table->index('client_id', 'dettes_client_id_index');
        });
    }

    public function down(): void
    {
        Schema::table('dettes', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
            $table->dropIndex('dettes_client_id_index');
            $table->dropColumn('client_id');
        });
    }
};