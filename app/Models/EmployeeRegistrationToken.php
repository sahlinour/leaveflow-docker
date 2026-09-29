<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class EmployeeRegistrationToken extends Model
{
    use HasUuids; 
    protected $fillable = [ 
        'token', 
        'company_id', 
        'role_id', 
        'created_by', 
        'expires_at', 
        'used_at', 
    ];
    protected $casts = [ 
        'expires_at' => 'datetime', 
        'used_at' => 'datetime', 
    ];

    public function company() 
    { 
        return $this->belongsTo(Company::class); 
    }
    public function role() 
    { 
        return $this->belongsTo(Role::class); 
    }
    public function creator() 
    { 
        return $this->belongsTo(User::class, 'created_by'); 
    }
    public function isExpired() 
    { 
        return now()->greaterThan($this->expires_at); 
    }
    public function isUsed() 
    { 
        return !is_null($this->used_at); 
    }
    public function isValid()
    {
        return !$this->isExpired();
    }
}
