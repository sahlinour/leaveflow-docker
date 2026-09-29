<?php

namespace App\Http\Requests\Caisse;

use Illuminate\Foundation\Http\FormRequest;

class AffecterFondCaisseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => [
                'required',
                'uuid',
                'exists:users,id',
            ],

            'date_caisse' => [
                'required',
                'date',
            ],

            'fond_caisse' => [
                'required',
                'numeric',
                'min:0',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' =>
                'L’employé est obligatoire.',

            'user_id.uuid' =>
                'L’identifiant de l’employé est invalide.',

            'user_id.exists' =>
                'L’employé sélectionné n’existe pas.',

            'date_caisse.required' =>
                'La date de la caisse est obligatoire.',

            'date_caisse.date' =>
                'La date de la caisse est invalide.',

            'fond_caisse.required' =>
                'Le fond de caisse est obligatoire.',

            'fond_caisse.numeric' =>
                'Le fond de caisse doit être un montant numérique.',

            'fond_caisse.min' =>
                'Le fond de caisse ne peut pas être négatif.',
        ];
    }
}