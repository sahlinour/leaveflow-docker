<?php

namespace App\Http\Requests\DemandeConge;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDemandeCongeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'nombre_jours' => 'required|integer|min:1',
            'type_conge' => 'required|in:Annuel,Maladie,Exceptionnel,Sans solde',
            'motif' => 'nullable|string|max:1000',
            'justificatif' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ];
    }
}