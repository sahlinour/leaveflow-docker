<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class CompanyBank extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'company_banks';

    protected $fillable = [
        'company_id',
        'bank_id',
        'numero_compte',
        'nom_beneficiaire',
        'numero_compte_beneficiaire',
        'ville',
        'motif',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

    public function bankDocuments()
    {
        return $this->hasMany(BankDocument::class);
    }
}
