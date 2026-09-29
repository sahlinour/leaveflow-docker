<?php

namespace App\Services\Caisse;

use App\Models\Caisse;
use App\Services\CompteCourantAssocie\CompteCourantAssocieService;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class CaisseService
{
    private const COUPURES = [
        1, 5, 10, 20, 50, 100, 200,
    ];

    public function __construct(
        private readonly CompteCourantAssocieService $compteCourantAssocieService
    ) {}

    public function calculer(array $montants): array
    {
        $details = [];
        $totalCaisse = 0;

        foreach (self::COUPURES as $coupure) {

            $valeur = $montants[$coupure] ?? null;

            if ($valeur === null || $valeur === '') {
                $montant = 0;
            } else {
                $montant = (float) $valeur;
            }

            if ($montant < 0) {
                throw new InvalidArgumentException(
                    "Le montant de {$coupure} DH ne peut pas être négatif."
                );
            }

            if ($montant === 0.0) {
                continue;
            }

            $quantite = $montant / $coupure;

            if (floor($quantite) != $quantite) {
                throw new InvalidArgumentException(
                    "Le montant de {$coupure} DH doit être un multiple de {$coupure} DH."
                );
            }

            $quantite = (int) $quantite;

            $details[] = [
                'coupure' => $coupure,
                'quantite' => $quantite,
                'montant' => $montant,
            ];

            $totalCaisse += $montant;
        }

        return [
            'details' => $details,
            'total_caisse' => $totalCaisse,
        ];
    }

    public function getTotalDettes(Caisse $caisse): float
    {
        return (float) $caisse
            ->dettes()
            ->sum('montant');
    }

    public function calculerTotaux(Caisse $caisse): array
    {
        $totalCaisse = (float) $caisse->total_caisse;

        $totalDettes = $this->getTotalDettes($caisse);

        $fondCaisse = (float) $caisse->fond_caisse;

        $compteCourantAssocie =
            $this->compteCourantAssocieService
                ->getSolde($caisse->user_id);

        $totalGeneral = $totalCaisse + $totalDettes;

        $totalDisponible =
            $fondCaisse + $compteCourantAssocie;

        $soldeFinal =
            $totalDisponible - $totalGeneral;

        return [
            'fond_caisse' => $fondCaisse,
            'compte_courant_associe' => $compteCourantAssocie,
            'total_caisse' => $totalCaisse,
            'total_dettes' => $totalDettes,
            'total_general' => $totalGeneral,
            'total_disponible' => $totalDisponible,
            'solde_final' => $soldeFinal,
        ];
    }

    public function enregistrer(
        Caisse $caisse,
        array $montants
    ): Caisse {
        return DB::transaction(function () use (
            $caisse,
            $montants
        ) {
            if ($caisse->statut === 'cloturee') {
                throw new InvalidArgumentException(
                    'Cette caisse est clôturée et ne peut plus être modifiée.'
                );
            }

            if ((float) $caisse->fond_caisse <= 0) {
                throw new InvalidArgumentException(
                    'Impossible de calculer la caisse : le fond de caisse doit être supérieur à 0.'
                );
            }

            $resultat = $this->calculer($montants);

            if ($resultat['total_caisse'] <= 0) {
                throw new InvalidArgumentException(
                    'Impossible d’enregistrer une caisse vide.'
                );
            }

            $caisse->update([
                'total_caisse' => $resultat['total_caisse'],
            ]);

            $caisse->details()->delete();

            foreach ($resultat['details'] as $detail) {
                $caisse->details()->create([
                    'coupure' => $detail['coupure'],
                    'quantite' => $detail['quantite'],
                    'montant' => $detail['montant'],
                ]);
            }

            $totaux = $this->calculerTotaux($caisse);

            $caisse->update([
                'total_dettes' => $totaux['total_dettes'],
                'total_general' => $totaux['total_general'],
                'solde_final' => $totaux['solde_final'],
            ]);

            return $caisse->fresh([
                'details',
                'dettes',
            ]);
        });
    }

    public function cloturer(Caisse $caisse): Caisse
    {
        return DB::transaction(function () use ($caisse) {

            if ($caisse->statut === 'cloturee') {
                throw new InvalidArgumentException(
                    'Cette caisse est déjà clôturée.'
                );
            }

            if ((float) $caisse->fond_caisse <= 0) {
                throw new InvalidArgumentException(
                    'Impossible de clôturer la caisse : le fond de caisse doit être supérieur à 0.'
                );
            }

            if (!$caisse->details()->exists()) {
                throw new InvalidArgumentException(
                    'Impossible de clôturer une caisse qui n’a pas encore été calculée.'
                );
            }

            $totaux = $this->calculerTotaux($caisse);

            $caisse->update([
                'total_dettes' => $totaux['total_dettes'],
                'total_general' => $totaux['total_general'],
                'solde_final' => $totaux['solde_final'],
                'statut' => 'cloturee',
                'date_cloture' => now(),
            ]);

            return $caisse->fresh([
                'details',
                'dettes',
                'user.company',
            ]);
        });
    }
}