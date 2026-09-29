<?php

namespace Database\Seeders;

use App\Models\Bank;
use Illuminate\Database\Seeder;

class BankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $banks = [
            [
                'nom' => 'Al Barid Bank',
                'template_path' => 'templates/banks/Al Barid Bank.docx',
            ],
            [
                'nom' => 'CIH Bank',
                'template_path' => 'templates/banks/CIH Bank.docx',
            ],
            [
                'nom' => 'BMCE Bank',
                'template_path' => 'templates/banks/BMCE Bank.docx',
            ],
            [
                'nom' => 'Attijariwafa Bank',
                'template_path' => 'templates/banks/Attijariwafa Bank.docx',
            ],
            [
                'nom' => 'Banque Populaire',
                'template_path' => 'templates/banks/Banque Populaire.docx',
            ],
            [
                'nom' => 'Crédit du Maroc',
                'template_path' => 'templates/banks/Crédit du Maroc.docx',
            ],
            [
                'nom' => 'Société Générale Maroc',
                'template_path' => 'templates/banks/Société Générale Maroc.docx',
            ],
            [
                'nom' => 'Crédit Agricole du Maroc',
                'template_path' => 'templates/banks/Crédit Agricole du Maroc.docx',
            ],
        ];

        foreach ($banks as $bank) {
            Bank::updateOrCreate(
                [
                    'nom' => $bank['nom'],
                ],
                [
                    'template_path' => $bank['template_path'],
                ]
            );
        }
    }
}