<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('slug', 'admin')->firstOrFail();
        $employeRole = Role::where('slug', 'employe')->firstOrFail();

        $company1 = Company::firstOrFail();

        /*
        |--------------------------------------------------------------------------
        | ADMIN
        |--------------------------------------------------------------------------
        */
        User::create([
            'id' => Str::uuid(),
            'matricule' => 'ADM-0001',

            'prenom' => 'Nour',
            'nom' => 'Admin',

            'cin' => 'AB123456',
            'date_naissance' => '2000-01-01',
            'sexe' => 'femme',

            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),

            'telephone' => '0612345678',
            'adresse' => 'Tanger, Maroc',
            'photo' => null,

            'poste' => 'Administrateur',
            'departement' => 'Administration',

            'date_embauche' => '2025-01-01',

            'statut' => 'actif',

            'role_id' => $adminRole->id,
            'company_id' => $company1->id,
        ]);

        /*
        |--------------------------------------------------------------------------
        | EMPLOYE 1
        |--------------------------------------------------------------------------
        */
        User::create([
            'id' => Str::uuid(),
            'matricule' => 'EMP-0001',

            'prenom' => 'Nour',
            'nom' => 'Rami',

            'cin' => 'BK2639',
            'date_naissance' => '1998-01-06',
            'sexe' => 'femme',

            'email' => 'nour@gmail.com',
            'password' => Hash::make('password'),

            'telephone' => '0502836537',
            'adresse' => 'Tanger, Maroc',
            'photo' => null,

            'poste' => 'Développeur',
            'departement' => 'Informatique',

            'date_embauche' => '2023-05-06',

            'statut' => 'actif',

            'role_id' => $employeRole->id,
            'company_id' => $company1->id,
        ]);

        /*
        |--------------------------------------------------------------------------
        | EMPLOYE 2
        |--------------------------------------------------------------------------
        */
        User::create([
            'id' => Str::uuid(),
            'matricule' => 'EMP-0002',

            'prenom' => 'Sara',
            'nom' => 'Amrani',

            'cin' => 'CD123456',
            'date_naissance' => '2001-05-10',
            'sexe' => 'femme',

            'email' => 'sara@gmail.com',
            'password' => Hash::make('password'),

            'telephone' => '0622334455',
            'adresse' => 'Tanger, Maroc',
            'photo' => null,

            'poste' => 'Développeuse',
            'departement' => 'Informatique',

            'date_embauche' => '2025-02-15',

            'statut' => 'actif',

            'role_id' => $employeRole->id,
            'company_id' => $company1->id,
        ]);

        /*
        |--------------------------------------------------------------------------
        | EMPLOYE 3
        |--------------------------------------------------------------------------
        */
        User::create([
            'id' => Str::uuid(),
            'matricule' => 'EMP-0003',

            'prenom' => 'Yassine',
            'nom' => 'Bennani',

            'cin' => 'EF123456',
            'date_naissance' => '1999-08-20',
            'sexe' => 'homme',

            'email' => 'yassine@gmail.com',
            'password' => Hash::make('password'),

            'telephone' => '0633445566',
            'adresse' => 'Tanger, Maroc',
            'photo' => null,

            'poste' => 'Technicien',
            'departement' => 'Maintenance',

            'date_embauche' => '2025-03-01',

            'statut' => 'actif',

            'role_id' => $employeRole->id,
            'company_id' => $company1->id,
        ]);
    }
}