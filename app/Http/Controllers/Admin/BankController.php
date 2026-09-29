<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bank;
use App\Models\Company;
use App\Models\CompanyBank;
use Inertia\Inertia;

class BankController extends Controller
{
    public function index()
    {
        $companies = Company::with([
            'companyBanks.bank',
        ])
            ->orderBy('nom')
            ->get();

        $banks = Bank::orderBy('nom')->get();

        return Inertia::render('Admin/BankDocuments/index', [
            'companies' => $companies,
            'banks' => $banks,
        ]);
    }

    public function create()
    {
        $companies = Company::orderBy('nom')->get();
        $banks = Bank::orderBy('nom')->get();

        return Inertia::render('Admin/BankDocuments/create', [
            'companies' => $companies,
            'banks' => $banks,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => ['required', 'uuid', 'exists:companies,id'],
            'bank_id' => ['required', 'uuid', 'exists:banks,id'],
            'numero_compte' => ['required', 'string', 'max:100'],
            'nom_beneficiaire' => ['required', 'string', 'max:150'],
            'numero_compte_beneficiaire' => ['required', 'string', 'max:100'],
            'ville' => ['required', 'string', 'max:100'],
            'motif' => ['nullable', 'string', 'max:255'],
        ]);

        $exists = CompanyBank::where('company_id', $validated['company_id'])
            ->where('bank_id', $validated['bank_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'bank_id' => 'Cette banque est déjà configurée pour cette entreprise.',
            ]);
        }

        CompanyBank::create($validated);

        return redirect()
            ->route('admin.bank-documents.index')
            ->with(
                'success',
                'Configuration bancaire ajoutée avec succès.'
            );
    }

    public function edit(string $id)
    {
        $companyBank = CompanyBank::with([
            'company',
            'bank',
        ])->findOrFail($id);

        $companies = Company::orderBy('nom')->get();
        $banks = Bank::orderBy('nom')->get();

        return Inertia::render('Admin/BankDocuments/edit', [
            'companyBank' => $companyBank,
            'companies' => $companies,
            'banks' => $banks,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $companyBank = CompanyBank::findOrFail($id);

        $validated = $request->validate([
            'company_id' => ['required', 'uuid', 'exists:companies,id'],
            'bank_id' => ['required', 'uuid', 'exists:banks,id'],
            'numero_compte' => ['required', 'string', 'max:100'],
            'nom_beneficiaire' => ['required', 'string', 'max:150'],
            'numero_compte_beneficiaire' => ['required', 'string', 'max:100'],
            'ville' => ['required', 'string', 'max:100'],
            'motif' => ['nullable', 'string', 'max:255'],
        ]);

        $exists = CompanyBank::where('company_id', $validated['company_id'])
            ->where('bank_id', $validated['bank_id'])
            ->where('id', '!=', $companyBank->id)
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'bank_id' => 'Cette banque est déjà configurée pour cette entreprise.',
            ]);
        }

        $companyBank->update($validated);

        return redirect()
            ->route('admin.bank-documents.index')
            ->with(
                'success',
                'Configuration bancaire modifiée avec succès.'
            );
    }

    public function destroy(string $id)
    {
        $companyBank = CompanyBank::findOrFail($id);

        $companyBank->delete();

        return redirect()
            ->route('admin.bank-documents.index')
            ->with(
                'success',
                'Configuration bancaire supprimée avec succès.'
            );
    }
}