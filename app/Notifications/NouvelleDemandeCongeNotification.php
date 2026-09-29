<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\DemandeConge;

class NouvelleDemandeCongeNotification extends Notification
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
        $employe = $this->demande->user;

        return (new MailMessage)
            ->subject('Nouvelle demande de congé - LeaveFlow')
            ->greeting('Bonjour,')
            ->line('Une nouvelle demande de congé vient d’être envoyée.')
            ->line('Employé : ' . $employe->prenom . ' ' . $employe->nom)
            ->line('Référence : ' . $this->demande->reference_demande)
            ->line('Type : ' . $this->demande->type_conge)
            ->line(
                'Période : ' .
                \Carbon\Carbon::parse($this->demande->date_debut)->format('d/m/Y') .
                ' au ' .
                \Carbon\Carbon::parse($this->demande->date_fin)->format('d/m/Y')
            )
            ->line('Nombre de jours : ' . $this->demande->nombre_jours)
            ->action(
                'Consulter les demandes',
                url('/admin/demandes-conges')
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
        $employe = $this->demande->user;

        return [
            'type' => 'nouvelle_demande',
            'titre' => 'Nouvelle demande de congé',
            'message' => 'Une nouvelle demande de congé a été envoyée par '
                . $employe->prenom . ' ' . $employe->nom . '.',
            'demande_id' => $this->demande->id,
            'reference' => $this->demande->reference_demande,
        ];
    }
}
