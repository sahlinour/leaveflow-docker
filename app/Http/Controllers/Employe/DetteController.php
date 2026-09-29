<?php

namespace App\Http\Controllers\Employe;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dette\StoreDetteRequest;
use App\Models\Caisse;
use App\Models\Dette;
use App\Models\Client;
use App\Services\Dette\DetteService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DetteController extends Controller
{
    public function __construct(
        private DetteService $detteService
    ) {}

    public function index(Request $request): Response
    {
        $result = $this->detteService->getDettes(
            auth()->id(),
            $request
        );

        return Inertia::render('Employe/Dette/index',
            [
                'dettes' => $result['dettes'],
                'totalDettes' => $result['totalDettes'],
                'nombreDettes' => $result['nombreDettes'],
                'filters' => [
                    'date_debut' => $request->date_debut,
                    'date_fin' => $request->date_fin,
                ],
            ]
        );
    }

    public function create(Request $request): Response
    {
        $user = $request->user();
        $clients = Client::query()
            ->where('company_id', $user->company_id)
            ->orderBy('prenom')
            ->orderBy('nom')
            ->get(['id', 'prenom', 'nom']);

        return Inertia::render('Employe/Dette/create',
            ['clients' => $clients]
        );
    }

    public function store(StoreDetteRequest $request): RedirectResponse
    {
        $caisse = Caisse::query()
            ->where('user_id', auth()->id())
            ->whereDate('date_caisse', now()->toDateString())
            ->first();

        if ($caisse && $caisse->statut === 'cloturee') {
            return redirect()
                ->route('employe.dettes.index')
                ->withErrors([
                    'caisse' =>
                        'La caisse du jour est déjà clôturée. Impossible d’ajouter une dette.',
                ]);
        }

        $this->detteService->store(
            $request->validated()['dettes'],
            auth()->id()
        );

        return redirect()
            ->route('employe.dettes.index')
            ->with(
                'success',
                'Les dettes ont été ajoutées avec succès.'
            );
    }

    public function destroy(Dette $dette): RedirectResponse
    {
        abort_unless(
            (string) $dette->user_id === (string) auth()->id(),
            403,
            'Vous n\'êtes pas autorisé à supprimer cette dette.'
        );

        $caisse = $dette->caisse;

        if ($caisse && $caisse->statut === 'cloturee') {
            return redirect()
                ->route('employe.dettes.index')
                ->withErrors([
                    'dette' =>
                        'La caisse est clôturée. Cette dette ne peut plus être supprimée.',
                ]);
        }

        $this->detteService->destroy($dette);

        return redirect()
            ->route('employe.dettes.index')
            ->with(
                'success',
                'La dette a été supprimée avec succès.'
            );
    }
}