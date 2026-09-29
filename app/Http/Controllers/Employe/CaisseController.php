<?php

namespace App\Http\Controllers\Employe;

use App\Http\Controllers\Controller;
use App\Http\Requests\Caisse\CalculateCaisseRequest;
use App\Models\Caisse;
use App\Models\User;
use App\Notifications\CaisseClotureeNotification;
use App\Services\CompteCourantAssocie\CompteCourantAssocieService;
use App\Services\Caisse\AdminCaisseService;
use App\Services\Caisse\CaisseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CaisseController extends Controller
{
    public function __construct(
        private readonly CaisseService $caisseService,
        private readonly CompteCourantAssocieService $compteCourantAssocieService,
        private readonly AdminCaisseService $adminCaisseService
    ) {}

    public function index(Request $request): Response
    {
        $query = Caisse::query()
            ->where('user_id', auth()->id())
            ->withCount('details')
            ->latest('date_caisse');

        if ($request->filled('date_debut')) {
            $query->whereDate(
                'date_caisse',
                '>=',
                $request->date_debut
            );
        }

        if ($request->filled('date_fin')) {
            $query->whereDate(
                'date_caisse',
                '<=',
                $request->date_fin
            );
        }
        $caisses = $query->paginate(10)->withQueryString();

        $caisses->getCollection()->transform(function ($caisse) {
            $totaux = $this->caisseService->calculerTotaux($caisse);

            $caisse->total_disponible = $totaux['total_disponible'];

            if ($caisse->statut === 'ouverte' && $caisse->details_count > 0) {
                $caisse->solde_final = $totaux['solde_final'];
            }

            return $caisse;
        });

        $soldeCompteCourantAssocie = $this->compteCourantAssocieService
            ->getSolde(auth()->id());

        $dernierFond = $this->adminCaisseService
            ->getDernierFondCaisse(auth()->user());

        $fondCaisse = $dernierFond['montant'];

        $totalDisponible = $fondCaisse + $soldeCompteCourantAssocie;
        return Inertia::render('Employe/Caisse/index',
            [
                'caisses' => $caisses,
                'filters' => [
                    'date_debut' => $request->date_debut,
                    'date_fin' => $request->date_fin,
                ],
                'fondCaisse' => $fondCaisse,
                'compteCourantAssocie' => $soldeCompteCourantAssocie,
                'totalDisponible' => $totalDisponible,
            ]
        );
    }

    public function create(): Response|RedirectResponse
    {
        $date = now()->toDateString();
        $caisse = Caisse::query()
            ->where('user_id', auth()->id())
            ->whereDate('date_caisse', $date)
            ->first();

        if (!$caisse) {
            return redirect()->route('caisse.index')
                ->withErrors([
                    'caisse' =>
                        'Aucune caisse n\'a été affectée pour aujourd\'hui. Veuillez contacter l\'administration.',
                ]);
        }

        if ((float) $caisse->fond_caisse <= 0) {
            return redirect()->route('caisse.index')
                ->withErrors([
                    'caisse' =>
                        'Le fond de caisse n\'a pas encore été affecté par l\'administration.',
                ]);
        }

        if ($caisse->statut === 'cloturee') {
            return redirect()->route('caisse.index')
                ->withErrors([
                    'caisse' =>
                        'La caisse du jour est déjà clôturée et ne peut plus être modifiée.',
                ]);
        }

        $details = $caisse
            ->details()
            ->orderBy('coupure')
            ->get();

        $dettes = $caisse
            ->dettes()
            ->latest('date_dette')
            ->get();

        return Inertia::render('Employe/Caisse/calculate',
            [
                'caisse' => $caisse,
                'details' => $details,
                'dettes' => $dettes,
                'modeModification' => $details->isNotEmpty(),
            ]
        );
    }

    public function store(CalculateCaisseRequest $request, Caisse $caisse): RedirectResponse
    {
        abort_unless(
            $caisse->user_id === auth()->id(),
            403
        );

        if ((float) $caisse->fond_caisse <= 0) {
            return redirect()->route('caisse.index')
                ->withErrors([
                    'caisse' =>
                        'Le fond de caisse n\'a pas encore été affecté par l\'administration.',
                ]);
        }

        if ($caisse->statut === 'cloturee') {
            return redirect()->route('caisse.index')
                ->withErrors([
                    'caisse' =>
                        'Cette caisse est clôturée et ne peut plus être modifiée.',
                ]);
        }

        try {
            $this->caisseService->enregistrer(
                $caisse,
                $request->validated('montants')
            );
        } catch (\InvalidArgumentException $e) {
            return redirect()->back()
                ->withErrors([
                    'caisse' => $e->getMessage(),
                ])
                ->withInput();
        }

        return redirect()->route('caisse.index')
            ->with(
                'success',
                'La caisse a été enregistrée avec succès.'
            );
    }

    public function edit(Caisse $caisse): Response|RedirectResponse
    {
        abort_unless(
            $caisse->user_id === auth()->id(),
            403
        );

        if ($caisse->statut === 'cloturee') {
            return redirect()->route('caisse.index')
                ->withErrors([
                    'caisse' =>
                        'Une caisse clôturée ne peut plus être modifiée.',
                ]);
        }

        if ((float) $caisse->fond_caisse <= 0) {
            return redirect()->route('caisse.index')
                ->withErrors([
                    'caisse' =>
                        'Le fond de caisse n\'a pas été affecté.',
                ]);
        }

        $details = $caisse
            ->details()
            ->orderBy('coupure')
            ->get();

        $dettes = $caisse
            ->dettes()
            ->latest('date_dette')
            ->get();

        return Inertia::render('Employe/Caisse/calculate',
            [
                'caisse' => $caisse,
                'details' => $details,
                'dettes' => $dettes,
                'modeModification' => true,
            ]
        );
    }

    public function cloturer(Caisse $caisse): RedirectResponse
    {
        abort_unless(
            $caisse->user_id === auth()->id(),
            403
        );

        try {
            $caisse = $this->caisseService->cloturer($caisse);

            $admins = User::whereHas('role', function ($query) {
                $query->whereIn('slug', ['admin', 'supervisor']);
            })->get();

            foreach ($admins as $admin) {
                $admin->notify(
                    new CaisseClotureeNotification($caisse)
                );
            }
        } catch (\InvalidArgumentException $e) {
            return redirect()->route('caisse.index')
                ->withErrors([
                    'caisse' => $e->getMessage(),
                ]);
        }

        return redirect()->route('caisse.index')
            ->with(
                'success',
                'La caisse a été clôturée avec succès. Le rapport a été envoyé à l\'administration.'
            );
    }

    public function rouvrir(Caisse $caisse): RedirectResponse
    {
        abort_unless(
            $caisse->user_id === auth()->id(),
            403
        );

        if ($caisse->statut !== 'cloturee') {
            return redirect()->route('caisse.index')
                ->withErrors([
                    'caisse' => 'Cette caisse est déjà ouverte.',
                ]);
        }

        $caisse->update(['statut' => 'ouverte']);

        return redirect()->route('caisse.index')
            ->with('success',
                'La caisse du ' .
                $caisse->date_caisse->format('d/m/Y') .
                ' a été rouverte avec succès.'
            );
    }
}