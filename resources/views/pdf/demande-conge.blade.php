<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>
        Demande de congé - {{ $demande->reference_demande }}
    </title>
    <link rel="stylesheet" href="{{ public_path('css/pdf/demandeconge.css') }}">
</head>

<body>

@php
    $company = $demande->user->company ?? null;
@endphp
<div class="header">
    <table class="header-table">
        <tr>
            <td class="company">

                <table class="company-inner">

                    <tr>

                        <td class="logo-cell">

                            @if($company && $company->logo)

                                <img
                                    src="{{ public_path('storage/' . $company->logo) }}"
                                    class="company-logo"
                                >

                            @else

                                <div class="company-logo-placeholder">

                                    {{ $company
                                        ? strtoupper(substr($company->nom, 0, 2))
                                        : 'CO'
                                    }}

                                </div>

                            @endif

                        </td>


                        <td>

                            <div class="company-name">

                                {{ $company->nom ?? 'Entreprise' }}

                            </div>


                            @if($company)

                                <div class="company-info">

                                    @if($company->adresse)
                                        {{ $company->adresse }}
                                    @else
                                        Document administratif
                                    @endif

                                </div>

                            @else

                                <div class="company-info">
                                    Document administratif
                                </div>

                            @endif

                        </td>
                    </tr>
                </table>

            </td>
            <td class="document-info">

                <div class="document-title">
                    DEMANDE DE CONGÉ
                </div>

                <div class="document-subtitle">
                    DOCUMENT ADMINISTRATIF
                </div>

                <div class="document-reference">

                    Référence :
                    <strong>
                        {{ $demande->reference_demande }}
                    </strong>

                </div>
            </td>
        </tr>
    </table>

</div>

<div class="status-container">

    <table class="status-table">

        <tr>

            <td>

                <div class="status-label">
                    Statut de la demande
                </div>

            </td>

            <td class="status-right">

                @if($demande->statut === "Approuvée")

                    <span class="badge approved">
                        Approuvée
                    </span>

                @elseif($demande->statut === "Refusée")

                    <span class="badge rejected">
                        Refusée
                    </span>

                @else

                    <span class="badge pending">
                        En attente
                    </span>

                @endif

            </td>

        </tr>
    </table>
</div>

<div class="section avoid-break">
    <div class="section-title">
        Informations de l'employé
    </div>
    <table class="info-table">
        <tr>
            <th>
                Employé
            </th>

            <td>
                {{ $demande->user->prenom }}
                {{ $demande->user->nom }}
            </td>

        </tr>
        <tr>

            <th>
                Matricule
            </th>

            <td>
                {{ $demande->user->matricule ?? '-' }}
            </td>

        </tr>
        <tr>

            <th>
                Email
            </th>

            <td>
                {{ $demande->user->email }}
            </td>

        </tr>
        <tr>

            <th>
                Entreprise
            </th>

            <td>
                {{ $company->nom ?? '-' }}
            </td>

        </tr>
        <tr>

            <th>
                Poste
            </th>

            <td>
                {{ $demande->user->poste ?? '-' }}
            </td>

        </tr>
    </table>
</div>

<div class="section avoid-break">
    <div class="section-title">
        Détails du congé
    </div>
    <table class="info-table">
        <tr>
            <th>
                Type de congé
            </th>

            <td>
                {{ $demande->type_conge }}
            </td>
        </tr>
        <tr>
            <th>
                Date de début
            </th>
            <td>
                {{ \Carbon\Carbon::parse($demande->date_debut)->format('d/m/Y') }}
            </td>
        </tr>
        <tr>
            <th>
                Date de fin
            </th>

            <td>
                {{ \Carbon\Carbon::parse($demande->date_fin)->format('d/m/Y') }}
            </td>
        </tr>
        <tr>
            <th>
                Nombre de jours
            </th>

            <td>
                <strong>
                    {{ $demande->nombre_jours }} jour(s)
                </strong>
            </td>
        </tr>
    </table>
</div>

<div class="section avoid-break">
    <div class="section-title">
        Motif de la demande
    </div>
    <div class="text-box">
        {{ $demande->motif ?: 'Aucun motif renseigné.' }}
    </div>
</div>

@if($demande->justificatif)
    <div class="section avoid-break">
        <div class="section-title">
            Justificatif
        </div>

        <div class="justificatif">
            Document joint :
            <strong>
                {{ basename($demande->justificatif) }}
            </strong>
        </div>
    </div>

@endif

@if($demande->statut === "Refusée")
    <div class="section avoid-break">
        <div class="section-title">
            Commentaire administratif
        </div>
        <div class="comment-box">
            {{ $demande->commentaire_admin
                ?: 'Aucun commentaire administratif renseigné.'
            }}
        </div>
    </div>

@endif

<table class="signature-table">
    <tr>
        <td>
            <div class="signature-line"></div>

            Signature de l'employé

            <div class="signature-role">
                Employé
            </div>

        </td>
        <td>
            <div class="signature-line"></div>
            Signature responsable RH
            <div class="signature-role">
                Ressources humaines
            </div>
        </td>
    </tr>
</table>
<div class="footer">
    Document généré automatiquement le
    {{ now()->format('d/m/Y à H:i') }}
    <br>
    <span class="footer-company">
        {{ $company->nom ?? 'Gestion des congés' }}
    </span>
</div>
</body>
</html>