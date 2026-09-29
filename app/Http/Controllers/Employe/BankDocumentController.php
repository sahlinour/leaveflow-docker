<?php

namespace App\Http\Controllers\Employe;

use App\Http\Controllers\Controller;
use App\Models\CompanyBank;
use App\Models\BankDocument;
use App\Services\BankDocumentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BankDocumentController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $companyBanks = CompanyBank::with('bank')
            ->where('company_id', $user->company_id)
            ->get();

        return Inertia::render('Employe/BankDocs/index', [
            'companyBanks' => $companyBanks,
        ]);
    }

    public function store(Request $request,BankDocumentService $bankDocumentService) 
    {
        $user = Auth::user();
        $validated = $request->validate([
            'company_bank_id' => [
                'required',
                'uuid',
                'exists:company_banks,id',
            ],
            'montant' => [
                'required',
                'numeric',
                'min:0.01',
            ],
            'date_virement' => [
                'required',
                'date',
            ],
        ]);

        $companyBank = CompanyBank::with(['company', 'bank'])
            ->where('id', $validated['company_bank_id'])
            ->where('company_id', $user->company_id)
            ->firstOrFail();

        $dateDocument = now()->format('d/m/Y');
        $dateVirement = \Carbon\Carbon::parse(
            $validated['date_virement']
        )->format('d/m/Y');

        $companyName = strtoupper($companyBank->company->nom);
        $bankName = strtoupper($companyBank->bank->nom);

        $companyName = preg_replace(
            '/[^A-Z0-9]/',
            '',
            str_replace(' ', '', $companyName)
        );

        $bankName = preg_replace(
            '/[^A-Z0-9]/',
            '',
            str_replace(' ', '', $bankName)
        );

        $year = now()->year;
        $lastDocument = BankDocument::whereYear('created_at', $year)
            ->orderByDesc('created_at')
            ->first();

        $nextNumber = $lastDocument
            ? ((int) substr($lastDocument->reference, -4)) + 1
            : 1;

        $reference = 'BD-' .
            $companyName . '-' .
            $bankName . '-' .
            $year . '-' .
            str_pad(
                $nextNumber,
                4,
                '0',
                STR_PAD_LEFT
            );
        $documentPath = $bankDocumentService->generate(
            $companyBank,
            (float) $validated['montant'],
            $dateVirement,
            $dateDocument,
            $reference
        );
        $bankDocument = BankDocument::create([
            'reference' => $reference,
            'company_bank_id' => $companyBank->id,
            'created_by' => $user->id,
            'montant' => $validated['montant'],
            'montant_en_lettres' => app(
                \App\Services\AmountToWordsService::class
            )->convert((float) $validated['montant']),
            'date_virement' => $validated['date_virement'],
            'date_document' => now()->format('Y-m-d'),
            'document_path' => $documentPath,
        ]);

        return back()->with([
            'success' => 'Document bancaire généré avec succès.',
            'document_url' => asset(
                'storage/' . $documentPath
            ),
        ]);
    }
    public function history()
    {
        $user = Auth::user();
        if (!$user->company || $user->company->type !== true) {
            abort(403, 'Accès non autorisé.');
        }
        $documents = BankDocument::with([
            'companyBank.bank',
            'createdBy',
        ])
            ->where('created_by', $user->id)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Employe/BankDocs/history', [
            'documents' => $documents,
        ]);
    }
}