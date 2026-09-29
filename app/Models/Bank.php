<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CompanyBank;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Bank extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'banks';

    protected $fillable = [
        'nom',
        'template_path',
    ];

    public function companyBanks()
    {
        return $this->hasMany(CompanyBank::class);
    }
}
