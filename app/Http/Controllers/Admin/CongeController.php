<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Conge;
use App\Models\User;
use App\Models\Company;
use Illuminate\Validation\Rule;

class CongeController extends Controller
{
    private function initialiserAnneeActuelle()
    {
        $annee = date('Y');
        $anciens = Conge::where('annee', $annee - 1)->get();
        foreach ($anciens as $ancien) {
            $existe = Conge::where('user_id', $ancien->user_id)->where('annee', $annee)->exists();
                if ($existe) {
                    continue;
            }
            $reste = $ancien->solde_initial - $ancien->jours_utilise;
            Conge::create([
                'user_id' => $ancien->user_id,
                'annee' => $annee,
                'solde_initial' => $ancien->solde_initial + $reste,
                'jours_utilise' => 0,
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->initialiserAnneeActuelle();
        $conges = Conge::with(['user.company'])
            ->when($request->employee, fn ($q) => $q->where('user_id', $request->employee))
            ->when($request->annee, fn ($q) => $q->where('annee', $request->annee))
            ->when($request->search, fn ($q) => $q->whereHas('user', function ($query) use ($request) {
                $query->where('prenom', 'like', "%{$request->search}%")
                    ->orWhere('nom', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%");
            }))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Conges/index', [
            'conges' => $conges->through(function ($conge) {
                return [
                    'id' => $conge->id,
                    'annee' => $conge->annee,
                    'solde_initial' => $conge->solde_initial,
                    'jours_utilise' => $conge->jours_utilise,
                    'jours_restants' => $conge->solde_initial - $conge->jours_utilise,

                    'user' => [
                        'id' => $conge->user->id,
                        'prenom' => $conge->user->prenom,
                        'nom' => $conge->user->nom,
                        'email' => $conge->user->email,
                        'photo' => $conge->user->photo,
                        'poste' => $conge->user->poste,
                        'company' => $conge->user->company,
                    ],
                ];
            }),

             'annees'=>Conge::select('annee')->distinct()->orderBy('annee')->pluck('annee'),

            'employees' => User::whereHas('role', function ($query) {
                $query->where('slug', 'employe');
            })
            ->orderBy('prenom')
            ->get(['id', 'prenom', 'nom']),

            'filters' => $request->only(['employee', 'search', 'annee']),
            'trashCount' => Conge::onlyTrashed()->count(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Conges/create', [
            'annees' => Conge::select('annee')
                ->distinct()
                ->orderBy('annee')
                ->pluck('annee'),

            'companies' => Company::orderBy('nom')
                ->get([
                    'id',
                    'nom',
                ]),

            'employees' => User::whereHas('role', function ($query) {
                    $query->where('slug', 'employe');
                })
                ->orderBy('prenom')
                ->get([
                    'id',
                    'prenom',
                    'nom',
                    'company_id',
                ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $anneeActuelle = date('Y');
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'annee' => [
                'required',
                'integer',
                'max:'.$anneeActuelle,
                Rule::unique('conges')->where('user_id', $request->user_id)    
            ],
            'solde_initial' => 'required|integer|min:0',
            'jours_utilise' => 'required|integer|min:0',
        ]);

        $ancien = Conge::where('user_id', $request->user_id)
            ->where('annee', $request->annee - 1)
            ->first();

        if ($ancien) {
           $reste = $ancien->solde_initial - $ancien->jours_utilise;
            $validated['solde_initial'] += $reste;
        }

        Conge::create($validated);

        return redirect()->route('conges.index')->with('success', 'Congé créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $historique = Conge::where('user_id', $id)->with('user')->orderBy('annee', 'desc')->get()
        ->map(function ($conge){
                return [
                    'annee' => $conge->annee,
                    'solde_initial' => $conge->solde_initial,
                    'jours_utilise' => $conge->jours_utilise,
                    'jours_restants' => $conge->solde_initial - $conge->jours_utilise,
                ];

            });


        return Inertia::render('Admin/Conges/history',
            [
                'historique' => $historique
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Admin/Conges/edit', [
            'conge' => Conge::with('user')->findOrFail($id),
            'employees' => User::whereHas('role', function ($query) {
                $query->where('slug', 'employe');
            })
            ->orderBy('prenom')
            ->get([
                'id',
                'prenom',
                'nom'
            ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([

            'solde_initial' => 'required','integer','min:0',
            'jours_utilise' => 'required|integer|min:0'

        ]);
        $conge = Conge::findOrFail($id);
        $conge->update([
            'solde_initial' => $validated['solde_initial'],
            'jours_utilise' => $validated['jours_utilise'],
        ]);


        return redirect()->route('conges.index')->with('success', 'Congé mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conge $conge)
    {
        $conge->delete();

        return redirect()
            ->route('conges.index')
            ->with('success', 'Congé supprimé avec succès.');
    }

    public function trash()
    {
        $conges = Conge::onlyTrashed()
            ->with(['user.company'])
            ->latest()
            ->paginate(10)
            ->withQueryString();
        return Inertia::render('Admin/Conges/trash', [
            'conges' => $conges->map(function ($conge) {
                return [
                    'id' => $conge->id,
                    'annee' => $conge->annee,
                    'solde_initial' => $conge->solde_initial,
                    'jours_utilise' => $conge->jours_utilise,
                    'jours_restants' => 
                        $conge->solde_initial - $conge->jours_utilise,

                    'user' => [
                        'prenom' => $conge->user->prenom,
                        'nom' => $conge->user->nom,
                        'email' => $conge->user->email,
                        'company' => $conge->user->company,
                    ],
                ];
            }),

            'trashCount' => Conge::onlyTrashed()->count(),
        ]);
    }

    public function restore($id)
    {
        Conge::onlyTrashed()->findOrFail($id)->restore();

        return back()->with('success', 'Congé restauré.');
    }

    public function forceDelete($id)
    {
        Conge::onlyTrashed()->findOrFail($id)->forceDelete();

        return back()->with('success', 'Congé supprimé définitivement.');
    }
}
