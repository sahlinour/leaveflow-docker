<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ContrainteConge;
use App\Models\Company;
use App\Models\PeriodeBloquee;


class ContrainteCongeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index(Request $request, Company $company)
    {
        $contrainte = ContrainteConge::firstOrCreate(
            ['company_id' => $company->id],
            [
                'max_employes_simultanes' => 1,
                'duree_max_conge' => 30,
            ]
        );

        $periodesBloquees = PeriodeBloquee::where('company_id',$company->id)
            ->orderBy('date_debut')->get();

        return Inertia::render('Admin/ContraintesConges/index', [
            'company' => [
                'id' => $company->id,
                'nom' => $company->nom,
            ],

            'contrainte' => [
                'id' => $contrainte->id,
                'company_id' => $contrainte->company_id,
                'max_employes_simultanes' => $contrainte->max_employes_simultanes,
                'duree_max_conge' => $contrainte->duree_max_conge,
                'created_at' => $contrainte->created_at,
            ],
            'periodesBloquees' => $periodesBloquees,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ContraintesConges/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ContrainteConge $contrainteConge)
    {
        $validated = $request->validate([
            'max_employes_simultanes' => ['required', 'integer', 'min:1'],
            'duree_max_conge' => ['required', 'integer', 'min:1'],
        ]);

        $contrainteConge->update($validated);

        return back()->with('success', 'Les paramètres ont été enregistrés avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
