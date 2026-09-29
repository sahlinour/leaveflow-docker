<?php

namespace App\Notifications;

use App\Models\Caisse;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CaisseClotureeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Caisse $caisse
    ) {
    }
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $caisse = $this->caisse->load([
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

        $totalGeneral = $totalCaisse + $totalDettes;

        $fondCaisse = (float) $caisse->fond_caisse;

        $soldeFinal = $fondCaisse - $totalGeneral;

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
                'soldeFinal' => $soldeFinal,
            ]
        );

        $pdf->setPaper('A4', 'portrait');

        $date = $caisse->date_caisse
            ? $caisse->date_caisse->format('Y-m-d')
            : now()->format('Y-m-d');

        return (new MailMessage)
            ->subject('Clôture de caisse - ' . $date)
            ->greeting('Bonjour,')
            ->line(
                'Une caisse vient d’être clôturée par un employé.'
            )
            ->line(
                'Employé : ' .
                trim(
                    ($employe?->prenom ?? '') .
                    ' ' .
                    ($employe?->nom ?? '')
                )
            )
            ->line(
                'Entreprise : ' .
                ($company?->nom ?? '-')
            )
            ->line(
                'Date de caisse : ' .
                $date
            )
            ->line(
                'Total caisse : ' .
                number_format($totalCaisse, 2, ',', ' ') .
                ' DH'
            )
            ->line(
                'Total dettes : ' .
                number_format($totalDettes, 2, ',', ' ') .
                ' DH'
            )
            ->line(
                'Solde final : ' .
                number_format($soldeFinal, 2, ',', ' ') .
                ' DH'
            )
            ->line(
                'Vous trouverez le rapport de clôture en pièce jointe.'
            )
            ->attachData(
                $pdf->output(),
                'cloture-caisse-' . $date . '.pdf',
                [
                    'mime' => 'application/pdf',
                ]
            );
    }

    /**
     * Notification dans la base de données.
     */
    public function toArray(object $notifiable): array
    {
        $employe = $this->caisse->user;

        return [
            'type' => 'caisse_cloturee',
            'titre' => 'Caisse clôturée',
            'message' => sprintf(
                'La caisse du %s a été clôturée par %s %s.',
                $this->caisse->date_caisse?->format('d/m/Y') ?? '-',
                $employe?->prenom ?? '',
                $employe?->nom ?? ''
            ),
            'caisse_id' => $this->caisse->id,
            'date_caisse' => $this->caisse->date_caisse?->format('Y-m-d'),
            'statut' => $this->caisse->statut,
        ];
    }
}