<?php

namespace App\Services\CompteCourantAssocie;

use App\Models\CompteCourantAssocie;

class CompteCourantAssocieService
{
    public function affecter(int|string $userId,float $montant,?string $date = null,?string $commentaire = null): CompteCourantAssocie 
    {
        if ($montant <= 0) {
            throw new \InvalidArgumentException(
                'Le montant doit être supérieur à 0.'
            );
        }

        return CompteCourantAssocie::create([
            'user_id' => $userId,
            'montant' => $montant,
            'montant_retourne' => 0,
            'statut' => 'actif',
            'date_affectation' => $date ?? now()->toDateString(),
            'date_retour' => null,
            'commentaire' => $commentaire,
        ]);
    }
    public function getSolde(int|string $userId): float
    {
        return (float) CompteCourantAssocie::query()
            ->where('user_id', $userId)
            ->get()
            ->sum(function (CompteCourantAssocie $compte) {
                return (float) $compte->montant
                    - (float) $compte->montant_retourne;
            });
    }
    public function retourner(CompteCourantAssocie $compte,float $montantRetourne): CompteCourantAssocie 
    {
        if ($montantRetourne <= 0) {
            throw new \InvalidArgumentException(
                'Le montant retourné doit être supérieur à 0.'
            );
        }

        $montantRestant =
            (float) $compte->montant
            - (float) $compte->montant_retourne;

        if ($montantRetourne > $montantRestant) {
            throw new \InvalidArgumentException(
                'Le montant retourné ne peut pas être supérieur au montant restant.'
            );
        }

        $nouveauMontantRetourne =
            (float) $compte->montant_retourne
            + $montantRetourne;

        $estTotalementRetourne =
            $nouveauMontantRetourne >= (float) $compte->montant;

        $compte->update([
            'montant_retourne' => $nouveauMontantRetourne,
            'statut' => $estTotalementRetourne
                ? 'retourne'
                : 'retour_partiel',
            'date_retour' => now()->toDateString(),
        ]);

        return $compte->fresh();
    }
    public function getHistorique()
    {
        return CompteCourantAssocie::query()
            ->with('user:id,prenom,nom,email')
            ->orderByDesc('date_affectation')
            ->orderByDesc('created_at')
            ->get();
    }
}