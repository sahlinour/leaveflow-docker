<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompteCourantAssocie extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'compte_courant_associes';

    protected $fillable = [
        'user_id',
        'montant',
        'montant_retourne',
        'statut',
        'date_affectation',
        'date_retour',
        'commentaire',
    ];

    protected $casts = [
        'montant' => 'decimal:2',
        'montant_retourne' => 'decimal:2',
        'date_affectation' => 'date',
        'date_retour' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}