<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompteCourantAssocie\StoreCompteCourantAssocieRequest;
use App\Models\User;
use App\Services\CompteCourantAssocie\CompteCourantAssocieService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CompteCourantAssocieController extends Controller
{
    public function __construct(
        private CompteCourantAssocieService $compteCourantAssocieService
    ) {}

    public function index(Request $request): Response
    {
        $comptes = $this->compteCourantAssocieService
            ->getHistorique();

        $employees = User::query()
            ->with('company:id,nom')
            ->whereHas('role', function ($query) {
                $query->where('slug', 'employe');
            })
            ->orderBy('prenom')
            ->orderBy('nom')
            ->get([
                'id',
                'prenom',
                'nom',
                'email',
                'company_id',
            ]);

        return Inertia::render(
            'Admin/CompteCourantAssocie/index',
            [
                'comptes' => $comptes,
                'employees' => $employees,
            ]
        );
    }

    public function create(): Response
    {
        $employees = User::query()
            ->whereHas('role', function ($query) {
                $query->where('slug', 'employe');
            })
            ->orderBy('prenom')
            ->orderBy('nom')
            ->get([
                'id',
                'prenom',
                'nom',
                'email',
            ]);

        return Inertia::render(
            'Admin/CompteCourantAssocie/create',
            [
                'employees' => $employees,
            ]
        );
    }
    public function store(StoreCompteCourantAssocieRequest $request): RedirectResponse 
    {
        $validated = $request->validated();

        $employee = User::query()
            ->whereHas('role', function ($query) {
                $query->where('slug', 'employe');
            })
            ->findOrFail($validated['user_id']);

        $this->compteCourantAssocieService->affecter(
            userId: $employee->id,
            montant: (float) $validated['montant'],
            date: $validated['date_affectation'] ?? null,
            commentaire: $validated['commentaire'] ?? null,
        );

        return redirect()
            ->route('admin.compte-courant-associe.index')
            ->with(
                'success',
                'Le montant a été affecté avec succès.'
            );
    }
}