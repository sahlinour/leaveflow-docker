<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class DemandeConge extends Model
{
    use SoftDeletes, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'reference_demande',
        'user_id',
        'date_debut',
        'date_fin',
        'nombre_jours',
        'type_conge',
        'motif',
        'justificatif',
        'statut',
        'commentaire_admin',
    ];


    public function user()
    {
        return $this->belongsTo(User::class)->withTrashed();
    }
    public function conge()
    {
        return $this->hasOne(Conge::class,'user_id','user_id')->where('annee', now()->year);
    }

    public function historiques(): HasMany
    {
        return $this->hasMany(HistoriqueConge::class, 'demande_conge_id');
    }
}
