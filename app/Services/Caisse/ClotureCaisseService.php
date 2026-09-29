<?php

namespace App\Services\Caisse;

use App\Models\Caisse;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class ClotureCaisseService
{
    /**
     * Clôturer une caisse.
     */
    public function cloturer(
        Caisse $caisse,
        float $fondCaisse
    ): Caisse {
        if ($caisse->statut === 'cloturee') {
            throw new InvalidArgumentException(
                'Cette caisse est déjà clôturée.'
            );
        }

        if ($fondCaisse < 0) {
            throw new InvalidArgumentException(
                'Le fond de caisse ne peut pas être négatif.'
            );
        }

        $totalCaisse = (float) $caisse->total_caisse;

        $totalDebits = (float) $caisse
            ->debits()
            ->sum('montant');

        $totalGeneral = $totalCaisse + $totalDebits;

        $soldeFinal = $fondCaisse - $totalGeneral;

        return DB::transaction(function () use (
            $caisse,
            $fondCaisse,
            $totalGeneral,
            $soldeFinal
        ) {
            $caisse->update([
                'fond_caisse' => $fondCaisse,
                'total_general' => $totalGeneral,
                'solde_final' => $soldeFinal,
                'date_cloture' => now(),
                'statut' => 'cloturee',
            ]);

            return $caisse->fresh();
        });
    }
}