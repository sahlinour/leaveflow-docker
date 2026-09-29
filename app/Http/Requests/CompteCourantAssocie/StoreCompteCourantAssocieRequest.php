<?php

namespace App\Http\Requests\CompteCourantAssocie;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCompteCourantAssocieRequest extends FormRequest
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
                Rule::exists('users', 'id'),
            ],

            'montant' => [
                'required',
                'numeric',
                'min:0.01',
            ],

            'date_affectation' => [
                'nullable',
                'date',
            ],

            'commentaire' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' =>
                'Veuillez sélectionner un employé.',

            'user_id.uuid' =>
                'L\'employé sélectionné est invalide.',

            'user_id.exists' =>
                'L\'employé sélectionné n\'existe pas.',

            'montant.required' =>
                'Le montant est obligatoire.',

            'montant.numeric' =>
                'Le montant doit être numérique.',

            'montant.min' =>
                'Le montant doit être supérieur à 0.',

            'date_affectation.date' =>
                'La date d\'affectation est invalide.',

            'commentaire.string' =>
                'Le commentaire doit être une chaîne de caractères.',

            'commentaire.max' =>
                'Le commentaire ne peut pas dépasser 1000 caractères.',
        ];
    }
}