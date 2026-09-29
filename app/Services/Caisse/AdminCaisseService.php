<?php

namespace App\Services\Caisse;

use App\Models\Caisse;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class AdminCaisseService
{
    private function generateReference(User $user, string $date): string
    {
        $matricule = $user->matricule;
        $entreprise = strtoupper(
            preg_replace(
                '/[^A-Za-z0-9]/',
                '',
                $user->company?->nom ?? 'SANSENTREPRISE'
            )
        );

        $annee = date('Y', strtotime($date));
        $lastCaisse = Caisse::withTrashed()
            ->where('user_id', $user->id)
            ->whereYear('date_caisse', $annee)
            ->orderByDesc('created_at')
            ->first();

        if ($lastCaisse) {
            $parts = explode('-', $lastCaisse->reference);
            $lastNumber = (int) end($parts);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        return 'CAI-'
            . $matricule
            . '-'
            . $entreprise
            . '-'
            . $annee
            . '-'
            . str_pad(
                $nextNumber,
                5,
                '0',
                STR_PAD_LEFT
            );
    }

    public function getOrCreateCaisse(User $user, string $date): Caisse
    {
        $caisse = Caisse::query()
            ->where('user_id', $user->id)
            ->whereDate('date_caisse', $date)
            ->first();
        if ($caisse) {
            return $caisse;
        }

        $dernierFond = Caisse::query()
            ->where('user_id', $user->id)
            ->whereDate('date_caisse', '<', $date)
            ->latest('date_caisse')
            ->value('fond_caisse');

        return Caisse::create([
            'reference' => $this->generateReference($user, $date),
            'user_id' => $user->id,
            'date_caisse' => $date,
            'fond_caisse' => $dernierFond ?? 0,
            'total_caisse' => 0,
            'total_dettes' => 0,
            'total_general' => 0,
            'solde_final' => 0,
            'statut' => 'ouverte',
        ]);
    }

    public function getDernierFondCaisse(User $user): array
    {
        $caisse = Caisse::query()
            ->where('user_id', $user->id)
            ->where('fond_caisse', '>', 0)
            ->latest('date_caisse')
            ->first();

        if (!$caisse) {
            return [
                'montant' => 0,
                'date' => null,
            ];
        }

        return [
            'montant' => (float) $caisse->fond_caisse,
            'date' => $caisse->date_caisse->format('Y-m-d'),
        ];
    }

    public function getDerniersFondsCaisse(Collection $employes): Collection
    {
        $userIds = $employes->pluck('id');
        $dernieresDates = Caisse::query()
            ->select(
                'user_id',
                DB::raw('MAX(date_caisse) as derniere_date')
            )
            ->whereIn('user_id', $userIds)
            ->where('fond_caisse', '>', 0)
            ->groupBy('user_id');

        $caisses = Caisse::query()
            ->joinSub(
                $dernieresDates,
                'derniers',
                function ($join) {
                    $join->on('caisses.user_id','=', 'derniers.user_id')
                    ->on('caisses.date_caisse', '=', 'derniers.derniere_date');
                }
            )
            ->get([
                'caisses.user_id',
                'caisses.fond_caisse',
                'caisses.date_caisse',
            ]);

        return $caisses->keyBy('user_id')->map(
            function (Caisse $caisse) {
                return [
                    'montant' => (float) $caisse->fond_caisse,
                    'date' => $caisse->date_caisse->format('Y-m-d'),
                ];
            }
        );
    }

    public function getCaissesDuJour(string $date): Collection
    {
        $employes = User::query()
            ->with('company')
            ->where('role_id', function ($query) {
                $query->select('id')
                    ->from('roles')
                    ->where('slug', 'employe')
                    ->limit(1);
            })
            ->orderBy('nom')
            ->orderBy('prenom')
            ->get();

        $caissesExistantes = Caisse::query()
            ->whereIn(
                'user_id',
                $employes->pluck('id')
            )
            ->whereDate('date_caisse', $date)
            ->get()
            ->keyBy('user_id');

        return $employes->map(
            function (User $user) use ($date, $caissesExistantes) 
            {
                if ($caissesExistantes->has($user->id)) {
                    return $caissesExistantes->get($user->id);
                }

                return new Caisse([
                    'reference' => $this->generateReference(
                        $user,
                        $date
                    ),
                    'user_id' => $user->id,
                    'date_caisse' => $date,
                    'fond_caisse' => 0,
                    'total_caisse' => 0,
                    'total_dettes' => 0,
                    'total_general' => 0,
                    'solde_final' => 0,
                    'statut' => 'ouverte',
                ]);
            }
        );
    }

    public function affecterFond(User $user, string $date, float $fondCaisse): Caisse 
    {
        if ($fondCaisse < 0) {
            throw new InvalidArgumentException(
                'Le fond de caisse ne peut pas être négatif.'
            );
        }

        return DB::transaction(
            function () use ($user,$date,$fondCaisse) 
            {
                $caisse = $this->getOrCreateCaisse($user, $date);
                if ($caisse->statut === 'cloturee') {
                    throw new InvalidArgumentException(
                        'Impossible de modifier le fond d’une caisse clôturée.'
                    );
                }
                $caisse->update(['fond_caisse' => $fondCaisse,]);
                return $caisse->fresh();
            }
        );
    }

    public function getHistorique(User $user, ?string $dateDebut = null, ?string $dateFin = null): Collection 
    {
        $query = Caisse::query()
            ->where('user_id', $user->id)
            ->orderByDesc('date_caisse');

        if ($dateDebut) {
            $query->whereDate(
                'date_caisse',
                '>=',
                $dateDebut
            );
        }
        if ($dateFin) {
            $query->whereDate(
                'date_caisse',
                '<=',
                $dateFin
            );
        }

        return $query->get();
    }
}