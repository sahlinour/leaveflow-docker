<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PeriodeBloquee; 
use App\Models\Company; 
use Inertia\Inertia;

class PeriodeBloqueeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $periodes = PeriodeBloquee::with('company') ->latest() ->get(); 
        $companies = Company::orderBy('nom')->get(); 
        
        return Inertia::render('Admin/PeriodesBloquees/index', [ 
            'periodes' => $periodes, 
            'companies' => $companies, 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $companies = Company::orderBy('nom')->get(); 
         
        return Inertia::render('Admin/PeriodesBloquees/create', [
             'companies' => $companies, 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([ 
            'company_id' => [ 'required', 'exists:companies,id', ], 
            'date_debut' => [ 'required', 'date', ], 
            'date_fin' => [ 'required', 'date', 'after_or_equal:date_debut', ], 
            'motif' => [ 'nullable', 'string', 'max:255', ], 
        ]); 
            
            PeriodeBloquee::create([ 
                'company_id' => $request->company_id, 
                'date_debut' => $request->date_debut, 
                'date_fin' => $request->date_fin, 
                'motif' => $request->motif, 
            ]); 
            
            return back() ->with('periodes-bloquees.index') ->with( 'success', 'Période bloquée ajoutée avec succès.' ); 
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $periode = PeriodeBloquee::findOrFail($id); 
        $companies = Company::orderBy('nom')->get(); 
        
        return Inertia::render('Admin/PeriodesBloquees/edit', [ 
            'periode' => $periode, 
            'companies' => $companies, 
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([ 
            'company_id' => [ 'required', 'exists:companies,id', ], 
            'date_debut' => [ 'required', 'date', ], 
            'date_fin' => [ 'required', 'date', 'after_or_equal:date_debut', ], 
            'motif' => [ 'nullable', 'string', 'max:255', ], 
        ]); 
        
        $periode = PeriodeBloquee::findOrFail($id); 
        $periode->update([ 
            'company_id' => $request->company_id, 
            'date_debut' => $request->date_debut, 
            'date_fin' => $request->date_fin, 
            'motif' => $request->motif, 
        ]); 
        
        return redirect() ->route('admin.periodes-bloquees.index') ->with( 'success', 'Période bloquée modifiée avec succès.' );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $periode = PeriodeBloquee::findOrFail($id); 
        $periode->delete(); 
        
        return back() ->with('periodes-bloquees.index') ->with( 'success', 'Période bloquée supprimée avec succès.' ); 
    }
}
