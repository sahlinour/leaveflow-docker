<?php

namespace App\Services\DemandeConge;

use App\Models\Conge;
use App\Models\DemandeConge;
use App\Models\PeriodeBloquee;
use App\Models\User;
use App\Notifications\NouvelleDemandeCongeNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DemandeCongeService
{
    private function generateReference(): string
    {
        $user = auth()->user();

        $matricule = $user->matricule;

        $lastDemande = DemandeConge::withTrashed()
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->first();

        if ($lastDemande) {
            $parts = explode('-', $lastDemande->reference_demande);
            $lastNumber = (int) end($parts);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        return 'DEM-'
            . $matricule
            . '-'
            . str_pad($nextNumber, 5, '0', STR_PAD_LEFT);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $periodeBloquee = PeriodeBloquee::where(
            'company_id',
            $user->company_id
        )
            ->where(function ($query) use ($request) {
                $query->where('date_debut', '<=', $request->date_fin)
                    ->where('date_fin', '>=', $request->date_debut);
            })
            ->first();

        if ($periodeBloquee) {
            $motif = $periodeBloquee->motif
                ? " Motif : {$periodeBloquee->motif}."
                : "";

            return back()
                ->withErrors([
                    'date_debut' =>
                        "La période demandée chevauche une période bloquée du "
                        . Carbon::parse($periodeBloquee->date_debut)->format('d/m/Y')
                        . " au "
                        . Carbon::parse($periodeBloquee->date_fin)->format('d/m/Y')
                        . "."
                        . $motif
                ])
                ->withInput();
        }

        $nombreJours = Carbon::parse($request->date_debut)
            ->diffInDays(Carbon::parse($request->date_fin)) + 1;

        $annee = Carbon::parse($request->date_debut)->year;

        $conge = Conge::where('user_id', auth()->id())
            ->where('annee', $annee)
            ->first();

        if (!$conge) {
            return back()
                ->withErrors([
                    'date_debut' =>
                        "Aucun solde de congés n'est disponible pour l'année {$annee}."
                ])
                ->withInput();
        }

        $soldeRestant = $conge->solde_initial - $conge->jours_utilise;

        if ($nombreJours > $soldeRestant) {
            return back()
                ->withErrors([
                    'date_fin' =>
                        "Solde insuffisant. Vous disposez de {$soldeRestant} jour(s), mais vous demandez {$nombreJours} jour(s)."
                ])
                ->withInput();
        }

        $path = null;

        if ($request->hasFile('justificatif')) {
            $path = $request->file('justificatif')
                ->store('justificatifs', 'public');
        }

        $demande = DemandeConge::create([
            'reference_demande' => $this->generateReference(),
            'user_id' => auth()->id(),
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'nombre_jours' => $nombreJours,
            'type_conge' => $request->type_conge,
            'motif' => $request->motif,
            'justificatif' => $path,
            'statut' => 'En attente',
        ]);

        $admin = User::whereHas('role', function ($query) {
            $query->where('slug', 'admin');
        })->first();

        $admins = User::whereHas('role', function ($query) {
             $query->whereIn('slug', ['admin', 'supervisor']);
        })->get();

        foreach ($admins as $admin) {
            $admin->notify(
                new NouvelleDemandeCongeNotification($demande)
            );
        }

        return redirect()
            ->route('demandes-conges.index')
            ->with('success', 'Demande envoyée avec succès');
    }

    public function update(Request $request, string $id)
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

        $validated = $request->validated();

        if ($user->company_id) {
            $periode = PeriodeBloquee::where(
                'company_id',
                $user->company_id
            )
                ->whereDate(
                    'date_debut',
                    '<=',
                    $validated['date_fin']
                )
                ->whereDate(
                    'date_fin',
                    '>=',
                    $validated['date_debut']
                )
                ->first();

            if ($periode) {
                return back()
                    ->withErrors([
                        'date_debut' =>
                            'Cette période est bloquée par l\'entreprise.'
                    ])
                    ->withInput();
            }
        }

        if ($request->hasFile('justificatif')) {
            $path = $request->file('justificatif')
                ->store('justificatifs', 'public');

            $validated['justificatif'] = $path;
        } else {
            unset($validated['justificatif']);
        }

        $demande->update($validated);

        return redirect()
            ->route('demandes-conges.index')
            ->with(
                'success',
                'Demande de congé modifiée avec succès.'
            );
    }

    public function annuler(string $id)
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
                    'Seule une demande en attente peut être annulée.'
                );
        }

        $demande->update([
            'statut' => 'Annulée',
        ]);

        $demande->refresh();
        return redirect()
            ->route('demandes-conges.index')
            ->with(
                'success',
                'Demande de congé annulée avec succès.'
            );
    }

    public function destroy(string $id)
    {
        $user = Auth::user();

        $demande = DemandeConge::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if (!in_array($demande->statut, ['Annulée', 'Refusée'])) {
            return redirect()
                ->route('demandes-conges.index')
                ->with(
                    'error',
                    'Cette demande ne peut plus être supprimée.'
                );
        }

        $demande->delete();

        return redirect()
            ->route('demandes-conges.index')
            ->with(
                'success',
                'Demande de congé supprimée avec succès.'
            );
    }
}