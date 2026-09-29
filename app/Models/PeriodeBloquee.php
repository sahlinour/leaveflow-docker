<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class PeriodeBloquee extends Model
{
    use SoftDeletes, HasUuids; 
    public $incrementing = false; 
    protected $keyType = 'string'; 

    protected $fillable = [ 
        'company_id', 
        'date_debut', 
        'date_fin', 
        'motif', 
    ];

    protected $casts = [ 
        'date_debut' => 'date', 
        'date_fin' => 'date', 
    ]; 

    public function company() 
    { 
        return $this->belongsTo(Company::class); 
    }
}
