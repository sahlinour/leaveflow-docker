<?php

namespace App\Http\Requests\Caisse;

use Illuminate\Foundation\Http\FormRequest;

class CalculateCaisseRequest extends FormRequest
{
    /**
     * Autorisation de la requête.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Règles de validation.
     */
    public function rules(): array
    {
        return [
            'montants' => [
                'required',
                'array',
            ],

            'montants.1' => [
                'nullable',
                'numeric',
                'min:0',
                'multiple_of:1',
            ],

            'montants.5' => [
                'nullable',
                'numeric',
                'min:0',
                'multiple_of:5',
            ],

            'montants.10' => [
                'nullable',
                'numeric',
                'min:0',
                'multiple_of:10',
            ],

            'montants.20' => [
                'nullable',
                'numeric',
                'min:0',
                'multiple_of:20',
            ],

            'montants.50' => [
                'nullable',
                'numeric',
                'min:0',
                'multiple_of:50',
            ],

            'montants.100' => [
                'nullable',
                'numeric',
                'min:0',
                'multiple_of:100',
            ],

            'montants.200' => [
                'nullable',
                'numeric',
                'min:0',
                'multiple_of:200',
            ],
        ];
    }

    /**
     * Messages de validation.
     */
    public function messages(): array
    {
        return [
            'montants.required' => 'Les montants de la caisse sont obligatoires.',
            'montants.array' => 'Les montants de la caisse sont invalides.',
            'montants.*.numeric' => 'Le montant doit être numérique.',
            'montants.*.min' => 'Le montant ne peut pas être négatif.',
            'montants.1.multiple_of' => 'Le montant de 1 DH doit être un multiple de 1 DH.',
            'montants.5.multiple_of' => 'Le montant de 5 DH doit être un multiple de 5 DH.',
            'montants.10.multiple_of' => 'Le montant de 10 DH doit être un multiple de 10 DH.',
            'montants.20.multiple_of' => 'Le montant de 20 DH doit être un multiple de 20 DH.',
            'montants.50.multiple_of' => 'Le montant de 50 DH doit être un multiple de 50 DH.',
            'montants.100.multiple_of' => 'Le montant de 100 DH doit être un multiple de 100 DH.',
            'montants.200.multiple_of' => 'Le montant de 200 DH doit être un multiple de 200 DH.',
        ];
    }
}