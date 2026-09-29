<?php

namespace App\Http\Requests\CompteCourantAssocie;

use Illuminate\Foundation\Http\FormRequest;

class RetourCompteCourantAssocieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'montant_retourne' => [
                'required',
                'numeric',
                'min:0.01',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'montant_retourne.required' =>
                'Le montant retourné est obligatoire.',

            'montant_retourne.numeric' =>
                'Le montant retourné doit être numérique.',

            'montant_retourne.min' =>
                'Le montant retourné doit être supérieur à 0.',
        ];
    }
}