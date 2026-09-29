<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dette extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'dettes';

    protected $fillable = [
        'caisse_id',
        'user_id',
        'client_id',
        'date_dette',
        'montant',
    ];

    protected $casts = [
        'date_dette' => 'date',
        'montant' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function caisse()
    {
        return $this->belongsTo(Caisse::class, 'caisse_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
}