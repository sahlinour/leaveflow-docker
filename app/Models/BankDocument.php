<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\User;

class BankDocument extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'bank_documents';

    protected $fillable = [
        'reference',
        'company_bank_id',
        'created_by',
        'montant',
        'montant_en_lettres',
        'date_virement',
        'date_document',
        'document_path',
    ];
    protected $casts = [
        'montant' => 'decimal:2',
        'date_virement' => 'date',
        'date_document' => 'date',
    ];

    public function companyBank()
    {
        return $this->belongsTo(CompanyBank::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
