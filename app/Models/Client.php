<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'clients';

    protected $fillable = [
        'company_id',
        'nom',
        'prenom',
        'telephone',
        'email',
        'adresse',
    ];

    /**
     * Un client appartient à une company.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Un client peut avoir plusieurs dettes.
     */
    public function dettes()
    {
        return $this->hasMany(Dette::class);
    }
}