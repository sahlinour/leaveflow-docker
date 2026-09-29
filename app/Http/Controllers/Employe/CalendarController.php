<?php

namespace App\Http\Controllers\Employe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $year = (int) $request->input('year', now()->year);
        $month = (int) $request->input('month', now()->month);
        $user = Auth::user();
        $days = [];

        $demandes = $user->demandesConges()
            ->where(function ($query) use ($year, $month) {
                $debutMois = Carbon::create($year, $month, 1)->startOfMonth();
                $finMois = Carbon::create($year, $month, 1)->endOfMonth();

                $query->where('date_debut', '<=', $finMois)
                    ->where('date_fin', '>=', $debutMois);
            })
            ->get();

        foreach ($demandes as $demande) {
            $type = null;
            if ($demande->statut === 'Approuvée') {
                $type = 'approved';
            }
            if ($demande->statut === 'En attente') {
                $type = 'pending';
            }
            if (!$type) {
                continue;
            }
            foreach (
                $this->datesEntre(
                    $demande->date_debut,
                    $demande->date_fin
                ) as $date
            ) {
                $dateCarbon = Carbon::parse($date);
                if (
                    $dateCarbon->year == $year &&
                    $dateCarbon->month == $month
                ) {
                    $days[$date] = [
                        'type' => $type,
                    ];
                }
            }
        }

        $blockedPeriods = [];
        if ($user->company) {
            $debutMois = Carbon::create($year, $month, 1)->startOfMonth();
            $finMois = Carbon::create($year, $month, 1)->endOfMonth();
            $periodes = $user->company
                ->periodesBloquees()
                ->where('date_debut', '<=', $finMois)
                ->where('date_fin', '>=', $debutMois)
                ->get();
            foreach ($periodes as $periode) {
                foreach (
                    $this->datesEntre(
                        $periode->date_debut,
                        $periode->date_fin
                    ) as $date
                ) {
                    $dateCarbon = Carbon::parse($date);
                    if (
                        $dateCarbon->year == $year &&
                        $dateCarbon->month == $month
                    ) {
                        if (!isset($days[$date])) {
                            $days[$date] = [
                                'type' => 'blocked',
                                'motif' => $periode->motif,
                            ];
                        }
                    }
                }

                $blockedPeriods[] = [
                    'id' => $periode->id,
                    'date_debut' => Carbon::parse($periode->date_debut)
                        ->format('Y-m-d'),

                    'date_fin' => Carbon::parse($periode->date_fin)
                        ->format('Y-m-d'),

                    'motif' => $periode->motif,
                ];
            }
        }
        return Inertia::render('Employe/Calendar', [
            'year' => $year,
            'month' => $month,
            'days' => $days,
            'blockedPeriods' => $blockedPeriods,
        ]);
    }

    private function datesEntre($debut, $fin): array
    {
        $dates = [];
        $current = Carbon::parse($debut)->startOfDay();
        $fin = Carbon::parse($fin)->startOfDay();
        while ($current->lte($fin)) {
            $dates[] = $current->format('Y-m-d');
            $current->addDay();
        }
        return $dates;
    }
}