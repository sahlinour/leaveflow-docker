<?php

namespace App\Services\Dette;

use App\Models\Caisse;
use App\Models\Dette;
use App\Services\Caisse\CaisseService;
use Carbon\Carbon;

class DetteService
{
    public function __construct(
        private readonly CaisseService $caisseService
    ) {}

    public function getDettes(int|string $userId, $request)
    {
        $query = Dette::query()
            ->where('user_id', $userId)
            ->with('client:id,prenom,nom');

        if ($request->filled('date_debut')) {
            $query->whereDate(
                'date_dette',
                '>=',
                $request->date_debut
            );
        }

        if ($request->filled('date_fin')) {
            $query->whereDate(
                'date_dette',
                '<=',
                $request->date_fin
            );
        }

        $dettes = $query
            ->orderByDesc('date_dette')
            ->get();

        return [
            'dettes' => $dettes
                ->groupBy(function ($dette) {
                    return Carbon::parse(
                        $dette->date_dette
                    )->format('Y-m-d');
                })
                ->toArray(),

            'totalDettes' => (float) $dettes->sum('montant'),

            'nombreDettes' => $dettes->count(),
        ];
    }

    public function store(array $dettes, int|string $userId): void
    {
        $date = now()->toDateString();

        $caisse = Caisse::query()
            ->where('user_id', $userId)
            ->whereDate('date_caisse', $date)
            ->first();

        if (!$caisse) {
            $caisse = Caisse::create([
                'user_id' => $userId,
                'date_caisse' => $date,
                'total_caisse' => 0,
                'fond_caisse' => 0,
                'total_dettes' => 0,
                'total_general' => 0,
                'solde_final' => 0,
                'statut' => 'ouverte',
            ]);
        }

        foreach ($dettes as $dette) {
            Dette::create([
                'caisse_id' => $caisse->id,
                'user_id' => $userId,
                'client_id' => $dette['client_id'],
                'date_dette' => $date,
                'montant' => $dette['montant'],
            ]);
        }

        $this->recalculateCaisse($caisse);
    }

    public function destroy(Dette $dette): void
    {
        $caisse = $dette->caisse;

        $dette->delete();

        if ($caisse) {
            $this->recalculateCaisse($caisse);
        }
    }

    private function recalculateCaisse(Caisse $caisse): void
    {
        // Source unique de la formule : CaisseService::calculerTotaux()
        $totaux = $this->caisseService->calculerTotaux($caisse);

        $caisse->update([
            'total_dettes' => $totaux['total_dettes'],
            'total_general' => $totaux['total_general'],
            'solde_final' => $totaux['solde_final'],
        ]);
    }
}