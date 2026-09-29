<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('caisses', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->date('date_caisse');
            $table->string('reference')->unique();
            $table->decimal('fond_caisse', 10, 2)
                ->default(0);

            $table->decimal('total_caisse', 10, 2)
                ->default(0);

            $table->decimal('total_dettes', 10, 2)
                ->default(0);

            $table->decimal('total_general', 10, 2)
                ->default(0);

            $table->decimal('solde_final', 10, 2)
                ->default(0);

            $table->enum('statut', [
                'ouverte',
                'cloturee',
            ])->default('ouverte');

            $table->timestamp('date_cloture')
                ->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->unique(
                ['user_id', 'date_caisse'],
                'caisses_user_date_unique'
            );

            $table->index(
                ['user_id', 'statut'],
                'caisses_user_statut_index'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('caisses');
    }
};
