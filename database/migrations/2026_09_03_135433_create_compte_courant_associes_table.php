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
        Schema::create('compte_courant_associes', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->decimal('montant', 12, 2);

            $table->decimal('montant_retourne', 12, 2)
                ->default(0);

            $table->enum('statut', [
                'actif',
                'retour_partiel',
                'retourne',
            ])->default('actif');

            $table->date('date_affectation');

            $table->date('date_retour')
                ->nullable();

            $table->text('commentaire')
                ->nullable();

            $table->timestamps();

            $table->index(['user_id', 'statut']);
            $table->index('date_affectation');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compte_courant_associes');
    }
};
