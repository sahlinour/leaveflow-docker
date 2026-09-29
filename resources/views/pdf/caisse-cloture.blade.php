<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
<title>Clôture de caisse</title>
<link rel="stylesheet" href="{{ public_path('css/pdf/caissecloture.css') }}">
</head>
<body>

<div class="header">
    <div class="title">
        Clôture de caisse
    </div>

    <div class="subtitle">
        Rapport de clôture de la caisse <br>
        {{ $caisse->reference ?? '-' }}
    </div>

</div>
<table class="info">
    <tr>
        <td class="label">
            Entreprise
        </td>

        <td class="value">
            {{ $company?->nom ?? '-' }}
        </td>
    </tr>

    <tr>
        <td class="label">
            Employé
        </td>

        <td class="value">
            {{ trim(
                ($employe?->prenom ?? '') .
                ' ' .
                ($employe?->nom ?? '')
            ) ?: '-' }}
        </td>
    </tr>

    <tr>
        <td class="label">
            Matricule
        </td>

        <td class="value">
            {{ $employe?->matricule ?? '-' }}
        </td>
    </tr>

    <tr>
        <td class="label">
            Email
        </td>

        <td class="value">
            {{ $employe?->email ?? '-' }}
        </td>
    </tr>

    <tr>
        <td class="label">
            Date de la caisse
        </td>

        <td class="value">
            {{ $caisse->date_caisse->format('d/m/Y') }}
        </td>
    </tr>

    <tr>
        <td class="label">
            Date de clôture
        </td>

        <td class="value">
            {{ $caisse->date_cloture
                ? $caisse->date_cloture->format('d/m/Y H:i')
                : '-' }}
        </td>
    </tr>

    <tr>
        <td class="label">
            Statut
        </td>

        <td class="value">
            <span class="status">
                Clôturée
            </span>
        </td>
    </tr>
</table>

<div class="section-title">
    Détail de la caisse
</div>
<table>
    <thead>
        <tr>
            <th>
                Coupure
            </th>
            <th class="center">
                Quantité
            </th>
            <th class="right">
                Montant
            </th>
        </tr>
    </thead>
    <tbody>
        @forelse ($caisse->details as $detail)
            <tr>
                <td>
                    {{ number_format( $detail->coupure,0, ',', ' ') }}
                    DH
                </td>
                <td class="center">
                    {{ $detail->quantite }}
                </td>
                <td class="right">
                    {{ number_format( $detail->montant, 2, ',', ' ') }}
                    DH
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="3" class="center">
                    Aucun détail disponible.
                </td>
            </tr>
        @endforelse

        <tr class="total-row">
            <td colspan="2">
                Total caisse
            </td>
            <td class="right">
                {{ number_format( $totalCaisse, 2, ',', ' ') }}
                DH
            </td>
        </tr>
    </tbody>

</table>
<div class="section-title" style="margin-top: 25px;">
    Dettes
</div>
<table>
    <thead>
        <tr>
            <th>
                Nom complet
            </th>
            <th>
                Date
            </th>
            <th class="right">
                Montant
            </th>

        </tr>
    </thead>
    <tbody>
        @forelse ($caisse->dettes as $dette)
            <tr>
                <td>
                    {{ $dette->nom_complet }}
                </td>

                <td>
                    {{ \Carbon\Carbon::parse(
                        $dette->date_dette
                    )->format('d/m/Y') }}
                </td>

                <td class="right">
                    {{ number_format( $dette->montant, 2, ',',' ') }}
                    DH
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="3" class="center">
                    Aucun Dette.
                </td>
            </tr>
        @endforelse
        <tr class="total-row">
            <td colspan="2">
                Total Dettes
            </td>
            <td class="right">
                {{ number_format( $totalDettes, 2, ',', ' ') }}
                DH
            </td>
        </tr>
    </tbody>
</table>
<div class="summary">
    <div class="section-title">
        Résumé financier
    </div>
    <table class="summary-table">
        @if($compteCourantAssocie > 0)
            <tr>
                <td>
                    Compte courant associé
                </td>
                <td class="right">
                    {{ number_format($compteCourantAssocie, 2, ',', ' ') }}
                    DH
                </td>
            </tr>
        @endif
        <tr>
            <td>
                Fond de caisse
            </td>
            <td class="right">
                {{ number_format( $fondCaisse, 2, ',', ' ') }}
                DH
            </td>
        </tr>
        <tr>
            <td>
                Total caisse
            </td>
            <td class="right">
                {{ number_format( $totalCaisse, 2, ',', ' ') }}
                DH
            </td>
        </tr>
        <tr>
            <td>
                Total Dettes
            </td>
            <td class="right">
                {{ number_format( $totalDettes, 2, ',', ' ') }}
                DH
            </td>
        </tr>
        <tr>
            <td class="summary-total">
                Total général
            </td>

            <td class="right summary-total">
                {{ number_format( $totalGeneral, 2, ',', ' ' ) }}
                DH
            </td>
        </tr>
        <tr>
            <td class="summary-total">
                Solde final
            </td>
            <td
                class="right {{ $soldeFinal >= 0 ? 'positive' : 'negative' }}"
            >
                {{ $soldeFinal >= 0 ? '+' : '' }}
                {{ number_format($soldeFinal, 2, ',', ' ' ) }}

                DH
            </td>
        </tr>
    </table>
</div>
<div class="footer">
    Rapport généré automatiquement par LeaveFlow.
</div>
</body>
</html>
