<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\DemandeConge;
use Barryvdh\DomPDF\Facade\Pdf;

class DemandeCongeApprouveeComptableNotification extends Notification
{
    use Queueable;

    public function __construct(public DemandeConge $demande)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $demande = $this->demande->load([
            'user.company',
        ]);

        $employe = $demande->user;

        $pdf = Pdf::loadView(
            'pdf.demande-conge',
            compact('demande')
        );

        return (new MailMessage)->subject(
                'Demande de congé approuvée - ' .
                $demande->reference_demande
            )
            ->greeting('Bonjour,')
            ->line('Une demande de congé vient d’être approuvée par l’administrateur.')
            ->line('Employé : ' .$employe->prenom . ' ' . $employe->nom)
            ->line('Référence : ' .$demande->reference_demande)
            ->line('Type : ' .$demande->type_conge)
            ->line('Période : ' .\Carbon\Carbon::parse($demande->date_debut)->format('d/m/Y') .' au ' .\Carbon\Carbon::parse($demande->date_fin)->format('d/m/Y'))
            ->line('Nombre de jours : ' .$demande->nombre_jours)
            ->line('Le document PDF de la demande est joint à cet email.')
            ->attachData($pdf->output(),'Demande-' . $demande->reference_demande . '.pdf',
                [
                    'mime' => 'application/pdf',
                ]
            )
            ->line('Merci d’utiliser LeaveFlow.');
    }

    public function toArray(object $notifiable): array
    {
        return [];
    }
}