<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaisseDetail extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'caisse_details';

    protected $fillable = [
        'caisse_id',
        'coupure',
        'quantite',
        'montant',
    ];

    protected $casts = [
        'coupure' => 'decimal:2',
        'quantite' => 'integer',
        'montant' => 'decimal:2',
    ];

    public function caisse()
    {
        return $this->belongsTo(Caisse::class);
    }
}