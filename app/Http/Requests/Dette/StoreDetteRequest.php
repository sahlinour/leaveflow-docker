<?php

namespace App\Http\Requests\Dette;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDetteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'dettes' => [
                'required',
                'array',
                'min:1',
            ],
            'dettes.*.client_id' => [
                'required',
                'uuid',
                Rule::exists('clients', 'id')
                    ->where('company_id', auth()->user()->company_id),
            ],
            'dettes.*.montant' => [
                'required',
                'numeric',
                'min:0.01',
            ],
        ];
    }
    public function messages(): array
    {
        return [
            'dettes.required' =>
                'Veuillez ajouter au moins une dette.',
            'dettes.array' =>
                'Les dettes sont invalides.',
            'dettes.min' =>
                'Veuillez ajouter au moins une dette.',
            'dettes.*.client_id.required' =>
                'Veuillez sélectionner un client.',
            'dettes.*.client_id.uuid' =>
                'Le client sélectionné est invalide.',
            'dettes.*.client_id.exists' =>
                'Le client sélectionné n\'existe pas ou n\'appartient pas à votre société.',
            'dettes.*.montant.required' =>
                'Le montant est obligatoire.',
            'dettes.*.montant.numeric' =>
                'Le montant doit être numérique.',
            'dettes.*.montant.min' =>
                'Le montant doit être supérieur à 0.',
        ];
    }
}