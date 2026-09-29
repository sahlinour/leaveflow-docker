<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\HistoriqueConge;

class HistoriqueCongeController extends Controller
{
    public function index(Request $request)
    {
        $historiques = HistoriqueConge::with(['user', 'demandeConge.user'])
            ->when($request->search, function ($query) use ($request) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('description', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($q2) use ($search) {
                            $q2->where('prenom', 'like', "%{$search}%")
                               ->orWhere('nom', 'like', "%{$search}%");
                        })
                        ->orWhereHas('demandeConge', function ($q2) use ($search) {
                            $q2->where('reference_demande', 'like', "%{$search}%");
                        })
                        ->orWhereHas('demandeConge.user', function ($q2) use ($search) {
                            $q2->where('prenom', 'like', "%{$search}%")
                               ->orWhere('nom', 'like', "%{$search}%");
                        });
                });
            })
            ->when($request->action, fn ($q) => $q->where('action', $request->action))
            ->when($request->date_from, fn ($q) => $q->whereDate('created_at', '>=', $request->date_from))
            ->when($request->date_to, fn ($q) => $q->whereDate('created_at', '<=', $request->date_to))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/HistoriqueConges/index', [
            'historiques' => $historiques,
            'filters' => $request->only(['search', 'action', 'date_from', 'date_to']),
        ]);
    }
}