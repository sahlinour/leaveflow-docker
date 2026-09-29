<?php

namespace App\Http\Controllers\Employe;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompteCourantAssocie\RetourCompteCourantAssocieRequest;
use App\Models\CompteCourantAssocie;
use App\Services\CompteCourantAssocie\CompteCourantAssocieService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CompteCourantAssocieController extends Controller
{
    public function __construct(
        private CompteCourantAssocieService $compteCourantAssocieService
    ) {}

    public function index(): Response
    {
        $comptes = CompteCourantAssocie::query()
            ->where('user_id', auth()->id())
            ->orderByDesc('date_affectation')
            ->orderByDesc('created_at')
            ->paginate(10)->withQueryString();

        $solde = $this->compteCourantAssocieService
            ->getSolde(auth()->id());

        return Inertia::render(
            'Employe/CompteCourantAssocie/index',
            [
                'comptes' => $comptes,
                'solde' => $solde,
            ]
        );
    }

    public function retourner(
        RetourCompteCourantAssocieRequest $request,
        CompteCourantAssocie $compte
    ): RedirectResponse {
        abort_unless(
            (string) $compte->user_id === (string) auth()->id(),
            403,
            'Vous n\'êtes pas autorisé à modifier ce compte courant associé.'
        );

        if ($compte->statut === 'retourne') {
            return redirect()
                ->route('employe.compte-courant-associe.index')
                ->withErrors([
                    'compte' =>
                        'Ce compte courant associé a déjà été entièrement retourné.',
                ]);
        }

        $this->compteCourantAssocieService->retourner(
            $compte,
            (float) $request->validated()['montant_retourne']
        );

        return redirect()
            ->route('employe.compte-courant-associe.index')
            ->with(
                'success',
                'Le retour du compte courant associé a été enregistré avec succès.'
            );
    }
}