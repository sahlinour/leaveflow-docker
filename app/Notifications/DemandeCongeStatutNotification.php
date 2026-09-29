<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\DemandeConge;

class DemandeCongeStatutNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public DemandeConge $demande)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $demande = $this->demande;

        $statut = $demande->statut;

        if ($statut === 'Approuvée') {
            $subject = 'Demande de congé approuvée - LeaveFlow';
            $greeting = 'Bonne nouvelle !';
            $message = 'Votre demande de congé a été approuvée par l’administrateur.';
        } else {
            $subject = 'Demande de congé refusée - LeaveFlow';
            $greeting = 'Bonjour,';
            $message = 'Votre demande de congé a été refusée par l’administrateur.';
        }

        return (new MailMessage)
            ->subject($subject)
            ->greeting($greeting)
            ->line($message)
            ->line('Référence : ' . $demande->reference_demande)
            ->line('Type : ' . $demande->type_conge)
            ->line(
                'Période : ' .
                \Carbon\Carbon::parse($demande->date_debut)->format('d/m/Y') .
                ' au ' .
                \Carbon\Carbon::parse($demande->date_fin)->format('d/m/Y')
            )
            ->line('Nombre de jours : ' . $demande->nombre_jours)
            ->when(
                !empty($demande->commentaire_admin),
                function ($mail) use ($demande) {
                    return $mail->line(
                        'Commentaire de l’administrateur : ' .
                        $demande->commentaire_admin
                    );
                }
            )
            ->action(
                'Consulter mes demandes',
                url('/demandes-conges')
            )
            ->line('Merci d’utiliser LeaveFlow.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
    public function toDatabase(object $notifiable): array
    {
        $statut = $this->demande->statut;

        return [
            'type' => $statut === 'Approuvée'
                ? 'demande_approuvee'
                : 'demande_refusee',

            'titre' => $statut === 'Approuvée'
                ? 'Demande de congé approuvée'
                : 'Demande de congé refusée',

            'message' => $statut === 'Approuvée'
                ? 'Votre demande de congé a été approuvée.'
                : 'Votre demande de congé a été refusée.',

            'demande_id' => $this->demande->id,
            'reference' => $this->demande->reference_demande,
            'commentaire' => $this->demande->commentaire_admin,
        ];
    }
}
