<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Caisse extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'caisses';

    protected $fillable = [
        'reference',
        'user_id',
        'date_caisse',
        'fond_caisse',
        'total_caisse',
        'total_dettes',
        'total_general',
        'solde_final',
        'statut',
        'date_cloture',
    ];

    protected $casts = [
        'date_caisse' => 'date',
        'date_cloture' => 'datetime',
        'fond_caisse' => 'decimal:2',
        'total_caisse' => 'decimal:2',
        'total_dettes' => 'decimal:2',
        'total_general' => 'decimal:2',
        'solde_final' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function details()
    {
        return $this->hasMany(CaisseDetail::class);
    }

    public function dettes()
    {
        return $this->hasMany(Dette::class);
    }
}