<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use Inertia\Inertia;
use App\Models\DemandeConge;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $year = (int) $request->input('year', now()->year);
 
        return Inertia::render('Admin/Dashboard', [
            'stats'       => $this->getStats($year),
            'monthlyData' => $this->getMonthlyData($year),
            'companyData' => $this->getCompanyData($year),
            'filters'     => ['year' => $year],
        ]);
    }
 
    private function getStats(int $year): array
    {
         return [
            'companies' => Company::count(),
            'employees' => User::count(),
            'requests'  => DemandeConge::whereYear('date_debut', $year)->count(),
            'pending'   => DemandeConge::whereYear('date_debut', $year)->where('statut', 'En attente')->count(),
            'approved'  => DemandeConge::whereYear('date_debut', $year)->where('statut', 'Approuvée')->count(),
            'rejected'  => DemandeConge::whereYear('date_debut', $year)->where('statut', 'Refusée')->count(),
        ];
    }
 
    private function getMonthlyData(int $year): array
    {
        $rows = DemandeConge::selectRaw('MONTH(date_debut) as mois, statut, COUNT(*) as total')
            ->whereYear('date_debut', $year)
            ->groupBy('mois', 'statut')
            ->get();
 
        $months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
 
        return collect($months)->map(function ($label, $index) use ($rows) {
            $moisNum = $index + 1;
            $matching = $rows->where('mois', $moisNum);
 
            return [
                'month'    => $label,
                'Approved' => (int) ($matching->firstWhere('statut', 'Approuvée')->total ?? 0),
                'Pending'  => (int) ($matching->firstWhere('statut', 'En attente')->total ?? 0),
                'Rejected' => (int) ($matching->firstWhere('statut', 'Refusée')->total ?? 0),
            ];
        })->values()->all();
    }
 
    private function getCompanyData(int $year): array
    {
        $rows = DemandeConge::join('users', 'users.id', '=', 'demande_conges.user_id')
            ->join('companies', 'companies.id', '=', 'users.company_id')
            ->selectRaw('companies.nom, COUNT(*) as total')
            ->whereYear('demande_conges.date_debut', $year)
            ->groupBy('companies.id', 'companies.nom')
            ->orderByDesc('total')
            ->get();
 
        $palette = ['#16425B', '#2F6690', '#3A7CA5', '#81C3D7', '#5C8AA6', '#0F3049'];
 
        return $rows->map(function ($row, $i) use ($palette) {
            return [
                'name'  => $row->nom,
                'value' => (int) $row->total,
                'color' => $palette[$i % count($palette)],
            ];
        })->all();
    }
   
}
