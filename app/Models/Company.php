<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Company extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'nom',
        'adresse',
        'logo',
        'type',
    ];

    protected $casts = [
        'type' => 'boolean',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
    
    public function contraintesConges()
    {
        return $this->hasMany(ContrainteConge::class);
    }

    public function periodesBloquees()
    {
        return $this->hasMany(PeriodeBloquee::class);
    }
    
    public function companyBanks()
    {
        return $this->hasMany(CompanyBank::class);
    }

    public function clients()
    {
        return $this->hasMany(Client::class);
    }
}
