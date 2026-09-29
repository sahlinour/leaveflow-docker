<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DemandeConge;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::with(['contraintesConges'])
            ->oldest()
            ->paginate(6);

        $companies->getCollection()->transform(function ($company) {
            $company->employeesCount = $company->users()
                ->whereHas('role', function ($query) {
                    $query->where('slug', 'employe');
                })
                ->count();
            $company->maxConcurrent = optional(
                $company->contraintesConges->first()
            )->duree_max_conge ?? 0;
            $company->activeRequests = DemandeConge::whereHas('user', function ($query) use ($company) {
                    $query->where('company_id', $company->id)
                        ->whereHas('role', function ($q) {
                            $q->where('slug', 'employe');
                        });
                })
                ->where('statut', 'Approuvé')
                ->count();

            return $company;
        });

        $trashCount = Company::onlyTrashed()->count();

        return Inertia::render('Admin/Companies/index', [
            'companies' => $companies,
            'trashCount' => $trashCount,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Companies/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
        'nom' => 'required|string|max:150',
        'adresse' => 'nullable|string|max:255',
        'logo' => 'nullable|image|mimes:jpg,jpeg,png,svg|max:2048',
        'type' => 'nullable|boolean',
        ]);

        if ($request->hasFile('logo')) {
        $validated['logo'] = $request->file('logo')->store('companies', 'public');
        }

        Company::create($validated);

        return redirect()
            ->route('companies.index')
            ->with('success', 'Entreprise ajoutée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        return Inertia::render('Admin/Companies/show', [
            'company' => $company,
        ]);
    }   

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        return Inertia::render('Admin/Companies/edit', [
            'company' => $company,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:150',
            'adresse' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,svg|max:2048',
            'type' => 'nullable|boolean',
        ]);

        if ($request->hasFile('logo')) {
        $validated['logo'] = $request->file('logo')->store('companies', 'public');
        }

        $company->update($validated);

        return redirect()
            ->route('companies.index')
            ->with('success', 'Entreprise modifiée avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();

        return redirect()
            ->route('companies.index')
            ->with('success', 'Entreprise supprimée avec succès.');
    }

    public function trash()
    {
        $companies = Company::onlyTrashed()->latest('deleted_at')
        ->paginate(10);

        return Inertia::render('Admin/Companies/trash', [
            'companies' => $companies,
        ]);
    }

    public function restore($id)
    {
        Company::onlyTrashed()->findOrFail($id)->restore();

        return back()->with('success', 'Entreprise restaurée.');
    }

    public function forceDelete($id)
    {
        Company::onlyTrashed()->findOrFail($id)->forceDelete();

        return back()->with('success', 'Entreprise supprimée définitivement.');
    }
}