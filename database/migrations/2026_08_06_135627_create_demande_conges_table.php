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
        Schema::create('demande_conges', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('reference_demande')->unique();
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->date('date_debut');
            $table->date('date_fin');
            $table->integer('nombre_jours');
            $table->enum('type_conge',['Annuel','Maladie','Exceptionnel' , 'Sans solde'])->default('Annuel');
            $table->text('motif')->nullable();
            $table->string('justificatif') ->nullable();
            $table->enum('statut',['En attente','Approuvée','Refusée'])->default('En attente');
            $table->text('commentaire_admin') ->nullable();
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demande_conges');
    }
};
