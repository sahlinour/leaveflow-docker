<?php

namespace App\Exports;

use App\Models\Caisse;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CaisseClotureExport implements
    FromCollection,
    WithHeadings,
    WithMapping
{
    public function __construct(
        private readonly Caisse $caisse
    ) {}

    public function collection(): Collection
    {
        return $this->caisse
            ->debits()
            ->latest()
            ->get();
    }

    public function headings(): array
    {
        return [
            'Nom complet',
            'Montant',
            'Date',
        ];
    }

    public function map($debit): array
    {
        return [
            $debit->nom_complet,
            (float) $debit->montant,
            $debit->created_at?->format('d/m/Y H:i'),
        ];
    }
}