<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class HistoriqueConge extends Model
{
    use HasUuids;

    protected $table = 'historique_conges';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'demande_conge_id',
        'action',
        'ancien_statut',
        'nouveau_statut',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function demandeConge()
    {
        return $this->belongsTo(DemandeConge::class, 'demande_conge_id');
    }
}
