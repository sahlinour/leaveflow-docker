<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Company;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ContrainteConge extends Model
{
    use SoftDeletes, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'company_id',
        'max_employes_simultanes',
        'duree_max_conge',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    
}
