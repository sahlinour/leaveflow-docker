<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DemandeConge;
use App\Models\Parametre;
use App\Models\Conge;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\HistoriqueConge;
use App\Notifications\DemandeCongeStatutNotification;
use App\Notifications\DemandeCongeApprouveeComptableNotification;

class DemandeCongeController extends Controller
{
    public function index(Request $request)
    {
        $demandes = DemandeConge::with([
                'user.company',
                'conge'
            ])
             ->when($request->demande_id, function ($query) use ($request) {
                $query->where('id', $request->demande_id);
            })
            ->when(!$request->demande_id && $request->statut, function ($query) use ($request) {
                $query->where('statut', $request->statut);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $counts = [
            'all' => DemandeConge::count(),
            'pending' => DemandeConge::where('statut', 'En attente')->count(),
            'approved' => DemandeConge::where('statut', 'Approuvée')->count(),
            'rejected' => DemandeConge::where('statut', 'Refusée')->count(),
        ];
        return Inertia::render('Admin/DemandesConges/index',
            [
                'demandes'=>$demandes,
                'filters'=>[ 'statut'=>$request->statut, 'demande_id' => $request->demande_id,], 
                'counts' => $counts,
            ]
        );
    }

    public function show(string $id)
    {
        $demande = DemandeConge::with('user.company')
        ->findOrFail($id);

        $pdf = Pdf::loadView(
            'pdf.demande-conge',
            compact('demande')
        );

        return $pdf->stream(
            'Demande-'.$demande->reference_demande.'.pdf'
        );
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'statut' => 'required|in:En attente,Approuvée,Refusée',
            'commentaire_admin' => 'nullable|string|max:1000',
        ]);

        $demande = DemandeConge::with('conge')
            ->findOrFail($id);

        if ($demande->statut !== 'En attente') {
            return back()->withErrors([
                'statut' => 'Cette demande a déjà été traitée.'
            ]);
        }

        $ancienStatut = $demande->statut;
        if ($request->statut === 'Approuvée') {

            $conge = $demande->conge;

            if (!$conge) {
                return back()->withErrors([
                    'statut' =>
                        "Aucun solde de congés n'est disponible pour cet employé."
                ]);
            }

            if ($demande->type_conge === 'Exceptionnel') {
            }
            elseif ($demande->type_conge === 'Sans solde') {
                $anneeSuivante = $conge->annee + 1;

                $congeSuivant = Conge::where('user_id', $demande->user_id)
                    ->where('annee', $anneeSuivante)
                    ->first();

                if (!$congeSuivant) {
                    $reste = max(
                        0,
                        $conge->solde_initial - $conge->jours_utilise
                    );

                    $congeSuivant = Conge::create([
                        'user_id' => $demande->user_id,
                        'annee' => $anneeSuivante,
                        'solde_initial' => $conge->solde_initial + $reste,
                        'jours_utilise' => 0,
                    ]);
                }
                $soldeRestantSuivant =
                    $congeSuivant->solde_initial -
                    $congeSuivant->jours_utilise;

                if ($demande->nombre_jours > $soldeRestantSuivant) {
                    return back()->withErrors([
                        'statut' =>
                            "Solde insuffisant pour l'année {$anneeSuivante}. " .
                            "L'employé dispose de {$soldeRestantSuivant} jour(s), " .
                            "mais la demande nécessite {$demande->nombre_jours} jour(s)."
                    ]);
                }

                $congeSuivant->increment(
                    'jours_utilise',
                    $demande->nombre_jours
                );
            }
            else {
                $soldeRestant = $conge->solde_initial - $conge->jours_utilise;

                if ($demande->nombre_jours > $soldeRestant) {
                    return back()->withErrors([
                        'statut' =>
                            "Solde insuffisant. L'employé dispose de {$soldeRestant} jour(s), " .
                            "mais la demande nécessite {$demande->nombre_jours} jour(s)."
                    ]);
                }
                $conge->increment(
                    'jours_utilise',
                    $demande->nombre_jours
                );
            }
        }
        $demande->update([
            'statut' => $request->statut,
            'commentaire_admin' => $request->commentaire_admin,
        ]);
        HistoriqueConge::create([
            'user_id' => auth()->id(),
            'demande_conge_id' => $demande->id,
            'action' => $request->statut === 'Approuvée'
                ? 'validation'
                : 'refus',
            'ancien_statut' => $ancienStatut,
            'nouveau_statut' => $request->statut,
            'description' => $request->statut === 'Approuvée'
                ? 'La demande de congé a été approuvée par l’administrateur.'
                : 'La demande de congé a été refusée par l’administrateur.',
        ]);
         $demande->user->notify(
            new DemandeCongeStatutNotification($demande)
        ); 
        
        if ($request->statut === 'Approuvée') 
        {
            $comptableEmail = Parametre::where('cle', 'comptable_email')->value('valeur');

            if ($comptableEmail) {
                \Illuminate\Support\Facades\Notification::route(
                    'mail',
                    $comptableEmail
                )->notify(
                    new DemandeCongeApprouveeComptableNotification($demande)
                );
            }
        }
        return redirect()
            ->route('admin.demandes-conges.index')
            ->with(
                'success',
                'Statut de la demande mis à jour avec succès.'
            );
    }

    public function commentaire(Request $request, DemandeConge $demande)
    {
        if($request->commentaire_admin !== null &&
        trim($request->commentaire_admin) !== "") {

            $demande->update([
                'commentaire_admin' => $request->commentaire_admin
            ]);
        }

        return back();
    }

    public function pdf($id)
    {
        $demande = DemandeConge::with('user.company')
            ->findOrFail($id);

        $pdf = Pdf::loadView('pdf.demande-conge', compact('demande'));
        return $pdf->stream(
            'Demande-'.$demande->reference_demande.'.pdf'
        );
    }
    public function downloadPdf($id)
    {
        $demande = DemandeConge::with('user.company')
            ->findOrFail($id);

        $pdf = Pdf::loadView('pdf.demande-conge', compact('demande'));

        return $pdf->download(
            'Demande-'.$demande->reference_demande.'.pdf'
        );
    }
}
