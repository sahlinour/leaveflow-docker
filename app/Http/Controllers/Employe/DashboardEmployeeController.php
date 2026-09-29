<?php

namespace App\Http\Controllers\Employe;

use App\Http\Controllers\Controller;
use App\Models\Conge;
use App\Models\DemandeConge;
use App\Models\PeriodeBloquee;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardEmployeeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $annee = now()->year;
        Log::info('Dashboard employé', [
            'user_id' => $user->id,
            'prenom' => $user->prenom,
            'nom' => $user->nom,
            'role_id' => $user->role_id,
            'company_id' => $user->company_id,
        ]);
        $conge = Conge::where('user_id', $user->id)->where('annee', $annee)->first();
        $solde = 0;
        if ($conge) {
            $solde = max(
                0,
                $conge->solde_initial - $conge->jours_utilise
            );
        }
        $demandes = DemandeConge::where('user_id',$user->id);
        $counts = [
            'total' => (clone $demandes)
                ->whereYear('date_debut', $annee)
                ->count(),

            'en_attente' => (clone $demandes)
                ->whereYear('date_debut', $annee)
                ->where('statut', 'En attente')
                ->count(),

            'acceptee' => (clone $demandes)
                ->whereYear('date_debut', $annee)
                ->where('statut', 'Approuvée')
                ->count(),

            'refusee' => (clone $demandes)
                ->whereYear('date_debut', $annee)
                ->where('statut', 'Refusée')
                ->count(),
        ];
        $demandesRecentes = (clone $demandes)->latest('created_at')->take(5)->get()->map(function ($demande) 
        {
                return [
                    'id' => $demande->id,
                    'reference' => $demande->reference_demande,
                    'type' => $demande->type_conge,
                    'dateDebut' => Carbon::parse($demande->date_debut)->format('d/m/Y'),
                    'dateFin' => Carbon::parse($demande->date_fin)->format('d/m/Y'),
                    'nombreJours' => $demande->nombre_jours,
                    'statut' => $demande->statut,
                    'motif' => $demande->motif,
                ];
            });
        $periodesBloquees = [];
        if ($user->company_id) {
            $periodesBloquees = PeriodeBloquee::where('company_id',$user->company_id)
                ->whereDate('date_fin','>=',now()->startOfDay())
                ->orderBy('date_debut')
                ->get()
                ->map(function ($periode) {
                    return [
                        'id' => $periode->id,
                        'dateDebut' => Carbon::parse($periode->date_debut)->format('d/m/Y'),
                        'dateFin' => Carbon::parse($periode->date_fin)->format('d/m/Y'),
                        'motif' => $periode->motif,
                        'description' => $periode->motif,
                    ];
                })
                ->values()
                ->all();
        }
        $rows = DemandeConge::selectRaw('MONTH(date_debut) as mois, statut, COUNT(*) as total')
            ->where('user_id', $user->id)
            ->whereYear('date_debut', $annee)
            ->groupBy('mois', 'statut')
            ->get();

        $months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];

        $monthlyData = collect($months)
            ->map(function ($label, $index) use ($rows) {
                $mois = $index + 1;
                $matching = $rows->where('mois',$mois);

                return [
                    'month' => $label,
                    'Approved' => (int) (
                        $matching
                            ->firstWhere('statut','Approuvée')->total ?? 0
                    ),

                    'Pending' => (int) (
                        $matching
                            ->firstWhere('statut','En attente')->total ?? 0
                    ),

                    'Rejected' => (int) (
                        $matching
                            ->firstWhere('statut','Refusée')->total ?? 0
                    ),
                ];
            })
            ->values()
            ->all();

        return Inertia::render('Employe/Dashboard',
            [
                'auth' => ['user' => $user,],
                'annee' => $annee,
                'solde' => $solde,
                'counts' => $counts,
                'demandesRecentes' => $demandesRecentes,
                'periodesBloquees' => $periodesBloquees,
                'monthlyData' => $monthlyData,
            ]
        );
    }
}
