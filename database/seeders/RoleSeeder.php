<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::updateOrCreate(
            ['slug' => 'admin'],
            [
                'nom' => 'Administrateur',
            ]
        );

        Role::updateOrCreate(
            ['slug' => 'supervisor'],
            [
                'nom' => 'Supervisor',
            ]
        );

        Role::updateOrCreate(
            ['slug' => 'employe'],
            [
                'nom' => 'Employé',
            ]
        );
    }
}
