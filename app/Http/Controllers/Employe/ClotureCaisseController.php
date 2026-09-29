<?php

namespace App\Http\Controllers\Employe;

use App\Http\Controllers\Controller;
use App\Models\Caisse;
use App\Services\CompteCourantAssocie\CompteCourantAssocieService;
use Barryvdh\DomPDF\Facade\Pdf;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ClotureCaisseController extends Controller
{
    public function __construct(
        private readonly CompteCourantAssocieService $compteCourantAssocieService
    ) {}

    public function pdf(Caisse $caisse): SymfonyResponse
    {
        abort_unless(
            $caisse->user_id === auth()->id(),
            403
        );
        abort_unless(
            $caisse->statut === 'cloturee',
            404
        );
        $caisse->load([
            'details' => function ($query) {
                $query->orderBy('coupure');
            },
            'dettes' => function ($query) {
                $query->latest('date_dette');
            },
            'user.company',
        ]);

        $employe = $caisse->user;
        $company = $employe?->company;
        $totalCaisse = (float) $caisse->total_caisse;
        $totalDettes = (float) $caisse
            ->dettes
            ->sum('montant');
        $totalGeneral = (float) $caisse->total_general;
        $fondCaisse = (float) $caisse->fond_caisse;
        $compteCourantAssocie =
            $this->compteCourantAssocieService
                ->getSolde($caisse->user_id);
        $soldeFinal = (float) $caisse->solde_final;
        $pdf = Pdf::loadView(
            'pdf.caisse-cloture',
            [
                'caisse' => $caisse,
                'employe' => $employe,
                'company' => $company,
                'totalCaisse' => $totalCaisse,
                'totalDettes' => $totalDettes,
                'totalGeneral' => $totalGeneral,
                'fondCaisse' => $fondCaisse,
                'compteCourantAssocie' => $compteCourantAssocie,
                'soldeFinal' => $soldeFinal,
            ]
        );
        $pdf->setPaper(
            'A4',
            'portrait'
        );
        return $pdf->download(
            'cloture-caisse-' .
            $caisse->date_caisse->format('Y-m-d') .
            '.pdf'
        );
    }
}