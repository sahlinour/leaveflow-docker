<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Conge extends Model
{
    use SoftDeletes, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'annee',
        'solde_initial',
        'jours_utilise',
    ];

    public function user()
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function getSoldeRestantAttribute()
    {
        return $this->solde_initial - $this->jours_utilise;
    }
}
