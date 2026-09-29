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
        Schema::table('demande_conges', function (Blueprint $table) {
            $table->enum('statut', [
                'En attente',
                'Approuvée',
                'Refusée',
                'Annulée',
            ])->default('En attente')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('demande_conges', function (Blueprint $table) {
            $table->enum('statut', [
                'En attente',
                'Approuvée',
                'Refusée',
            ])->default('En attente')->change();
        });
    }
};
