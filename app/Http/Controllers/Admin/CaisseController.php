<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Caisse\AffecterFondCaisseRequest;
use App\Models\User;
use App\Models\Caisse;
use App\Services\Caisse\AdminCaisseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CaisseController extends Controller
{
    public function __construct(
        private readonly AdminCaisseService $caisseService
    ) {}

    public function index(Request $request): Response
    {
        $date = $request->input(
            'date',
            now()->toDateString()
        );

        $caisses = $this->caisseService
            ->getCaissesDuJour($date)
            ->filter(function ($caisse) {
                return (float) $caisse->fond_caisse > 0;
            })
            ->values();

        $caisses->load('user');

        return Inertia::render(
            'Admin/Caisse/index',
            [
                'caisses' => $caisses,

                'filters' => [
                    'date' => $date,
                ],
            ]
        );
    }

    public function create(): Response
    {
        $employes = User::query()
            ->where('statut', 'actif')
            ->orderBy('nom')
            ->orderBy('prenom')
            ->get();

        $derniersFonds = $this->caisseService
            ->getDerniersFondsCaisse($employes);

        $employes = $employes->map(function (User $employe) use ($derniersFonds) {
            $dernierFond = $derniersFonds->get($employe->id);

            return [
                'id' => $employe->id,
                'prenom' => $employe->prenom,
                'nom' => $employe->nom,
                'dernier_fond' => $dernierFond['montant'] ?? 0,
                'date_dernier_fond' => $dernierFond['date'] ?? null,
            ];
        });

        return Inertia::render(
            'Admin/Caisse/create',
            [
                'employes' => $employes,
            ]
        );
    }

    public function edit(Caisse $caisse): Response
    {
        $caisse->load('user');

        abort_unless(
            $caisse->user !== null,
            404
        );

        return Inertia::render(
            'Admin/Caisse/edit',
            [
                'caisse' => [
                    'id' => $caisse->id,
                    'user_id' => $caisse->user_id,
                    'date_caisse' => $caisse->date_caisse->format('Y-m-d'),
                    'fond_caisse' => $caisse->fond_caisse,
                    'statut' => $caisse->statut,

                    'user' => [
                        'id' => $caisse->user->id,
                        'prenom' => $caisse->user->prenom,
                        'nom' => $caisse->user->nom,
                        'matricule' => $caisse->user->matricule,
                    ],
                ],
            ]
        );
    }
    public function update(AffecterFondCaisseRequest $request,Caisse $caisse): RedirectResponse 
    {
        $validated = $request->validated();
        try {

            $this->caisseService->affecterFond(
                $caisse->user,
                $validated['date_caisse'],
                (float) $validated['fond_caisse']
            );

            return redirect()
                ->route('admin.caisse.index', [
                    'date' => $validated['date_caisse'],
                ])
                ->with(
                    'success',
                    'Le fond de caisse a été modifié avec succès.'
                );

        } catch (\InvalidArgumentException $e) {

            return redirect()
                ->back()
                ->withErrors([
                    'fond_caisse' => $e->getMessage(),
                ])
                ->withInput();
        }
    }
    public function affecter(AffecterFondCaisseRequest $request): RedirectResponse 
    {
        $validated = $request->validated();
        $user = User::query()
            ->findOrFail($validated['user_id']);
        try {
            $this->caisseService->affecterFond(
                $user,
                $validated['date_caisse'],
                (float) $validated['fond_caisse']
            );

            return redirect()
                ->route('admin.caisse.index')
                ->with(
                    'success',
                    'Le fond de caisse a été affecté avec succès.'
                );

        } catch (\InvalidArgumentException $e) {
            return redirect()
                ->back()
                ->withErrors([
                    'fond_caisse' => $e->getMessage(),
                ])
                ->withInput();
        }
    }
}