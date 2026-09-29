<?php

namespace App\Http\Controllers\Employe;

use App\Http\Controllers\Controller;
use App\Http\Requests\DemandeConge\StoreDemandeCongeRequest;
use App\Http\Requests\DemandeConge\UpdateDemandeCongeRequest;
use App\Models\Conge;
use App\Models\DemandeConge;
use App\Models\PeriodeBloquee;
use App\Services\DemandeConge\DemandeCongeService;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DemandeCongeController extends Controller
{
    public function __construct(
        private DemandeCongeService $demandeCongeService
    ) {
    }

    public function index(Request $request)
    {
        $demandes = DemandeConge::where('user_id', auth()->id())
            ->when($request->demande_id, function ($query) use ($request) {
                $query->where('id', $request->demande_id);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Employe/DemandesConges/index', [
            'demandes' => $demandes,
            'filters' => [
                'demande_id' => $request->demande_id,
            ],
        ]);
    }

    public function create()
    {
        $annee = now()->year;
        $user = auth()->user();

        $conge = Conge::where('user_id', $user->id)
            ->where('annee', $annee)
            ->first();

        $soldeRestant = $conge
            ? $conge->solde_initial - $conge->jours_utilise
            : 0;

        $periodesBloquees = PeriodeBloquee::where(
            'company_id',
            $user->company_id
        )
            ->orderBy('date_debut')
            ->get()
            ->map(function ($periode) {
                return [
                    'id' => $periode->id,
                    'date_debut' => $periode->date_debut->format('Y-m-d'),
                    'date_fin' => $periode->date_fin->format('Y-m-d'),
                    'motif' => $periode->motif,
                ];
            });

        return Inertia::render('Employe/DemandesConges/create',
            [
                'soldeRestant' => $soldeRestant,
                'annee' => $annee,
                'periodesBloquees' => $periodesBloquees,
            ]
        );
    }

    public function store(StoreDemandeCongeRequest $request)
    {
        return $this->demandeCongeService->store($request);
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        $user = Auth::user();

        $demande = DemandeConge::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if ($demande->statut !== 'En attente') {
            return redirect()
                ->route('demandes-conges.index')
                ->with(
                    'error',
                    'Cette demande ne peut plus être modifiée.'
                );
        }

        $annee = now()->year;

        $conge = Conge::where('user_id', $user->id)
            ->where('annee', $annee)
            ->first();

        $soldeRestant = $conge
            ? max(
                0,
                $conge->solde_initial - $conge->jours_utilise
            )
            : 0;

        $periodesBloquees = [];

        if ($user->company_id) {
            $periodesBloquees = PeriodeBloquee::where(
                'company_id',
                $user->company_id
            )
                ->whereDate(
                    'date_fin',
                    '>=',
                    now()->startOfDay()
                )
                ->orderBy('date_debut')
                ->get()
                ->map(function ($periode) {
                    return [
                        'id' => $periode->id,
                        'date_debut' => Carbon::parse(
                            $periode->date_debut
                        )->format('Y-m-d'),
                        'date_fin' => Carbon::parse(
                            $periode->date_fin
                        )->format('Y-m-d'),
                        'motif' => $periode->motif,
                    ];
                });
        }

        return Inertia::render(
            'Employe/DemandesConges/edit',
            [
                'demande' => [
                    'id' => $demande->id,
                    'reference_demande' => $demande->reference_demande,
                    'date_debut' => Carbon::parse(
                        $demande->date_debut
                    )->format('Y-m-d'),
                    'date_fin' => Carbon::parse(
                        $demande->date_fin
                    )->format('Y-m-d'),
                    'nombre_jours' => $demande->nombre_jours,
                    'type_conge' => $demande->type_conge,
                    'motif' => $demande->motif,
                    'justificatif' => $demande->justificatif,
                    'statut' => $demande->statut,
                ],
                'soldeRestant' => $soldeRestant,
                'periodesBloquees' => $periodesBloquees,
                'annee' => $annee,
            ]
        );
    }

    public function update(UpdateDemandeCongeRequest $request,string $id) 
    {
        return $this->demandeCongeService->update(
            $request,
            $id
        );
    }

    public function annuler(string $id)
    {
        return $this->demandeCongeService->annuler($id);
    }

    public function destroy(string $id)
    {
        return $this->demandeCongeService->destroy($id);
    }

    public function pdf(string $id)
    {
        $user = Auth::user();

        $demande = DemandeConge::with('user.company')
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if ($demande->statut !== 'Approuvée') {
            abort(403, 'Le PDF est disponible uniquement pour une demande approuvée.');
        }

        $pdf = Pdf::loadView(
            'pdf.demande-conge',
            compact('demande')
        );

        return $pdf->download(
            'Demande-' . $demande->reference_demande . '.pdf'
        );
    }
}