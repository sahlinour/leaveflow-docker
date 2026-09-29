<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        Company::updateOrCreate(
            [
                'nom' => 'LeaveFlow Technologies',
            ],
            [
                'adresse' => 'Tanger, Maroc',
                'logo' => null,
            ]
        );

        Company::updateOrCreate(
            [
                'nom' => 'Tech Solutions',
            ],
            [
                'adresse' => 'Casa, Maroc',
                'logo' => null,
            ]
        );

        Company::updateOrCreate(
            [
                'nom' => 'Digital Services',
            ],
            [
                'adresse' => 'Rabat, Maroc',
                'logo' => null,
            ]
        );
    }
}
