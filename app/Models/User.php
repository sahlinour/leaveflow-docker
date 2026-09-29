<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


#[Fillable(['nom', 'email', 'password'])]
#[Hidden(['password', 'remember_token','two_factor_secret',])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'matricule',
        'prenom',
        'nom',
        'email',
        'password',
        'two_factor_secret',
        'two_factor_enabled',
        'two_factor_confirmed_at',
        'cin',
        'telephone',
        'adresse',
        'photo',
        'date_naissance',
        'sexe',
        'poste',
        'departement',
        'date_embauche',
        'statut',
        'role_id',
        'company_id',
    ];

    

    public function role() 
    {
        return $this->belongsTo(Role::class);
    }

    public function company() 
    {
        return $this->belongsTo(Company::class);
    }

     public function getFullNameAttribute() 
    {
        return "{$this->prenom} {$this->nom}";
    }

    public function conges() 
    {
        return $this->hasMany(Conge::class);
    }

    public function dernierConge()
    {
        return $this->hasOne(Conge::class)->latestOfMany('annee');
    }

    public function demandesConges()
    {
        return $this->hasMany(DemandeConge::class);
    }

    public function historiquesConges()
    {
        return $this->hasMany(HistoriqueConge::class);
    }
    
    public function bankDocuments()
    {
        return $this->hasMany(BankDocument::class, 'created_by');
    }

    public function caisses()
    {
        return $this->hasMany(Caisse::class);
    }

    public function comptesCourantsAssocies()
    {
        return $this->hasMany(CompteCourantAssocie::class);
    }
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'date_naissance' => 'date',
            'date_embauche' => 'date',
            'password' => 'hashed',
            'two_factor_secret' => 'encrypted',
            'two_factor_enabled' => 'boolean',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
}
