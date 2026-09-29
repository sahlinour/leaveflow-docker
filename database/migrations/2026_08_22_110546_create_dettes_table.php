<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dettes', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('caisse_id')
                ->constrained('caisses')
                ->cascadeOnDelete();

            $table->foreignUuid('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->date('date_dette');

            $table->string('nom_complet');

            $table->decimal('montant', 10, 2);

            $table->timestamps();
            $table->softDeletes();

            $table->index(
                'caisse_id',
                'dettes_caisse_id_index'
            );

            $table->index(
                ['user_id', 'date_dette'],
                'dettes_user_date_index'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dettes');
    }
};